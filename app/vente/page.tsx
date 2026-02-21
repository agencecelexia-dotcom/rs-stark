import { byStatus } from '@/lib/data'
import VehicleGrid from '@/components/vehicle/VehicleGrid'

export const metadata = { title: 'Véhicules à vendre — RS Stark' }

export default function VentePage() {
  return (
    <div className="page-section" style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 96 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* En-tête */}
        <div className="page-section-header" style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)', marginBottom: 12 }}>
            Stock disponible
          </p>
          <h1 className="font-display" style={{ fontSize: 'clamp(52px,8vw,96px)', color: '#0F0F0F', lineHeight: 0.95, marginBottom: 20 }}>
            À VENDRE
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(0,0,0,0.45)', maxWidth: 480, lineHeight: 1.7 }}>
            Chaque véhicule est inspecté sur 150 points et livré avec une garantie de 6 mois.
          </p>
        </div>

        <VehicleGrid vehicles={byStatus('vente')} />
      </div>
    </div>
  )
}
