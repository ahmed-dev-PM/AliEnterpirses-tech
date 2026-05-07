# Ali Enterprises — Business Website Design Spec

**Date:** 2026-05-07
**Project:** alienterprises-tech.com
**Status:** Approved

---

## 1. Overview

A multi-page Next.js business website for Ali Enterprises, a Karachi-based technology solutions company with 10+ years of experience. The site targets corporate clients, SMEs, and consumers looking for hardware supply, networking, IT support, surveillance, and data center solutions.

---

## 2. Brand & Identity

| Element | Value |
|---|---|
| Company Name | Ali Enterprises |
| Tagline | Complete Technology Solutions for Your Business |
| Email | info@alienterprises-tech.com |
| Address | Plot #07, SR-5, WH-28, Techno City Mall, Karachi, Pakistan |
| Founded | 2014 (10+ years) |
| Clients Served | 100+ |

### Color Palette (from logo)

| Name | Hex | Usage |
|---|---|---|
| Charcoal | `#2D2F33` | Nav, dark sections, hero background |
| Gold / Amber | `#C08A30` | Primary accent, CTAs, highlights |
| Slate Blue | `#4D6070` | Secondary accent, section borders |
| Off-white | `#f5f6f8` | Page backgrounds |
| Dark Footer | `#1e2025` | Footer background |

### Typography
- Font: **Inter** (Google Fonts via `next/font/google`)
- Headings: Bold/ExtraBold weight
- Body: Regular weight, generous line-height (1.6–1.8)

---

## 3. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Form handling | React state + **Resend** via a Next.js API route (`/api/contact`) |
| Deployment | Vercel (recommended) |
| Assets | Logo PNG provided by client |

---

## 4. Site Structure

Multi-page Next.js app. Each page is a separate route.

```
/           → Home
/services   → Services
/about      → About
/contact    → Contact
```

### Shared Components
- `Navbar` — sticky, dark charcoal background, logo left, nav links + "Get a Quote" CTA right
- `Footer` — two-column: brand/copyright left, contact info right. Dark (`#1e2025`) background.

---

## 5. Page Designs

### 5.1 Home (`/`)

**Sections (top to bottom):**

1. **Navbar** — sticky, charcoal, logo + links + "Get a Quote" gold button
2. **Hero** — dark charcoal gradient background, two-column layout:
   - Left: eyebrow text ("TRUSTED SINCE 2014 · KARACHI"), H1 headline, body copy, two CTA buttons ("Explore Services" gold-filled, "Contact Us" slate-outlined)
   - Right: dark card listing all 5 services with icons
   - Bottom: stats strip — 10+ Years | 100+ Clients | 5 Services | 24/7 Support
3. **Services Overview** — white background, 3×2 grid of service cards with colored top borders (alternating gold/slate/charcoal), 6th cell is a "View All Services →" CTA card
4. **Why Choose Us** — dark charcoal strip, 4-column icon grid: Fast Deployment, Corporate Focus, Reliable Support, Local Expertise
5. **CTA Banner** — gold background, headline + "Contact Us Today" dark button
6. **Footer**

### 5.2 Services (`/services`)

**Sections:**
1. **Navbar**
2. **Page Header** — dark background, eyebrow + H1 + subtitle
3. **Service Cards** — vertical list of 5 detailed cards, each with:
   - Left-border color (gold/slate/charcoal cycling)
   - Emoji icon + service name + description paragraph
   - Tag chips (e.g., "LAN / WAN", "Structured Cabling")
4. **CTA Banner** — gold, "Need a custom solution?" + Contact Us button
5. **Footer**

**Services listed:**
1. Computer Hardware Supply — PCs, laptops, servers, peripherals. Brands: HP, Dell, Lenovo.
2. Networking Solutions — LAN/WAN, structured cabling, enterprise Wi-Fi, firewall
3. IT Support & Maintenance (AMC) — on-site/remote support, annual contracts, hardware repair
4. Surveillance / CCTV — IP cameras, NVR/DVR, remote monitoring
5. Server & Data Center — rack setup, NAS/SAN, virtualization, data center builds

### 5.3 About (`/about`)

**Sections:**
1. **Navbar**
2. **Page Header** — dark background, eyebrow + H1 + subtitle
3. **Who We Are** — two-column: left body text (company story, 2 paragraphs), right "Quick Facts" card (Founded: 2014, Location: Karachi, Clients: 100+, Sectors: Corporate/SME/Consumer)
4. **Our Values** — 3-column card grid: Precision 🎯, Partnership 🤝, Excellence ⚙️
5. **Footer**

### 5.4 Contact (`/contact`)

**Sections:**
1. **Navbar**
2. **Page Header** — dark background, eyebrow + H1 + subtitle
3. **Split layout:**
   - Left (wider): Contact form — Full Name*, Email*, Phone, Service Dropdown, Message*, Submit button
   - Right: Info cards — Address (gold border), Email (slate border), Business Hours (charcoal border)
4. **Footer**

**Contact form fields:**
- Full Name (required)
- Email Address (required)
- Phone Number (optional)
- Service Interested In (dropdown: Hardware Supply / Networking / IT Support / Surveillance / Server & Data Center / Other)
- Message (required, textarea)
- Submit: POSTs to `/api/contact` (Next.js route), which sends email via Resend to info@alienterprises-tech.com

**Business info displayed:**
- Address: Plot #07, SR-5, WH-28, Techno City Mall, Karachi, Pakistan
- Email: info@alienterprises-tech.com
- Hours: Mon–Sat 9:00 AM – 6:00 PM, Sun Closed

---

## 6. Navigation

- **Navbar** is sticky (fixed top), `z-index` above all content
- Active page link is highlighted in gold (`#C08A30`)
- "Get a Quote" button links to `/contact`
- Mobile: hamburger menu (responsive, Tailwind breakpoints)

---

## 7. Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Desktop (≥1024px) | Multi-column grids, side-by-side hero layout |
| Tablet (768–1023px) | Reduce columns, stack hero vertically |
| Mobile (<768px) | Single column, hamburger nav, full-width cards |

---

## 8. Assets

| File | Path | Usage |
|---|---|---|
| Circular AE icon (gold ring) | `public/logo-icon.jpg` | Navbar, favicon, mobile touch icon, og:image |

- File saved as `public/logo-icon.jpg` (circular version with gold ring)
- No stock photography required — design relies on icons + color blocks
- Favicon: use `logo-icon.jpg` for `app/icon.tsx` or convert to `public/favicon.ico`

---

## 9. SEO

- Each page has a unique `<title>` and `<meta description>` via Next.js `metadata` API
- Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`)
- `alt` text on all images

| Page | Title | Description |
|---|---|---|
| Home | Ali Enterprises — Technology Solutions Karachi | Complete IT solutions in Karachi — hardware, networking, CCTV, and data center services. |
| Services | Our Services — Ali Enterprises | Hardware supply, networking, IT support, CCTV, and server solutions for corporate and SME clients. |
| About | About Us — Ali Enterprises | 10+ years delivering technology solutions across Karachi. Trusted by 100+ clients. |
| Contact | Contact Us — Ali Enterprises | Get in touch with Ali Enterprises for a free consultation. Based in Techno City Mall, Karachi. |

---

## 10. Out of Scope

- CMS / admin dashboard
- E-commerce / product catalog
- Blog
- Client portal / login
- Google Maps embed (contact page uses address text only)
