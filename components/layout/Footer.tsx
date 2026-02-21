import Link from 'next/link'
import { Instagram, Youtube, Phone, MapPin, Clock, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A2A] bg-[#0A0A0A] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-[#C9A84C] flex items-center justify-center">
                <span className="text-[#C9A84C] font-display text-xs tracking-widest">RS</span>
              </div>
              <span className="font-display text-xl tracking-[0.2em]">RS STARK</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-6">
              Concession automobile premium. Véhicules d&apos;exception sélectionnés avec rigueur.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 border border-[#2A2A2A] flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-9 h-9 border border-[#2A2A2A] flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.73a4.85 4.85 0 0 1-1-.04z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 border border-[#2A2A2A] flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
                <Youtube size={14} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display tracking-widest text-sm mb-6 text-[#C9A84C]">STOCK</h4>
            <ul className="space-y-3">
              {[
                { href: '/vente', label: 'Véhicules à vendre' },
                { href: '/vendu', label: 'Véhicules vendus' },
                { href: '/preparation', label: 'En préparation' },
                { href: '/recherche', label: 'Recherche personnalisée' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display tracking-widest text-sm mb-6 text-[#C9A84C]">SERVICES</h4>
            <ul className="space-y-3">
              {[
                { href: '/reprise', label: 'Estimation reprise' },
                { href: '/simulateurs', label: 'Simulateur de prix' },
                { href: '/simulateurs', label: 'Simulateur assurance' },
                { href: '/contact', label: 'Contact & Horaires' },
              ].map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="text-sm text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display tracking-widest text-sm mb-6 text-[#C9A84C]">CONTACT</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/40">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#C9A84C]" />
                <span>12 Avenue des Champs-Élysées<br/>75008 Paris</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/40">
                <Phone size={14} className="shrink-0 text-[#C9A84C]" />
                <a href="tel:+33123456789" className="hover:text-white transition-colors">01 23 45 67 89</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/40">
                <Clock size={14} className="mt-0.5 shrink-0 text-[#C9A84C]" />
                <span>Lun – Sam : 9h – 19h<br/>Dim : Sur RDV</span>
              </li>
              <li>
                <a
                  href="https://wa.me/33123456789"
                  className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
                >
                  <ExternalLink size={12} />
                  WhatsApp direct
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#2A2A2A] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20">© 2026 RS Stark. Tous droits réservés.</p>
          <div className="flex gap-6 text-xs text-white/20">
            <Link href="/mentions-legales" className="hover:text-white/60 transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white/60 transition-colors">Confidentialité</Link>
            <Link href="/cgv" className="hover:text-white/60 transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
