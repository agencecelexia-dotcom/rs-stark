'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/vente', label: 'À Vendre' },
  { href: '/vendu', label: 'Vendus' },
  { href: '/preparation', label: 'En Préparation' },
  { href: '/recherche', label: 'Recherche' },
  { href: '/reprise', label: 'Reprise' },
  { href: '/simulateurs', label: 'Simulateurs' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'glass border-b border-white/5 py-3' : 'py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border border-[#C9A84C] flex items-center justify-center">
              <span className="text-[#C9A84C] font-display text-xs tracking-widest">RS</span>
            </div>
            <span className="font-display text-xl tracking-[0.2em] text-white group-hover:text-[#C9A84C] transition-colors">
              RS STARK
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm tracking-widest uppercase transition-colors relative',
                  pathname === link.href
                    ? 'text-[#C9A84C]'
                    : 'text-white/60 hover:text-white'
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[#C9A84C]"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+33123456789"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <Phone size={14} />
              01 23 45 67 89
            </a>
            <Link
              href="/reprise"
              className="px-4 py-2 border border-[#C9A84C] text-[#C9A84C] text-xs tracking-widest uppercase hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
            >
              Estimer ma reprise
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col pt-24 px-8 pb-8"
          >
            <nav className="flex flex-col gap-6 flex-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'font-display text-4xl tracking-wider transition-colors',
                      pathname === link.href ? 'text-[#C9A84C]' : 'text-white/80 hover:text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex flex-col gap-4 mt-auto">
              <a href="tel:+33123456789" className="flex items-center gap-3 text-white/60">
                <Phone size={16} />
                <span>01 23 45 67 89</span>
              </a>
              <Link
                href="/reprise"
                className="w-full py-4 bg-[#C9A84C] text-black text-center font-display tracking-widest text-lg"
              >
                ESTIMER MA REPRISE
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
