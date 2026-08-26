export default function Marquee({ text }: { text?: string }) {
  const items = (text ?? 'Brand Identity • Web Design • Packaging • Motion • Print • Strategy').split('•')
  const row = items.map((item, i) => (
    <span key={i} className="mx-6 inline-flex items-center gap-6 whitespace-nowrap">
      <span className="font-display text-lg italic sm:text-xl">{item.trim()}</span>
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="text-accent">
        <path d="M7 0 L8.6 5.4 L14 7 L8.6 8.6 L7 14 L5.4 8.6 L0 7 L5.4 5.4 Z" fill="currentColor" />
      </svg>
    </span>
  ))
  return (
    <div className="overflow-hidden border-y border-border bg-foreground py-4 text-background" aria-hidden>
      <div className="flex w-max animate-marquee">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden>{row}</div>
      </div>
    </div>
  )
}
