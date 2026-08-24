/**
 * Normalizes shared/content.json — the single source of truth consumed by
 * both the React app and the Laravel seeder.
 *
 * Portfolio work is synced live from GitHub (frontend/src/lib/github.ts),
 * so "projects" is intentionally kept as an empty list here; rich case
 * studies may be added manually under the same key later.
 *
 * Run from shi-studio/:  node scripts/build-shared-content.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const target = join(root, 'shared', 'content.json')

const content = JSON.parse(readFileSync(target, 'utf8'))
content.projects = []

writeFileSync(target, JSON.stringify(content, null, 2) + '\n')
console.log(`✔ shared/content.json normalized (${content.posts?.length ?? 0} posts, ${content.testimonials?.length ?? 0} testimonials, work = live GitHub repos)`)
