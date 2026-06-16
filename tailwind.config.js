/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-sf-text)',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
        display: [
          'var(--font-sf-display)',
          'var(--font-sf-text)',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'var(--font-sf-mono)',
          'ui-monospace',
          'Menlo',
          'Monaco',
          'monospace',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
        'zoom-in': 'zoomIn 0.5s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'dozy-reveal': 'dozyReveal 0.7s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        dozyReveal: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      colors: {
        dozy: {
          navy: '#0f1729',
          'navy-mid': '#1e3a5f',
          'blue-soft': '#dbeafe',
          'blue-mist': '#eff6ff',
          accent: '#3b82f6',
          'accent-deep': '#2563eb',
        },
      },
    },
  },
  plugins: [],
}
