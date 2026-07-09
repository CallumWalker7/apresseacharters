import { content } from "@content";
import { Reveal } from "./Reveal";

/** Location — marina address + embedded map. */
export function Location() {
  const { locationSection, location } = content;
  const mapQuery = encodeURIComponent(location.mapQuery);

  return (
    <section id="location" className="bg-bone py-24 sm:py-32">
      <div className="section grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow">{locationSection.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-light leading-tight text-ink sm:text-4xl">
            {locationSection.heading}
          </h2>
          <p className="mt-5 max-w-measure text-lg leading-relaxed text-ink/75">
            {locationSection.body}
          </p>
          <address className="mt-8 not-italic">
            <span className="block font-display text-xl text-ink">
              {location.marina}
            </span>
            <span className="mt-1 block text-ink/70">{location.addressLine}</span>
          </address>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-6"
          >
            Get directions
          </a>
        </Reveal>

        <Reveal delay={90}>
          <div className="overflow-hidden rounded-xl border border-ink/10 shadow-soft">
            <iframe
              title={`Map of ${location.marina}`}
              className="h-[360px] w-full grayscale-[0.15]"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5990!2d-73.59523!3d41.03432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPalmer%20Point%20Marina!5e0!3m2!1sen!2sus!4v1720000000000"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
