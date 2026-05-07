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
