/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FAFAF8',
        foreground: '#1A1A1A',
        muted: '#F5F3F0',
        'muted-foreground': '#6B6B6B',
        accent: '#B8860B',
        'accent-secondary': '#D4A84B',
        border: '#E8E4DF',
        card: '#FFFFFF',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        mega: 'clamp(3rem, 9vw, 5.5rem)',
        huge: 'clamp(2rem, 6vw, 3.5rem)',
      },
      letterSpacing: {
        tightest: '-0.02em',
        tracked: '0.1em',
        'tracked-wide': '0.15em',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(26,26,26,0.04)',
        md: '0 4px 12px rgba(26,26,26,0.06)',
        lg: '0 8px 24px rgba(26,26,26,0.08)',
        accent: '0 4px 14px rgba(184,134,11,0.2)',
      },

    },
  },
  plugins: [],
}
