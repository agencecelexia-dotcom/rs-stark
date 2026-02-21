'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Vehicle } from '@/lib/data'
import VehicleCard from './VehicleCard'

interface Props {
  vehicles: Vehicle[]
}

const marques = ['Toutes', 'Porsche', 'Ferrari', 'Lamborghini', 'McLaren', 'BMW', 'Aston Martin', 'Bentley', 'Rolls-Royce', 'Bugatti', 'Koenigsegg']
const carburants = ['Tous', 'Essence', 'Diesel', 'Hybride', 'Électrique']
const boites = ['Toutes', 'PDK', 'DCT', 'Automatique', 'Manuelle']

export default function VehicleGrid({ vehicles }: Props) {
  const [search, setSearch] = useState('')
  const [marque, setMarque] = useState('Toutes')
  const [carburant, setCarburant] = useState('Tous')
  const [boite, setBoite] = useState('Toutes')
  const [maxPrix, setMaxPrix] = useState(1000000)
  const [maxKm, setMaxKm] = useState(200000)
  const [sort, setSort] = useState('recent')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = vehicles.filter((v) => {
      if (marque !== 'Toutes' && v.marque !== marque) return false
      if (carburant !== 'Tous' && v.carburant !== carburant) return false
      if (boite !== 'Toutes' && v.boite !== boite) return false
      if (v.prix && v.prix > maxPrix) return false
      if (v.km > maxKm) return false
      if (search && !`${v.marque} ${v.modele} ${v.version}`.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    if (sort === 'prix-asc') result = [...result].sort((a, b) => (a.prix ?? 0) - (b.prix ?? 0))
    if (sort === 'prix-desc') result = [...result].sort((a, b) => (b.prix ?? 0) - (a.prix ?? 0))
    if (sort === 'km') result = [...result].sort((a, b) => a.km - b.km)
    return result
  }, [vehicles, search, marque, carburant, boite, maxPrix, maxKm, sort])

  const resetFilters = () => {
    setSearch(''); setMarque('Toutes'); setCarburant('Tous'); setBoite('Toutes')
    setMaxPrix(1000000); setMaxKm(200000); setSort('recent')
  }

  return (
    <div>
      {/* Search + Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un véhicule..."
            className="w-full bg-[#111] border border-[#2A2A2A] focus:border-[#C9A84C] text-white placeholder-white/20 pl-11 pr-4 py-3 text-sm outline-none transition-colors font-mono"
          />
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-[#111] border border-[#2A2A2A] text-white/60 px-4 py-3 text-sm outline-none font-mono focus:border-[#C9A84C] transition-colors">
          <option value="recent">Plus récents</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
          <option value="km">Kilométrage</option>
        </select>
        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 border border-[#2A2A2A] hover:border-[#C9A84C] px-4 py-3 text-sm text-white/60 hover:text-white transition-all font-mono">
          <SlidersHorizontal size={14} /> Filtres
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-[#111] border border-[#2A2A2A] p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Marque */}
            <div>
              <label className="text-[10px] tracking-widest text-white/30 uppercase font-mono block mb-3">Marque</label>
              <div className="flex flex-wrap gap-2">
                {marques.map((m) => (
                  <button key={m} onClick={() => setMarque(m)} className={`text-xs px-2 py-1 font-mono transition-all ${marque === m ? 'bg-[#C9A84C] text-black' : 'border border-[#2A2A2A] text-white/40 hover:border-[#C9A84C]'}`}>{m}</button>
                ))}
              </div>
            </div>
            {/* Carburant */}
            <div>
              <label className="text-[10px] tracking-widest text-white/30 uppercase font-mono block mb-3">Carburant</label>
              <div className="flex flex-wrap gap-2">
                {carburants.map((c) => (
                  <button key={c} onClick={() => setCarburant(c)} className={`text-xs px-2 py-1 font-mono transition-all ${carburant === c ? 'bg-[#C9A84C] text-black' : 'border border-[#2A2A2A] text-white/40 hover:border-[#C9A84C]'}`}>{c}</button>
                ))}
              </div>
            </div>
            {/* Prix max */}
            <div>
              <label className="text-[10px] tracking-widest text-white/30 uppercase font-mono block mb-3">
                Prix max — <span className="text-[#C9A84C]">{maxPrix === 1000000 ? 'Sans limite' : `${maxPrix.toLocaleString('fr-FR')} €`}</span>
              </label>
              <input type="range" min={20000} max={1000000} step={5000} value={maxPrix} onChange={(e) => setMaxPrix(Number(e.target.value))} className="w-full accent-[#C9A84C]" />
            </div>
            {/* Km max */}
            <div>
              <label className="text-[10px] tracking-widest text-white/30 uppercase font-mono block mb-3">
                Km max — <span className="text-[#C9A84C]">{maxKm === 200000 ? 'Sans limite' : `${maxKm.toLocaleString('fr-FR')} km`}</span>
              </label>
              <input type="range" min={0} max={200000} step={5000} value={maxKm} onChange={(e) => setMaxKm(Number(e.target.value))} className="w-full accent-[#C9A84C]" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={resetFilters} className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors font-mono">
              <X size={12} /> Réinitialiser les filtres
            </button>
          </div>
        </motion.div>
      )}

      {/* Results count */}
      <p className="text-xs text-white/30 font-mono tracking-widest mb-8">
        {filtered.length} VÉHICULE{filtered.length !== 1 ? 'S' : ''} TROUVÉ{filtered.length !== 1 ? 'S' : ''}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 border border-[#2A2A2A]">
          <p className="font-display text-4xl text-white/20 mb-4">AUCUN RÉSULTAT</p>
          <p className="text-white/30 text-sm mb-6">Modifiez vos critères de recherche</p>
          <button onClick={resetFilters} className="text-[#C9A84C] text-sm font-mono hover:underline">Réinitialiser</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
        </div>
      )}
    </div>
  )
}
