import { useState } from 'react'
import heroPhoto from '../assets/hero.png'
import Artwork from './Artwork'
import { content } from '../data/content'

/**
 * Vanessa's real profile photo (frontend/src/assets/hero.png).
 * Falls back to generated poster art automatically if the file is missing/broken.
 */
export default function Portrait({
  className = '',
  rounded = false,
}: {
  className?: string
  rounded?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const shape = rounded ? 'rounded-full' : ''

  if (failed) {
    return (
      <Artwork
        seed="john-vaness-portrait"
        label={content.profile.name}
        className={`${shape} ${className}`}
      />
    )
  }

  return (
    <img
      src={heroPhoto}
      alt={`Portrait of ${content.profile.name}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${shape} object-cover ${className}`}
    />
  )
}
