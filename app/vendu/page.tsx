import { byStatus } from '@/lib/data'
import VehicleGrid from '@/components/vehicle/VehicleGrid'

export const metadata = { title: 'Vehicules vendus — RS Stark' }

export default function VenduPage() {
  return (
    <div className="page-section" style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 96, background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="page-section-header" style={{ marginBottom: 64 }}>
          <p className="section-tag">
            Deja vendus
          </p>
          <h1 className="font-display" style={{ fontSize: 'clamp(48px, 7vw, 80px)', color: 'var(--color-navy)', lineHeight: 0.95, marginBottom: 20 }}>
            Vendus
          </h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-muted)', maxWidth: 520, lineHeight: 1.7 }}>
            Ces vehicules d&apos;exception ont trouve leur proprietaire.
          </p>
        </div>
        <VehicleGrid vehicles={byStatus('vendu')} />
      </div>
    </div>
  )
}
