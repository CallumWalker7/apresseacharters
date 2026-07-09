import { content } from "@content";
import { Reveal } from "./Reveal";

/** The Experience — editorial two-column type, no icon grid. */
export function Experience() {
  const { experience } = content;
  return (
    <section id="experience" className="bg-bone py-24 sm:py-32">
      <div className="section grid gap-10 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-4">
          <p className="eyebrow">{experience.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-light leading-tight text-ink sm:text-4xl">
            {experience.heading}
          </h2>
        </Reveal>

        <div className="md:col-span-7 md:col-start-6">
          {experience.paragraphs.map((para, i) => (
            <Reveal key={i} delay={i * 90} className={i > 0 ? "mt-6" : ""}>
              <p className="max-w-measure text-lg leading-relaxed text-ink/80">
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
