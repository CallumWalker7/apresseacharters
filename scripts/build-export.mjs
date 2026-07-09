/**
 * Builds a SINGLE self-contained HTML file (apres-sea-export.html) that renders
 * the entire Après Sea site with no build step — inline CSS, embedded photos,
 * blueprint hero. Meant to be handed to another model (Fable) in a fresh tab
 * for a full redesign pass.
 *
 * Run:  node scripts/build-export.mjs
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imgDir = join(root, "public", "images");
const tmp = mkdtempSync(join(tmpdir(), "apres-export-"));

/** Downscale a photo and return a base64 data URI (keeps the file portable). */
function dataUri(name, width = 1100, quality = 70) {
  const src = join(imgDir, name);
  const out = join(tmp, name);
  execFileSync("sips", [
    "-Z", String(width),
    "-s", "format", "jpeg",
    "-s", "formatOptions", String(quality),
    src, "--out", out,
  ]);
  return `data:image/jpeg;base64,${readFileSync(out).toString("base64")}`;
}

const imgProfile = dataUri("boat-profile.jpg");
const imgCockpit = dataUri("boat-cockpit.jpg");
const imgBow = dataUri("boat-bow.jpg");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Après Sea Charters — private charters on Long Island Sound</title>
<meta name="description" content="Private captained boat charters on Long Island Sound aboard Après Sea, a 31-foot Sea Ray SLX 310. Up to ten guests, May through November. Custom quotes on request." />

<!--
================================================================================
  APRÈS SEA CHARTERS — self-contained export for redesign
================================================================================
  This ONE file renders the whole marketing site (no build, no dependencies).
  It's a faithful snapshot of the current design so you can improve on it.

  BRIEF / CONSTRAINTS (please keep these true):
   • Business: Après Sea Charters — private captained boat charters.
   • Boat: 31-ft Sea Ray SLX 310 named "Après Sea", hosts up to 10 guests.
   • Home port: Palmer Point Marina, Cos Cob, CT (Long Island Sound).
   • Season: May 1 – November 1. Booking inbox: info@apresseacharters.com
   • NO PRICING anywhere — every charter is a custom quote.
   • Voice: understated New England coastal luxury. Warm, spare, no hype, no emoji.
   • Palette: deep navy #0B1B3B, Sound-blue #2E5A7A, warm sand #F3EEE6 / bone #FAF7F1,
     brass accent #A9865B. One accent + one warm neutral — no rainbow.
   • Type: Fraunces (display serif) + Inter (sans). Photography-led, generous space.

  WHAT TO IMPROVE: everything — layout, motion, hierarchy, the blueprint hero,
  the gallery, the form treatment. Make it feel hand-crafted, not templated.
  The three real boat photos are embedded below (profile / cockpit / bow).
================================================================================
-->

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

<style>
  :root {
    --ink: #0B1B3B;
    --ink-soft: #1B2C4E;
    --sound: #2E5A7A;
    --sand: #F3EEE6;
    --bone: #FAF7F1;
    --brass: #A9865B;
    --blueprint: #8CC5E0;
    --measure: 68ch;
    --serif: "Fraunces", Georgia, serif;
    --sans: "Inter", system-ui, sans-serif;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; scroll-padding-top: 5rem; }
  body { font-family: var(--sans); color: var(--ink); background: var(--bone); -webkit-font-smoothing: antialiased; line-height: 1.5; }
  h1, h2, h3 { font-family: var(--serif); font-weight: 300; line-height: 1.1; text-wrap: balance; }
  a { color: inherit; text-decoration: none; }
  img { display: block; max-width: 100%; }
  .section { width: 100%; max-width: 72rem; margin: 0 auto; padding: 0 1.5rem; }
  .eyebrow { font-size: .72rem; font-weight: 500; text-transform: uppercase; letter-spacing: .22em; color: var(--sound); }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; border-radius: 999px; padding: .8rem 1.6rem; font-size: .9rem; font-weight: 500; transition: all .2s; cursor: pointer; border: 0; }
  .btn-light { background: var(--bone); color: var(--ink); }
  .btn-light:hover { background: var(--sound); color: var(--bone); }
  .btn-dark { background: var(--ink); color: var(--bone); }
  .btn-dark:hover { background: var(--sound); }
  .btn-ghost { border: 1px solid rgba(11,27,59,.2); color: var(--ink); background: transparent; }
  .btn-ghost:hover { border-color: var(--ink); background: var(--ink); color: var(--bone); }

  /* NAV */
  header { position: fixed; inset: 0 0 auto 0; z-index: 40; }
  nav { display: flex; align-items: center; justify-content: space-between; height: 4rem; }
  .wordmark { font-family: var(--serif); font-size: 1.15rem; color: var(--bone); }
  .navlinks { display: flex; gap: 1.75rem; list-style: none; }
  .navlinks a { font-size: .88rem; color: rgba(250,247,241,.85); }
  .navlinks a:hover { color: var(--blueprint); }
  @media (max-width: 760px) { .navlinks, .nav-cta { display: none; } }

  /* HERO — blueprint */
  .hero { position: relative; min-height: 100svh; display: flex; align-items: center; overflow: hidden; background: var(--ink); color: var(--bone); }
  .hero svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .hero .wash-r { position: absolute; inset: 0; background: linear-gradient(to right, var(--ink), rgba(11,27,59,.6) 45%, transparent); }
  .hero .wash-b { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(27,44,78,.5), transparent, var(--ink)); }
  .hero .content { position: relative; z-index: 2; padding: 8rem 0; }
  .hero .content > div { max-width: 46rem; }
  .hero-brand { font-family: var(--serif); font-style: italic; font-size: 2rem; color: rgba(250,247,241,.9); margin-top: 1rem; }
  .hero h1 { font-size: clamp(2.4rem, 6vw, 3.75rem); color: var(--bone); margin-top: 1.25rem; }
  .hero .sub { margin-top: 1.5rem; max-width: 34rem; color: rgba(250,247,241,.75); font-size: 1.05rem; }
  .hero .cta-row { margin-top: 2.5rem; display: flex; align-items: center; gap: 1rem; }
  .hero .rule { width: 4rem; height: 1px; background: rgba(169,134,91,.5); }
  @media (max-width: 760px) { .hero .rule { display: none; } }
  @keyframes scan { 0%{top:6%;opacity:0} 12%{opacity:.6} 88%{opacity:.6} 100%{top:82%;opacity:0} }
  .scan { position: absolute; left: 0; right: 0; height: 1px; background: linear-gradient(to right, transparent, rgba(140,197,224,.6), transparent); animation: scan 8s cubic-bezier(.4,0,.2,1) infinite; z-index: 1; }
  @keyframes cue { 0%,100%{transform:translateY(0);opacity:.6} 50%{transform:translateY(6px);opacity:1} }
  .cue { position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%); color: rgba(250,247,241,.6); z-index: 2; }
  .cue svg { position: static; width: 22px; height: 34px; animation: cue 1.8s ease-in-out infinite; }

  /* EXPERIENCE */
  .experience { background: var(--bone); padding: 7rem 0; }
  .grid12 { display: grid; grid-template-columns: repeat(12, 1fr); gap: 3rem; }
  .experience h2 { font-size: clamp(1.8rem, 3.5vw, 2.4rem); margin-top: 1rem; }
  .experience .col-head { grid-column: span 4; }
  .experience .col-body { grid-column: 6 / span 7; }
  .experience p { max-width: var(--measure); font-size: 1.12rem; line-height: 1.7; color: rgba(11,27,59,.8); }
  .experience p + p { margin-top: 1.5rem; }

  /* BOAT */
  .boat { background: var(--ink); color: var(--bone); padding: 7rem 0; }
  .boat h2 { font-size: clamp(1.8rem, 3.5vw, 2.4rem); margin-top: 1rem; }
  .boat .lede { margin-top: 1.25rem; max-width: var(--measure); color: rgba(250,247,241,.75); font-size: 1.12rem; line-height: 1.7; }
  .gallery { margin-top: 3.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
  .gallery figure { position: relative; border-radius: .75rem; overflow: hidden; }
  .gallery .lead { grid-row: span 2; }
  .gallery img { width: 100%; height: 100%; object-fit: cover; transition: transform .7s; }
  .gallery figure:hover img { transform: scale(1.03); }
  .gallery figcaption { position: absolute; inset: auto 0 0 0; padding: 1rem; font-size: .85rem; color: rgba(250,247,241,.9); background: linear-gradient(to top, rgba(11,27,59,.7), transparent); }
  @media (max-width: 760px) { .gallery { grid-template-columns: 1fr; } .gallery .lead { grid-row: auto; } }
  .boat-lower { margin-top: 3.5rem; display: grid; grid-template-columns: repeat(12,1fr); gap: 3rem; }
  .specs { grid-column: span 5; border-top: 1px solid rgba(250,247,241,.15); }
  .specs .row { display: flex; align-items: baseline; justify-content: space-between; gap: 1.5rem; padding: .85rem 0; border-bottom: 1px solid rgba(250,247,241,.15); }
  .specs dt { font-size: .78rem; text-transform: uppercase; letter-spacing: .18em; color: rgba(250,247,241,.55); }
  .specs dd { font-family: var(--serif); font-size: 1.1rem; }
  .specs .cite { margin-top: 1.25rem; font-size: .75rem; color: rgba(250,247,241,.45); }
  .specs .cite a { text-decoration: underline; }
  .video { grid-column: 7 / span 6; }
  .video .frame { position: relative; aspect-ratio: 16/9; border-radius: .75rem; overflow: hidden; border: 1px solid rgba(250,247,241,.15); }
  .video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
  .video p { margin-top: .75rem; font-size: .88rem; color: rgba(250,247,241,.55); }
  @media (max-width: 760px) { .specs, .video { grid-column: 1 / -1; } }

  /* AVAILABILITY */
  .availability { background: var(--sand); padding: 7rem 0; }
  .availability h2 { font-size: clamp(1.8rem, 3.5vw, 2.4rem); margin-top: 1rem; }
  .availability .lede { margin-top: 1.25rem; max-width: var(--measure); color: rgba(11,27,59,.75); font-size: 1.12rem; line-height: 1.7; }
  .points { margin-top: 3.5rem; display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: rgba(11,27,59,.1); border: 1px solid rgba(11,27,59,.1); border-radius: .75rem; overflow: hidden; }
  .points .pt { background: var(--bone); padding: 2rem; }
  .points .num { font-family: var(--serif); font-size: 1.5rem; color: var(--brass); }
  .points h3 { font-size: 1.25rem; margin-top: 1rem; }
  .points p { margin-top: .5rem; font-size: .95rem; line-height: 1.6; color: rgba(11,27,59,.7); }
  @media (max-width: 760px) { .points { grid-template-columns: 1fr; } }

  /* LOCATION */
  .location { background: var(--bone); padding: 7rem 0; }
  .location .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
  .location h2 { font-size: clamp(1.8rem, 3.5vw, 2.4rem); margin-top: 1rem; }
  .location p.body { margin-top: 1.25rem; max-width: var(--measure); color: rgba(11,27,59,.75); font-size: 1.12rem; line-height: 1.7; }
  .location address { margin-top: 2rem; font-style: normal; }
  .location address .m { font-family: var(--serif); font-size: 1.25rem; }
  .location address .a { margin-top: .25rem; color: rgba(11,27,59,.7); }
  .location .map { border-radius: .75rem; overflow: hidden; border: 1px solid rgba(11,27,59,.1); box-shadow: 0 18px 50px -24px rgba(11,27,59,.35); }
  .location .map iframe { width: 100%; height: 360px; border: 0; filter: grayscale(.15); }
  @media (max-width: 760px) { .location .grid { grid-template-columns: 1fr; } }

  /* FORM */
  .inquire { background: var(--ink); color: var(--bone); padding: 7rem 0; }
  .inquire .grid { display: grid; grid-template-columns: repeat(12,1fr); gap: 3rem; }
  .inquire .intro { grid-column: span 4; }
  .inquire h2 { font-size: clamp(1.8rem, 3.5vw, 2.4rem); margin-top: 1rem; }
  .inquire .intro p { margin-top: 1.25rem; color: rgba(250,247,241,.75); font-size: 1.1rem; line-height: 1.7; }
  .inquire .intro .note { margin-top: 1.5rem; font-size: .85rem; color: rgba(250,247,241,.55); }
  .inquire .card { grid-column: 6 / span 7; background: var(--bone); color: var(--ink); border-radius: 1rem; padding: 2rem; box-shadow: 0 18px 50px -24px rgba(11,27,59,.35); }
  @media (max-width: 760px) { .inquire .intro, .inquire .card { grid-column: 1 / -1; } }
  .fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
  .field.full { grid-column: 1 / -1; }
  .field label { font-size: .85rem; font-weight: 500; }
  .field .input { width: 100%; margin-top: .4rem; border: 1px solid rgba(11,27,59,.15); border-radius: .5rem; padding: .65rem .85rem; font: inherit; font-size: .95rem; background: #fff; }
  .field .input:focus { outline: none; border-color: var(--sound); box-shadow: 0 0 0 3px rgba(46,90,122,.25); }
  .inquire .card button { margin-top: 1.5rem; }

  /* FOOTER */
  footer { background: var(--bone); border-top: 1px solid rgba(11,27,59,.1); padding: 3.5rem 0; }
  .foot { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 2.5rem; }
  .foot .mark { font-family: var(--serif); font-style: italic; font-size: 1.5rem; }
  .foot .tag { margin-top: .5rem; max-width: 20rem; font-size: .9rem; color: rgba(11,27,59,.6); }
  .foot h4 { font-size: .72rem; text-transform: uppercase; letter-spacing: .22em; color: rgba(11,27,59,.45); font-family: var(--sans); font-weight: 500; }
  .foot .col p, .foot .col a { display: block; margin-top: .5rem; font-size: .9rem; color: rgba(11,27,59,.8); }
  .foot-bottom { max-width: 72rem; margin: 2.5rem auto 0; padding: 1.5rem 1.5rem 0; border-top: 1px solid rgba(11,27,59,.1); display: flex; justify-content: space-between; font-size: .78rem; color: rgba(11,27,59,.45); }
  @media (max-width: 760px) { .foot { grid-template-columns: 1fr 1fr; } .foot-bottom { flex-direction: column; gap: .5rem; } }
</style>
</head>
<body>

<header>
  <nav class="section">
    <a href="#top" class="wordmark">Après Sea</a>
    <ul class="navlinks">
      <li><a href="#experience">Experience</a></li>
      <li><a href="#boat">The Boat</a></li>
      <li><a href="#availability">How It Works</a></li>
      <li><a href="#location">Location</a></li>
    </ul>
    <a href="#inquire" class="btn btn-light nav-cta">Request a Charter</a>
  </nav>
</header>

<!-- HERO: futuristic blueprint of the boat -->
<section id="top" class="hero">
  <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <filter id="bpGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.4" result="b" /><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <g stroke="#8CC5E0" stroke-width="1" stroke-opacity="0.09">
      ${Array.from({ length: 25 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="900"/>`).join("")}
      ${Array.from({ length: 16 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="1440" y2="${i * 60}"/>`).join("")}
    </g>
    <g stroke="#8CC5E0" stroke-width="1" stroke-opacity="0.2"><line x1="0" y1="600" x2="1440" y2="600"/><line x1="720" y1="0" x2="720" y2="900"/></g>
    <g stroke="#8CC5E0" stroke-width="1" stroke-opacity="0.4">
      ${[[180,180],[1260,240],[1200,690],[240,660]].map(([x,y])=>`<line x1="${x-9}" y1="${y}" x2="${x+9}" y2="${y}"/><line x1="${x}" y1="${y-9}" x2="${x}" y2="${y+9}"/>`).join("")}
    </g>
    <g filter="url(#bpGlow)" fill="none" stroke="#8CC5E0" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" stroke-opacity="0.85">
      <path d="M330 472 C 520 486 780 486 980 470 C 1060 462 1120 458 1150 452 C 1170 472 1160 502 1120 528 C 1050 556 780 566 520 556 C 430 550 360 546 338 545 L 330 472 Z"/>
      <path stroke="#BFE2F1" d="M342 486 C 540 500 800 500 1000 484 C 1078 477 1128 474 1150 470"/>
      <path stroke-opacity="0.55" d="M350 521 C 600 529 900 521 1120 512"/>
      <path stroke-opacity="0.5" d="M334 500 L 350 500"/>
      <path d="M802 470 C 800 400 826 383 848 384"/>
      <path stroke="#BFE2F1" d="M848 384 L 905 392"/>
      <path d="M905 392 L 936 470"/><path d="M905 392 L 872 470"/>
      <path stroke-opacity="0.5" d="M1005 470 L 1120 452"/>
    </g>
    <line x1="150" y1="524" x2="1290" y2="524" stroke="#8CC5E0" stroke-width="1" stroke-opacity="0.35" stroke-dasharray="2 9"/>
    <g stroke="#8CC5E0" stroke-opacity="0.5" stroke-width="1">
      <line x1="330" y1="628" x2="1150" y2="628"/><line x1="330" y1="618" x2="330" y2="638"/><line x1="1150" y1="618" x2="1150" y2="638"/>
      <path d="M338 623 L 330 628 L 338 633" fill="none"/><path d="M1142 623 L 1150 628 L 1142 633" fill="none"/>
    </g>
    <g fill="#C6A97C" font-family="ui-monospace, Menlo, monospace">
      <rect x="690" y="614" width="100" height="16" fill="#0B1B3B"/>
      <text x="740" y="626" text-anchor="middle" font-size="12" letter-spacing="1.5">31′6″ LOA</text>
    </g>
    <g fill="#8CC5E0" fill-opacity="0.6" font-family="ui-monospace, Menlo, monospace">
      <text x="330" y="356" font-size="12" letter-spacing="2.5">SEA RAY · SLX 310</text>
      <text x="330" y="374" font-size="10.5" letter-spacing="2" fill-opacity="0.4">SIDE ELEVATION · APRÈS SEA</text>
    </g>
  </svg>
  <div class="scan"></div>
  <div class="wash-r"></div>
  <div class="wash-b"></div>
  <div class="section content">
    <div>
      <p class="eyebrow" style="color:rgba(250,247,241,.7)">Private Charters · Long Island Sound</p>
      <p class="hero-brand">Après Sea</p>
      <h1>Your day on the Sound, exactly as you imagine it.</h1>
      <p class="sub">A captained charter for up to ten, aboard the Après Sea out of Cos Cob, Connecticut.</p>
      <div class="cta-row"><a href="#inquire" class="btn btn-light">Request a Charter</a><span class="rule"></span></div>
    </div>
  </div>
  <a href="#experience" class="cue" aria-label="Scroll to explore">
    <svg viewBox="0 0 22 34" fill="none"><rect x="1" y="1" width="20" height="32" rx="10" stroke="currentColor" stroke-width="1.5"/><circle cx="11" cy="10" r="2.5" fill="currentColor"/></svg>
  </a>
</section>

<!-- EXPERIENCE -->
<section id="experience" class="experience">
  <div class="section grid12">
    <div class="col-head">
      <p class="eyebrow">The Experience</p>
      <h2>Unhurried hours on the water, arranged around you.</h2>
    </div>
    <div class="col-body">
      <p>Après Sea is a private charter for up to ten guests, captained and tailored to the day you have in mind — a sunset cruise, a harbor tour, an unhurried afternoon on the water.</p>
      <p>Tell us what you're after and we'll take care of the rest. No packages to pick from, no crowds to share the deck with. Just your group, an experienced captain, and the Sound.</p>
    </div>
  </div>
</section>

<!-- THE BOAT -->
<section id="boat" class="boat">
  <div class="section">
    <div style="max-width:42rem">
      <p class="eyebrow" style="color:var(--brass)">The Boat</p>
      <h2>A 31-foot Sea Ray SLX 310.</h2>
      <p class="lede">Open, elegant, and built for a comfortable day aboard. Twin captain's seats, a shaded cockpit, and a bow lounge made for slowing down.</p>
    </div>
    <div class="gallery">
      <figure class="lead"><img src="${imgCockpit}" alt="The helm of Après Sea, with twin captain's seats and a shaded cockpit." /><figcaption>Twin captain's seats and a shaded cockpit.</figcaption></figure>
      <figure><img src="${imgBow}" alt="The bow lounge of Après Sea, with wraparound sun-pad seating and a filler table." /><figcaption>A bow lounge made for slowing down.</figcaption></figure>
      <figure><img src="${imgProfile}" alt="Starboard profile of Après Sea underway on Long Island Sound." /><figcaption>Thirty-one feet, underway on the Sound.</figcaption></figure>
    </div>
    <div class="boat-lower">
      <dl class="specs">
        ${[["Length overall","31 ft 6 in"],["Beam","10 ft 2 in"],["Guests aboard","Up to 10"],["Fuel capacity","158 gal"],["Power","Twin sterndrive, up to 700 hp"],["Model","Sea Ray SLX 310"]].map(([l,v])=>`<div class="row"><dt>${l}</dt><dd>${v}</dd></div>`).join("")}
        <p class="cite">Specifications per <a href="https://www.searay.com/us/en/boats/slx/slx-310" target="_blank" rel="noopener">Sea Ray</a>.</p>
      </dl>
      <div class="video">
        <div class="frame"><iframe src="https://www.youtube-nocookie.com/embed/rbx8CWmjKy8" title="Sea Ray SLX 310 walkthrough" loading="lazy" allowfullscreen></iframe></div>
        <p>Watch the Sea Ray SLX 310 walkthrough</p>
      </div>
    </div>
  </div>
</section>

<!-- AVAILABILITY -->
<section id="availability" class="availability">
  <div class="section">
    <div style="max-width:42rem">
      <p class="eyebrow">Availability &amp; How It Works</p>
      <h2>Every trip is custom. So is every quote.</h2>
      <p class="lede">We charter from May 1st through November 1st. Tell us the date and the details, and we'll follow up with a tailored quote.</p>
    </div>
    <div class="points">
      ${[["01","In season, May to November","Charters run from May 1st through November 1st each year, weather permitting."],["02","An experienced captain","Your captain handles the boat and the plan, so your group can simply be aboard."],["03","Custom quotes, always","Pricing is tailored to each charter — the date, the length of the day, and what you have in mind."]].map(([n,t,b])=>`<div class="pt"><span class="num">${n}</span><h3>${t}</h3><p>${b}</p></div>`).join("")}
    </div>
  </div>
</section>

<!-- LOCATION -->
<section id="location" class="location">
  <div class="section grid">
    <div>
      <p class="eyebrow">Departure</p>
      <h2>We cast off from Palmer Point Marina.</h2>
      <p class="body">Palmer Point Marina in Cos Cob, Connecticut — on the Mianus River, minutes from open water on Long Island Sound. This is where every charter begins and ends.</p>
      <address><span class="m">Palmer Point Marina</span><span class="a">Palmer Point Marina, Cos Cob, CT</span></address>
      <a href="https://www.google.com/maps/search/?api=1&query=Palmer%20Point%20Marina%2C%20Cos%20Cob%2C%20CT" target="_blank" rel="noopener" class="btn btn-ghost" style="margin-top:1.5rem">Get directions</a>
    </div>
    <div class="map"><iframe title="Map of Palmer Point Marina" loading="lazy" src="https://maps.google.com/maps?q=Palmer%20Point%20Marina%2C%20Cos%20Cob%2C%20CT&z=13&output=embed"></iframe></div>
  </div>
</section>

<!-- INQUIRY FORM (static; wire to a backend/email service on redesign) -->
<section id="inquire" class="inquire">
  <div class="section grid">
    <div class="intro">
      <p class="eyebrow" style="color:var(--brass)">Inquire</p>
      <h2>Plan your day on the water.</h2>
      <p>Tell us about your charter and we'll follow up with a custom quote.</p>
      <p class="note">In season May 1 – November 1. Up to 10 guests aboard.</p>
    </div>
    <form class="card" onsubmit="event.preventDefault(); alert('Demo export — connect this form to email (e.g. Resend) on redesign.');">
      <div class="fields">
        <div class="field"><label>Full name</label><input class="input" type="text" /></div>
        <div class="field"><label>Email</label><input class="input" type="email" /></div>
        <div class="field"><label>Phone</label><input class="input" type="tel" /></div>
        <div class="field"><label>Number of guests</label><input class="input" type="number" min="1" max="10" value="2" /></div>
        <div class="field"><label>Desired date</label><input class="input" type="date" /></div>
        <div class="field"><label>Departure time</label><input class="input" type="time" /></div>
        <div class="field full"><label>Duration</label>
          <select class="input"><option>2 hours</option><option>3 hours</option><option>4 hours</option><option>Half day</option><option>Full day</option><option>Not sure yet</option></select>
        </div>
        <div class="field full"><label>Custom requests or notes</label><textarea class="input" rows="4" placeholder="Occasion, itinerary ideas, accessibility needs…"></textarea></div>
      </div>
      <button type="submit" class="btn btn-dark">Request a Charter</button>
    </form>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="section foot">
    <div><p class="mark">Après Sea</p><p class="tag">Private charters on Long Island Sound.</p></div>
    <div class="col"><h4>Inquiries</h4><a href="mailto:info@apresseacharters.com">info@apresseacharters.com</a></div>
    <div class="col"><h4>Departure</h4><p>Palmer Point Marina</p><p>Palmer Point Marina, Cos Cob, CT</p><p>Season May 1 – November 1</p></div>
  </div>
  <div class="foot-bottom"><p>© ${new Date().getFullYear()} Après Sea Charters. All rights reserved.</p><p>Cos Cob, CT · Long Island Sound</p></div>
</footer>

</body>
</html>`;

const outPath = join(root, "apres-sea-export.html");
writeFileSync(outPath, html);
console.log("wrote", outPath, `(${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);
