# 彼得前书 · 灵修系列 — 1 Peter: A Devotional Series

[![Built with Astro](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

A **bilingual (Simplified Chinese / English) inductive Bible study site** walking verse-by-verse through the book of **1 Peter**, organized around the through-line of *the priesthood of all believers* (1 Peter 2:9).

- **31 lessons** + a whole-letter overview and a Greek/Hebrew glossary, each fully translated in both languages
- Each lesson covers one passage: a scripture block (和合本 / ESV), a drop-cap lead, expository notes, callouts, key-idea pull-quotes, and an interactive comprehension quiz
- 12-section thematic sidebar outline: Priestly Identity → Life → Community → Witness → Family → Mission → Suffering → Leaders → Warfare → Glory
- Installable **PWA** (offline reading via a service worker)

## Tech stack

- [**Astro 7**](https://astro.build) + [**Starlight**](https://starlight.astro.build) — content-driven docs theme
- [**@vite-pwa/astro**](https://vite-pwa-org.netlify.app/) — web manifest + Workbox service worker
- [**@astrojs/sitemap**](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — sitemap generation
- [**sharp**](https://sharp.pixelplumbing.com/) — image processing (used to generate the OG card)
- No UI framework runtime — pure `.astro` components, one small vanilla-JS quiz script

## Project structure

```
.
├── astro.config.mjs          # Starlight + PWA + sitemap config, sidebar, SEO head
├── public/
│   ├── favicon.svg           # theme-aware 8-point star
│   ├── og.png                # 1200×630 social preview card
│   ├── robots.txt
│   └── pwa-{192,512}.png     # PWA icons
├── scripts/                  # one-off build helpers (masthead migration, OG generation)
├── src/
│   ├── components/
│   │   ├── Masthead.astro    # lesson header (series / title / passage / lesson no.)
│   │   ├── Scripture.astro   # scripture quotation block
│   │   ├── KeyIdea.astro     # pull-quote
│   │   └── Quiz.astro        # accessible multiple-choice widget
│   ├── content/
│   │   ├── i18n/en.json      # English UI string overrides
│   │   └── docs/             # Chinese (root locale)
│   │       ├── 0001-…mdx … 0031-…mdx
│   │       ├── 1-peter-at-a-glance.mdx
│   │       ├── glossary.mdx
│   │       ├── index.mdx     # splash landing
│   │       └── en/           # English mirror (parallel slugs)
│   ├── content.config.ts     # Starlight docs + i18n collections
│   └── styles/global.css     # custom component styles + palette (CSS variables)
└── tsconfig.json             # extends astro/tsconfigs/strict
```

### Bilingual layout

Starlight's `defaultLocale: 'root'` pattern: Chinese files live at `src/content/docs/*.mdx` (the root locale), English mirrors at `src/content/docs/en/*.mdx` with matching slugs. The sidebar is shared, with per-entry `translations: { en: '...' }`.

## Commands

| Command           | Action                                           |
| :---------------- | :----------------------------------------------- |
| `pnpm install`    | Install dependencies                             |
| `pnpm dev`        | Start local dev server at `localhost:4321`       |
| `pnpm build`      | Build the production site to `./dist/`           |
| `pnpm preview`    | Preview the production build locally             |
| `pnpm check`      | Run `astro check` (Diagnostics / type-checking)  |

### Dev server

Per `AGENTS.md`, the dev server runs in background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Deploy

The site is configured for **Cloudflare Pages** (`site: 'https://1peter.pages.dev'`). Build with `pnpm build` and deploy the `./dist/` output (or connect the repo to Cloudflare Pages for Git-based deploys).

## Learn more

- [Starlight docs](https://starlight.astro.build/)
- [Astro docs](https://docs.astro.build)
