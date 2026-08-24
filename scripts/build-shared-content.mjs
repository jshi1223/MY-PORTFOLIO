/**
 * Merges the frontend's content sources into one shared/content.json that
 * both the React app and the Laravel seeder consume as a single source of truth.
 *
 * Run from shi-studio/:  node scripts/build-shared-content.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))

const { projects } = await import(pathToFileURL(join(root, 'frontend/src/data/projects.ts')).href)
const rest = JSON.parse(readFileSync(join(root, 'frontend/src/data/content.json'), 'utf8'))

mkdirSync(join(root, 'shared'), { recursive: true })
writeFileSync(
  join(root, 'shared/content.json'),
  JSON.stringify({ ...rest, projects }, null, 2) + '\n',
)

console.log(`✔ shared/content.json written (${projects.length} projects, ${rest.posts.length} posts)`)
