'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const NAV_LINKS = [
  { href: '/vente',       label: 'Vehicules' },
  { href: '/reprise',     label: 'Reprise' },
  { href: '/simulateurs', label: 'Simulateurs' },
  { href: '/contact',     label: 'Contact' },
]

const EASE = [0.22, 1, 0.36, 1] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* ── Header ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`
          fixed top-0 inset-x-0 z-50
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${scrolled ? 'glass' : 'bg-transparent'}
        `}
        style={{ height: 72 }}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div
              className="flex items-center justify-center shrink-0 transition-all duration-300 group-hover:shadow-lg"
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
              className="font-display hidden sm:inline-block transition-opacity duration-300"
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

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative no-underline px-4 py-2 rounded-lg transition-colors duration-200"
                  style={{ textDecoration: 'none' }}
                >
                  <span
                    className="transition-all duration-200"
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: isActive ? '#0C1B33' : '#5A6B80',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                      style={{ background: '#0C1B33' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center">
            <Link href="/contact" className="btn-primary" style={{ padding: '10px 24px', fontSize: 13 }}>
              Nous contacter
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* ── Mobile Burger ── */}
          <button
            className="lg:hidden flex items-center justify-center bg-transparent border-0 p-2 rounded-lg transition-colors duration-200"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            style={{ color: '#0C1B33' }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(12, 27, 51, 0.2)', backdropFilter: 'blur(4px)' }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed z-45 left-4 right-4"
            style={{
              top: 80,
              zIndex: 45,
              background: '#FFFFFF',
              borderRadius: 16,
              boxShadow: '0 20px 60px rgba(12, 27, 51, 0.15), 0 4px 16px rgba(12, 27, 51, 0.08)',
              border: '1px solid #E2E5EA',
              overflow: 'hidden',
            }}
          >
            <nav className="flex flex-col py-2">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center no-underline px-6 py-4 transition-colors duration-200"
                      style={{
                        fontSize: 16,
                        fontWeight: isActive ? 500 : 400,
                        color: isActive ? '#0C1B33' : '#5A6B80',
                        textDecoration: 'none',
                        borderLeft: isActive ? '3px solid #0C1B33' : '3px solid transparent',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Mobile CTA */}
            <div style={{ padding: '8px 20px 20px', borderTop: '1px solid #E2E5EA' }}>
              <Link
                href="/contact"
                className="btn-primary no-underline"
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  fontSize: 14,
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
              >
                Nous contacter
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
