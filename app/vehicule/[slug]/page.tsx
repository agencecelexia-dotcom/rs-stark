'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowLeft, Check, Phone, Gauge, Fuel, Zap, Calendar, ChevronLeft, ChevronRight, Play, ExternalLink, Share2, Copy, MessageCircle } from 'lucide-react'
import { getVehicleBySlug, getSimilarVehicles } from '@/lib/data'
import VehicleCard from '@/components/vehicle/VehicleCard'

function getPopularity(slug: string): number {
  let hash = 0
  for (let i = 0; i < slug.length; i++) hash = ((hash << 5) - hash) + slug.charCodeAt(i)
  return Math.abs(hash % 8) + 3
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?#]+)/)
  return match ? match[1] : null
}

export default function VehiclePage() {
  const params  = useParams()
  const vehicle = getVehicleBySlug(params.slug as string)

  const [showModal, setShowModal] = useState<'reserve' | 'financement' | null>(null)
  const [formSent, setFormSent] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef)

  if (!vehicle) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 96, background: 'var(--color-bg)' }}>
        <p className="font-display" style={{ fontSize: 80, color: 'var(--color-navy)', opacity: 0.08, marginBottom: 16 }}>404</p>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 32, fontSize: 16 }}>Véhicule introuvable</p>
        <Link href="/vente" className="btn-secondary">
          <ArrowLeft size={14} /> Retour au stock
        </Link>
      </div>
    )
  }

  const similar = getSimilarVehicles(vehicle.slug, 4)
  const hasImages = vehicle.images.length > 0
  const hasMultipleImages = vehicle.images.length > 1
  const youtubeId = vehicle.youtubeUrl ? getYouTubeId(vehicle.youtubeUrl) : null

  const specs = [
    { icon: Calendar, label: 'Année',       value: String(vehicle.annee) },
    { icon: Gauge,    label: 'Kilométrage', value: `${vehicle.km.toLocaleString('fr-FR')} km` },
    { icon: Zap,      label: 'Puissance',   value: `${vehicle.puissance} ch` },
    { icon: Fuel,     label: 'Carburant',   value: vehicle.carburant },
  ]

  const badgeCls = vehicle.statut === 'vente' ? 'badge-vente' : vehicle.statut === 'vendu' ? 'badge-vendu' : 'badge-preparation'
  const badgeLabel = vehicle.statut === 'vente' ? 'Disponible' : vehicle.statut === 'vendu' ? 'Vendu' : 'En préparation'

  const nextImage = () => setCurrentImage((i) => (i + 1) % vehicle.images.length)
  const prevImage = () => setCurrentImage((i) => (i - 1 + vehicle.images.length) % vehicle.images.length)

  return (
    <div className="page-section" style={{ minHeight: '100vh', paddingTop: 96, paddingBottom: 96, background: 'var(--color-bg)' }}>

      {/* Breadcrumb */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 24px' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 0 }}>
          {/* breadcrumb existant */}
          <div className="flex items-center gap-2" style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Accueil</Link>
            <span style={{ opacity: 0.3 }}>/</span>
            <Link href="/vente" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Stock</Link>
            <span style={{ opacity: 0.3 }}>/</span>
            <span style={{ color: 'var(--color-navy)', fontWeight: 500 }}>{vehicle.marque} {vehicle.modele}</span>
          </div>

          {/* Share button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                if (typeof navigator !== 'undefined' && navigator.share) {
                  navigator.share({ title: `${vehicle.marque} ${vehicle.modele}`, url: window.location.href })
                } else {
                  setShareOpen((v) => !v)
                }
              }}
              className="flex items-center gap-2"
              style={{ fontSize: 13, color: '#5A6B80', background: 'none', border: '1.5px solid #E2E5EA', borderRadius: 50, padding: '8px 16px', fontWeight: 500, transition: 'all 0.2s' }}
            >
              <Share2 size={14} /> Partager
            </button>

            {/* Dropdown */}
            {shareOpen && (
              <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 8, background: '#FFFFFF', borderRadius: 12, boxShadow: '0 8px 32px rgba(12,27,51,0.1)', border: '1px solid #E2E5EA', overflow: 'hidden', zIndex: 10, minWidth: 200 }}>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => { setCopied(false); setShareOpen(false) }, 1500) }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'none', border: 'none', fontSize: 13, color: '#0C1B33', textAlign: 'left', cursor: 'pointer' }}>
                  {copied ? <Check size={14} style={{ color: '#16a34a' }} /> : <Copy size={14} />}
                  {copied ? 'Lien copié !' : 'Copier le lien'}
                </button>
                <a href={`https://wa.me/?text=${encodeURIComponent(`Regarde ce ${vehicle.marque} ${vehicle.modele} : ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', fontSize: 13, color: '#0C1B33', textDecoration: 'none', borderTop: '1px solid #E2E5EA' }}>
                  <MessageCircle size={14} style={{ color: '#16a34a' }} /> Partager sur WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT — Gallery */}
          <div>
            {/* Main image / carousel */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '16/10',
                borderRadius: 16,
                overflow: 'hidden',
                marginBottom: 12,
              }}
            >
              {hasImages ? (
                <>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${vehicle.images[currentImage]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#E8EBF0',
                      }}
                    />
                  </AnimatePresence>

                  {/* Fallback car icon overlay if image fails */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
                    <span className="font-display vehicle-brand-text" style={{ fontSize: 52, color: 'var(--color-navy)', opacity: 0.06, letterSpacing: '0.05em', userSelect: 'none' }}>
                      {vehicle.marque.toUpperCase()}
                    </span>
                  </div>

                  {/* Navigation arrows */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={prevImage}
                        style={{
                          position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 3,
                          width: 40, height: 40, borderRadius: '50%',
                          background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(12,27,51,0.06)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          backdropFilter: 'blur(8px)', transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}
                      >
                        <ChevronLeft size={18} style={{ color: '#0C1B33' }} />
                      </button>
                      <button
                        onClick={nextImage}
                        style={{
                          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 3,
                          width: 40, height: 40, borderRadius: '50%',
                          background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(12,27,51,0.06)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          backdropFilter: 'blur(8px)', transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}
                      >
                        <ChevronRight size={18} style={{ color: '#0C1B33' }} />
                      </button>

                      {/* Image counter */}
                      <div
                        style={{
                          position: 'absolute', bottom: 12, right: 12, zIndex: 3,
                          background: 'rgba(12,27,51,0.7)', color: '#fff',
                          fontSize: 12, fontWeight: 500, padding: '4px 12px',
                          borderRadius: 50, backdropFilter: 'blur(8px)',
                        }}
                      >
                        {currentImage + 1} / {vehicle.images.length}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="img-ph" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="font-display vehicle-brand-text" style={{ fontSize: 52, color: 'var(--color-navy)', opacity: 0.06, letterSpacing: '0.05em', userSelect: 'none' }}>
                    {vehicle.marque.toUpperCase()}
                  </span>
                </div>
              )}

              {/* Badge */}
              <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 3 }}>
                <span className={badgeCls}>{badgeLabel}</span>
              </div>
            </div>

            {/* Thumbnails row */}
            {hasMultipleImages && (
              <div className="flex gap-2" style={{ marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
                {vehicle.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    style={{
                      width: 72, height: 54, flexShrink: 0,
                      borderRadius: 10, overflow: 'hidden',
                      border: i === currentImage ? '2px solid #0C1B33' : '2px solid transparent',
                      opacity: i === currentImage ? 1 : 0.6,
                      transition: 'all 0.2s',
                      backgroundImage: `url(${img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: '#E8EBF0',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={(e) => { if (i !== currentImage) e.currentTarget.style.opacity = '0.6' }}
                  />
                ))}
              </div>
            )}

            {/* YouTube video section */}
            {youtubeId && (
              <div style={{ marginBottom: 20 }}>
                {showVideo ? (
                  <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden' }}>
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title={`${vehicle.marque} ${vehicle.modele} - Vidéo`}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="glass-card"
                    style={{
                      width: '100%', padding: '18px 24px',
                      display: 'flex', alignItems: 'center', gap: 14,
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-surface)',
                      textAlign: 'left',
                    }}
                  >
                    <div
                      style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: 'rgba(12,27,51,0.04)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Play size={18} style={{ color: 'var(--color-navy)', marginLeft: 2 }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 2 }}>
                        Voir la vidéo de présentation
                      </p>
                      <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                        Tour complet du véhicule sous tous les angles
                      </p>
                    </div>
                    <ExternalLink size={16} style={{ color: 'var(--color-text-muted)', marginLeft: 'auto', flexShrink: 0 }} />
                  </button>
                )}
              </div>
            )}

            {/* Garanties incluses */}
            <div className="glass-card" style={{ padding: 28 }}>
              <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 16 }}>Inclus avec ce véhicule</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Garantie 6 mois RS Stark',
                  'Inspection 150 points réalisée',
                  'Historique complet vérifié',
                  "Carnet d'entretien contrôlé",
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

          {/* RIGHT — Infos */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className="section-tag" style={{ marginBottom: 8 }}>{vehicle.marque}</p>
            <h1 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--color-navy)', lineHeight: 0.95, marginBottom: 8 }}>{vehicle.modele}</h1>
            <p style={{ fontSize: 18, color: 'var(--color-text-muted)', marginBottom: 24 }}>{vehicle.version} — {vehicle.annee}</p>

            {/* Prix */}
            <div style={{ paddingBottom: 24, borderBottom: '1px solid var(--color-border)', marginBottom: 24 }}>
              {vehicle.prix ? (
                <>
                  <p className="font-display" style={{ fontSize: 40, color: 'var(--color-navy)' }}>
                    {vehicle.prix.toLocaleString('fr-FR')} €
                  </p>
                  <p style={{ fontSize: 13, color: '#16a34a', fontWeight: 500, marginTop: 4 }}>Prix le plus bas garanti</p>
                </>
              ) : (
                <p className="font-display" style={{ fontSize: 24, color: 'var(--color-text-muted)' }}>Prix sur demande</p>
              )}
            </div>

            {/* Popularity indicator */}
            {vehicle.statut === 'vente' && (
              <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
                <motion.span
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', flexShrink: 0 }}
                />
                <span style={{ fontSize: 13, color: '#5A6B80' }}>
                  {getPopularity(vehicle.slug)} personnes consultent ce véhicule
                </span>
              </div>
            )}

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
              <div ref={ctaRef} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                <button
                  onClick={() => setShowModal('reserve')}
                  className="btn-primary"
                  style={{ width: '100%', padding: '16px 32px', fontSize: 15 }}
                >
                  Réserver ce véhicule
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
                    Reprise de mon véhicule
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
              01 23 45 67 89 — Disponible Lun-Sam 9h-19h
            </a>
          </motion.div>
        </div>

        {/* ── Similar Vehicles ── */}
        {similar.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <div style={{ marginBottom: 32 }}>
              <p className="section-tag">Véhicules similaires</p>
              <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--color-navy)', lineHeight: 1 }}>
                Vous pourriez aussi aimer
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similar.map((v, i) => (
                <VehicleCard key={v.slug} vehicle={v} index={i} />
              ))}
            </div>
          </div>
        )}

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
                  <h3 className="font-display" style={{ fontSize: 26, color: 'var(--color-navy)', marginBottom: 12 }}>Demande envoyée</h3>
                  <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>Notre équipe vous contacte dans les 2 heures ouvrées.</p>
                  <button onClick={() => { setShowModal(null); setFormSent(false) }} style={{ marginTop: 24, color: 'var(--color-accent)', fontSize: 14, fontWeight: 500, background: 'none', border: 'none', textDecoration: 'underline', textUnderlineOffset: 4 }}>Fermer</button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center" style={{ marginBottom: 24 }}>
                    <h3 className="font-display" style={{ fontSize: 22, color: 'var(--color-navy)' }}>
                      {showModal === 'reserve' ? 'Réserver ce véhicule' : 'Demander un financement'}
                    </h3>
                    <button onClick={() => setShowModal(null)} style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', fontSize: 22, lineHeight: 1, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>×</button>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
                    {showModal === 'reserve'
                      ? "Versez un acompte de 200 € pour bloquer ce véhicule pendant 48h. Remboursable si vous changez d'avis."
                      : 'Notre équipe vous propose un financement sur mesure. Réponse sous 24h.'}
                  </p>
                  <form onSubmit={(e) => { e.preventDefault(); setFormSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      { placeholder: 'Prénom',    type: 'text'  },
                      { placeholder: 'Nom',       type: 'text'  },
                      { placeholder: 'Téléphone', type: 'tel'   },
                      { placeholder: 'Email',     type: 'email' },
                    ].map((f) => (
                      <input key={f.placeholder} required type={f.type} placeholder={f.placeholder} className="input-rounded" />
                    ))}
                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px 32px', fontSize: 14, marginTop: 8 }}>
                      {showModal === 'reserve' ? 'Confirmer la réservation' : 'Envoyer ma demande'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky CTA Bar — Mobile */}
      <AnimatePresence>
        {vehicle.statut === 'vente' && !ctaInView && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden"
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
              background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
              borderTop: '1px solid #E2E5EA', padding: '12px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}
          >
            <div>
              <p className="font-display" style={{ fontSize: 20, color: '#0C1B33', lineHeight: 1 }}>
                {vehicle.prix ? `${vehicle.prix.toLocaleString('fr-FR')} €` : 'Sur demande'}
              </p>
              <p style={{ fontSize: 11, color: '#5A6B80' }}>{vehicle.marque} {vehicle.modele}</p>
            </div>
            <div className="flex items-center gap-2">
              <a href="tel:+33123456789" style={{
                width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #E2E5EA',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#16a34a', textDecoration: 'none',
              }}>
                <Phone size={18} />
              </a>
              <button onClick={() => setShowModal('reserve')} className="btn-primary" style={{ padding: '12px 24px', fontSize: 13 }}>
                Réserver
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
