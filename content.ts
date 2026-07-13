/**
 * ────────────────────────────────────────────────────────────────────────
 *  APRÈS SEA CHARTERS — SITE CONTENT
 * ────────────────────────────────────────────────────────────────────────
 *
 *  This is the ONE file to edit for text, photos, contact details, and the
 *  season dates. Nearly everything you see on the website lives here.
 *
 *  HOW TO EDIT (see EDITING.md for the friendly, step-by-step version):
 *   • Text is anything between "quotation marks". Change what's inside the
 *     quotes, keep the quotes themselves.
 *   • To swap a photo, drop the new image into  public/images/  and change
 *     the filename below to match.
 *   • Keep the commas and curly braces where they are.
 *
 *  When in doubt, change one thing, save, and check the site.
 * ────────────────────────────────────────────────────────────────────────
 */

export const content = {
  /** Business identity ------------------------------------------------- */
  brand: {
    // The short wordmark shown in the top-left and hero.
    wordmark: "Après Sea",
    // The full legal-ish business name (used in the footer + SEO).
    legalName: "Après Sea Charters",
    // One-line description used for SEO and link previews.
    metaDescription:
      "Private captained charters aboard Après Sea, a 31-foot Sea Ray SLX 310 out of Palmer Point Marina, Cos Cob, Connecticut. Up to ten guests, May 1 through November 1. Every charter is quoted individually.",
  },

  /** Contact + booking ------------------------------------------------- */
  contact: {
    // The inbox that receives inquiry-form submissions.
    email: "apresseacharters@gmail.com",
    // Your live domain (no https://). Used for SEO/canonical links.
    domain: "apresseacharters.com",
  },

  /** Home port / marina ------------------------------------------------ */
  location: {
    marina: "Palmer Point Marina",
    addressLine: "7 River Road, Cos Cob, CT 06807",
    town: "Cos Cob",
    region: "CT",
    // Waters you cruise — shown in the copy.
    waters: "Long Island Sound",
    // A plain-text address the "Get directions" link searches for.
    mapQuery: "Palmer Point Marina, 7 River Road, Cos Cob, CT 06807",
  },

  /** Season & capacity ------------------------------------------------- */
  details: {
    // Charter season. Change the month/day numbers to move the window.
    // (Month is 1–12. These are inclusive.)
    seasonStart: { month: 5, day: 1, label: "May 1" }, // May 1
    seasonEnd: { month: 11, day: 1, label: "November 1" }, // November 1
    seasonLabel: "May 1 – November 1",
    // Maximum guests aboard.
    maxGuests: 10,
  },

  /** Navigation (anchor links within the one page) --------------------- */
  nav: [
    { label: "The Day", href: "#experience" },
    { label: "The Boat", href: "#boat" },
    { label: "Book", href: "#availability" },
    { label: "Departure", href: "#location" },
  ],
  // The single call-to-action verb, reused everywhere.
  ctaLabel: "Request a charter",

  /** HERO -------------------------------------------------------------- */
  hero: {
    // Image file must live in public/images/
    image: "boat-profile.jpg",
    imageAlt:
      "Après Sea, a 31-foot Sea Ray SLX 310, running along the starboard side on calm water on Long Island Sound.",
    eyebrow: "Private Charters · Long Island Sound",
    // The big line. Keep it short.
    tagline: "Private charters aboard Après Sea.",
    // A one-liner beneath the tagline.
    subline:
      "A captained 31-foot Sea Ray for up to ten guests, out of Cos Cob, Connecticut. In season May through November, and every charter is planned and priced on its own.",
  },

  /** THE EXPERIENCE ---------------------------------------------------- */
  experience: {
    eyebrow: "The Day",
    heading: "Every charter is private and planned around you.",
    // One or two short paragraphs. Each string is its own paragraph.
    paragraphs: [
      "We don't sell set packages, and you never share the boat with another group. Tell us the occasion — a sunset cruise, a harbor tour, an afternoon at anchor — and we plan the trip around it.",
      "An experienced captain handles the boat, the navigation, and the weather calls. All you do is show up at the dock.",
    ],
  },

  /** THE BOAT ---------------------------------------------------------- */
  boat: {
    eyebrow: "The Boat",
    heading: "Après Sea. A 31-foot Sea Ray SLX 310.",
    lede: "Open bow, shaded cockpit, and seating for ten guests — comfortable underway and at anchor.",
    // Gallery photos — files must live in public/images/
    gallery: [
      {
        image: "boat-cockpit.jpg",
        alt: "The cockpit of Après Sea: twin white captain's seats under a hardtop with a skylight, wraparound seating aft.",
        caption: "The cockpit, shaded under the hardtop.",
      },
      {
        image: "boat-bow.jpg",
        alt: "The bow lounge of Après Sea: wraparound white sun-pad seating with a table set up, looking out over calm water.",
        caption: "The bow lounge, table up.",
      },
      {
        image: "boat-profile.jpg",
        alt: "Starboard profile of Après Sea, a white Sea Ray SLX 310 with a sport arch, underway on the Mianus River.",
        caption: "Underway, headed for open water.",
      },
    ],
    // Accurate spec highlights (source: searay.com SLX 310).
    // Update these only with figures you can verify.
    specs: [
      { label: "Length overall", value: "31 ft 6 in" },
      { label: "Beam", value: "10 ft 2 in" },
      { label: "Guests aboard", value: "Up to 10" },
      { label: "Fuel capacity", value: "158 gal" },
      { label: "Power", value: "Twin sterndrive, up to 700 hp" },
      { label: "Model", value: "Sea Ray SLX 310" },
    ],
    // Manufacturer walkthrough video (YouTube).
    // Leave empty ("") to hide the video block entirely. To bring it back,
    // paste a YouTube video ID between the quotes, e.g. "rbx8CWmjKy8".
    videoId: "",
    videoLabel: "The manufacturer's walkthrough of the SLX 310.",
    // Manufacturer reference page.
    manufacturerUrl: "https://www.searay.com/us/en/boats/slx/slx-310",
  },

  /** AVAILABILITY & HOW IT WORKS --------------------------------------- */
  availability: {
    eyebrow: "Book",
    heading: "Every charter is quoted individually.",
    lede: "There's no published rate card. The date, the hours, the size of your group, and what you have in mind all shape the price, so we prepare a quote for each trip. We charter May 1 through November 1, weather permitting.",
    // The three quiet, confidence-building points.
    points: [
      {
        title: "Write to us",
        body: "Send the form below, or email us directly. A date, a headcount, and a rough idea of the day is plenty to start.",
      },
      {
        title: "Get your quote",
        body: "We reply by email with a plan for the trip and a firm price for it. Ask questions, adjust, confirm.",
      },
      {
        title: "Step aboard",
        body: "Meet us at Palmer Point Marina in Cos Cob. Your captain will be ready at the dock.",
      },
    ],
  },

  /** LOCATION ---------------------------------------------------------- */
  locationSection: {
    eyebrow: "Departure",
    heading: "We cast off from Palmer Point Marina.",
    body: "Cos Cob, Connecticut, on the Mianus River — a few minutes' idle from open water on the Sound. Every charter boards and returns at the same dock.",
  },

  /** BOOKING / INQUIRY FORM -------------------------------------------- */
  form: {
    eyebrow: "Inquire",
    heading: "Tell us about your day.",
    intro:
      "A date, a headcount, and whatever you have in mind. We read every note and answer by email with a custom quote.",
    // Duration choices in the dropdown. Edit the labels freely.
    durationOptions: [
      "Not sure yet",
      "2 hours",
      "3 hours",
      "4 hours",
      "Half day",
      "Full day",
    ],
    // Message shown after a successful submission.
    successHeading: "Thank you — your inquiry was sent.",
    successBody:
      "We'll follow up by email with a custom quote for your day on the water.",
  },

  /** FOOTER ------------------------------------------------------------ */
  footer: {
    tagline:
      "Private captained charters on Long Island Sound. Up to ten guests. Every charter individually quoted.",
  },
} as const;

export type SiteContent = typeof content;
