'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Gauge, Fuel, Zap, ArrowRight } from 'lucide-react'

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
}

const BADGE_CLASS: Record<string, string> = {
  vente:       'badge-vente',
  vendu:       'badge-vendu',
  preparation: 'badge-preparation',
}
const BADGE_LABEL: Record<string, string> = {
  vente:       'Disponible',
  vendu:       'Vendu',
  preparation: 'En préparation',
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
      <Link href={`/vehicule/${vehicle.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div
          className="group transition-all duration-500"
          style={{ background: '#111', border: '1px solid #2A2A2A', overflow: 'hidden' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.35)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#2A2A2A' }}
        >
          {/* Photo placeholder */}
          <div className="img-ph relative" style={{ aspectRatio: '16/10' }}>
            {/* Badge statut */}
            <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
              <span className={BADGE_CLASS[vehicle.statut]}>{BADGE_LABEL[vehicle.statut]}</span>
            </div>

            {/* Like */}
            <button
              onClick={(e) => { e.preventDefault(); setLiked((v) => !v) }}
              style={{
                position: 'absolute', top: 12, right: 12, zIndex: 2,
                width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)',
                transition: 'border-color 0.2s',
              }}
            >
              <Heart
                size={13}
                style={{ color: liked ? '#ef4444' : 'rgba(255,255,255,0.4)', fill: liked ? '#ef4444' : 'none' }}
              />
            </button>

            {/* Hover CTA */}
            <div
              className="group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
              style={{
                position: 'absolute', bottom: 12, left: 0, right: 0,
                display: 'flex', justifyContent: 'center',
                opacity: 0, transform: 'translateY(6px)',
              }}
            >
              <div
                className="flex items-center gap-2"
                style={{ background: '#C9A84C', color: '#000', fontSize: 10, letterSpacing: '0.2em', padding: '8px 16px', fontFamily: 'var(--font-code,monospace)' }}
              >
                VOIR LA FICHE <ArrowRight size={11} />
              </div>
            </div>

            {/* Marque label centré */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="font-display" style={{ fontSize: 32, color: 'rgba(255,255,255,0.06)', letterSpacing: '0.3em', userSelect: 'none' }}>
                {vehicle.marque.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Infos */}
          <div style={{ padding: '18px 20px 20px' }}>
            <div className="flex justify-between items-start" style={{ marginBottom: 14 }}>
              <div>
                <p style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'var(--font-code,monospace)' }}>
                  {vehicle.marque}
                </p>
                <h3 className="font-display" style={{ fontSize: 20, color: 'white', lineHeight: 1.1 }}>
                  {vehicle.modele}{' '}
                  <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)' }}>{vehicle.version}</span>
                </h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 16, color: '#C9A84C', fontFamily: 'var(--font-code,monospace)', fontWeight: 500 }}>
                  {fmtPrix(vehicle.prix)}
                </p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 2, fontFamily: 'var(--font-code,monospace)' }}>
                  {vehicle.annee}
                </p>
              </div>
            </div>

            {/* Specs */}
            <div className="flex items-center gap-5" style={{ paddingTop: 14, borderTop: '1px solid #222' }}>
              {[
                { Icon: Gauge, val: fmtKm(vehicle.km) },
                { Icon: Fuel,  val: vehicle.carburant  },
                { Icon: Zap,   val: `${vehicle.puissance} ch` },
              ].map(({ Icon, val }) => (
                <div key={val} className="flex items-center gap-1.5" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-code,monospace)' }}>
                  <Icon size={11} style={{ color: '#C9A84C', flexShrink: 0 }} />
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
