"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { content } from "@content";
import { inquirySchema, seasonLabel, type InquiryInput } from "@/lib/validation";
import { Reveal } from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

const mailto = `mailto:${content.contact.email}`;

export function InquiryForm() {
  const { form, details, contact } = content;
  const [status, setStatus] = useState<Status>("idle");

  // Date input bounds: from today through the end of next year's season.
  // The season gap between Nov and May is still enforced by Zod on submit.
  const { minDate, maxDate } = useMemo(() => {
    const today = new Date();
    const iso = (y: number, m: number, d: number) =>
      `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    return {
      minDate: iso(today.getFullYear(), today.getMonth() + 1, today.getDate()),
      maxDate: iso(today.getFullYear() + 1, details.seasonEnd.month, details.seasonEnd.day),
    };
  }, [details]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    mode: "onBlur",
    defaultValues: { guests: 2, company: "" },
  });

  async function onSubmit(data: InquiryInput) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="inquire" className="bg-ink py-24 text-bone sm:py-32">
      <div className="section grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="eyebrow text-brass">{form.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-light leading-tight sm:text-4xl">
            {form.heading}
          </h2>
          <p className="mt-5 max-w-measure text-lg leading-relaxed text-bone/75">
            {form.intro}
          </p>
          <p className="mt-6 text-sm text-bone/55">
            In season {seasonLabel}. Up to {details.maxGuests} guests aboard.
          </p>
        </Reveal>

        <div className="md:col-span-7 md:col-start-6">
          {status === "success" ? (
            <SuccessPanel heading={form.successHeading} body={form.successBody} />
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="rounded-2xl bg-bone p-6 text-ink shadow-soft sm:p-8"
            >
              {/* Honeypot — hidden from real users */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="company">Company (leave blank)</label>
                <input
                  id="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("company")}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" error={errors.name?.message} htmlFor="name">
                  <input id="name" type="text" autoComplete="name" className="input" {...register("name")} />
                </Field>

                <Field label="Email" error={errors.email?.message} htmlFor="email">
                  <input id="email" type="email" autoComplete="email" className="input" {...register("email")} />
                </Field>

                <Field label="Phone" error={errors.phone?.message} htmlFor="phone">
                  <input id="phone" type="tel" autoComplete="tel" className="input" {...register("phone")} />
                </Field>

                <Field
                  label="Number of guests"
                  hint={`Up to ${details.maxGuests}`}
                  error={errors.guests?.message}
                  htmlFor="guests"
                >
                  <input
                    id="guests"
                    type="number"
                    min={1}
                    max={details.maxGuests}
                    className="input"
                    {...register("guests")}
                  />
                </Field>

                <Field
                  label="Desired date"
                  hint={seasonLabel}
                  error={errors.date?.message}
                  htmlFor="date"
                >
                  <input
                    id="date"
                    type="date"
                    min={minDate}
                    max={maxDate}
                    className="input"
                    {...register("date")}
                  />
                </Field>

                <Field label="Departure time" error={errors.time?.message} htmlFor="time">
                  <input id="time" type="time" className="input" {...register("time")} />
                </Field>

                <Field
                  label="Duration"
                  error={errors.duration?.message}
                  htmlFor="duration"
                  className="sm:col-span-2"
                >
                  <select id="duration" className="input" defaultValue="" {...register("duration")}>
                    <option value="" disabled>
                      Select a length…
                    </option>
                    {form.durationOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Custom requests or notes"
                  hint="Optional"
                  error={errors.notes?.message}
                  htmlFor="notes"
                  className="sm:col-span-2"
                >
                  <textarea
                    id="notes"
                    rows={4}
                    className="input resize-y"
                    placeholder="Occasion, itinerary ideas, accessibility needs…"
                    {...register("notes")}
                  />
                </Field>
              </div>

              {status === "error" && (
                <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
                  Something went wrong sending your request. Please email us directly at{" "}
                  <a href={mailto} className="font-medium underline">
                    {contact.email}
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary mt-6 w-full sm:w-auto"
              >
                {status === "submitting" ? "Sending…" : content.ctaLabel}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const describedBy = error ? `${htmlFor}-error` : hint ? `${htmlFor}-hint` : undefined;
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between">
        <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
          {label}
        </label>
        {hint && !error && (
          <span id={`${htmlFor}-hint`} className="text-xs text-ink/45">
            {hint}
          </span>
        )}
      </div>
      <div className="mt-1.5" aria-describedby={describedBy}>
        {children}
      </div>
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessPanel({ heading, body }: { heading: string; body: string }) {
  return (
    <div
      role="status"
      className="flex h-full flex-col justify-center rounded-2xl bg-bone p-8 text-ink shadow-soft sm:p-10"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sound/10 text-sound">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h3 className="mt-5 font-display text-2xl text-ink">{heading}</h3>
      <p className="mt-3 max-w-measure text-ink/75">{body}</p>
    </div>
  );
}
