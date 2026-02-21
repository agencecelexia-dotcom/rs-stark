import { getVehiclesByStatus } from '@/lib/data'
import VehicleGrid from '@/components/vehicle/VehicleGrid'

export const metadata = { title: 'En préparation — RS Stark' }

export default function PreparationPage() {
  const vehicles = getVehiclesByStatus('preparation')
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-3">Bientôt disponibles</p>
          <h1 className="font-display text-6xl md:text-8xl text-white mb-4">EN PRÉPARATION</h1>
          <p className="text-white/40 max-w-xl">Ces véhicules sont en cours de contrôle et de préparation. Contactez-nous pour être prioritaire sur un véhicule.</p>
        </div>

        {/* Progress indicator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { step: '01', label: 'Contrôle technique', desc: 'Inspection complète 150 points réalisée ou en cours.' },
            { step: '02', label: 'Préparation esthétique', desc: 'Nettoyage complet, polish, réparations carrosserie.' },
            { step: '03', label: 'Mise en vente', desc: 'Photoshooting, fiche technique complète, mise en ligne.' },
          ].map((s) => (
            <div key={s.step} className="border border-[#2A2A2A] p-6">
              <p className="font-mono text-4xl text-[#C9A84C]/30 mb-3">{s.step}</p>
              <h3 className="font-display text-xl text-white mb-2">{s.label}</h3>
              <p className="text-sm text-white/30">{s.desc}</p>
            </div>
          ))}
        </div>

        <VehicleGrid vehicles={vehicles} />
      </div>
    </div>
  )
}
