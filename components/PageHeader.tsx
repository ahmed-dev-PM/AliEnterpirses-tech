interface PageHeaderProps {
  eyebrow: string
  title: string
  subtitle: string
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-charcoal px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[3px] text-gold">{eyebrow}</p>
        <h1 className="text-3xl font-extrabold text-white">{title}</h1>
        <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
      </div>
    </section>
  )
}
