import './globals.css'
import { sfProText, sfProDisplay, sfMono } from './fonts'

const siteUrl = 'https://www.charvibansal.com'
const siteDescription =
  'Portfolio of Charvi Bansal — builder, engineer, and student at UMass Amherst.'
const ogImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: "Charvi's Portfolio",
  type: 'image/png',
}

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Charvi's Portfolio",
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Charvi's Portfolio",
    description: siteDescription,
    url: siteUrl,
    siteName: "Charvi's Portfolio",
    locale: 'en_US',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Charvi's Portfolio",
    description: siteDescription,
    images: [ogImage],
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth light">
      <body
        className={`${sfProText.variable} ${sfProDisplay.variable} ${sfMono.variable} font-sans antialiased bg-[#f5f4f0] text-neutral-900 min-h-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
