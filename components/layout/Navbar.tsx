'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const NAV = [
  { href: '/vente',       label: 'À Vendre'      },
  { href: '/vendu',       label: 'Vendus'         },
  { href: '/preparation', label: 'En Préparation' },
  { href: '/reprise',     label: 'Reprise'        },
  { href: '/simulateurs', label: 'Simulateurs'    },
  { href: '/contact',     label: 'Contact'        },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-3 border-b border-[#2A2A2A]' : 'py-6'}`}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-8 h-8 border border-[#C9A84C] flex items-center justify-center shrink-0">
              <span className="font-display text-[#C9A84C]" style={{ fontSize: 11, letterSpacing: '0.3em' }}>RS</span>
            </div>
            <span className="font-display text-white text-xl" style={{ letterSpacing: '0.22em' }}>
              RS STARK
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className="relative no-underline" style={{ textDecoration: 'none' }}>
                <span
                  className="transition-colors duration-200"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: pathname === l.href ? '#C9A84C' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {l.label}
                </span>
                {pathname === l.href && (
                  <motion.span
                    layoutId="nav-bar"
                    className="absolute inset-x-0 -bottom-1 block h-px bg-[#C9A84C]"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+33123456789"
              className="flex items-center gap-1.5 no-underline transition-colors duration-200"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-code, monospace)' }}
            >
              <Phone size={11} />
              01 23 45 67 89
            </a>
            <Link
              href="/reprise"
              className="no-underline transition-all duration-300"
              style={{
                padding: '9px 20px',
                border: '1px solid #C9A84C',
                color: '#C9A84C',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Estimer ma reprise
            </Link>
          </div>

          {/* Burger */}
          <button
            className="lg:hidden text-white bg-transparent border-0"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: '#0A0A0A', paddingTop: 112, paddingLeft: 32, paddingRight: 32, paddingBottom: 40 }}
          >
            <nav className="flex flex-col gap-8 flex-1">
              {NAV.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    className="font-display no-underline transition-colors duration-200"
                    style={{
                      fontSize: 36,
                      letterSpacing: '0.08em',
                      display: 'block',
                      color: pathname === l.href ? '#C9A84C' : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex flex-col gap-4" style={{ borderTop: '1px solid #2A2A2A', paddingTop: 32 }}>
              <a
                href="tel:+33123456789"
                className="flex items-center gap-3 no-underline"
                style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-code, monospace)' }}
              >
                <Phone size={14} />
                01 23 45 67 89
              </a>
              <Link
                href="/reprise"
                className="font-display no-underline text-center"
                style={{ display: 'block', padding: '16px', background: '#C9A84C', color: '#000', fontSize: 20, letterSpacing: '0.2em' }}
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
