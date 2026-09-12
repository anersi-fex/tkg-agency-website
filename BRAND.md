# The Koka Group — Brand Guidelines

Use this document to make any TKG property (website, Sales Coach, Command Center, hiring site,
re-shop waitlist) look and feel like one company. The public website at https://www.thekokagroup.com
is the reference implementation. When in doubt, match it.

Source of truth for files: this repo (`anersi-fex/tkg-agency-website`, public). Every asset below
can be fetched by URL from any project.

---

## 1. Identity

| Item | Value |
| --- | --- |
| Legal name | Koka Group LLC |
| Brand name in prose | The Koka Group |
| Short mark / abbreviation | TKG |
| Tagline | Insurance, shopped for you. |
| Descriptor | Independent insurance agency · Troy, Michigan |
| Public email | anersi@thekokagroup.com |
| Phone | 248-765-7675 |
| Website | https://www.thekokagroup.com |
| Team hub | https://www.thekokagroup.com/portal.html (Google Workspace sign-in, @thekokagroup.com only) |

Naming rules: write "The Koka Group" in sentences, "TKG" where the logo would go or space is tight
(button labels, page titles like `Sales Coach · TKG`), and "Koka Group LLC" only in legal text.
Product names are two words, capitalized: **Sales Coach**, **Command Center**, **Agent Portal**,
**Hiring Site**, **Re-shop Waitlist**.

## 2. Logo

The logo is the red "TKG" lettermark. It is a raster image (transparent PNG) from the official Canva
file. Do not redraw, retype, or approximate it with a font.

| File | Use |
| --- | --- |
| `assets/img/logo.png` (1600×794, red on transparent) | Default. Headers on black, footers, documents on white. |
| `assets/img/logo-white.png` (white on transparent) | Only on solid red backgrounds. |
| `assets/img/k-mark.png` (the K alone, red on transparent) | Tiny sizes only: favicons at 16–32 px, avatars, app icons under 48 px. |
| `assets/img/icon-512.png`, `icon-192.png` | App icons (full TKG on a black rounded tile). |
| `assets/img/apple-touch-icon.png` | iOS home-screen icon. |
| `favicon.ico` (root), `assets/img/favicon-32.png`, `favicon-48.png` | Browser tab icons. |
| `assets/img/og-image.png` (1200×630) | Link previews for texts, iMessage, social. |

Raw URLs follow the pattern
`https://raw.githubusercontent.com/anersi-fex/tkg-agency-website/main/assets/img/<file>`.

Rules:
- Minimum height on screen: 24 px. In app headers use 28–32 px tall.
- Clear space: at least the height of the "T" bar on all sides.
- Keep the aspect ratio. Never stretch, rotate, add shadows, outlines, or gradients.
- Only three colorways exist: red on black (primary), red on white, white on red. Nothing else.
- In a header, pair it like the website does: logo, a 1 px vertical divider at 25% white, then
  "THE KOKA GROUP" in white, bold, uppercase, 0.9 rem, letter-spaced 0.02 em.

## 3. Color

Two colors carry the brand: near-black and brick red. Everything else is neutral gray or white.

| Token | Hex | Use |
| --- | --- | --- |
| `--ink` | `#0d0d0d` | Headers, heroes, footers, dark panels. The logo's native background. |
| `--red` | `#972f26` | Primary buttons, section numbers, icon tiles, accents. Sampled from the logo. |
| `--red-hover` | `#7f271f` | Hover/active state of red buttons. |
| `--red-soft` | `#e0554b` | Red **text and icons on black**. Plain `--red` fails contrast on black at small sizes. |
| `--red-tint` | `#f3dcd9` | Error/denied backgrounds. |
| `--red-tint-2` | `#faf0ee` | Success panels, selected states, soft highlights on white. |
| `--charcoal` | `#3d3b3b` | Body text on white. |
| `--g600` | `#605d5d` | Labels, captions, muted text on white. |
| `--g500` | `#7c7979` | Placeholder text. |
| `--g400` | `#a5a5a5` | Disabled text. |
| `--g300` | `#d6d4d3` | Card borders, input borders, dividers. |
| `--g200` | `#e9e8e8` | Stat tiles, contact tiles. |
| `--g100` | `#f2f2f2` | Alternating section backgrounds. |
| `--white` | `#ffffff` | Page background, cards. |

Rules:
- Black chrome, white content. Headers/nav, page heroes, and footers are black; working areas
  (tables, forms, lists) are white or `--g100`. Don't build all-dark screens for long reading.
- Red is an accent, not a fill. One primary red button per view. Never large red backgrounds behind text.
- On black, small red text must be `--red-soft`; white text at 70–85% opacity for secondary copy.
- Status green (`#1d7a3a` on `#e6f4ea`) is allowed for "Live/Active" pills. No other hues.
- Contrast: `--red` on white is 6.1:1, white on `--red` is 6.1:1, `--red-soft` on black is 5.5:1.

## 4. Typography

Font: **Inter** (Google Fonts), weights 400, 500, 600, 700, 800, 900, plus 700 italic.
Fallback: `"Helvetica Neue", Helvetica, Arial, sans-serif`.

| Role | Spec |
| --- | --- |
| H1 (hero) | 2.5–4.4 rem, weight 900, letter-spacing −0.035 em, line-height 1.02. Italic emphasis on 2–3 words is a brand move: *shopped, not sold.* |
| H2 (section) | 1.75–2.5 rem, weight 800, letter-spacing −0.02 em |
| H3 (card) | 1.125 rem, weight 700 |
| Body | 1 rem / 1.6, `--charcoal` on white |
| Lead paragraph | 1.15–1.2 rem, `--charcoal` (or white at 80% on black) |
| Eyebrow label | 0.72 rem, weight 700, uppercase, letter-spacing 0.16 em, `--red` (`--red-soft` on black), with a 28 px × 2 px rule before it |
| Meta / caps label | 0.7 rem, weight 700, uppercase, letter-spacing 0.14 em, `--g600` |
| Form label | 0.7 rem, weight 700, uppercase, letter-spacing 0.12 em, `--g600` |

Numbered sections are a signature: a red "01 / 02 / 03" (0.8 rem, weight 800) before the H2, and a
2 px black rule under the heading row. Right-align a caps meta label on that row when useful.

## 5. Layout and surfaces

- Container 1160 px, 24 px side gutters (16 px on phones). Sections 88 px tall padding (60 px on phones).
- Dark heroes get the "grid + glow" treatment: 44 px grid lines at 5% white, fading out toward the
  bottom, plus a soft radial red glow (`rgba(151,47,38,.55)` → transparent) on the right.
- Corner radius: 4 px on buttons and inputs, 8 px on cards, 10 px on icon tiles, 999 px on pills.
- Cards: white, 1 px `--g300` border, 8 px radius, 24 px padding. Hover: border `--ink`, lift 2 px,
  soft shadow `0 18px 40px -22px rgba(13,13,13,.35)`.
- Icon tiles: 52 px square, black, 10 px radius, icon in `--red-soft` (1.8 px stroke, round caps).
- Dark bars (user bar, callouts): `--ink` background, 8 px radius, white text.

## 6. Components

**Buttons** (14 px × 22 px padding, weight 700, 0.95 rem, 4 px radius, 2 px border)
- Primary: red fill, white text. Hover `--red-hover`.
- Secondary on white: transparent, 2 px `--ink` border, `--ink` text. Hover inverts.
- Secondary on black: transparent, 2 px white border at 85%, white text. Hover fills white.
- Text link: `--red` (deep) with a trailing arrow " →", underline on hover.
- Focus: 3 px outline in `--ink` (white on dark), 2 px offset. Never remove focus styles.

**Header**: black, sticky. Left: logo + divider + wordmark. Center: links (weight 600, 0.92 rem,
underline-on-hover in white). Right: phone with a red phone icon, an outlined secondary button,
a red primary button. Above it, an optional 34 px utility bar (uppercase 0.72 rem at 60% white)
with "Agent Portal" and a lock icon on the right.

**Forms**: labels as caps above inputs; inputs 12 px × 14 px padding, 1 px `--g300` border, 4 px
radius; focus border `--ink` plus a 3 px red ring at 18% opacity. Choice chips (radios/checkboxes)
are bordered boxes that turn `--red-tint-2` with a red border when selected. Required marker is a
red asterisk. Helper text 0.78 rem `--g600`.

**Status pill**: 0.62 rem, weight 700, uppercase, letter-spacing 0.12 em, 3 px × 8 px, 999 px radius.

**Sign-in screens**: black page header with eyebrow + H1, then a centered white card (max 480 px)
with a red-tinted circular lock icon, one primary action, and a small footer note.

## 7. Voice

Plain English, confident, no hype. Short sentences. Say what we do and what happens next.
Never promise "lowest" or "guaranteed"; say "we shop multiple carriers" and "no obligation".
Address the reader as "you". Numbered steps for anything procedural. Avoid exclamation points.

## 8. Copy-paste tokens

### CSS variables (any project)

```css
:root {
  --ink: #0d0d0d;
  --red: #972f26;
  --red-hover: #7f271f;
  --red-soft: #e0554b;
  --red-tint: #f3dcd9;
  --red-tint-2: #faf0ee;
  --charcoal: #3d3b3b;
  --g600: #605d5d; --g500: #7c7979; --g400: #a5a5a5;
  --g300: #d6d4d3; --g200: #e9e8e8; --g100: #f2f2f2;
  --white: #ffffff;
  --font: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --radius: 4px;
  --shadow: 0 18px 40px -22px rgba(13, 13, 13, 0.35);
}
```

### Tailwind v4 (`@import "tailwindcss";` projects: Sales Coach, Hiring Site, Re-shop Waitlist)

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --color-ink: #0d0d0d;
  --color-brand: #972f26;
  --color-brand-hover: #7f271f;
  --color-brand-soft: #e0554b;
  --color-brand-tint: #f3dcd9;
  --color-brand-tint-2: #faf0ee;
  --color-charcoal: #3d3b3b;
  --color-g600: #605d5d;
  --color-g500: #7c7979;
  --color-g400: #a5a5a5;
  --color-g300: #d6d4d3;
  --color-g200: #e9e8e8;
  --color-g100: #f2f2f2;
  --radius-brand: 4px;
  --shadow-brand: 0 18px 40px -22px rgb(13 13 13 / 0.35);
}
```

Then use `bg-ink`, `bg-brand hover:bg-brand-hover`, `text-brand-soft`, `border-g300`, `rounded-brand`, etc.

Load Inter in `app/layout.tsx` with `next/font/google`:

```ts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], weight: ["400","500","600","700","800","900"], variable: "--font-inter" });
// <html className={inter.variable}> and set --font-sans: var(--font-inter) in @theme
```

### Plain CSS (Command Center)

Paste the `:root` block above into `app/globals.css`, set `body { font-family: var(--font); color: var(--ink); }`,
and load Inter the same way via `next/font/google`.

### Shared header for the apps

```html
<header style="background:#0d0d0d;color:#fff;border-bottom:1px solid rgba(255,255,255,.12)">
  <a href="https://www.thekokagroup.com/portal.html" style="display:inline-flex;align-items:center;gap:14px;text-decoration:none;color:#fff">
    <img src="https://raw.githubusercontent.com/anersi-fex/tkg-agency-website/main/assets/img/logo.png" alt="TKG" style="height:30px;padding-right:14px;border-right:1px solid rgba(255,255,255,.25)">
    <span style="font:700 .9rem/1 Inter,sans-serif;letter-spacing:.02em;text-transform:uppercase">The Koka Group</span>
    <span style="font:600 .8rem/1 Inter,sans-serif;color:rgba(255,255,255,.6)">· Sales Coach</span>
  </a>
</header>
```

Replace "Sales Coach" with the app name. Every app's logo links back to the Agent Portal.

## 9. Checklist for any TKG app

- [ ] Inter loaded; no system-font fallbacks showing.
- [ ] Black header with the real logo PNG, wordmark, and app name; logo links to the Agent Portal.
- [ ] Favicon and app icons copied from this repo (don't generate new ones).
- [ ] Page `<title>` ends with `· TKG`; `theme-color` is `#0d0d0d`.
- [ ] One red primary button per screen; secondary actions outlined.
- [ ] Red text on black uses `--red-soft`; body text on white uses `--charcoal`.
- [ ] Sign-in screen follows the pattern in §6.
- [ ] Works at 390 px wide with no horizontal scroll.
- [ ] Copy follows §7.

## 10. Kickoff prompt for another Claude Code session

> Add the repo `anersi-fex/tkg-agency-website` (read access) and read `BRAND.md` from it. Then bring this
> app in line with those guidelines: Inter font, the color tokens, the black header with the real TKG
> logo (`assets/img/logo.png` from that repo) linking to https://www.thekokagroup.com/portal.html,
> matching buttons/forms/cards, and the favicon/app icons copied from that repo. Keep all existing
> functionality. Show me before/after screenshots at desktop and phone widths before pushing.
