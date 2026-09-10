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
- `assets/img/` — logo mark and favicon (SVG)

## Things to set before launch

1. **Phone number** — open `assets/js/config.js` and set `phone` (for example `"(586) 555-0100"`).
   Until it is set, every phone link on the site stays hidden and the site falls back to email,
   so nothing looks broken in the meantime.
2. **Forms** — forms deliver to the email in `config.js` through [FormSubmit](https://formsubmit.co),
   which needs no account. The **first submission** sends a one-time activation email to that
   address; click the link in it and all three forms start delivering. FormSubmit then offers a
   random alias string you can paste into `config.js` in place of the raw email address so it isn't
   visible in the page source.
   - To use a different service (Netlify Forms, Formspree, HubSpot, your CRM), change
     `formEndpoint` / `formFallback` in `config.js` or point the `<form action>` at the new URL.
3. **Hours and location** — also in `config.js`.
4. **Founder blurb** — the "Our name" section on the home page names the founder. Edit the text in
   `index.html` if you'd like different wording.
5. **Privacy policy effective date** — in `privacy.html`, update if you change the policy.

## Hosting

Any static host works. Two easy options:

- **GitHub Pages** — repo *Settings → Pages → Deploy from a branch*, pick `main` and `/ (root)`.
  The `.nojekyll` file is already included.
- **Netlify / Vercel / Cloudflare Pages** — drag the folder in, or connect the repo. No build
  command; publish directory is the repo root.

Point your domain at the host, and add the final URL to `robots.txt` / a sitemap if you want one.

## Not included on purpose

- **Carrier logos** — add a logo strip on the home page once carrier appointments are live.
- **Testimonials / reviews** — add when you have real ones (Google reviews embed works well).
- **Team photos** — the design leaves room for a photo in the "Our name" section.
- **Online payments, claims filing, or policy login** — those go to each carrier's own portal; the
  contact page explains this to clients.

## Editing

Every page is self-contained HTML. The header and footer are repeated in each page, so a change
to the navigation or footer links needs to be made in all seven files (search for the text and
replace across files).
