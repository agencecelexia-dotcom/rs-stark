'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, X } from 'lucide-react'
import { getVehicleBySlug } from '@/lib/data'

export default function FloatingContact() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  // Show after 4 seconds or 30% scroll
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 4000)
    const handleScroll = () => {
      if (window.scrollY > document.body.scrollHeight * 0.3) {
        setVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => { clearTimeout(timer); window.removeEventListener('scroll', handleScroll) }
  }, [])

  // Build WhatsApp message based on current page
  const slug = pathname.startsWith('/vehicule/') ? pathname.split('/').pop() : null
  const vehicle = slug ? getVehicleBySlug(slug) : null
  const whatsappMsg = vehicle
    ? `Bonjour, je suis intéressé(e) par le ${vehicle.marque} ${vehicle.modele} ${vehicle.version} (${vehicle.annee}). Pouvez-vous me donner plus d'informations ?`
    : "Bonjour, j'aimerais avoir des informations sur vos véhicules disponibles."
  const whatsappUrl = `https://wa.me/33123456789?text=${encodeURIComponent(whatsappMsg)}`

  // Check business hours (Mon-Sat 9-19)
  const now = new Date()
  const hour = now.getHours()
  const day = now.getDay()
  const isOpen = day >= 1 && day <= 6 && hour >= 9 && hour < 19

  if (!visible) return null

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 45 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute', bottom: 68, right: 0,
              background: '#FFFFFF', borderRadius: 16,
              boxShadow: '0 12px 40px rgba(12,27,51,0.12), 0 2px 8px rgba(12,27,51,0.04)',
              border: '1px solid #E2E5EA', width: 260,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E5EA' }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#0C1B33', marginBottom: 4 }}>Besoin d&apos;aide ?</p>
              <p style={{ fontSize: 12, color: '#5A6B80', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: isOpen ? '#16a34a' : '#dc2626',
                  display: 'inline-block',
                }} />
                {isOpen ? 'En ligne — réponse rapide' : 'Hors horaires — réponse sous 2h'}
              </p>
            </div>
            <div style={{ padding: 8 }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px', borderRadius: 10,
                  textDecoration: 'none', color: '#0C1B33',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(34,197,94,0.06)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'rgba(34,197,94,0.1)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <MessageCircle size={18} style={{ color: '#16a34a' }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500 }}>WhatsApp</p>
                  <p style={{ fontSize: 11, color: '#5A6B80' }}>Réponse instantanée</p>
                </div>
              </a>
              <a
                href="tel:+33123456789"
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px', borderRadius: 10,
                  textDecoration: 'none', color: '#0C1B33',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(12,27,51,0.03)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'rgba(12,27,51,0.05)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Phone size={18} style={{ color: '#0C1B33' }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500 }}>Appeler</p>
                  <p style={{ fontSize: 11, color: '#5A6B80' }}>01 23 45 67 89</p>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 56, height: 56, borderRadius: '50%',
          background: '#0C1B33', color: '#FFFFFF',
          border: 'none', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(12,27,51,0.25)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(12,27,51,0.3)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(12,27,51,0.25)' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Online dot */}
        {isOpen && !open && (
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              position: 'absolute', top: 2, right: 2,
              width: 12, height: 12, borderRadius: '50%',
              background: '#16a34a', border: '2px solid #FFFFFF',
            }}
          />
        )}
      </motion.button>
    </div>
  )
}
