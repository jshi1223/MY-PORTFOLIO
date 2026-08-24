export default function Avatar({ initials, size = 'md' }: { initials: string; size?: 'md' | 'lg' }) {
  return (
    <div
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full border border-ink/20 bg-cream font-display font-semibold text-ink ${
        size === 'lg' ? 'h-16 w-16 text-xl' : 'h-12 w-12 text-base'
      }`}
    >
      {initials}
    </div>
  )
}
