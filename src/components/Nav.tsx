"use client";

import { useEffect, useState } from "react";
import { content } from "@content";

/**
 * Slim sticky top nav. Wordmark left, anchor links + single CTA right.
 * On mobile the links collapse into a quiet menu; the CTA always shows.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-bone/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="section flex h-16 items-center justify-between"
      >
        <a
          href="#top"
          className={`font-display text-lg tracking-tight transition-colors ${
            scrolled ? "text-ink" : "text-bone"
          }`}
        >
          {content.brand.wordmark}
        </a>

        <div className="flex items-center gap-6">
          <ul
            className={`hidden items-center gap-7 md:flex ${
              scrolled ? "text-ink/80" : "text-bone/85"
            }`}
          >
            {content.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm transition-colors hover:text-sound"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#inquire"
            className={`hidden rounded-full px-5 py-2 text-sm font-medium transition-colors sm:inline-flex ${
              scrolled
                ? "bg-ink text-bone hover:bg-sound"
                : "bg-bone/95 text-ink hover:bg-bone"
            }`}
          >
            {content.ctaLabel}
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className={`md:hidden ${scrolled ? "text-ink" : "text-bone"}`}
          >
            <span className="block h-px w-6 bg-current" />
            <span className="mt-1.5 block h-px w-6 bg-current" />
            <span className="mt-1.5 block h-px w-6 bg-current" />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-ink/10 bg-bone/95 backdrop-blur-md md:hidden"
        >
          <ul className="section flex flex-col py-4 text-ink">
            {content.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#inquire"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                {content.ctaLabel}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
