# Après Sea Charters — Website

The launch website for **Après Sea Charters** — private captained boat charters
on Long Island Sound aboard *Après Sea*, a 31-foot Sea Ray SLX 310 out of
Palmer Point Marina in Cos Cob, CT.

A single-page (one-scroll) marketing site with a working booking-inquiry form
that emails the business. Built to be fast, mobile-first, and easy for a
non-technical owner to update.

---

## Tech

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a small custom coastal theme
- **React Hook Form + Zod** for the inquiry form (validation shared client/server)
- **Resend** for transactional email (business notification + guest confirmation)
- No database, no CMS — all editable content lives in [`content.ts`](content.ts)

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
#    then open .env.local and paste your Resend API key (see DEPLOY.md)

# 3. Run the dev server
npm run dev
#    → open http://localhost:3000
```

> The site runs without a Resend key — the inquiry form will simply show a
> "please email us directly" fallback until the key is added.

### Other commands

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

---

## Environment variables

Copy `.env.example` → `.env.local` and fill in:

| Variable          | Required | Purpose                                                        |
| ----------------- | -------- | -------------------------------------------------------------- |
| `RESEND_API_KEY`  | Yes\*    | Sends the inquiry emails. \*Without it, the form uses a mailto fallback. |
| `INQUIRY_FROM`    | Yes\*    | The verified "from" address, e.g. `Après Sea <hello@apresseacharters.com>`. |
| `INQUIRY_TO`      | No       | Override the recipient. Defaults to the email in `content.ts` (`info@apresseacharters.com`). |

Never commit `.env.local`. See **DEPLOY.md** for setting these in Vercel and
verifying your sending domain.

---

## Project structure

```
apres-sea-charters/
├── content.ts               ← ALL editable copy & settings (start here)
├── public/images/           ← boat photos (drop real photos here)
├── src/
│   ├── app/
│   │   ├── layout.tsx        SEO, fonts, structured data
│   │   ├── page.tsx          assembles the one-page site
│   │   ├── globals.css       theme + base styles
│   │   ├── sitemap.ts / robots.ts
│   │   └── api/inquiry/route.ts   ← form → email endpoint
│   ├── components/           one file per section (Hero, Boat, …)
│   └── lib/validation.ts     shared Zod schema + season logic
├── EDITING.md               ← non-technical guide to changing content
├── DEPLOY.md                ← how to publish + connect domain & email
└── .env.example
```

---

## Editing content

Almost everything you'd want to change — headlines, paragraphs, the tagline,
season dates, marina address, contact email, spec bullets, and photo filenames
— lives in **one file: [`content.ts`](content.ts)**.

See **[EDITING.md](EDITING.md)** for a friendly, step-by-step guide written for
someone who has never used a terminal.

---

## Notes

- No pricing appears anywhere by design — every charter is a custom quote.
- The map embed and the Sea Ray video require an internet connection to display.
- Photography is the star: replace the placeholder images in `public/images/`
  with the owner's real photos (same filenames) and the whole site updates.
