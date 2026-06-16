import localFont from 'next/font/local'

/** Self-hosted Apple SF Pro (place .otf files in app/fonts/sf-pro/ — see README). */
const sfProText = localFont({
  src: [
    { path: './fonts/sf-pro/SFProText-Regular.otf', weight: '400', style: 'normal' },
    { path: './fonts/sf-pro/SFProText-Medium.otf', weight: '500', style: 'normal' },
    { path: './fonts/sf-pro/SFProText-Semibold.otf', weight: '600', style: 'normal' },
  ],
  variable: '--font-sf-text',
  display: 'swap',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
})

const sfProDisplay = localFont({
  src: [
    { path: './fonts/sf-pro/SFProDisplay-Regular.otf', weight: '400', style: 'normal' },
    { path: './fonts/sf-pro/SFProDisplay-Medium.otf', weight: '500', style: 'normal' },
    { path: './fonts/sf-pro/SFProDisplay-Semibold.otf', weight: '600', style: 'normal' },
  ],
  variable: '--font-sf-display',
  display: 'swap',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
})

const sfMono = localFont({
  src: [{ path: './fonts/sf-pro/SFMono-Regular.otf', weight: '400', style: 'normal' }],
  variable: '--font-sf-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'Menlo', 'Monaco', 'monospace'],
})

export { sfProText, sfProDisplay, sfMono }
