import raw from '../../../shared/content.json'
import type { Content } from '../types'

/**
 * Single source of truth: shi-studio/shared/content.json.
 * Regenerate it with `node scripts/build-shared-content.mjs` after editing
 * frontend/src/data/{content,projects}.* sources.
 */
export const content = raw as unknown as Content
export const profile = content.profile
