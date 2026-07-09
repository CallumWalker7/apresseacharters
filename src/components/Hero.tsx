import { content } from "@content";

/**
 * Hero — a clean, art-directed navy panel with a futuristic *blueprint* of the
 * boat (side elevation, line art, faint technical grid, dimension callouts and
 * a slow scan line). No photograph. The photography leads the gallery instead.
 */
export function Hero() {
  const { hero, brand, ctaLabel } = content;

  // Faint technical grid.
  const gridV = Array.from({ length: 25 }, (_, i) => i * 60);
  const gridH = Array.from({ length: 16 }, (_, i) => i * 60);
  // Small crosshair reticles for the "instrument readout" feel.
  const reticles = [
    [180, 180],
    [1260, 240],
    [1200, 690],
    [240, 660],
  ];

  const LINE = "#8CC5E0"; // blueprint cyan
  const LINE2 = "#BFE2F1"; // brighter highlight

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-bone"
    >
      {/* ---- Blueprint layer ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="bpGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid */}
          <g stroke={LINE} strokeWidth="1" strokeOpacity="0.09">
            {gridV.map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="900" />
            ))}
            {gridH.map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="1440" y2={y} />
            ))}
          </g>
          {/* Emphasis axes */}
          <g stroke={LINE} strokeWidth="1" strokeOpacity="0.2">
            <line x1="0" y1="600" x2="1440" y2="600" />
            <line x1="720" y1="0" x2="720" y2="900" />
          </g>

          {/* Reticles */}
          <g stroke={LINE} strokeWidth="1" strokeOpacity="0.4">
            {reticles.map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <line x1={x - 9} y1={y} x2={x + 9} y2={y} />
                <line x1={x} y1={y - 9} x2={x} y2={y + 9} />
              </g>
            ))}
          </g>

          {/* ---- The boat: side elevation (bow to the right) ---- */}
          <g
            filter="url(#bpGlow)"
            fill="none"
            stroke={LINE}
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeOpacity="0.85"
          >
            {/* Hull */}
            <path d="M330 472 C 520 486 780 486 980 470 C 1060 462 1120 458 1150 452 C 1170 472 1160 502 1120 528 C 1050 556 780 566 520 556 C 430 550 360 546 338 545 L 330 472 Z" />
            {/* Rubrail (parallel accent under the sheer) */}
            <path
              stroke={LINE2}
              d="M342 486 C 540 500 800 500 1000 484 C 1078 477 1128 474 1150 470"
            />
            {/* Chine / hull strake crease */}
            <path
              strokeOpacity="0.55"
              d="M350 521 C 600 529 900 521 1120 512"
            />
            {/* Transom detail */}
            <path strokeOpacity="0.5" d="M334 500 L 350 500" />

            {/* Sport arch (tower) */}
            <path d="M802 470 C 800 400 826 383 848 384" />
            {/* Hardtop roofline to windshield peak */}
            <path stroke={LINE2} d="M848 384 L 905 392" />
            {/* Windshield: front rake + rear pillar */}
            <path d="M905 392 L 936 470" />
            <path d="M905 392 L 872 470" />

            {/* Bow rails / cutwater hint */}
            <path strokeOpacity="0.5" d="M1005 470 L 1120 452" />
          </g>

          {/* Waterline (dashed) */}
          <line
            x1="150"
            y1="524"
            x2="1290"
            y2="524"
            stroke={LINE}
            strokeWidth="1"
            strokeOpacity="0.35"
            strokeDasharray="2 9"
          />

          {/* ---- Dimension: length overall ---- */}
          <g stroke={LINE} strokeOpacity="0.5" strokeWidth="1">
            <line x1="330" y1="628" x2="1150" y2="628" />
            <line x1="330" y1="618" x2="330" y2="638" />
            <line x1="1150" y1="618" x2="1150" y2="638" />
            {/* arrow ticks */}
            <path d="M338 623 L 330 628 L 338 633" fill="none" />
            <path d="M1142 623 L 1150 628 L 1142 633" fill="none" />
          </g>

          {/* Technical labels */}
          <g
            fill="#C6A97C"
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            <rect x="690" y="614" width="100" height="16" fill="#0B1B3B" />
            <text
              x="740"
              y="626"
              textAnchor="middle"
              fontSize="12"
              letterSpacing="1.5"
            >
              31′6″ LOA
            </text>
          </g>
          <g
            fill={LINE}
            fillOpacity="0.6"
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            <text x="330" y="356" fontSize="12" letterSpacing="2.5">
              SEA RAY · SLX 310
            </text>
            <text x="330" y="374" fontSize="10.5" letterSpacing="2" fillOpacity="0.4">
              SIDE ELEVATION · APRÈS SEA
            </text>
          </g>
        </svg>

        {/* Slow scan line */}
        <div className="blueprint-scan absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8CC5E0]/60 to-transparent" />

        {/* Legibility washes */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink" />
      </div>

      {/* ---- Content ---- */}
      <div className="section relative z-10 py-32">
        <div className="max-w-3xl">
          <p className="eyebrow text-bone/70">{hero.eyebrow}</p>
          <p className="mt-4 font-display text-3xl italic tracking-tight text-bone/90 sm:text-4xl">
            {brand.wordmark}
          </p>
          <h1 className="mt-5 font-display text-4xl font-light leading-[1.05] text-bone sm:text-6xl">
            {hero.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-base text-bone/75 sm:text-lg">
            {hero.subline}
          </p>
          <div className="mt-10 flex items-center gap-4">
            <a
              href="#inquire"
              className="btn bg-bone text-ink hover:bg-sound hover:text-bone"
            >
              {ctaLabel}
            </a>
            <span aria-hidden className="hidden h-px w-16 bg-brass/50 sm:block" />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#experience"
        aria-label="Scroll to explore"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-bone/60 hover:text-bone"
      >
        <svg
          width="22"
          height="34"
          viewBox="0 0 22 34"
          fill="none"
          className="animate-scroll-cue"
          aria-hidden
        >
          <rect x="1" y="1" width="20" height="32" rx="10" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="11" cy="10" r="2.5" fill="currentColor" />
        </svg>
      </a>
    </section>
  );
}
