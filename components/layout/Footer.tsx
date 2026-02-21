import Link from 'next/link'
import { Phone, MapPin, Clock, Instagram, Youtube } from 'lucide-react'

const STOCK_LINKS = [
  { href: '/vente',       label: 'Véhicules à vendre'       },
  { href: '/vendu',       label: 'Véhicules vendus'          },
  { href: '/preparation', label: 'En préparation'            },
  { href: '/recherche',   label: 'Recherche personnalisée'   },
]
const SERVICE_LINKS = [
  { href: '/reprise',     label: 'Estimation reprise'        },
  { href: '/simulateurs', label: 'Simulateur de prix'        },
  { href: '/simulateurs', label: 'Simulateur assurance'      },
  { href: '/contact',     label: 'Contact & Horaires'        },
]

const S = {
  label:  { fontSize: 10, letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase' as const, fontFamily: 'var(--font-code,monospace)', display: 'block', marginBottom: 20 } ,
  link:   { display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' },
  border: { borderTop: '1px solid #2A2A2A' },
}

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid #2A2A2A', paddingTop: 64, paddingBottom: 32 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10" style={{ marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3" style={{ marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, border: '1px solid #C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="font-display" style={{ color: '#C9A84C', fontSize: 11, letterSpacing: '0.3em' }}>RS</span>
              </div>
              <span className="font-display" style={{ fontSize: 18, letterSpacing: '0.22em' }}>RS STARK</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, marginBottom: 24, maxWidth: 220 }}>
              Concession automobile premium. Véhicules d&apos;exception sélectionnés avec rigueur.
            </p>
            <div className="flex gap-3">
              {[Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, border: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'all 0.2s' }}>
                  <Icon size={13} />
                </a>
              ))}
              {/* TikTok */}
              <a href="#" style={{ width: 36, height: 36, border: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'all 0.2s' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.77 0 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0 0 12.68 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.73a4.85 4.85 0 0 1-1-.04z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Stock */}
          <div>
            <span style={S.label}>Stock</span>
            {STOCK_LINKS.map((l) => (
              <Link key={l.href + l.label} href={l.href} style={S.link}>{l.label}</Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <span style={S.label}>Services</span>
            {SERVICE_LINKS.map((l) => (
              <Link key={l.href + l.label} href={l.href} style={S.link}>{l.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <span style={S.label}>Contact</span>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={13} style={{ color: '#C9A84C', marginTop: 2, flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>12 Avenue des Champs-Élysées<br />75008 Paris</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={13} style={{ color: '#C9A84C', flexShrink: 0 }} />
                <a href="tel:+33123456789" style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontFamily: 'var(--font-code,monospace)' }}>
                  01 23 45 67 89
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={13} style={{ color: '#C9A84C', marginTop: 2, flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>Lun – Sam : 9h – 19h<br />Dim : Sur RDV</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #1E1E1E', paddingTop: 24 }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', fontFamily: 'var(--font-code,monospace)' }}>
            © 2026 RS Stark — Tous droits réservés
          </p>
          <div className="flex gap-6">
            {['Mentions légales', 'Confidentialité', 'CGV'].map((t) => (
              <Link key={t} href="#" style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', textDecoration: 'none', fontFamily: 'var(--font-code,monospace)' }}>
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
