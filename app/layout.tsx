import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Ali Enterprises — Technology Solutions Karachi',
  description:
    'Complete IT solutions in Karachi — hardware, networking, CCTV, and data center services.',
  openGraph: {
    title: 'Ali Enterprises — Technology Solutions Karachi',
    description: 'Complete IT solutions in Karachi.',
    images: ['/logo-icon.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
