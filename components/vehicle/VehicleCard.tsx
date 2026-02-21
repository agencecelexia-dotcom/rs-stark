'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Car, Gauge, Fuel, Zap, ArrowRight } from 'lucide-react'

export interface VehicleCardData {
  slug: string
  statut: 'vente' | 'vendu' | 'preparation'
  marque: string
  modele: string
  version: string
  annee: number
  km: number
  prix: number | null
  carburant: string
  puissance: number
  images: string[]
  youtubeUrl: string | null
}

const BADGE_CLASS: Record<string, string> = {
  vente:       'badge-vente',
  vendu:       'badge-vendu',
  preparation: 'badge-preparation',
}
const BADGE_LABEL: Record<string, string> = {
  vente:       'Disponible',
  vendu:       'Vendu',
  preparation: 'En preparation',
}

function fmtPrix(v: number | null) {
  if (!v) return 'Sur demande'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v)
}
function fmtKm(v: number) {
  return new Intl.NumberFormat('fr-FR').format(v) + ' km'
}

interface Props { vehicle: VehicleCardData; index?: number }

export default function VehicleCard({ vehicle, index = 0 }: Props) {
  const [liked, setLiked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
    >
      <Link href={`/vehicule/${vehicle.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', height: '100%' }}>
        <div className="group glass-card" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>

          {/* Image area — first image or placeholder */}
          <div
            className={vehicle.images.length > 0 ? undefined : 'img-ph'}
            style={{
              aspectRatio: '4/3',
              position: 'relative',
              borderRadius: '16px 16px 0 0',
              overflow: 'hidden',
              flexShrink: 0,
              ...(vehicle.images.length > 0
                ? { backgroundImage: `url(${vehicle.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#E8EBF0' }
                : {}
              ),
            }}
          >

            {/* Badge statut */}
            <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 2 }}>
              <span className={BADGE_CLASS[vehicle.statut]}>{BADGE_LABEL[vehicle.statut]}</span>
            </div>

            {/* Like button */}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked((v) => !v) }}
              style={{
                position: 'absolute', top: 14, right: 14, zIndex: 2,
                width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(12,27,51,0.06)',
                borderRadius: '50%', backdropFilter: 'blur(8px)',
                transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              <Heart
                size={15}
                style={{
                  color: liked ? '#ef4444' : '#5A6B80',
                  fill: liked ? '#ef4444' : 'none',
                  transition: 'all 0.2s',
                }}
              />
            </button>

            {/* Centered car icon */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Car size={48} style={{ color: 'rgba(12,27,51,0.07)' }} />
            </div>

            {/* Hover CTA overlay */}
            <div
              className="group-hover:opacity-100 transition-all duration-300"
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '40px 20px 16px',
                background: 'linear-gradient(to top, rgba(12,27,51,0.6) 0%, transparent 100%)',
                display: 'flex', justifyContent: 'center',
                opacity: 0,
              }}
            >
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#FFFFFF', color: '#0C1B33',
                  fontSize: 12, fontWeight: 500, letterSpacing: '0.05em',
                  padding: '8px 20px', borderRadius: 50,
                }}
              >
                Voir la fiche <ArrowRight size={13} />
              </span>
            </div>
          </div>

          {/* Content area */}
          <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Brand + Model heading */}
            <div style={{ marginBottom: 6 }}>
              <p style={{ fontSize: 11, letterSpacing: '0.15em', color: '#5A6B80', textTransform: 'uppercase', marginBottom: 4, fontWeight: 500 }}>
                {vehicle.marque}
              </p>
              <h3 className="font-display" style={{ fontSize: 20, color: '#0C1B33', lineHeight: 1.2 }}>
                {vehicle.modele}{' '}
                <span style={{ fontSize: 15, color: '#5A6B80', fontWeight: 400 }}>{vehicle.version}</span>
              </h3>
            </div>

            {/* Year + km muted */}
            <p style={{ fontSize: 13, color: '#5A6B80', marginBottom: 14 }}>
              {vehicle.annee} &middot; {fmtKm(vehicle.km)}
            </p>

            {/* Price prominent */}
            <p style={{ fontSize: 20, color: '#0C1B33', fontWeight: 600, marginBottom: 16, fontFamily: 'var(--font-heading, serif)' }}>
              {fmtPrix(vehicle.prix)}
            </p>

            {/* Specs row */}
            <div
              className="flex items-center gap-4"
              style={{ paddingTop: 14, borderTop: '1px solid #E2E5EA', marginTop: 'auto' }}
            >
              {[
                { Icon: Gauge, val: fmtKm(vehicle.km) },
                { Icon: Fuel,  val: vehicle.carburant  },
                { Icon: Zap,   val: `${vehicle.puissance} ch` },
              ].map(({ Icon, val }) => (
                <div key={val} className="flex items-center gap-1.5" style={{ fontSize: 12, color: '#5A6B80' }}>
                  <Icon size={13} style={{ color: '#C9A84C', flexShrink: 0 }} />
                  {val}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
