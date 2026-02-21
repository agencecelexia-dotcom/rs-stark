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
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 96, background: 'var(--color-bg)' }}>
        <p className="font-display" style={{ fontSize: 80, color: 'var(--color-navy)', opacity: 0.08, marginBottom: 16 }}>404</p>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 32, fontSize: 16 }}>Vehicule introuvable</p>
        <Link href="/vente" className="btn-secondary">
          <ArrowLeft size={14} /> Retour au stock
        </Link>
      </div>
    )
  }

  const specs = [
    { icon: Calendar, label: 'Annee',      value: String(vehicle.annee)                      },
    { icon: Gauge,    label: 'Kilometrage', value: `${vehicle.km.toLocaleString('fr-FR')} km` },
    { icon: Zap,      label: 'Puissance',   value: `${vehicle.puissance} ch`                  },
    { icon: Fuel,     label: 'Carburant',   value: vehicle.carburant                          },
  ]

  const badgeCls = vehicle.statut === 'vente' ? 'badge-vente' : vehicle.statut === 'vendu' ? 'badge-vendu' : 'badge-preparation'
  const badgeLabel = vehicle.statut === 'vente' ? 'Disponible' : vehicle.statut === 'vendu' ? 'Vendu' : 'En preparation'

  return (
    <div className="page-section" style={{ minHeight: '100vh', paddingTop: 96, paddingBottom: 96, background: 'var(--color-bg)' }}>

      {/* Breadcrumb */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 24px' }}>
        <div className="flex items-center gap-2" style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Accueil</Link>
          <span style={{ opacity: 0.3 }}>/</span>
          <Link href="/vente" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Stock</Link>
          <span style={{ opacity: 0.3 }}>/</span>
          <span style={{ color: 'var(--color-navy)', fontWeight: 500 }}>{vehicle.marque} {vehicle.modele}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT -- Placeholder visuel */}
          <div>
            <div className="img-ph" style={{ aspectRatio: '16/10', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, borderRadius: 16 }}>
              <span className="font-display vehicle-brand-text" style={{ fontSize: 52, color: 'var(--color-navy)', opacity: 0.06, letterSpacing: '0.05em', userSelect: 'none' }}>
                {vehicle.marque.toUpperCase()}
              </span>
              <div style={{ position: 'absolute', top: 16, left: 16 }}>
                <span className={badgeCls}>
                  {badgeLabel}
                </span>
              </div>
            </div>

            {/* Garanties incluses */}
            <div className="glass-card" style={{ padding: 28 }}>
              <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 16 }}>Inclus avec ce vehicule</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Garantie 6 mois RS Stark',
                  'Inspection 150 points realisee',
                  'Historique complet verifie',
                  "Carnet d'entretien controle",
                  'Livraison possible sur toute la France',
                ].map((g) => (
                  <div key={g} className="flex items-center gap-3">
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={11} style={{ color: 'var(--color-accent)' }} />
                    </div>
                    <span style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>{g}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT -- Infos */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className="section-tag" style={{ marginBottom: 8 }}>{vehicle.marque}</p>
            <h1 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--color-navy)', lineHeight: 0.95, marginBottom: 8 }}>{vehicle.modele}</h1>
            <p style={{ fontSize: 18, color: 'var(--color-text-muted)', marginBottom: 24 }}>{vehicle.version} -- {vehicle.annee}</p>

            {/* Prix */}
            <div style={{ paddingBottom: 24, borderBottom: '1px solid var(--color-border)', marginBottom: 24 }}>
              {vehicle.prix ? (
                <>
                  <p className="font-display" style={{ fontSize: 40, color: 'var(--color-navy)' }}>
                    {vehicle.prix.toLocaleString('fr-FR')} EUR
                  </p>
                  <p style={{ fontSize: 13, color: '#16a34a', fontWeight: 500, marginTop: 4 }}>Prix le plus bas garanti</p>
                </>
              ) : (
                <p className="font-display" style={{ fontSize: 24, color: 'var(--color-text-muted)' }}>Prix sur demande</p>
              )}
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3" style={{ marginBottom: 24 }}>
              {specs.map((spec) => (
                <div key={spec.label} className="glass-card" style={{ padding: 18 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(12,27,51,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <spec.icon size={15} style={{ color: 'var(--color-navy)' }} />
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 4 }}>{spec.label}</p>
                  <p style={{ fontSize: 14, color: 'var(--color-navy)', fontWeight: 600 }}>{spec.value}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            {vehicle.statut === 'vente' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                <button
                  onClick={() => setShowModal('reserve')}
                  className="btn-primary"
                  style={{ width: '100%', padding: '16px 32px', fontSize: 15 }}
                >
                  Reserver ce vehicule
                </button>
                <button
                  onClick={() => setShowModal('financement')}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '16px 32px', fontSize: 14 }}
                >
                  Demander un financement
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/reprise" className="btn-secondary" style={{ padding: '12px 16px', fontSize: 13, justifyContent: 'center' }}>
                    Reprise de mon vehicule
                  </Link>
                  <a href="tel:+33123456789" className="flex items-center justify-center gap-2" style={{ padding: '12px 16px', borderRadius: 50, border: '1.5px solid rgba(22,163,106,0.25)', color: '#16a34a', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}>
                    <Phone size={14} /> Appeler
                  </a>
                </div>
              </div>
            )}

            <a href="tel:+33123456789" className="flex items-center gap-3" style={{ color: 'var(--color-text-muted)', fontSize: 14, textDecoration: 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(12,27,51,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={14} style={{ color: 'var(--color-navy)' }} />
              </div>
              01 23 45 67 89 -- Disponible Lun-Sam 9h-19h
            </a>
          </motion.div>
        </div>

        {/* Back */}
        <div style={{ marginTop: 64 }}>
          <Link href="/vente" className="flex items-center gap-2" style={{ color: 'var(--color-text-muted)', fontSize: 14, textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>
            <ArrowLeft size={16} /> Retour au stock
          </Link>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setShowModal(null); setFormSent(false) }}
            style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(12,27,51,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="vehicle-modal"
              style={{ background: 'var(--color-surface)', borderRadius: 20, padding: 36, maxWidth: 480, width: '100%', boxShadow: '0 24px 80px rgba(12,27,51,0.2)' }}
            >
              {formSent ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(201,168,76,0.08)', border: '1.5px solid var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <Check size={24} style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <h3 className="font-display" style={{ fontSize: 26, color: 'var(--color-navy)', marginBottom: 12 }}>Demande envoyee</h3>
                  <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>Notre equipe vous contacte dans les 2 heures ouvrees.</p>
                  <button onClick={() => { setShowModal(null); setFormSent(false) }} style={{ marginTop: 24, color: 'var(--color-accent)', fontSize: 14, fontWeight: 500, background: 'none', border: 'none', textDecoration: 'underline', textUnderlineOffset: 4 }}>Fermer</button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center" style={{ marginBottom: 24 }}>
                    <h3 className="font-display" style={{ fontSize: 22, color: 'var(--color-navy)' }}>
                      {showModal === 'reserve' ? 'Reserver ce vehicule' : 'Demander un financement'}
                    </h3>
                    <button onClick={() => setShowModal(null)} style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', fontSize: 22, lineHeight: 1, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>x</button>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
                    {showModal === 'reserve'
                      ? "Versez un acompte de 200 EUR pour bloquer ce vehicule pendant 48h. Remboursable si vous changez d'avis."
                      : 'Notre equipe vous propose un financement sur mesure. Reponse sous 24h.'}
                  </p>
                  <form onSubmit={(e) => { e.preventDefault(); setFormSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      { placeholder: 'Prenom',    type: 'text'  },
                      { placeholder: 'Nom',       type: 'text'  },
                      { placeholder: 'Telephone', type: 'tel'   },
                      { placeholder: 'Email',     type: 'email' },
                    ].map((f) => (
                      <input key={f.placeholder} required type={f.type} placeholder={f.placeholder} className="input-rounded" />
                    ))}
                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px 32px', fontSize: 14, marginTop: 8 }}>
                      {showModal === 'reserve' ? 'Confirmer la reservation' : 'Envoyer ma demande'}
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
