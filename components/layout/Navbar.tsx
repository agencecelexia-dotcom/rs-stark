'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react'

const VEHICLE_LINKS = [
  { href: '/vente',       label: 'À vendre' },
  { href: '/preparation', label: 'En préparation' },
  { href: '/vendu',       label: 'Vendus' },
]

const NAV_LINKS = [
  { href: '/reprise',     label: 'Reprise' },
  { href: '/simulateurs', label: 'Simulateurs' },
  { href: '/contact',     label: 'Contact' },
]

const EASE = [0.22, 1, 0.36, 1] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [vehicleDropdown, setVehicleDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // On homepage with dark hero, navbar uses light colors until scrolled
  const isHomepage = pathname === '/'
  const onDarkBg = isHomepage && !scrolled

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
    setVehicleDropdown(false)
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

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setVehicleDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isVehiclePage = ['/vente', '/vendu', '/preparation'].some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  )

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
          ${scrolled ? 'glass' : ''}
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
                background: onDarkBg ? 'rgba(255,255,255,0.15)' : '#0C1B33',
                borderRadius: 8,
                border: onDarkBg ? '1px solid rgba(255,255,255,0.2)' : 'none',
                transition: 'all 0.4s ease',
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
              className="font-display hidden sm:inline-block transition-all duration-300"
              style={{
                fontSize: 18,
                letterSpacing: '0.12em',
                color: onDarkBg ? '#FFFFFF' : '#0C1B33',
                fontWeight: 600,
              }}
            >
              RS Stark
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Véhicules dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setVehicleDropdown((v) => !v)}
                onMouseEnter={() => setVehicleDropdown(true)}
                className="relative no-underline px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1 bg-transparent border-0"
                style={{ textDecoration: 'none' }}
              >
                <span
                  className="transition-all duration-200"
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: onDarkBg
                      ? (isVehiclePage ? '#FFFFFF' : 'rgba(255,255,255,0.7)')
                      : (isVehiclePage ? '#0C1B33' : '#5A6B80'),
                    letterSpacing: '0.01em',
                  }}
                >
                  Véhicules
                </span>
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200"
                  style={{
                    color: onDarkBg
                      ? (isVehiclePage ? '#FFFFFF' : 'rgba(255,255,255,0.7)')
                      : (isVehiclePage ? '#0C1B33' : '#5A6B80'),
                    transform: vehicleDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
                {isVehiclePage && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                    style={{ background: '#0C1B33' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              {/* Dropdown menu */}
              <AnimatePresence>
                {vehicleDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    onMouseLeave={() => setVehicleDropdown(false)}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: 8,
                      background: '#FFFFFF',
                      borderRadius: 12,
                      boxShadow: '0 12px 40px rgba(12,27,51,0.1), 0 2px 8px rgba(12,27,51,0.04)',
                      border: '1px solid #E2E5EA',
                      overflow: 'hidden',
                      minWidth: 200,
                      zIndex: 60,
                    }}
                  >
                    {VEHICLE_LINKS.map((link) => {
                      const isActive = pathname === link.href
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center no-underline px-5 py-3 transition-all duration-200"
                          style={{
                            fontSize: 14,
                            fontWeight: isActive ? 500 : 400,
                            color: isActive ? '#0C1B33' : '#5A6B80',
                            textDecoration: 'none',
                            background: isActive ? 'rgba(12,27,51,0.03)' : 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) e.currentTarget.style.background = 'rgba(12,27,51,0.02)'
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          {link.label}
                        </Link>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other nav links */}
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
                      color: onDarkBg
                        ? (isActive ? '#FFFFFF' : 'rgba(255,255,255,0.7)')
                        : (isActive ? '#0C1B33' : '#5A6B80'),
                      letterSpacing: '0.01em',
                    }}
                  >
                    {link.label}
                  </span>
                  {isActive && !isVehiclePage && (
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
            <Link
              href="/contact"
              className={onDarkBg ? '' : 'btn-primary'}
              style={onDarkBg
                ? { padding: '10px 24px', fontSize: 13, borderRadius: 50, border: '1.5px solid rgba(255,255,255,0.3)', color: '#FFFFFF', background: 'rgba(255,255,255,0.1)', display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 500, textDecoration: 'none', transition: 'all 0.3s' }
                : { padding: '10px 24px', fontSize: 13 }
              }
            >
              Nous contacter
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* ── Mobile Burger ── */}
          <button
            className="lg:hidden flex items-center justify-center bg-transparent border-0 p-2 rounded-lg transition-colors duration-200"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            style={{ color: onDarkBg ? '#FFFFFF' : '#0C1B33', transition: 'color 0.3s' }}
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
            className="fixed left-4 right-4"
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
              {/* Véhicules section header */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0, duration: 0.3, ease: EASE }}
              >
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase', padding: '12px 24px 4px' }}>
                  Véhicules
                </p>
              </motion.div>
              {VEHICLE_LINKS.map((link, i) => {
                const isActive = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + 1) * 0.04, duration: 0.3, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center no-underline px-6 py-3 transition-colors duration-200"
                      style={{
                        fontSize: 15,
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

              {/* Divider */}
              <div style={{ height: 1, background: '#E2E5EA', margin: '8px 20px' }} />

              {/* Other links */}
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + VEHICLE_LINKS.length + 1) * 0.04, duration: 0.3, ease: EASE }}
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
