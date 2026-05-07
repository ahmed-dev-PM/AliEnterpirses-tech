import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import ContactForm from '@/components/ContactForm'
import { BRAND } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Contact Us — Ali Enterprises',
  description: 'Get in touch with Ali Enterprises for a free consultation. Based in Techno City Mall, Karachi.',
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
                  className="text-sm text-gray-600 transition-colors hover:text-gold"
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
