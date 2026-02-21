import { byStatus } from '@/lib/data'
import VehicleGrid from '@/components/vehicle/VehicleGrid'

export const metadata = { title: 'Véhicules vendus — RS Stark' }

export default function VenduPage() {
  return (
    <div className="page-section" style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 96 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="page-section-header" style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)', marginBottom: 12 }}>
            Preuve sociale
          </p>
          <h1 className="font-display" style={{ fontSize: 'clamp(52px,8vw,96px)', color: 'white', lineHeight: 0.95, marginBottom: 20 }}>
            VENDUS
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', maxWidth: 480, lineHeight: 1.7 }}>
            Ces véhicules d&apos;exception ont trouvé leur propriétaire.
          </p>
        </div>
        <VehicleGrid vehicles={byStatus('vendu')} />
      </div>
    </div>
  )
}
