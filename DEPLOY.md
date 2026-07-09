# Deploying Après Sea Charters

How to put the site online, connect the `apresseacharters.com` domain, and make
the inquiry emails work. This is a one-time setup (with automatic re-deploys
afterward).

---

## Overview

| Piece                    | Handled by                          |
| ------------------------ | ----------------------------------- |
| The website (hosting)    | **Vercel** (free)                   |
| The domain name          | **GoDaddy** (already registered)    |
| Inquiry emails (sending) | **Resend**                          |
| Your mailboxes (`info@`…)| **GoDaddy / Google Workspace** email hosting |

The website and the email hosting are **separate systems** that share the same
domain. They're connected with different DNS records and won't interfere with
each other — see the DNS note at the bottom.

---

## 1. Deploy to Vercel

1. Push this project to a GitHub repository (or import the folder directly).
2. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub.
3. Click **Add New → Project**, choose the repo, and accept the defaults —
   Vercel detects Next.js automatically.
4. Before the first deploy, add your environment variables (next section).
5. Click **Deploy**. In a minute or two you'll get a live `*.vercel.app` URL.

From now on, every time you save a change to the GitHub repo, Vercel
re-publishes the site automatically.

---

## 2. Environment variables (email keys)

In your Vercel project: **Settings → Environment Variables**. Add:

| Name             | Value                                                        |
| ---------------- | ------------------------------------------------------------ |
| `RESEND_API_KEY` | Your Resend API key (see step 3).                            |
| `INQUIRY_FROM`   | `Après Sea <hello@apresseacharters.com>` (a verified sender).|
| `INQUIRY_TO`     | *(optional)* overrides where inquiries go. Defaults to `info@apresseacharters.com`. |

Set them for the **Production** (and Preview) environments, then redeploy so
they take effect. **Never** paste these keys into the code or commit them.

---

## 3. Set up Resend (so emails send and don't land in spam)

1. Create a free account at **[resend.com](https://resend.com)**.
2. **Add & verify your domain** (`apresseacharters.com`):
   - In Resend: **Domains → Add Domain**.
   - Resend gives you a few DNS records (SPF, DKIM, and usually a return-path).
   - Add those records at **GoDaddy** (see the DNS note below). Verification can
     take a few minutes to an hour.
   - Verifying the domain is what keeps confirmation emails **out of spam**.
3. **Create an API key:** Resend → **API Keys → Create**. Copy it into Vercel as
   `RESEND_API_KEY`.
4. Make sure `INQUIRY_FROM` uses an address **on the verified domain**
   (e.g. `hello@apresseacharters.com`). It does *not* need to be a real mailbox
   — it's just the "from" line — but the domain must be verified.

> The inquiry form sends **two** emails per submission: a formatted notification
> to `info@apresseacharters.com` and a warm confirmation to the guest.

---

## 4. Connect the domain (GoDaddy → Vercel)

The domain is registered at **GoDaddy**, and the owner logs into GoDaddy
themselves to manage DNS. **No GoDaddy account details (customer number, PIN,
passwords) belong in this project or anywhere in writing — those stay private
with the owner.**

To point the website at Vercel:

1. In Vercel: **Settings → Domains → Add**, and enter `apresseacharters.com`
   (and `www.apresseacharters.com`).
2. Vercel shows the exact DNS records to create. Typically:
   - An **A record** for the root `@` pointing to Vercel's IP, **or**
   - A **CNAME** for `www` pointing to `cname.vercel-dns.com`.
3. The owner logs into GoDaddy → **My Products → Domain → DNS** and adds those
   records.
4. Back in Vercel, the domain flips to "Valid" once DNS propagates (minutes to a
   couple of hours).

---

## 5. Important: web records and email records coexist

At GoDaddy you'll have DNS records for **two different purposes** on the same
domain. Don't delete one thinking it belongs to the other:

- **Website (Vercel):** the **A** / **CNAME** records from step 4. These decide
  where `apresseacharters.com` *loads the site* from.
- **Email — your five mailboxes** (`info@`, `benoit@`, `alex@`, `charlie@`,
  `captain@`): these run on **MX records** (plus SPF/DKIM), configured in
  **GoDaddy or Google Workspace**. They are **not** part of this website — the
  site only *sends to* `info@`.
- **Resend sending:** the SPF/DKIM records from step 3. These let Resend send
  *as* your domain; they sit alongside the mailbox records without conflict.

Rule of thumb: **A/CNAME = the website. MX = receiving your email. SPF/DKIM =
sending email.** All three can (and should) live together.

---

## 6. Final checklist

- [ ] Site deployed on Vercel and loading at the `*.vercel.app` URL.
- [ ] `RESEND_API_KEY` and `INQUIRY_FROM` set in Vercel, then redeployed.
- [ ] Resend domain verified (SPF/DKIM added at GoDaddy).
- [ ] `apresseacharters.com` A/CNAME records added at GoDaddy → domain "Valid".
- [ ] Mailbox MX records still present (email still arrives at `info@`).
- [ ] Submitted a test inquiry — business notification **and** guest
      confirmation both received, not in spam.
