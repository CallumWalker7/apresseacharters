import { content } from "@content";

/** Quiet footer — wordmark, contact, address, season, copyright. */
export function Footer() {
  const { brand, contact, location, details, footer } = content;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-bone py-14">
      <div className="section grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl italic text-ink">{brand.wordmark}</p>
          <p className="mt-2 max-w-xs text-sm text-ink/60">{footer.tagline}</p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widelabel text-ink/45">Inquiries</h2>
          <a
            href={`mailto:${contact.email}`}
            className="mt-3 block text-sm text-ink/80 hover:text-sound"
          >
            {contact.email}
          </a>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widelabel text-ink/45">Departure</h2>
          <p className="mt-3 text-sm text-ink/80">{location.marina}</p>
          <p className="text-sm text-ink/60">{location.addressLine}</p>
          <p className="mt-3 text-sm text-ink/60">Season {details.seasonLabel}</p>
        </div>
      </div>

      <div className="section mt-12 flex flex-col gap-2 border-t border-ink/10 pt-6 text-xs text-ink/45 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {brand.legalName}. All rights reserved.
        </p>
        <p>{location.town}, {location.region} · {location.waters}</p>
      </div>
    </footer>
  );
}
