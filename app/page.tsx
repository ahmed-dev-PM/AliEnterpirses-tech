import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CtaBanner from '@/components/CtaBanner'
import { BRAND, STATS, SERVICES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Ali Enterprises — Technology Solutions Karachi',
  description: 'Complete IT solutions in Karachi — hardware, networking, CCTV, and data center services.',
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
              <p className="mb-3 text-xs font-bold uppercase tracking-[3px] text-gold">
                Trusted Since 2014 · Karachi, Pakistan
              </p>
              <h1 className="text-4xl font-extrabold leading-tight text-white">
                Complete Technology<br />
                Solutions for{' '}
                <span className="text-gold">Your Business</span>
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-400">
                From hardware supply to enterprise networking — end-to-end IT solutions for
                corporate, business, and consumer clients across Pakistan.
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
                priority
              />
              <div className="w-full rounded-lg border-l-4 border-gold bg-[#3a3d44] p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
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
              <p className="mb-2 text-xs font-bold uppercase tracking-[3px] text-gold">What We Do</p>
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
