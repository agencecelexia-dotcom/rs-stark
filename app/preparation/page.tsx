import { byStatus } from '@/lib/data'
import VehicleGrid from '@/components/vehicle/VehicleGrid'

export const metadata = { title: 'En préparation — RS Stark' }

export default function PreparationPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 96 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)', marginBottom: 12 }}>
            Bientôt disponibles
          </p>
          <h1 className="font-display" style={{ fontSize: 'clamp(52px,8vw,96px)', color: '#0F0F0F', lineHeight: 0.95, marginBottom: 20 }}>
            EN PRÉPARATION
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(0,0,0,0.45)', maxWidth: 480, lineHeight: 1.7 }}>
            Ces véhicules sont en cours de contrôle et préparation. Contactez-nous pour être prioritaire.
          </p>
        </div>

        {/* Étapes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ marginBottom: 64 }}>
          {[
            { step: '01', label: 'Contrôle technique', desc: 'Inspection complète 150 points réalisée ou en cours.' },
            { step: '02', label: 'Préparation esthétique', desc: 'Nettoyage complet, polish, réparations carrosserie.' },
            { step: '03', label: 'Mise en vente', desc: 'Photoshooting, fiche technique complète, mise en ligne.' },
          ].map((s) => (
            <div key={s.step} style={{ border: '1px solid #2A2A2A', padding: 24 }}>
              <p className="font-display" style={{ fontSize: 40, color: 'rgba(201,168,76,0.2)', marginBottom: 12 }}>{s.step}</p>
              <h3 className="font-display" style={{ fontSize: 18, color: '#0F0F0F', marginBottom: 8 }}>{s.label}</h3>
              <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.35)', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <VehicleGrid vehicles={byStatus('preparation')} />
      </div>
    </div>
  )
}
