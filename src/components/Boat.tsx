import Image from "next/image";
import { content } from "@content";
import { Reveal } from "./Reveal";

/** The Boat — gallery, verified spec highlights, manufacturer video. */
export function Boat() {
  const { boat } = content;
  const [lead, ...rest] = boat.gallery;

  return (
    <section id="boat" className="bg-ink py-24 text-bone sm:py-32">
      <div className="section">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-brass">{boat.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-light leading-tight sm:text-4xl">
            {boat.heading}
          </h2>
          <p className="mt-5 max-w-measure text-lg leading-relaxed text-bone/75">
            {boat.lede}
          </p>
        </Reveal>

        {/* Asymmetric gallery: one tall lead image + stacked pair */}
        <div className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-xl lg:row-span-2 lg:aspect-auto">
            <Image
              src={`/images/${lead.image}`}
              alt={lead.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
            <Caption text={lead.caption} />
          </Reveal>

          {rest.map((shot, i) => (
            <Reveal
              key={shot.image}
              delay={i * 90}
              className="relative aspect-[16/10] overflow-hidden rounded-xl"
            >
              <Image
                src={`/images/${shot.image}`}
                alt={shot.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <Caption text={shot.caption} />
            </Reveal>
          ))}
        </div>

        {/* Specs (+ manufacturer video, shown only when a videoId is set in content.ts) */}
        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <Reveal className={boat.videoId ? "md:col-span-5" : "md:col-span-8 md:col-start-3"}>
            <dl className="divide-y divide-bone/15 border-t border-bone/15">
              {boat.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-baseline justify-between gap-6 py-3.5"
                >
                  <dt className="text-sm uppercase tracking-widelabel text-bone/55">
                    {spec.label}
                  </dt>
                  <dd className="text-right font-display text-lg text-bone">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs text-bone/45">
              Specifications per{" "}
              <a
                href={boat.manufacturerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-bone/30 underline-offset-2 hover:text-bone"
              >
                Sea Ray
              </a>
              .
            </p>
          </Reveal>

          {boat.videoId ? (
            <Reveal className="md:col-span-6 md:col-start-7" delay={80}>
              <div className="relative aspect-video overflow-hidden rounded-xl border border-bone/15 bg-black/40">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${boat.videoId}`}
                  title={boat.videoLabel}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-sm text-bone/55">{boat.videoLabel}</p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Caption({ text }: { text: string }) {
  return (
    <span className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/70 to-transparent p-4 text-sm text-bone/90">
      {text}
    </span>
  );
}
