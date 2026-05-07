# Ali Enterprises Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page Next.js business website for Ali Enterprises with Home, Services, About, and Contact pages, deployed-ready for Hostinger via GitHub.

**Architecture:** Multi-page Next.js App Router site with TypeScript and Tailwind CSS. Shared Navbar and Footer wrap all pages. Contact form submits to a Next.js API route that sends email via Resend. Brand colors are defined in Tailwind config and reused across all components.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Resend (email), Inter (Google Font)

---

## File Structure

```
app/
  layout.tsx              # Root layout: Inter font, global metadata wrapper
  page.tsx                # Home page
  globals.css             # Tailwind directives + base styles
  icon.tsx                # Favicon from logo
  services/page.tsx       # Services page
  about/page.tsx          # About page
  contact/page.tsx        # Contact page
  api/contact/route.ts    # POST handler — validates form, sends via Resend
components/
  Navbar.tsx              # Sticky nav: logo, links, hamburger on mobile
  Footer.tsx              # Two-column footer
  PageHeader.tsx          # Dark header banner (reused on Services/About/Contact)
  CtaBanner.tsx           # Gold CTA strip (reused on Home/Services)
  ContactForm.tsx         # Controlled form with validation + submit state
lib/
  data.ts                 # Services array, contact info, brand constants
public/
  logo-icon.jpg           # Logo (already present)
tailwind.config.ts        # Brand colors as Tailwind tokens
next.config.ts            # Next.js config (images, etc.)
.env.local                # RESEND_API_KEY (not committed)
```

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `app/globals.css`, `app/layout.tsx`

- [ ] **Step 1: Run create-next-app in the project root**

```bash
cd E:/AHMED/ALIentprises
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*" --yes
```

Expected output: "Success! Created ... at E:/AHMED/ALIentprises"

- [ ] **Step 2: Install Resend**

```bash
npm install resend
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Open http://localhost:3000 — should show default Next.js page.  
Stop the server with Ctrl+C.

- [ ] **Step 4: Commit scaffold**

```bash
git add .
git commit -m "feat: scaffold Next.js project with TypeScript and Tailwind"
```

---

## Task 2: Configure Tailwind Brand Colors & Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace tailwind.config.ts with brand token config**

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#2D2F33',
        gold: '#C08A30',
        slate: '#4D6070',
        offwhite: '#f5f6f8',
        footer: '#1e2025',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Replace app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-offwhite text-charcoal;
  }
}
```

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```

Expected: "✓ Compiled successfully"

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: configure Tailwind brand colors and global styles"
```

---

## Task 3: Create Shared Data & Constants

**Files:**
- Create: `lib/data.ts`

- [ ] **Step 1: Create lib/data.ts**

```ts
// lib/data.ts

export const BRAND = {
  name: 'Ali Enterprises',
  tagline: 'Complete Technology Solutions for Your Business',
  email: 'info@alienterprises-tech.com',
  address: 'Plot #07, SR-5, WH-28, Techno City Mall, Karachi, Pakistan',
  founded: '2014',
  hours: 'Mon – Sat: 9:00 AM – 6:00 PM',
  hoursSun: 'Sunday: Closed',
} as const

export const STATS = [
  { value: '10+', label: 'Years Experience' },
  { value: '100+', label: 'Clients Served' },
  { value: '5', label: 'Service Areas' },
  { value: '24/7', label: 'Support Available' },
] as const

export const SERVICES = [
  {
    id: 'hardware',
    icon: '🖥️',
    name: 'Computer Hardware Supply',
    summary: 'PCs, laptops, servers & peripherals for all business sizes',
    description:
      'Supply and installation of desktops, laptops, workstations, servers, printers, and all peripherals. We source from leading brands including HP, Dell, and Lenovo — with warranty support and after-sales service.',
    tags: ['Desktops & Laptops', 'Servers', 'Printers & Peripherals'],
    accent: 'gold' as const,
  },
  {
    id: 'networking',
    icon: '🌐',
    name: 'Networking Solutions',
    summary: 'LAN/WAN, structured cabling & enterprise Wi-Fi',
    description:
      'Design, installation, and management of LAN/WAN networks, structured cabling, enterprise Wi-Fi, and firewall setup. We build reliable, scalable networks for offices and data centers.',
    tags: ['LAN / WAN', 'Structured Cabling', 'Enterprise Wi-Fi'],
    accent: 'slate' as const,
  },
  {
    id: 'support',
    icon: '🔧',
    name: 'IT Support & Maintenance (AMC)',
    summary: 'On-site support, annual contracts & hardware repair',
    description:
      'On-site and remote support, annual maintenance contracts (AMC), troubleshooting, hardware repairs, and preventive maintenance. Flexible plans for corporates and SMEs.',
    tags: ['On-site Support', 'AMC Contracts', 'Hardware Repair'],
    accent: 'charcoal' as const,
  },
  {
    id: 'cctv',
    icon: '📷',
    name: 'Surveillance / CCTV Systems',
    summary: 'IP cameras, NVR/DVR & remote monitoring',
    description:
      'Complete IP camera systems, NVR/DVR installation, remote monitoring setup, and ongoing maintenance. For offices, warehouses, retail, and residential.',
    tags: ['IP Cameras', 'NVR / DVR', 'Remote Monitoring'],
    accent: 'gold' as const,
  },
  {
    id: 'datacenter',
    icon: '🖧',
    name: 'Server & Data Center Solutions',
    summary: 'Rack setup, NAS/SAN & virtualization',
    description:
      'Rack assembly, NAS/SAN storage setup, server virtualization, and full data center builds. We design and deploy infrastructure that scales with your business.',
    tags: ['Rack Installation', 'NAS / SAN', 'Virtualization'],
    accent: 'slate' as const,
  },
] as const

export type ServiceAccent = 'gold' | 'slate' | 'charcoal'

export const SERVICE_DROPDOWN_OPTIONS = [
  'Hardware Supply',
  'Networking Solutions',
  'IT Support & AMC',
  'Surveillance / CCTV',
  'Server & Data Center',
  'Other',
]
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add shared data constants (services, brand, stats)"
```

---

## Task 4: Root Layout with Inter Font & Metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace app/layout.tsx**

```tsx
// app/layout.tsx
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Run build to verify**

```bash
npm run build
```

Expected: "✓ Compiled successfully"

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: configure root layout with Inter font and base metadata"
```

---

## Task 5: Favicon

**Files:**
- Create: `app/icon.tsx`

- [ ] **Step 1: Create app/icon.tsx**

```tsx
// app/icon.tsx
import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#C08A30',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 16,
          fontWeight: 900,
        }}
      >
        AE
      </div>
    ),
    { ...size }
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/icon.tsx
git commit -m "feat: add favicon"
```

---

## Task 6: Navbar Component

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create components/Navbar.tsx**

```tsx
// components/Navbar.tsx
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
    <header className="sticky top-0 z-50 bg-charcoal shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3">
        {/* Logo + Brand */}
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
                pathname === link.href
                  ? 'text-gold'
                  : 'text-gray-300 hover:text-white'
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
          <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
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
              className={`block py-3 text-sm font-medium border-b border-white/10 ${
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add sticky Navbar with mobile hamburger menu"
```

---

## Task 7: Footer Component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create components/Footer.tsx**

```tsx
// components/Footer.tsx
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
            {['Home', 'Services', 'About', 'Contact'].map((page) => (
              <Link
                key={page}
                href={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                className="text-xs text-gray-500 hover:text-gold transition-colors"
              >
                {page}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 8: Shared PageHeader & CtaBanner Components

**Files:**
- Create: `components/PageHeader.tsx`
- Create: `components/CtaBanner.tsx`

- [ ] **Step 1: Create components/PageHeader.tsx**

```tsx
// components/PageHeader.tsx
interface PageHeaderProps {
  eyebrow: string
  title: string
  subtitle: string
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-charcoal px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-xs font-bold tracking-[3px] text-gold uppercase">{eyebrow}</p>
        <h1 className="text-3xl font-extrabold text-white">{title}</h1>
        <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create components/CtaBanner.tsx**

```tsx
// components/CtaBanner.tsx
import Link from 'next/link'

interface CtaBannerProps {
  heading: string
  subtext: string
  buttonLabel: string
}

export default function CtaBanner({ heading, subtext, buttonLabel }: CtaBannerProps) {
  return (
    <section className="bg-gold px-6 py-10 text-center">
      <h2 className="text-xl font-extrabold text-white">{heading}</h2>
      <p className="mt-2 text-sm text-white/85">{subtext}</p>
      <Link
        href="/contact"
        className="mt-5 inline-block rounded bg-charcoal px-7 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90"
      >
        {buttonLabel}
      </Link>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/PageHeader.tsx components/CtaBanner.tsx
git commit -m "feat: add shared PageHeader and CtaBanner components"
```

---

## Task 9: Home Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx**

```tsx
// app/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CtaBanner from '@/components/CtaBanner'
import { BRAND, STATS, SERVICES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Ali Enterprises — Technology Solutions Karachi',
  description:
    'Complete IT solutions in Karachi — hardware, networking, CCTV, and data center services.',
}

const accentBorder: Record<string, string> = {
  gold: 'border-t-gold',
  slate: 'border-t-slate',
  charcoal: 'border-t-charcoal',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-charcoal px-6 py-16">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row">
            {/* Left */}
            <div className="flex-1">
              <p className="mb-3 text-xs font-bold tracking-[3px] text-gold uppercase">
                Trusted Since 2014 · Karachi, Pakistan
              </p>
              <h1 className="text-4xl font-extrabold leading-tight text-white">
                Complete Technology<br />
                Solutions for{' '}
                <span className="text-gold">Your Business</span>
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                From hardware supply to enterprise networking — end-to-end IT solutions
                for corporate, business, and consumer clients across Pakistan.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="rounded bg-gold px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  Explore Services
                </Link>
                <Link
                  href="/contact"
                  className="rounded border border-slate px-6 py-3 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right */}
            <div className="flex w-full flex-col items-center gap-4 lg:w-72">
              <Image
                src="/logo-icon.jpg"
                alt={BRAND.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-gold object-cover"
              />
              <div className="w-full rounded-lg border-l-4 border-gold bg-[#3a3d44] p-4">
                <p className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Our Services
                </p>
                <ul className="flex flex-col gap-2">
                  {SERVICES.map((s) => (
                    <li key={s.id} className="text-sm text-white">
                      {s.icon}&nbsp;&nbsp;{s.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 divide-x divide-white/10 border-t border-white/10 pt-8 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-4 text-center">
                <p className="text-2xl font-extrabold text-gold">{stat.value}</p>
                <p className="mt-1 text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Overview */}
        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="mb-2 text-xs font-bold tracking-[3px] text-gold uppercase">What We Do</p>
              <h2 className="text-2xl font-extrabold text-charcoal">Our Core Services</h2>
              <p className="mt-1 text-sm text-gray-500">Comprehensive IT solutions under one roof</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  className={`rounded border border-gray-100 border-t-4 ${accentBorder[service.accent]} p-5`}
                >
                  <span className="text-2xl">{service.icon}</span>
                  <h3 className="mt-2 text-sm font-bold text-charcoal">{service.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">{service.summary}</p>
                </div>
              ))}
              <Link
                href="/services"
                className="flex flex-col items-center justify-center rounded border border-dashed border-gold bg-offwhite p-5 text-center transition-colors hover:bg-gold/5"
              >
                <span className="text-sm font-bold text-gold">View All Services →</span>
                <span className="mt-1 text-xs text-gray-500">Details on each service</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-charcoal px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-2 text-center text-xl font-extrabold text-white">
              Why Businesses Trust Ali Enterprises
            </h2>
            <p className="mb-10 text-center text-sm text-gray-400">
              Corporate, SME &amp; consumer clients across Karachi
            </p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { icon: '⚡', title: 'Fast Deployment', desc: 'Quick turnaround on all projects' },
                { icon: '🏢', title: 'Corporate Focus', desc: 'Enterprise-grade solutions' },
                { icon: '🛡️', title: 'Reliable Support', desc: 'AMC & ongoing maintenance' },
                { icon: '📍', title: 'Local Expertise', desc: 'Based in Techno City, Karachi' },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <span className="text-3xl">{item.icon}</span>
                  <p className="mt-2 text-sm font-bold text-white">{item.title}</p>
                  <p className="mt-1 text-xs text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBanner
          heading="Ready to Upgrade Your IT Infrastructure?"
          subtext="Free consultation for corporate clients — get in touch today"
          buttonLabel="Contact Us Today"
        />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run dev server and verify home page visually**

```bash
npm run dev
```

Open http://localhost:3000 — verify: navbar with logo, hero section, services grid, Why Choose Us strip, gold CTA banner, footer.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: build Home page with hero, services overview, and CTA"
```

---

## Task 10: Services Page

**Files:**
- Create: `app/services/page.tsx`

- [ ] **Step 1: Create app/services/page.tsx**

```tsx
// app/services/page.tsx
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import CtaBanner from '@/components/CtaBanner'
import { SERVICES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Our Services — Ali Enterprises',
  description:
    'Hardware supply, networking, IT support, CCTV, and server solutions for corporate and SME clients.',
}

const accentBorderLeft: Record<string, string> = {
  gold: 'border-l-gold',
  slate: 'border-l-slate',
  charcoal: 'border-l-charcoal',
}

const accentText: Record<string, string> = {
  gold: 'text-gold',
  slate: 'text-slate',
  charcoal: 'text-charcoal',
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="What We Offer"
          title="Our Services"
          subtitle="End-to-end technology solutions for every business need"
        />

        <section className="bg-white px-6 py-14">
          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className={`flex gap-5 rounded border border-gray-100 border-l-4 ${accentBorderLeft[service.accent]} p-6`}
              >
                <span className="flex-shrink-0 text-4xl">{service.icon}</span>
                <div>
                  <h2 className="text-base font-bold text-charcoal">{service.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{service.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-offwhite px-3 py-1 text-xs text-charcoal"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CtaBanner
          heading="Need a Custom Solution?"
          subtext="Talk to our team for a free assessment"
          buttonLabel="Contact Us"
        />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify at http://localhost:3000/services**

Check: dark page header, 5 service cards with left-border colors, tags, gold CTA banner.

- [ ] **Step 3: Commit**

```bash
git add app/services/page.tsx
git commit -m "feat: build Services page with detailed service cards"
```

---

## Task 11: About Page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create app/about/page.tsx**

```tsx
// app/about/page.tsx
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import { BRAND } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About Us — Ali Enterprises',
  description:
    '10+ years delivering technology solutions across Karachi. Trusted by 100+ clients.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Our Story"
          title="About Ali Enterprises"
          subtitle="A decade of technology excellence in Karachi"
        />

        {/* Who We Are */}
        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Story */}
              <div className="flex-1">
                <h2 className="mb-4 text-xl font-extrabold text-charcoal">Who We Are</h2>
                <p className="text-sm leading-relaxed text-gray-600">
                  Ali Enterprises is a Karachi-based technology solutions company with over 10 years
                  of experience delivering hardware supply, networking, IT support, surveillance, and
                  data center solutions. We serve corporate clients, SMEs, and individual consumers
                  across Pakistan.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  Founded on the principles of reliability and technical excellence, we have grown
                  from a local IT supplier to a trusted partner for enterprise infrastructure projects
                  throughout the region. Our team brings deep expertise across hardware, networking,
                  and security — ensuring every project is delivered on time and built to last.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="w-full rounded border-t-4 border-gold bg-offwhite p-6 lg:w-64">
                <h3 className="mb-4 text-sm font-bold text-charcoal">Quick Facts</h3>
                {[
                  { label: 'Founded', value: BRAND.founded },
                  { label: 'Location', value: 'Karachi, Pakistan' },
                  { label: 'Clients Served', value: '100+' },
                  { label: 'Sectors', value: 'Corporate, SME, Consumer' },
                ].map((fact) => (
                  <div
                    key={fact.label}
                    className="flex justify-between border-b border-gray-200 py-2 last:border-0"
                  >
                    <span className="text-xs text-gray-500">{fact.label}</span>
                    <span className="text-xs font-bold text-charcoal">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Values */}
            <div className="mt-14">
              <h2 className="mb-6 text-xl font-extrabold text-charcoal">Our Values</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {[
                  { icon: '🎯', title: 'Precision', desc: 'Right solution, right time — every time.' },
                  { icon: '🤝', title: 'Partnership', desc: 'Long-term relationships built on trust.' },
                  { icon: '⚙️', title: 'Excellence', desc: 'Enterprise-grade quality on every project.' },
                ].map((val) => (
                  <div key={val.title} className="rounded bg-offwhite p-6 text-center">
                    <span className="text-3xl">{val.icon}</span>
                    <h3 className="mt-3 text-sm font-bold text-charcoal">{val.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify at http://localhost:3000/about**

Check: page header, two-column who we are + quick facts, 3 value cards.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: build About page with company story and values"
```

---

## Task 12: Contact Form Component

**Files:**
- Create: `components/ContactForm.tsx`

- [ ] **Step 1: Create components/ContactForm.tsx**

```tsx
// components/ContactForm.tsx
'use client'

import { useState } from 'react'
import { SERVICE_DROPDOWN_OPTIONS } from '@/lib/data'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setState('success')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch {
      setState('error')
    }
  }

  const inputClass =
    'w-full rounded border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-charcoal placeholder-gray-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600">Full Name *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Your full name"
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600">Email Address *</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="you@company.com"
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600">Phone Number</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+92 300 000 0000"
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600">Service Interested In</label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select a service</option>
          {SERVICE_DROPDOWN_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600">Message *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Describe your requirements..."
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full rounded bg-gold py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {state === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {state === 'success' && (
        <p className="rounded bg-green-50 px-4 py-3 text-sm text-green-700">
          ✓ Message sent! We&apos;ll get back to you shortly.
        </p>
      )}
      {state === 'error' && (
        <p className="rounded bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong. Please email us directly at info@alienterprises-tech.com
        </p>
      )}
    </form>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ContactForm.tsx
git commit -m "feat: add ContactForm component with validation and submit states"
```

---

## Task 13: Contact Page

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create app/contact/page.tsx**

```tsx
// app/contact/page.tsx
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import ContactForm from '@/components/ContactForm'
import { BRAND } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Contact Us — Ali Enterprises',
  description:
    'Get in touch with Ali Enterprises for a free consultation. Based in Techno City Mall, Karachi.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Get in Touch"
          title="Contact Us"
          subtitle="We'd love to hear from you — reach out for a free consultation"
        />

        <section className="bg-white px-6 py-14">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row">
            {/* Form */}
            <div className="flex-1">
              <h2 className="mb-6 text-lg font-extrabold text-charcoal">Send Us a Message</h2>
              <ContactForm />
            </div>

            {/* Info */}
            <div className="flex w-full flex-col gap-4 lg:w-72">
              <h2 className="text-lg font-extrabold text-charcoal">Our Details</h2>
              <div className="rounded border-l-4 border-gold bg-offwhite p-4">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-gold">📍 Address</p>
                <p className="text-sm leading-relaxed text-gray-600">{BRAND.address}</p>
              </div>
              <div className="rounded border-l-4 border-slate bg-offwhite p-4">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate">✉️ Email</p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-sm text-gray-600 hover:text-gold transition-colors"
                >
                  {BRAND.email}
                </a>
              </div>
              <div className="rounded border-l-4 border-charcoal bg-offwhite p-4">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-charcoal">🕐 Hours</p>
                <p className="text-sm text-gray-600">{BRAND.hours}</p>
                <p className="text-sm text-gray-600">{BRAND.hoursSun}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify at http://localhost:3000/contact**

Check: page header, form on left, 3 info cards on right.

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: build Contact page with form and info cards"
```

---

## Task 14: Contact API Route (Resend)

**Files:**
- Create: `app/api/contact/route.ts`
- Create: `.env.local`

- [ ] **Step 1: Create .env.local**

```
RESEND_API_KEY=your_resend_api_key_here
```

Get a free API key at https://resend.com — sign up, create an API key, paste it here.

- [ ] **Step 2: Create app/api/contact/route.ts**

```ts
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { name, email, phone, service, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Ali Enterprises Website <onboarding@resend.dev>',
    to: 'info@alienterprises-tech.com',
    replyTo: email,
    subject: `New Enquiry from ${name}${service ? ` — ${service}` : ''}`,
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service: ${service || 'Not specified'}

Message:
${message}
    `.trim(),
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
```

- [ ] **Step 3: Add .env.local to .gitignore**

Open `.gitignore` and verify `.env.local` is listed (create-next-app adds it by default).

```bash
grep ".env.local" .gitignore
```

Expected output: `.env.local`

- [ ] **Step 4: Test form submission in browser**

With dev server running, fill out the contact form at http://localhost:3000/contact and submit. Check for green success message. Verify email arrives at info@alienterprises-tech.com.

- [ ] **Step 5: Commit (without .env.local)**

```bash
git add app/api/contact/route.ts
git commit -m "feat: add /api/contact route for Resend email delivery"
```

---

## Task 15: Production Build & Final Check

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: "✓ Compiled successfully" with route list showing `/`, `/services`, `/about`, `/contact`, `/api/contact`

- [ ] **Step 2: Run production server and verify all pages**

```bash
npm start
```

Check each page at http://localhost:3000:
- `/` — Home: hero, services grid, why us, CTA
- `/services` — 5 service cards with tags
- `/about` — company story, quick facts, values
- `/contact` — form + info cards
- Nav active state changes on each page
- Mobile: resize browser to <768px, verify hamburger menu works

- [ ] **Step 3: Commit any final fixes, then push to GitHub**

```bash
git add -A
git commit -m "feat: complete Ali Enterprises website"
git push -u origin master
```

Expected: "Branch 'master' set up to track remote branch 'master' from 'origin'."

---

## Notes for Deployment on Hostinger

After pushing to GitHub, connect the repo in Hostinger:
1. In Hostinger control panel, go to **Hosting → Git**
2. Connect your GitHub repo `ahmed-dev-PM/AliEnterpirses-tech`
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Add environment variable: `RESEND_API_KEY=<your_key>`

Alternatively, deploy to **Vercel** (zero-config for Next.js):
```bash
npx vercel --prod
```
