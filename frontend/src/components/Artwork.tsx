import { useMemo } from 'react'

function hashSeed(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

const PALETTES = [
  { bg: '#F6F1E7', a: '#17130E', b: '#E8480C', c: '#D9CBAD' },
  { bg: '#E8480C', a: '#F6F1E7', b: '#17130E', c: '#F1B49A' },
  { bg: '#2F4A3C', a: '#F6F1E7', b: '#E8480C', c: '#9DB4A6' },
  { bg: '#17130E', a: '#F6F1E7', b: '#E8480C', c: '#6B6255' },
  { bg: '#EFE7D8', a: '#17130E', b: '#2F4A3C', c: '#E8480C' },
]

type Pattern = 'arcs' | 'rings' | 'grid' | 'waves' | 'blobs' | 'glyph'

interface Props {
  seed: string
  label?: string
  className?: string
}

/**
 * Deterministic generative artwork used as project imagery across the site.
 * Same seed always renders the same poster — no external images required.
 */
export default function Artwork({ seed, label, className }: Props) {
  const art = useMemo(() => {
    const h = hashSeed(seed)
    const patterns: Pattern[] = ['arcs', 'rings', 'grid', 'waves', 'blobs', 'glyph']
    const pattern = patterns[h % patterns.length]
    const palette = PALETTES[(h >> 3) % PALETTES.length]
    const rot = ((h >> 5) % 24) - 12
    return { pattern, palette, rot }
  }, [seed])

  const { pattern, palette } = art
  const uid = useMemo(() => `g${hashSeed(seed).toString(36)}`, [seed])
  const fig = label ?? seed.replace(/-/g, ' ').toUpperCase()

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Artwork for ${fig}`}
      className={className}
    >
      <defs>
        <filter id={`${uid}-n`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <clipPath id={`${uid}-c`}>
          <rect width="400" height="500" />
        </clipPath>
      </defs>

      <rect width="400" height="500" fill={palette.bg} />
      <g clipPath={`url(#${uid}-c)`}>
        {pattern === 'arcs' && (
          <g transform="translate(200 430)">
            {[420, 340, 260, 180, 100].map((r, i) => (
              <circle key={r} r={r} fill="none" stroke={i % 2 ? palette.b : palette.a} strokeWidth={i % 3 === 0 ? 26 : 10} />
            ))}
            <circle cx="0" cy="-40" r="34" fill={palette.b} />
            <rect x="-200" y="-330" width="400" height="14" fill={palette.a} transform="rotate(-8)" />
          </g>
        )}

        {pattern === 'rings' && (
          <g>
            <circle cx="150" cy="190" r="130" fill="none" stroke={palette.a} strokeWidth="18" />
            <circle cx="255" cy="290" r="130" fill="none" stroke={palette.b} strokeWidth="18" />
            <line x1="20" y1="480" x2="380" y2="60" stroke={palette.a} strokeWidth="4" />
            <circle cx="255" cy="290" r="30" fill={palette.b} />
            <circle cx="150" cy="190" r="12" fill={palette.c} />
            <path d="M40 470 q160 -60 320 -20" fill="none" stroke={palette.c} strokeWidth="10" />
          </g>
        )}

        {pattern === 'grid' && (
          <g>
            {Array.from({ length: 11 }).map((_, row) =>
              Array.from({ length: 9 }).map((_, col) => (
                <circle key={`${row}-${col}`} cx={40 + col * 40} cy={40 + row * 42} r={3.2} fill={palette.a} opacity="0.75" />
              )),
            )}
            <g transform="rotate(-14 200 250)">
              <rect x="90" y="170" width="220" height="120" fill={palette.b} />
              <circle cx="300" cy="230" r="60" fill="none" stroke={palette.a} strokeWidth="14" />
            </g>
          </g>
        )}

        {pattern === 'waves' && (
          <g>
            {Array.from({ length: 9 }).map((_, i) => (
              <path
                key={i}
                d={`M-20 ${70 + i * 46} q 110 ${i % 2 ? -38 : 38} 220 0 t 220 0`}
                fill="none"
                stroke={i % 3 === 0 ? palette.b : palette.a}
                strokeWidth={i % 3 === 0 ? 16 : 7}
                strokeLinecap="round"
              />
            ))}
            <circle cx="315" cy="95" r="44" fill={palette.c} />
          </g>
        )}

        {pattern === 'blobs' && (
          <g style={{ mixBlendMode: 'multiply' }}>
            <ellipse cx="150" cy="170" rx="130" ry="105" fill={palette.b} opacity="0.92" />
            <ellipse cx="260" cy="260" rx="120" ry="140" fill={palette.c} opacity="0.85" />
            <ellipse cx="130" cy="330" rx="115" ry="95" fill={palette.a} opacity="0.88" />
            <circle cx="285" cy="110" r="36" fill="none" stroke={palette.a} strokeWidth="10" />
            <line x1="60" y1="452" x2="340" y2="452" stroke={palette.a} strokeWidth="8" />
          </g>
        )}

        {pattern === 'glyph' && (() => {
          const ch = (label || seed).trim().charAt(0).toUpperCase()
          return (
            <g transform={`rotate(${art.rot} 200 240)`}>
              <text
                x="200"
                y="352"
                textAnchor="middle"
                fontFamily="Fraunces, Georgia, serif"
                fontWeight="700"
                fontSize="430"
                fill={palette.b}
              >
                {ch}
              </text>
              <text
                x="200"
                y="352"
                textAnchor="middle"
                fontFamily="Fraunces, Georgia, serif"
                fontStyle="italic"
                fontSize="430"
                fill="none"
                stroke={palette.a}
                strokeWidth="4"
              >
                {ch}
              </text>
              <rect x="60" y="420" width="280" height="10" fill={palette.a} />
            </g>
          )
        })()}
      </g>

      {/* figure caption */}
      <g>
        <rect x="16" y="16" width="10" height="10" fill={palette.b} />
        <text x="34" y="25" fontFamily="'Space Grotesk', monospace" fontSize="11" letterSpacing="2" fill={palette.a} opacity="0.85">
          SHI STUDIO® — {fig.slice(0, 26)}
        </text>
      </g>

      <rect width="400" height="500" filter={`url(#${uid}-n)`} opacity="0.05" />
    </svg>
  )
}
