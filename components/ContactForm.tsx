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
        <select name="service" value={form.service} onChange={handleChange} className={inputClass}>
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
