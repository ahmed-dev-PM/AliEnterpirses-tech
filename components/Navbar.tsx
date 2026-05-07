'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BRAND } from '@/lib/data'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-charcoal shadow-lg">
      <nav className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-icon.jpg"
            alt={BRAND.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <span className="text-sm font-bold tracking-wide text-white">
            {BRAND.name.toUpperCase()}
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="ml-auto hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? 'text-gold' : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded bg-gold px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="ml-auto flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-charcoal px-6 pb-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block border-b border-white/10 py-3 text-sm font-medium ${
                pathname === link.href ? 'text-gold' : 'text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-3 block rounded bg-gold px-4 py-2 text-center text-xs font-bold text-white"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  )
}
