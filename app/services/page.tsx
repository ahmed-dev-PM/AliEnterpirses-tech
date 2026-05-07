import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import CtaBanner from '@/components/CtaBanner'
import { SERVICES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Our Services — Ali Enterprises',
  description: 'Hardware supply, networking, IT support, CCTV, and server solutions for corporate and SME clients.',
}

const accentBorderLeft: Record<string, string> = {
  gold: 'border-l-gold',
  slate: 'border-l-slate',
  charcoal: 'border-l-charcoal',
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
                      <span key={tag} className="rounded bg-offwhite px-3 py-1 text-xs text-charcoal">
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
