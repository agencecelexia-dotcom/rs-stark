import { getVehiclesByStatus } from '@/lib/data'
import VehicleGrid from '@/components/vehicle/VehicleGrid'

export const metadata = { title: 'Véhicules vendus — RS Stark' }

export default function VenduPage() {
  const vehicles = getVehiclesByStatus('vendu')
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-3">Preuve sociale</p>
          <h1 className="font-display text-6xl md:text-8xl text-white mb-4">VENDUS</h1>
          <p className="text-white/40 max-w-xl">Ces véhicules d&apos;exception ont trouvé leur propriétaire. Chaque vente est une preuve de notre confiance mutuelle.</p>
        </div>
        <VehicleGrid vehicles={vehicles} />
      </div>
    </div>
  )
}
