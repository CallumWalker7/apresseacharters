# Editing your website

A friendly, plain-English guide to updating the Après Sea site. No coding
background needed. You'll do everything in **one file** called `content.ts`.

> **The golden rule:** only change the words *between the "quotation marks."*
> Leave the quotation marks, commas, and curly braces `{ }` exactly where they
> are. If something breaks, undo your last change and save again.

---

## Where the content lives

Open the file named **`content.ts`** in the main project folder. Everything you
see on the website — the tagline, the paragraphs, the address, the email, the
season dates — is in here, each with a plain-English comment (the greyed-out
lines starting with `//`) telling you what it does.

You can edit it in any text editor. If you use **VS Code**, just open the folder
and click `content.ts` in the sidebar.

---

## 1. Change some text

**Example: change the tagline.**

1. Open `content.ts`.
2. Find the line under `hero:` that looks like:

   ```
   tagline: "Your day on the Sound, exactly as you imagine it.",
   ```

3. Change the words **inside the quotes**:

   ```
   tagline: "The good hours, on the water.",
   ```

4. **Save the file** (`Cmd + S` on Mac, `Ctrl + S` on Windows).

That's it. The same approach works for any headline or paragraph — find the
text, change what's inside the quotes, save.

> Paragraphs (like in "The Experience") are a list. Each paragraph is its own
> `"...",` line. You can edit them, add another one, or remove one — just keep
> each line wrapped in quotes and ending with a comma.

---

## 2. Swap a photo

The three boat photos live in the folder **`public/images/`**:

| What it shows                         | File name           |
| ------------------------------------- | ------------------- |
| Side profile of the boat (the hero)   | `boat-profile.jpg`  |
| The helm / cockpit                    | `boat-cockpit.jpg`  |
| The bow lounge / sun-pad seating      | `boat-bow.jpg`      |

**The easiest way — keep the same names:**

1. Rename your new photo to exactly match, e.g. `boat-profile.jpg`.
2. Drop it into `public/images/`, replacing the old one.
3. Refresh the site. Done — no code change needed.

**If your photo has a different name** (e.g. `sunset.jpg`):

1. Put the file in `public/images/`.
2. In `content.ts`, find the matching `image:` line and change the filename in
   the quotes. For the hero, that's:

   ```
   image: "boat-profile.jpg",   →   image: "sunset.jpg",
   ```

3. Update the `imageAlt:` (or `alt:`) line nearby to briefly describe the new
   photo — this helps with accessibility and Google.
4. Save.

> **Tips:** use wide (landscape) photos, roughly 1600×1000 pixels or larger.
> JPG is perfect. Don't stretch small photos to make them bigger.

---

## 3. Update the season dates

The charter season is set in `content.ts` under `details:`. To move the window,
change the month and day numbers:

```
seasonStart: { month: 5, day: 1, label: "May 1" },       // May 1
seasonEnd:   { month: 11, day: 1, label: "November 1" },  // November 1
seasonLabel: "May 1 – November 1",
```

- `month` is a number 1–12 (1 = January, 12 = December).
- `day` is the day of that month.
- **Also update the two `label` lines and `seasonLabel`** so the words on the
  site match the new dates (these are what visitors actually read).

The booking form automatically uses these dates — it will only accept dates
inside the season and show a friendly message otherwise.

---

## 4. Change the contact email

Find this near the top of `content.ts`:

```
contact: {
  email: "info@apresseacharters.com",
```

Change the address inside the quotes and save. That's the inbox that receives
every booking inquiry, and it's shown in the footer.

> Note: this only changes **where inquiries are sent and displayed**. The actual
> mailbox itself is set up separately (see DEPLOY.md). If you're moving to a new
> mailbox, make sure it exists first.

---

## 5. Other quick changes

All in `content.ts`:

- **Max guests:** `maxGuests: 10` under `details:`.
- **Marina / address:** the `location:` section.
- **Boat spec bullets:** the `specs:` list under `boat:` — each is a
  `{ label: "...", value: "..." }` pair.
- **The Sea Ray video:** `videoId:` under `boat:` — paste the YouTube video's ID
  (the part after `watch?v=` in the URL).
- **Duration options** in the form dropdown: the `durationOptions:` list under
  `form:`.

---

## Seeing your changes

- **While editing locally:** if you ran `npm run dev`, the site updates the
  moment you save. Just look at the browser tab.
- **On the live site:** after saving, your changes go live once the site is
  re-published. If you're using Vercel connected to GitHub, that happens
  automatically a minute or two after you save your changes to the project.
  (Ask whoever set up the site to show you this once — it's one click.)

---

## If something looks broken

1. Undo your last change (`Cmd + Z` / `Ctrl + Z`) and save again.
2. Check you didn't accidentally delete a `"`, a `,` or a `}`.
3. Still stuck? The site's previous version is always safe — nothing you type
   in `content.ts` can harm the live site until it's re-published.
