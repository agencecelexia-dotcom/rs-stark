import { byStatus } from '@/lib/data'
import VehicleGrid from '@/components/vehicle/VehicleGrid'

export const metadata = { title: 'Vehicules a vendre — RS Stark' }

export default function VentePage() {
  return (
    <div className="page-section" style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 96, background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* En-tete */}
        <div className="page-section-header" style={{ marginBottom: 64 }}>
          <p className="section-tag">
            Stock disponible
          </p>
          <h1 className="font-display" style={{ fontSize: 'clamp(48px, 7vw, 80px)', color: 'var(--color-navy)', lineHeight: 0.95, marginBottom: 20 }}>
            A Vendre
          </h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-muted)', maxWidth: 520, lineHeight: 1.7 }}>
            Chaque vehicule est inspecte sur 150 points et livre avec une garantie de 6 mois.
          </p>
        </div>

        <VehicleGrid vehicles={byStatus('vente')} />
      </div>
    </div>
  )
}
