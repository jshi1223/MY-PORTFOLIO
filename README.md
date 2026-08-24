# SHI STUDIO® — Portfolio of Vanessa Shi

> "I design brands that people remember."

Full-stack portfolio for an independent brand & web designer based in
San Bartolome, Sto. Tomas, Batangas — built with **React + TypeScript + Tailwind CSS**
on the front end and **Laravel** as the API backend.

```
shi-studio/
├── frontend/    React 19 + TypeScript + Tailwind (Vite)
├── backend/     Laravel 11 API (projects, testimonials, posts, inquiries)
├── shared/
│   └── content.json   ← single source of truth for ALL site content
└── scripts/
    └── build-shared-content.mjs
```

## Pages

| Route                | Page                                                        |
| -------------------- | ----------------------------------------------------------- |
| `/`                  | Homepage — headline, showreel carousel, intro, selected work, testimonial, CTA |
| `/work`              | Work grid with filters (All / Branding / Web Design / Print / Motion) |
| `/work/:slug`        | Case study template — hero, overview, challenge, process w/ sketches, solution w/ before-after + gallery, results metrics, next project |
| `/about`             | Portrait, story bio, services, 5-step process, client logos, press, personal interests |
| `/services`          | 5 services with inclusions, From-$ pricing, timelines, Inquire buttons |
| `/testimonials`      | Carousel + grid, each quote linked to its case study        |
| `/journal`           | Blog index + full post pages                                |
| `/contact`           | Inquiry form (budget/timeline/type), Calendly embed, FAQ accordion |

## Quick start

### Frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

The site works standalone (bundled content). When the Laravel API is running,
it is used automatically; otherwise the app falls back silently.

### Backend (requires PHP ≥ 8.2 + Composer)

```bash
cd backend
composer install
copy .env.example .env
php artisan key:generate
New-Item database\database.sqlite
php artisan migrate:fresh --seed
php artisan serve   # http://localhost:8000
```

The Vite dev server proxies `/api → localhost:8000`, so no CORS setup is needed locally.
For production frontends on another domain, set `CORS_ALLOWED_ORIGINS` in `backend/.env`.

## Editing content

1. Edit `frontend/src/data/projects.ts` and/or `frontend/src/data/content.json`
2. Regenerate the shared file: `node scripts/build-shared-content.mjs`
3. If using the API: `php artisan migrate:fresh --seed` inside `backend/`

## Personalization checklist

- [ ] Replace `frontend/src/assets/hero.png` with your real portrait (used on About; a generated poster shows if it's missing/broken)
- [ ] Point `profile.calendly` in `shared/content.json` at your actual Calendly link
- [ ] Update Instagram / Behance URLs in `profile`
- [ ] Swap the fictional projects/testimonials with your own work when ready
- [ ] All imagery is generative SVG (`src/components/Artwork.tsx`) — drop real photos into the gallery data whenever you have them

## Deploying

### Frontend on Vercel (recommended)

The SPA rewrite rules are already configured in `frontend/vercel.json`.

1. Push this repo to GitHub (see below)
2. Go to [vercel.com](https://vercel.com) → **Add New… → Project** → import `jshi1223/portfolio`
3. In **Root Directory**, select `frontend` — Vercel auto-detects Vite
   (build: `npm run build`, output: `dist`)
4. Click **Deploy** — done!

Notes:
- The site works fully standalone on Vercel (bundled content). Contact form
  inquiries open the visitor's email app addressed to you until the Laravel API
  is hosted somewhere public.
- Once your API has a public URL (e.g. a PHP host), add env var
  `VITE_API_URL=https://your-api.com` in Vercel → Project Settings → Environment
  Variables and redeploy — the site will then read live data automatically.
- Add your custom domain under Project Settings → Domains.

### Backend

Any PHP host (Laravel Forge, Pimpa, Hostinger). Set env vars from
`backend/.env.example`; see `backend/README.md`.

### GitHub push setup

```bash
cd shi-studio
git init
git add .
git commit -m "SHI STUDIO portfolio — React+TS+Tailwind frontend, Laravel API"
git remote add origin https://github.com/jshi1223/portfolio.git
git branch -M main
git push -u origin main
```

---

Contact: vaness098a@gmail.com · +63 936 503 6583 · San Bartolome, Sto. Tomas, Batangas
