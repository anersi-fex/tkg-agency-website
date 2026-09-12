# The Koka Group — agency website

Static website for Koka Group LLC (doing business as The Koka Group), an independent
property & casualty insurance agency in Michigan.

No build step, no framework. Plain HTML, one stylesheet, one small script. Open
`index.html` in a browser or host the folder on any static host.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home / landing page — hero, coverage, why us, how it works, about, referral partners, careers band, quick quote form |
| `quote.html` | Get a quote — detailed quote request form (coverage types pre-select from links like `quote.html?type=auto`) |
| `contact.html` | Contact us — contact details, message form, client service, referral partners |
| `careers.html` | Join our team — pitch, who we're looking for, inquiry form |
| `privacy.html` | Privacy policy, terms of use, licensing disclosures |
| `thanks.html` | Confirmation page after a form is submitted |
| `404.html` | Not-found page (GitHub Pages and most hosts pick this up automatically) |

Shared assets live in `assets/`:

- `assets/css/styles.css` — all styling (brand tokens are at the top of the file)
- `assets/js/config.js` — **the one file to edit for phone, email, hours, and form delivery**
- `assets/js/main.js` — mobile menu, form sending, query-string prefill
- `assets/img/` — logo, favicons, app icons, link-preview image

## Brand

Full guidelines for every TKG property (colors, type, logo rules, components, copy-paste tokens) are in
[`BRAND.md`](BRAND.md). Hand that file to any other project or Claude Code session.

- Colors: black `#0d0d0d` backgrounds, brick red `#972f26` accents (tokens at the top of `styles.css`).
- Logo: `assets/img/logo.png` is the official TKG mark (transparent, 1600 px wide, taken from the Canva
  export). All icons are generated from it: `favicon.ico` and `favicon-*.png` (the K alone at 16/32 px,
  full TKG at 48 px and up), `icon-192/512.png` for Android, `apple-touch-icon.png` for iOS, and
  `og-image.png` for link previews. If the logo ever changes, replace `logo.png` and regenerate the icons.
- Cache busting: the `?v=` tag on icon and logo links in every page's `<head>` forces browsers to re-fetch
  them. Bump it whenever an icon or the logo changes.

## Things to set or check

1. **Phone, email, hours, location** — all in `assets/js/config.js`. If `phone` is ever blank, phone links
   hide automatically and the site falls back to email.
2. **Forms** — forms deliver to the email in `config.js` through [FormSubmit](https://formsubmit.co).
   The address is already activated. If you change the email, submit one form and click the new activation
   link that FormSubmit sends. To switch to another service (Netlify Forms, Formspree, HubSpot, your CRM),
   change `formEndpoint` / `formFallback` in `config.js` and the `<form action>` on each page.
3. **Privacy policy effective date** — in `privacy.html`, update if you change the policy.

## Agent Portal (team hub)

`portal.html` is the team-only hub linked from the "Agent Portal" link in the top bar and footer. Team members
sign in with their `@thekokagroup.com` Google account and see tiles for Sales Coach, Command Center, the
hiring site, and the re-shop waitlist, plus an Updates list. Everything about it lives in
`assets/js/portal-config.js`:

- `googleClientId` — the OAuth client ID that turns sign-in on (see below). Blank = "sign-in is being connected".
- `apps` — the tiles. Change a `url` when an app moves to its own subdomain.
- `updates` — team announcements, newest first.

Connect Google sign-in once (about five minutes):

1. Go to https://console.cloud.google.com/apis/credentials (signed in as the Workspace admin), create a
   project if asked, then **Create credentials → OAuth client ID → Web application**.
2. Authorized JavaScript origins: `https://www.thekokagroup.com` and `https://thekokagroup.com`.
   No redirect URI is needed.
3. If prompted for the consent screen, choose **Internal** (Workspace users only) and give it the name
   "TKG Agent Portal".
4. Copy the Client ID (ends in `.apps.googleusercontent.com`) into `googleClientId` in
   `assets/js/portal-config.js` and commit.

The portal's sign-in gate runs in the browser and keeps the hub team-only; each app still enforces its own
login, which is where real access control lives.

## Hosting

Any static host works. Two easy options:

- **GitHub Pages** (current setup) — repo *Settings → Pages → Deploy from a branch*, `main` and `/ (root)`.
  Custom domain `www.thekokagroup.com` is set there; DNS lives in Cloudflare (four A records on the root
  pointing at GitHub Pages, and a `www` CNAME to `anersi-fex.github.io`, all "DNS only"). Every push to
  `main` republishes the site in about a minute.
- **Netlify / Vercel / Cloudflare Pages** — drag the folder in, or connect the repo. No build
  command; publish directory is the repo root.

## Not included on purpose

- **Carrier logos** — add a logo strip on the home page once carrier appointments are live.
- **Testimonials / reviews** — add when you have real ones (Google reviews embed works well).
- **Team photos / about section** — add when you're ready; the home page currently has no about section by choice.
- **Online payments, claims filing, or policy login** — those go to each carrier's own portal; the
  contact page explains this to clients.

## Editing

Every page is self-contained HTML. The header and footer are repeated in each page, so a change
to the navigation or footer links needs to be made in all seven files (search for the text and
replace across files).
