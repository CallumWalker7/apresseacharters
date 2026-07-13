import { content } from "@content";
import { Reveal } from "./Reveal";

/** Book — availability, quoting, and the three-step flow. */
export function Availability() {
  const { availability } = content;
  return (
    <section id="availability" className="bg-sand py-24 sm:py-32">
      <div className="section">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{availability.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-light leading-tight text-ink sm:text-4xl">
            {availability.heading}
          </h2>
          <p className="mt-5 max-w-measure text-lg leading-relaxed text-ink/75">
            {availability.lede}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {availability.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 90} className="bg-bone p-7 sm:p-8">
              <span className="font-display text-2xl text-brass">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl text-ink">{point.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70">
                {point.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
