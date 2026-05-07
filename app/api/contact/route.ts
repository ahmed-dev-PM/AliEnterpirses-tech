import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { name, email, phone, service, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Ali Enterprises Website <onboarding@resend.dev>',
    to: 'info@alienterprises-tech.com',
    replyTo: email,
    subject: `New Enquiry from ${name}${service ? ` — ${service}` : ''}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nService: ${service || 'Not specified'}\n\nMessage:\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
