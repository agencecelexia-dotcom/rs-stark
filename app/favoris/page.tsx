'use client'

import { useFavorites } from '@/lib/favorites-context'
import { vehicles } from '@/lib/data'
import VehicleCard from '@/components/vehicle/VehicleCard'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function FavorisPage() {
  const { favorites } = useFavorites()
  const favVehicles = vehicles.filter((v) => favorites.includes(v.slug))

  return (
    <div className="page-section" style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 96 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="page-section-header" style={{ marginBottom: 64 }}>
          <p className="section-tag">Mon garage</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(42px, 7vw, 80px)', color: '#0C1B33', lineHeight: 0.95, marginBottom: 20 }}>
            Mes favoris
          </h1>
          <p style={{ fontSize: 15, color: '#5A6B80', maxWidth: 480, lineHeight: 1.7 }}>
            {favVehicles.length > 0
              ? `Vous avez ${favVehicles.length} véhicule${favVehicles.length > 1 ? 's' : ''} dans votre sélection.`
              : 'Ajoutez des véhicules à vos favoris en cliquant sur le cœur.'}
          </p>
        </div>

        {favVehicles.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(12,27,51,0.04)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <Heart size={32} style={{ color: '#5A6B80' }} />
            </div>
            <h3 className="font-display" style={{ fontSize: 24, color: '#0C1B33', marginBottom: 8 }}>
              Aucun favori
            </h3>
            <p style={{ fontSize: 14, color: '#5A6B80', maxWidth: 360, margin: '0 auto 32px', lineHeight: 1.6 }}>
              Explorez notre catalogue et ajoutez des véhicules à vos favoris pour les retrouver facilement.
            </p>
            <Link href="/vente" className="btn-primary">
              Voir le stock
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favVehicles.map((v, i) => (
              <VehicleCard key={v.slug} vehicle={v} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
