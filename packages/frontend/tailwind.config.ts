import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'calc(var(--radius-lg) - 2px)',
        sm: 'calc(var(--radius-lg) - 6px)'
      },
      boxShadow: {
        glow: '0 24px 60px rgba(13, 36, 53, 0.18)'
      },
      colors: {
        background: 'var(--color-background)',
        border: 'var(--color-border)',
        card: 'var(--color-card)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        primary: 'var(--color-primary)',
        ring: 'var(--color-ring)'
      },
      fontFamily: {
        body: ['\"Space Grotesk\"', 'system-ui', 'sans-serif'],
        display: ['\"Fraunces\"', 'Georgia', 'serif']
      }
    }
  },
  plugins: []
}

export default config
