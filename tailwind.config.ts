import type { Config } from "tailwindcss";

/**
 * Coastal-luxury theme. One accent, one warm neutral — no rainbow.
 * Colors are anchored to the boat's navy hull stripe.
 */
const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./content.ts",
  ],
  theme: {
    extend: {
      colors: {
        // Deep near-black navy — text and dark sections.
        ink: {
          DEFAULT: "#0B1B3B",
          soft: "#1B2C4E",
        },
        // Muted Long Island Sound blue-slate — the single accent, used sparingly.
        sound: {
          DEFAULT: "#2E5A7A",
          deep: "#244a66",
        },
        // Warm sand / bone neutrals — page backgrounds.
        sand: "#F3EEE6",
        bone: "#FAF7F1",
        // A quiet warm brass/teak for hairline accents and hovers.
        brass: "#A9865B",
      },
      fontFamily: {
        // Wired to next/font CSS variables in layout.tsx.
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        measure: "68ch", // comfortable reading measure for body copy
      },
      letterSpacing: {
        widelabel: "0.22em",
      },
      boxShadow: {
        soft: "0 18px 50px -24px rgba(11, 27, 59, 0.35)",
        lift: "0 10px 30px -18px rgba(11, 27, 59, 0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-cue": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
      },
      animation: {
        "scroll-cue": "scroll-cue 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
