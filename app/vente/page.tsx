import { motion } from 'framer-motion'
import { getVehiclesByStatus } from '@/lib/data'
import VehicleGrid from '@/components/vehicle/VehicleGrid'

export const metadata = { title: 'Véhicules à vendre — RS Stark' }

export default function VentePage() {
  const vehicles = getVehiclesByStatus('vente')
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-3">Stock disponible</p>
          <h1 className="font-display text-6xl md:text-8xl text-white mb-4">À VENDRE</h1>
          <p className="text-white/40 max-w-xl">Chaque véhicule est inspecté sur 150 points et livré avec une garantie de 6 mois.</p>
        </div>
        <VehicleGrid vehicles={vehicles} />
      </div>
    </div>
  )
}
