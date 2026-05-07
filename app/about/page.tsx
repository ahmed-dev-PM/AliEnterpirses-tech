import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import { BRAND } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About Us — Ali Enterprises',
  description: '10+ years delivering technology solutions across Karachi. Trusted by 100+ clients.',
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
