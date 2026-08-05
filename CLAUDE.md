# Après Sea Charters — project guide for Claude

Read this before making changes. It carries the context a new session would
otherwise be missing.

## What this is

A one-page marketing site for a real business: private captained boat charters
on Long Island Sound. Next.js, hosted on Vercel, deploys automatically from the
`main` branch on GitHub. Live at https://apresseacharters.com

## Who you are working with

The owner's family (Charlie and Alex) — **not developers**. Explain things in
plain English, don't show code unless asked, and never leave them at a terminal
prompt wondering what to type. Their guide is `EDITING.md`.

## Hard rules — do not break these

1. **No pricing anywhere on the site.** Every charter is a custom quote. This is
   a deliberate business decision, not an oversight.
2. **Only claim what is true.** The site may say: an experienced captain, up to
   10 guests, custom itineraries, May 1 – November 1 season, departs Palmer
   Point Marina in Cos Cob CT. It must NOT claim food, drink, crew beyond the
   captain, specific routes, or safety credentials. If asked to add a claim you
   cannot verify, ask the user whether it's actually true before writing it.
3. **Don't invent facts about the boat.** Specs come from Sea Ray's published
   figures for the SLX 310 and are cited on the page.
4. **Never commit secrets.** `.env.local` is git-ignored and must stay that way.
   The repo is **public**.

## Copy voice

Plain, factual, understated. Short declarative sentences. The client explicitly
rejected writerly marketing copy as sounding AI-generated — headlines like "One
boat, one party, and a long afternoon of water" were cut for exactly that
reason. Avoid: "elevate", "nestled", "unparalleled", "curated", "seamless",
"experience the...", "memories that last a lifetime", stacked tricolons, and
any line that could sit on any other business's website. When in doubt, state
the fact and stop.

## Where things live

- **`content.ts`** — nearly all site text, photos, specs, season dates, guest
  limit, contact email, form options. **Almost every request should be a change
  to this one file.**
- **`public/images/`** — the three boat photos (`boat-profile.jpg`,
  `boat-cockpit.jpg`, `boat-bow.jpg`). Replacing a file with the same name is
  the simplest photo swap.
- **`src/components/`** — section components (Hero, Experience, Boat,
  Availability, Location, InquiryForm, Footer). Edit only for structural
  changes, e.g. removing a section.
- **`src/app/page.tsx`** — the section order. Remove a `<Section />` line here
  to drop a whole section.
- **`src/lib/validation.ts`** — one shared schema used by BOTH the browser form
  and the server, so season/guest rules can't drift apart. Season dates and max
  guests come from `content.ts` — change them there, not here.
- **`src/app/api/inquiry/route.ts`** — sends inquiry emails via Resend. Leave
  alone unless the request is specifically about email delivery.

## Booking form and email — read before changing the contact address

Inquiries are emailed via Resend to the address in `content.ts` →
`contact.email` (currently `apresseaboatcharters@gmail.com`).

**Resend is in testing mode: it will only deliver to the email address that owns
the Resend account.** So changing `contact.email` alone will silently break
delivery. Changing the inbox requires either a Resend account + API key
belonging to the new address, or a verified domain at resend.com/domains.
If a user asks to change the inquiry email, tell them this first.

The guest auto-reply is deliberately gated behind the `INQUIRY_FROM` env var —
it stays off until a domain is verified.

## Publishing

`git push` to `main` → Vercel builds and the live site updates in about a
minute. The repo is public, so pushes from any collaborator deploy normally.

Before publishing:
1. Run `npm run build` to confirm it compiles.
2. Offer to show the user the change locally (`npm run dev`) first.
3. Only push when they say publish.

## Reverting

Everything is in git. "Undo that" / "put it back to yesterday" is always
possible — reassure users of this, they worry about breaking the site.

## Stale files — ignore these

`TODO-LAUNCH.txt`, `DEPLOY.md`, and the `site/` folder describe an abandoned
GoDaddy static-hosting plan and reference dead email addresses. They do not
reflect how the site works now. Don't follow them; don't cite them to users.
