# SHI STUDIO — Laravel API

Serves portfolio content (projects, testimonials, journal posts) seeded from
`shared/content.json`, plus a validated public endpoint for contact-form inquiries.

## Requirements

- PHP >= 8.2 with the `pdo_sqlite` extension (bundled by default)
- Composer

## Setup

```bash
cd backend

# 1. Install dependencies
composer install

# 2. Create your environment file + app key
copy .env.example .env          # Windows  (macOS/Linux: cp .env.example .env)
php artisan key:generate

# 3. Create the SQLite database file, then migrate + seed
New-Item database\database.sqlite        # macOS/Linux: touch database/database.sqlite
php artisan migrate:fresh --seed

# 4. Run it
php artisan serve               # http://localhost:8000
```

## Endpoints

| Method | Path                  | Description                          |
| ------ | --------------------- | ------------------------------------ |
| GET    | `/`                   | Service info                         |
| GET    | `/api/projects`       | All projects (full case studies)     |
| GET    | `/api/projects/{slug}`| One project                          |
| GET    | `/api/testimonials`   | All testimonials                     |
| GET    | `/api/posts`          | Journal posts                        |
| GET    | `/api/posts/{slug}`   | One post                             |
| POST   | `/api/inquiries`      | Contact form (throttled, validated)  |

### POST /api/inquiries payload

```json
{
  "name": "Juan dela Cruz",
  "email": "juan@example.com",
  "company": "Acme",
  "budget": "$2,500 – $5,000",
  "timeline": "Within a month",
  "project_type": "Brand Identity",
  "description": "We need a rebrand before our Series A…"
}
```

Validation errors return the standard Laravel `422 { errors: {...} }` shape,
which the React form already understands.

## Content workflow

- Edit content in `frontend/src/data/content.json` / `frontend/src/data/projects.ts`
- Regenerate the shared source of truth: `node ../scripts/build-shared-content.mjs`
- Re-seed: `php artisan migrate:fresh --seed`

Deployments that split frontend/backend should set `CONTENT_JSON_PATH` in `.env`
to an absolute path of `shared/content.json`.

## Email notifications

Set `INQUIRY_NOTIFY_EMAIL` in `.env`. With `MAIL_MAILER=log` (default), emails
are written to `storage/logs/laravel.log` — perfect for local testing.
