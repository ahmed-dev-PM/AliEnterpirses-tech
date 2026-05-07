import Image from 'next/image'
import Link from 'next/link'
import { BRAND } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-footer">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-icon.jpg"
            alt={BRAND.name}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-bold text-white">{BRAND.name.toUpperCase()}</p>
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400">{BRAND.email}</p>
          <p className="mt-1 text-xs text-gray-400">Techno City Mall, Karachi</p>
          <div className="mt-2 flex justify-end gap-4">
            {[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map((page) => (
              <Link
                key={page.label}
                href={page.href}
                className="text-xs text-gray-500 transition-colors hover:text-gold"
              >
                {page.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
