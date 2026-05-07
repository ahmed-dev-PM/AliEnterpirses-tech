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
