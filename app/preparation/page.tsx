import { byStatus } from '@/lib/data'
import VehicleGrid from '@/components/vehicle/VehicleGrid'

export const metadata = { title: 'En preparation — RS Stark' }

export default function PreparationPage() {
  return (
    <div className="page-section" style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 96, background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        <div className="page-section-header" style={{ marginBottom: 64 }}>
          <p className="section-tag">
            Bientot disponibles
          </p>
          <h1 className="font-display" style={{ fontSize: 'clamp(48px, 7vw, 80px)', color: 'var(--color-navy)', lineHeight: 0.95, marginBottom: 20 }}>
            En Preparation
          </h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-muted)', maxWidth: 520, lineHeight: 1.7 }}>
            Ces vehicules sont en cours de controle et preparation. Contactez-nous pour etre prioritaire.
          </p>
        </div>

        {/* Etapes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ marginBottom: 64 }}>
          {[
            { step: '01', label: 'Controle technique', desc: 'Inspection complete 150 points realisee ou en cours.' },
            { step: '02', label: 'Preparation esthetique', desc: 'Nettoyage complet, polish, reparations carrosserie.' },
            { step: '03', label: 'Mise en vente', desc: 'Photoshooting, fiche technique complete, mise en ligne.' },
          ].map((s) => (
            <div key={s.step} className="glass-card" style={{ padding: 28 }}>
              <p className="font-display" style={{ fontSize: 44, color: 'var(--color-navy)', opacity: 0.12, marginBottom: 12 }}>{s.step}</p>
              <h3 className="font-display" style={{ fontSize: 18, color: 'var(--color-navy)', marginBottom: 8 }}>{s.label}</h3>
              <p style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <VehicleGrid vehicles={byStatus('preparation')} />
      </div>
    </div>
  )
}
