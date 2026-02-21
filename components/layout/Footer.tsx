import Link from 'next/link'
import { Phone, MapPin, Clock, Instagram, Youtube, Mail } from 'lucide-react'

const NAV_LINKS = [
  { href: '/vente',       label: 'Vehicules a vendre' },
  { href: '/vendu',       label: 'Vehicules vendus' },
  { href: '/preparation', label: 'En preparation' },
  { href: '/recherche',   label: 'Recherche personnalisee' },
]

const SERVICE_LINKS = [
  { href: '/reprise',     label: 'Estimation reprise' },
  { href: '/simulateurs', label: 'Simulateur de prix' },
  { href: '/simulateurs', label: 'Simulateur assurance' },
  { href: '/contact',     label: 'Contact & Horaires' },
]

const SOCIAL_LINKS = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: '#F5F6F8',
        borderTop: '1px solid #E2E5EA',
      }}
    >
      {/* ── Main grid ── */}
      <div
        className="max-w-[1280px] mx-auto px-6"
        style={{ paddingTop: 64, paddingBottom: 48 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* ── Col 1: Brand ── */}
          <div className="lg:pr-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 no-underline mb-5 group" style={{ textDecoration: 'none' }}>
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 36,
                  height: 36,
                  background: '#0C1B33',
                  borderRadius: 8,
                }}
              >
                <span
                  className="font-display text-white"
                  style={{ fontSize: 13, letterSpacing: '0.15em', fontWeight: 600 }}
                >
                  RS
                </span>
              </div>
              <span
                className="font-display"
                style={{
                  fontSize: 18,
                  letterSpacing: '0.12em',
                  color: '#0C1B33',
                  fontWeight: 600,
                }}
              >
                RS Stark
              </span>
            </Link>

            {/* Tagline */}
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: '#5A6B80',
                maxWidth: 260,
                marginBottom: 24,
              }}
            >
              Concession automobile premium. V&eacute;hicules d&apos;exception
              s&eacute;lectionn&eacute;s avec rigueur et passion.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center transition-all duration-300"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: '#FFFFFF',
                    border: '1px solid #E2E5EA',
                    color: '#5A6B80',
                    textDecoration: 'none',
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Navigation ── */}
          <div>
            <h4
              className="font-display"
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#0C1B33',
                marginBottom: 20,
                letterSpacing: '0.01em',
              }}
            >
              Navigation
            </h4>
            <ul className="flex flex-col gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200"
                    style={{
                      fontSize: 14,
                      color: '#5A6B80',
                      textDecoration: 'none',
                      lineHeight: 1.6,
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Services ── */}
          <div>
            <h4
              className="font-display"
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#0C1B33',
                marginBottom: 20,
                letterSpacing: '0.01em',
              }}
            >
              Services
            </h4>
            <ul className="flex flex-col gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {SERVICE_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200"
                    style={{
                      fontSize: 14,
                      color: '#5A6B80',
                      textDecoration: 'none',
                      lineHeight: 1.6,
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact ── */}
          <div>
            <h4
              className="font-display"
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#0C1B33',
                marginBottom: 20,
                letterSpacing: '0.01em',
              }}
            >
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'rgba(12, 27, 51, 0.05)',
                    marginTop: 1,
                  }}
                >
                  <MapPin size={14} style={{ color: '#0C1B33' }} />
                </div>
                <p style={{ fontSize: 14, color: '#5A6B80', lineHeight: 1.6 }}>
                  12 Avenue des Champs-&Eacute;lys&eacute;es<br />75008 Paris
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'rgba(12, 27, 51, 0.05)',
                  }}
                >
                  <Phone size={14} style={{ color: '#0C1B33' }} />
                </div>
                <a
                  href="tel:+33123456789"
                  style={{
                    fontSize: 14,
                    color: '#5A6B80',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-code, monospace)',
                  }}
                >
                  01 23 45 67 89
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'rgba(12, 27, 51, 0.05)',
                  }}
                >
                  <Mail size={14} style={{ color: '#0C1B33' }} />
                </div>
                <a
                  href="mailto:contact@rsstark.fr"
                  style={{
                    fontSize: 14,
                    color: '#5A6B80',
                    textDecoration: 'none',
                  }}
                >
                  contact@rsstark.fr
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'rgba(12, 27, 51, 0.05)',
                    marginTop: 1,
                  }}
                >
                  <Clock size={14} style={{ color: '#0C1B33' }} />
                </div>
                <p style={{ fontSize: 14, color: '#5A6B80', lineHeight: 1.6 }}>
                  Lun &ndash; Sam : 9h &ndash; 19h<br />Dim : Sur RDV
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid #E2E5EA' }}>
        <div
          className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ paddingTop: 20, paddingBottom: 20 }}
        >
          <p
            style={{
              fontSize: 13,
              color: '#5A6B80',
              fontFamily: 'var(--font-body, sans-serif)',
            }}
          >
            &copy; 2026 RS Stark &mdash; Tous droits r&eacute;serv&eacute;s
          </p>
          <div className="flex gap-6">
            {[
              { label: 'Mentions legales', href: '#' },
              { label: 'Confidentialite', href: '#' },
              { label: 'CGV', href: '#' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors duration-200"
                style={{
                  fontSize: 13,
                  color: '#5A6B80',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
