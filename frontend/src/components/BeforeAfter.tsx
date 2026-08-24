import { useCallback, useRef, useState } from 'react'
import Artwork from './Artwork'

export default function BeforeAfter({
  seedBefore,
  seedAfter,
  beforeLabel,
  afterLabel,
}: {
  seedBefore: string
  seedAfter: string
  beforeLabel: string
  afterLabel: string
}) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const setFromClientX = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(96, Math.max(4, pct)))
  }, [])

  return (
    <figure className="select-none overflow-hidden rounded-2xl border border-ink/15">
      <div
        ref={ref}
        className="relative aspect-[16/10] cursor-ew-resize touch-none"
        onPointerDown={(e) => {
          dragging.current = true
          ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
          setFromClientX(e.clientX)
        }}
        onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {/* After (base layer) */}
        <Artwork seed={seedAfter} label={afterLabel} className="absolute inset-0 h-full w-full" />
        {/* Before (clipped layer) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Artwork seed={seedBefore} label={beforeLabel} className="h-full w-full grayscale" />
        </div>

        {/* Divider */}
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -ml-px w-0.5 bg-paper shadow-[0_0_0_1px_rgba(23,19,14,0.35)]" />
          <div className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/20 bg-paper text-ink shadow-lg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M6 3 L3 8 L6 13 M10 3 L13 8 L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <figcaption className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs uppercase tracking-widest text-paper">
          {beforeLabel}
        </figcaption>
        <figcaption className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-accent px-3 py-1 text-xs uppercase tracking-widest text-paper">
          {afterLabel}
        </figcaption>
      </div>
      <div className="border-t border-ink/15 bg-cream px-4 py-3">
        <input
          type="range"
          min={4}
          max={96}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
          className="w-full accent-accent"
        />
        <p className="mt-1 text-center text-xs uppercase tracking-widest text-smoke">Drag to compare</p>
      </div>
    </figure>
  )
}
