'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight,
  Gauge, Fuel, Zap, Calendar, Users, DoorOpen, TrendingDown, Phone, MessageCircle
} from 'lucide-react'
import { getVehicleBySlug, formatPrice, formatKm } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function VehiclePage() {
  const params = useParams()
  const vehicle = getVehicleBySlug(params.slug as string)

  const [galleryIndex, setGalleryIndex] = useState(0)
  const [showModal, setShowModal] = useState<'reserve' | 'financement' | null>(null)
  const [formSent, setFormSent] = useState(false)

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24">
        <p className="font-display text-6xl text-white/20 mb-4">404</p>
        <p className="text-white/40 mb-8">Véhicule introuvable</p>
        <Link href="/vente" className="text-[#C9A84C] font-mono text-sm hover:underline">← Retour au stock</Link>
      </div>
    )
  }

  const specs = [
    { icon: Calendar, label: 'Année', value: String(vehicle.annee) },
    { icon: Gauge, label: 'Kilométrage', value: formatKm(vehicle.km) },
    { icon: Zap, label: 'Puissance', value: `${vehicle.puissance} ch` },
    { icon: Fuel, label: 'Carburant', value: vehicle.carburant },
    { icon: DoorOpen, label: 'Portes', value: String(vehicle.portes) },
    { icon: Users, label: 'Places', value: String(vehicle.places) },
  ]

  const avgMarket = vehicle.prixMarcheLbc && vehicle.prixMarcheCentrale
    ? Math.round((vehicle.prixMarcheLbc + vehicle.prixMarcheCentrale) / 2)
    : null

  return (
    <div className="min-h-screen pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-3 text-xs font-mono text-white/30">
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/vente" className="hover:text-white transition-colors">Stock</Link>
          <span>/</span>
          <span className="text-white/60">{vehicle.marque} {vehicle.modele}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT — Galerie */}
          <div>
            {/* Main image */}
            <div className="relative aspect-[4/3] bg-[#111] overflow-hidden mb-4 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={galleryIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={vehicle.photos[galleryIndex]}
                    alt={`${vehicle.marque} ${vehicle.modele} - photo ${galleryIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Nav arrows */}
              {vehicle.photos.length > 1 && (
                <>
                  <button onClick={() => setGalleryIndex((p) => (p === 0 ? vehicle.photos.length - 1 : p - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-[#C9A84C] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                    <ChevronLeft size={18} className="text-white" />
                  </button>
                  <button onClick={() => setGalleryIndex((p) => (p === vehicle.photos.length - 1 ? 0 : p + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-[#C9A84C] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                    <ChevronRight size={18} className="text-white" />
                  </button>
                </>
              )}

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className={cn('text-[10px] font-mono tracking-[0.2em] px-2 py-1 rounded-sm', `badge-${vehicle.statut}`)}>
                  {vehicle.statut === 'vente' ? 'DISPONIBLE' : vehicle.statut === 'vendu' ? 'VENDU' : 'EN PRÉPARATION'}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {vehicle.photos.map((photo, i) => (
                <button key={i} onClick={() => setGalleryIndex(i)} className={cn('relative aspect-square overflow-hidden border transition-all', i === galleryIndex ? 'border-[#C9A84C]' : 'border-[#2A2A2A] hover:border-white/20')}>
                  <Image src={photo} alt={`thumb ${i}`} fill className="object-cover" sizes="100px" />
                </button>
              ))}
            </div>

            {/* Prix marché comparatif */}
            {avgMarket && vehicle.prix && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 bg-[#111] border border-[#2A2A2A] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown size={14} className="text-[#C9A84C]" />
                  <p className="text-xs font-mono tracking-widest text-white/40 uppercase">Comparatif marché</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/60">RS Stark</span>
                    <span className="font-mono text-[#C9A84C] font-medium">{formatPrice(vehicle.prix)}</span>
                  </div>
                  {vehicle.prixMarcheLbc && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/30">LeBonCoin</span>
                      <span className="font-mono text-white/30 line-through">{formatPrice(vehicle.prixMarcheLbc)}</span>
                    </div>
                  )}
                  {vehicle.prixMarcheCentrale && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/30">La Centrale</span>
                      <span className="font-mono text-white/30 line-through">{formatPrice(vehicle.prixMarcheCentrale)}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-[#2A2A2A]">
                    <p className="text-xs text-green-400 font-mono">
                      Économie moyenne : {formatPrice(avgMarket - vehicle.prix)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT — Infos */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-2">{vehicle.marque}</p>
              <h1 className="font-display text-5xl md:text-6xl text-white mb-1">{vehicle.modele}</h1>
              <p className="text-white/40 text-xl mb-6">{vehicle.version}</p>

              {/* Prix */}
              <div className="flex items-end gap-4 mb-8 pb-8 border-b border-[#2A2A2A]">
                <p className="font-mono text-4xl text-[#C9A84C]">{formatPrice(vehicle.prix)}</p>
                {vehicle.prix && <p className="text-xs text-green-400 font-mono mb-1">Prix le plus bas garanti</p>}
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-[#111] border border-[#2A2A2A] p-4">
                    <spec.icon size={14} className="text-[#C9A84C] mb-2" />
                    <p className="text-[10px] text-white/30 tracking-widest uppercase mb-1">{spec.label}</p>
                    <p className="font-mono text-sm text-white">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div>
                  <p className="text-white/30 mb-1">Couleur extérieure</p>
                  <p className="text-white">{vehicle.couleur}</p>
                </div>
                <div>
                  <p className="text-white/30 mb-1">Intérieur</p>
                  <p className="text-white">{vehicle.couleurInterieure}</p>
                </div>
                <div>
                  <p className="text-white/30 mb-1">Boîte de vitesse</p>
                  <p className="text-white">{vehicle.boite}</p>
                </div>
                <div>
                  <p className="text-white/30 mb-1">Norme émissions</p>
                  <p className="text-white">{vehicle.normeEuro}</p>
                </div>
                <div>
                  <p className="text-white/30 mb-1">Nb propriétaires</p>
                  <p className="text-white">{vehicle.nbProprietaires}</p>
                </div>
                <div>
                  <p className="text-white/30 mb-1">Contrôle technique</p>
                  <p className={vehicle.ctOk ? 'text-green-400' : 'text-red-400'}>{vehicle.ctOk ? '✓ À jour' : '✗ À refaire'}</p>
                </div>
              </div>

              {/* CTAs */}
              {vehicle.statut === 'vente' && (
                <div className="flex flex-col gap-3 mb-8">
                  <button onClick={() => setShowModal('reserve')} className="w-full py-4 bg-[#C9A84C] text-black font-display tracking-[0.2em] text-lg hover:bg-[#E2C06A] transition-colors">
                    RÉSERVER CE VÉHICULE
                  </button>
                  <button onClick={() => setShowModal('financement')} className="w-full py-4 border border-[#2A2A2A] hover:border-[#C9A84C] text-white font-display tracking-[0.15em] transition-colors">
                    DEMANDER UN FINANCEMENT
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/reprise" className="py-3 border border-[#2A2A2A] hover:border-white/20 text-white/50 hover:text-white text-center text-sm font-mono transition-all">
                      Reprise de mon véhicule
                    </Link>
                    <a href="https://wa.me/33123456789" className="py-3 bg-green-900/20 border border-green-800/30 hover:border-green-600 text-green-400 text-center text-sm font-mono transition-all flex items-center justify-center gap-2">
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {/* Tel */}
              <a href="tel:+33123456789" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm mb-8">
                <Phone size={14} className="text-[#C9A84C]" />
                01 23 45 67 89 — Disponible Lun-Sam 9h-19h
              </a>

              {/* Garanties */}
              <div className="bg-[#111] border border-[#2A2A2A] p-5">
                <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-4">Inclus avec ce véhicule</p>
                <div className="space-y-2">
                  {[
                    'Garantie 6 mois RS Stark',
                    'Inspection 150 points réalisée',
                    'Historique complet vérifié',
                    'Carnet d\'entretien contrôlé',
                    'Livraison possible sur toute la France',
                  ].map((g) => (
                    <div key={g} className="flex items-center gap-3 text-sm text-white/60">
                      <Check size={12} className="text-[#C9A84C] shrink-0" />
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Options */}
        <div className="mt-16 border-t border-[#2A2A2A] pt-16">
          <h2 className="font-display text-3xl text-white mb-8">OPTIONS & ÉQUIPEMENTS</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {vehicle.options.map((opt) => (
              <div key={opt} className="flex items-center gap-3 border border-[#2A2A2A] px-4 py-3">
                <Check size={12} className="text-[#C9A84C] shrink-0" />
                <span className="text-sm text-white/60">{opt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mt-12 border-t border-[#2A2A2A] pt-12">
          <h2 className="font-display text-3xl text-white mb-6">À PROPOS DE CE VÉHICULE</h2>
          <p className="text-white/50 leading-relaxed max-w-3xl">{vehicle.description}</p>
        </div>

        {/* Back */}
        <div className="mt-12">
          <Link href="/vente" className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-sm font-mono">
            <ArrowLeft size={14} /> Retour au stock
          </Link>
        </div>
      </div>

      {/* Modal Réservation */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={() => { setShowModal(null); setFormSent(false) }}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#111] border border-[#2A2A2A] p-8 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
              {formSent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 border border-[#C9A84C] flex items-center justify-center mx-auto mb-6">
                    <Check size={24} className="text-[#C9A84C]" />
                  </div>
                  <h3 className="font-display text-3xl text-white mb-3">DEMANDE ENVOYÉE</h3>
                  <p className="text-white/40 text-sm">Notre équipe vous contacte dans les 2 heures ouvrées.</p>
                  <button onClick={() => { setShowModal(null); setFormSent(false) }} className="mt-6 text-[#C9A84C] text-sm font-mono hover:underline">Fermer</button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-display text-2xl text-white">
                      {showModal === 'reserve' ? 'RÉSERVER CE VÉHICULE' : 'DEMANDER UN FINANCEMENT'}
                    </h3>
                    <button onClick={() => setShowModal(null)} className="text-white/30 hover:text-white transition-colors">✕</button>
                  </div>
                  <p className="text-white/40 text-sm mb-6">
                    {showModal === 'reserve'
                      ? 'Versez un acompte de 200€ pour bloquer ce véhicule pendant 48h. Remboursable si vous changez d\'avis.'
                      : 'Notre équipe vous propose un financement sur mesure. Réponse sous 24h.'}
                  </p>
                  <form onSubmit={(e) => { e.preventDefault(); setFormSent(true) }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input required type="text" placeholder="Prénom" className="bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#C9A84C] text-white placeholder-white/20 px-4 py-3 text-sm outline-none transition-colors w-full" />
                      <input required type="text" placeholder="Nom" className="bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#C9A84C] text-white placeholder-white/20 px-4 py-3 text-sm outline-none transition-colors w-full" />
                    </div>
                    <input required type="tel" placeholder="Téléphone" className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#C9A84C] text-white placeholder-white/20 px-4 py-3 text-sm outline-none transition-colors" />
                    <input required type="email" placeholder="Email" className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#C9A84C] text-white placeholder-white/20 px-4 py-3 text-sm outline-none transition-colors" />
                    {showModal === 'financement' && (
                      <select className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#C9A84C] text-white/60 px-4 py-3 text-sm outline-none transition-colors">
                        <option>Apport disponible</option>
                        <option>Moins de 10 000 €</option>
                        <option>10 000 – 30 000 €</option>
                        <option>30 000 – 50 000 €</option>
                        <option>Plus de 50 000 €</option>
                      </select>
                    )}
                    <button type="submit" className="w-full py-4 bg-[#C9A84C] text-black font-display tracking-[0.2em] hover:bg-[#E2C06A] transition-colors">
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
