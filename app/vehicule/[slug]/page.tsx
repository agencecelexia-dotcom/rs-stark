'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Phone, Gauge, Fuel, Zap, Calendar } from 'lucide-react'
import { getVehicleBySlug } from '@/lib/data'

export default function VehiclePage() {
  const params  = useParams()
  const vehicle = getVehicleBySlug(params.slug as string)

  const [showModal, setShowModal] = useState<'reserve' | 'financement' | null>(null)
  const [formSent, setFormSent] = useState(false)

  if (!vehicle) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 96 }}>
        <p className="font-display" style={{ fontSize: 64, color: 'rgba(255,255,255,0.08)', marginBottom: 16 }}>404</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>Véhicule introuvable</p>
        <Link href="/vente" style={{ color: '#C9A84C', fontFamily: 'var(--font-code,monospace)', fontSize: 13, textDecoration: 'none' }}>← Retour au stock</Link>
      </div>
    )
  }

  const specs = [
    { icon: Calendar, label: 'Année',      value: String(vehicle.annee)                      },
    { icon: Gauge,    label: 'Kilométrage', value: `${vehicle.km.toLocaleString('fr-FR')} km` },
    { icon: Zap,      label: 'Puissance',   value: `${vehicle.puissance} ch`                  },
    { icon: Fuel,     label: 'Carburant',   value: vehicle.carburant                          },
  ]

  const badgeColor = vehicle.statut === 'vente' ? '#4ade80' : vehicle.statut === 'vendu' ? '#f87171' : '#fbbf24'
  const badgeBg    = vehicle.statut === 'vente' ? 'rgba(34,197,94,0.1)' : vehicle.statut === 'vendu' ? 'rgba(239,68,68,0.1)' : 'rgba(234,179,8,0.1)'
  const badgeLabel = vehicle.statut === 'vente' ? 'DISPONIBLE' : vehicle.statut === 'vendu' ? 'VENDU' : 'EN PRÉPARATION'

  const INPUT_STYLE: React.CSSProperties = {
    background: '#0A0A0A', border: '1px solid #2A2A2A', color: 'white',
    padding: '12px 16px', fontSize: 13, outline: 'none',
    fontFamily: 'var(--font-code,monospace)', width: '100%', boxSizing: 'border-box',
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 96, paddingBottom: 96 }}>

      {/* Breadcrumb */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, fontFamily: 'var(--font-code,monospace)', color: 'rgba(255,255,255,0.3)' }}>
          <Link href="/"      style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link>
          <span>/</span>
          <Link href="/vente" style={{ color: 'inherit', textDecoration: 'none' }}>Stock</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>{vehicle.marque} {vehicle.modele}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT — Placeholder visuel */}
          <div>
            <div className="img-ph" style={{ aspectRatio: '16/10', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <span className="font-display" style={{ fontSize: 52, color: 'rgba(255,255,255,0.04)', letterSpacing: '0.05em', userSelect: 'none' }}>
                {vehicle.marque.toUpperCase()}
              </span>
              <div style={{ position: 'absolute', top: 16, left: 16 }}>
                <span style={{ background: badgeBg, color: badgeColor, border: `1px solid ${badgeColor}40`, fontFamily: 'var(--font-code,monospace)', fontSize: 10, letterSpacing: '0.2em', padding: '3px 8px', textTransform: 'uppercase' }}>
                  {badgeLabel}
                </span>
              </div>
            </div>

            {/* Garanties incluses */}
            <div style={{ background: '#111', border: '1px solid #2A2A2A', padding: 24 }}>
              <p style={{ fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 16 }}>Inclus avec ce véhicule</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Garantie 6 mois RS Stark',
                  'Inspection 150 points réalisée',
                  'Historique complet vérifié',
                  "Carnet d'entretien contrôlé",
                  'Livraison possible sur toute la France',
                ].map((g) => (
                  <div key={g} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                    <Check size={12} style={{ color: '#C9A84C', flexShrink: 0 }} />
                    {g}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Infos */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)', marginBottom: 8 }}>{vehicle.marque}</p>
            <h1 className="font-display" style={{ fontSize: 'clamp(40px,6vw,72px)', color: 'white', lineHeight: 0.95, marginBottom: 8 }}>{vehicle.modele}</h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>{vehicle.version} · {vehicle.annee}</p>

            {/* Prix */}
            <div style={{ paddingBottom: 24, borderBottom: '1px solid #2A2A2A', marginBottom: 24 }}>
              {vehicle.prix ? (
                <>
                  <p style={{ fontFamily: 'var(--font-code,monospace)', fontSize: 40, color: '#C9A84C' }}>
                    {vehicle.prix.toLocaleString('fr-FR')} €
                  </p>
                  <p style={{ fontSize: 11, color: '#4ade80', fontFamily: 'var(--font-code,monospace)', marginTop: 4 }}>Prix le plus bas garanti</p>
                </>
              ) : (
                <p style={{ fontFamily: 'var(--font-code,monospace)', fontSize: 24, color: 'rgba(255,255,255,0.3)' }}>Prix sur demande</p>
              )}
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3" style={{ marginBottom: 24 }}>
              {specs.map((spec) => (
                <div key={spec.label} style={{ background: '#111', border: '1px solid #2A2A2A', padding: 16 }}>
                  <spec.icon size={13} style={{ color: '#C9A84C', marginBottom: 8 }} />
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)', marginBottom: 4 }}>{spec.label}</p>
                  <p style={{ fontFamily: 'var(--font-code,monospace)', fontSize: 13, color: 'white' }}>{spec.value}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            {vehicle.statut === 'vente' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                <button
                  onClick={() => setShowModal('reserve')}
                  style={{ padding: '16px', background: '#C9A84C', color: '#000', fontFamily: 'var(--font-heading,sans-serif)', fontSize: 15, letterSpacing: '0.2em', border: 'none', width: '100%', cursor: 'none' }}
                >
                  RÉSERVER CE VÉHICULE
                </button>
                <button
                  onClick={() => setShowModal('financement')}
                  style={{ padding: '16px', background: 'transparent', color: 'white', fontFamily: 'var(--font-heading,sans-serif)', fontSize: 14, letterSpacing: '0.15em', border: '1px solid #2A2A2A', width: '100%', cursor: 'none' }}
                >
                  DEMANDER UN FINANCEMENT
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/reprise" style={{ padding: '12px', border: '1px solid #2A2A2A', color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 12, fontFamily: 'var(--font-code,monospace)', textDecoration: 'none', display: 'block' }}>
                    Reprise de mon véhicule
                  </Link>
                  <a href="tel:+33123456789" style={{ padding: '12px', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', textAlign: 'center', fontSize: 12, fontFamily: 'var(--font-code,monospace)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, textDecoration: 'none' }}>
                    <Phone size={12} /> Appeler
                  </a>
                </div>
              </div>
            )}

            <a href="tel:+33123456789" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.35)', fontSize: 13, textDecoration: 'none', fontFamily: 'var(--font-code,monospace)' }}>
              <Phone size={13} style={{ color: '#C9A84C' }} />
              01 23 45 67 89 — Disponible Lun-Sam 9h-19h
            </a>
          </motion.div>
        </div>

        {/* Back */}
        <div style={{ marginTop: 64 }}>
          <Link href="/vente" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.3)', fontSize: 13, fontFamily: 'var(--font-code,monospace)', textDecoration: 'none' }}>
            <ArrowLeft size={13} /> Retour au stock
          </Link>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setShowModal(null); setFormSent(false) }}
            style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              style={{ background: '#111', border: '1px solid #2A2A2A', padding: 32, maxWidth: 480, width: '100%' }}
            >
              {formSent ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ width: 64, height: 64, border: '1px solid #C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <Check size={24} style={{ color: '#C9A84C' }} />
                  </div>
                  <h3 className="font-display" style={{ fontSize: 28, color: 'white', marginBottom: 12 }}>DEMANDE ENVOYÉE</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Notre équipe vous contacte dans les 2 heures ouvrées.</p>
                  <button onClick={() => { setShowModal(null); setFormSent(false) }} style={{ marginTop: 24, color: '#C9A84C', fontSize: 12, fontFamily: 'var(--font-code,monospace)', background: 'none', border: 'none', cursor: 'none' }}>Fermer</button>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h3 className="font-display" style={{ fontSize: 22, color: 'white' }}>
                      {showModal === 'reserve' ? 'RÉSERVER CE VÉHICULE' : 'DEMANDER UN FINANCEMENT'}
                    </h3>
                    <button onClick={() => setShowModal(null)} style={{ color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', fontSize: 18, lineHeight: 1, cursor: 'none' }}>✕</button>
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>
                    {showModal === 'reserve'
                      ? "Versez un acompte de 200 € pour bloquer ce véhicule pendant 48h. Remboursable si vous changez d'avis."
                      : 'Notre équipe vous propose un financement sur mesure. Réponse sous 24h.'}
                  </p>
                  <form onSubmit={(e) => { e.preventDefault(); setFormSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { placeholder: 'Prénom',    type: 'text'  },
                      { placeholder: 'Nom',       type: 'text'  },
                      { placeholder: 'Téléphone', type: 'tel'   },
                      { placeholder: 'Email',     type: 'email' },
                    ].map((f) => (
                      <input key={f.placeholder} required type={f.type} placeholder={f.placeholder} style={INPUT_STYLE} />
                    ))}
                    <button type="submit" style={{ padding: '16px', background: '#C9A84C', color: '#000', fontFamily: 'var(--font-heading,sans-serif)', fontSize: 14, letterSpacing: '0.2em', border: 'none', marginTop: 8, cursor: 'none' }}>
                      {showModal === 'reserve' ? 'CONFIRMER LA RÉSERVATION' : 'ENVOYER MA DEMANDE'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
