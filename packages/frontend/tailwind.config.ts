import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius-md)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-md)'
      },
      boxShadow: {
        ambient: 'var(--shadow-ambient)'
      },
      colors: {
        primary: 'var(--color-primary)',
        'primary-dim': 'var(--color-primary-dim)',
        'on-primary': 'var(--color-on-primary)',
        'primary-container': 'var(--color-primary-container)',
        'on-primary-container': 'var(--color-on-primary-container)',
        'secondary-container': 'var(--color-secondary-container)',
        'on-secondary-container': 'var(--color-on-secondary-container)',
        'secondary-fixed-dim': 'var(--color-secondary-fixed-dim)',
        surface: 'var(--color-surface)',
        'surface-container-low': 'var(--color-surface-container-low)',
        'surface-container-high': 'var(--color-surface-container-high)',
        'surface-container-highest': 'var(--color-surface-container-highest)',
        'surface-container-lowest': 'var(--color-surface-container-lowest)',
        'on-surface': 'var(--color-on-surface)',
        'on-background': 'var(--color-on-background)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        'error-container': 'var(--color-error-container)',
        'on-error-container': 'var(--color-on-error-container)'
      },
      fontFamily: {
        body: ['"Inter"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}

export default config
