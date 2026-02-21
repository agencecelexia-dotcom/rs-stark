'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import VehicleCard, { VehicleCardData } from './VehicleCard'

interface Props { vehicles: VehicleCardData[] }

const MARQUES    = ['Toutes', 'Porsche', 'Ferrari', 'Lamborghini', 'McLaren', 'BMW', 'Aston Martin', 'Bentley', 'Rolls-Royce', 'Bugatti', 'Autre']
const CARBURANTS = ['Tous', 'Essence', 'Diesel', 'Hybride', 'Électrique']

const INPUT = {
  width: '100%', background: '#111', border: '1px solid #2A2A2A',
  color: '#F0F0F0', padding: '12px 16px', fontSize: 13, outline: 'none',
  fontFamily: 'var(--font-code,monospace)', transition: 'border-color 0.2s',
}
const SELECT = { ...INPUT, color: 'rgba(255,255,255,0.5)' }
const CHIP_BASE = { fontSize: 11, padding: '4px 10px', border: '1px solid #2A2A2A', fontFamily: 'var(--font-code,monospace)', transition: 'all 0.15s', cursor: 'none' }
const CHIP_ON  = { ...CHIP_BASE, background: '#C9A84C', color: '#000',           borderColor: '#C9A84C' }
const CHIP_OFF = { ...CHIP_BASE, background: 'transparent', color: 'rgba(255,255,255,0.35)' }

export default function VehicleGrid({ vehicles }: Props) {
  const [search,  setSearch]      = useState('')
  const [marque,  setMarque]      = useState('Toutes')
  const [carb,    setCarb]        = useState('Tous')
  const [maxPrix, setMaxPrix]     = useState(1000000)
  const [maxKm,   setMaxKm]       = useState(200000)
  const [sort,    setSort]        = useState('recent')
  const [filters, setFilters]     = useState(false)

  const results = useMemo(() => {
    let r = vehicles.filter((v) => {
      if (marque !== 'Toutes' && v.marque !== marque) return false
      if (carb   !== 'Tous'  && v.carburant !== carb) return false
      if (v.prix && v.prix > maxPrix) return false
      if (v.km > maxKm) return false
      if (search && !`${v.marque} ${v.modele} ${v.version}`.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    if (sort === 'prix-asc')  r = [...r].sort((a, b) => (a.prix ?? 0) - (b.prix ?? 0))
    if (sort === 'prix-desc') r = [...r].sort((a, b) => (b.prix ?? 0) - (a.prix ?? 0))
    if (sort === 'km')        r = [...r].sort((a, b) => a.km - b.km)
    return r
  }, [vehicles, search, marque, carb, maxPrix, maxKm, sort])

  const reset = () => {
    setSearch(''); setMarque('Toutes'); setCarb('Tous')
    setMaxPrix(1000000); setMaxKm(200000); setSort('recent')
  }

  return (
    <div>
      {/* Barre de recherche */}
      <div className="flex flex-col md:flex-row gap-3" style={{ marginBottom: 12 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.2)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Marque, modèle..."
            style={{ ...INPUT, paddingLeft: 40 }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#C9A84C' }}
            onBlur={(e)  => { e.currentTarget.style.borderColor = '#2A2A2A' }}
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ ...SELECT, width: 'auto', minWidth: 160 }}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#C9A84C' }}
          onBlur={(e)  => { e.currentTarget.style.borderColor = '#2A2A2A' }}
        >
          <option value="recent">Plus récents</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
          <option value="km">Kilométrage</option>
        </select>
        <button
          onClick={() => setFilters((v) => !v)}
          className="flex items-center gap-2 transition-all duration-200"
          style={{ ...CHIP_OFF, padding: '12px 18px', borderColor: filters ? '#C9A84C' : '#2A2A2A', color: filters ? '#C9A84C' : 'rgba(255,255,255,0.4)' }}
        >
          <SlidersHorizontal size={13} />
          Filtres
        </button>
      </div>

      {/* Panneau filtres */}
      <AnimatePresence>
        {filters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', marginBottom: 12 }}
          >
            <div style={{ background: '#111', border: '1px solid #2A2A2A', padding: 24 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Marque */}
                <div>
                  <p style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)', marginBottom: 10 }}>Marque</p>
                  <div className="flex flex-wrap gap-1.5">
                    {MARQUES.map((m) => (
                      <button key={m} onClick={() => setMarque(m)} style={marque === m ? CHIP_ON : CHIP_OFF}>{m}</button>
                    ))}
                  </div>
                </div>
                {/* Carburant */}
                <div>
                  <p style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)', marginBottom: 10 }}>Carburant</p>
                  <div className="flex flex-wrap gap-1.5">
                    {CARBURANTS.map((c) => (
                      <button key={c} onClick={() => setCarb(c)} style={carb === c ? CHIP_ON : CHIP_OFF}>{c}</button>
                    ))}
                  </div>
                </div>
                {/* Prix */}
                <div>
                  <p style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)', marginBottom: 10 }}>
                    Prix max — <span style={{ color: '#C9A84C' }}>{maxPrix >= 1000000 ? '∞' : `${maxPrix.toLocaleString('fr-FR')} €`}</span>
                  </p>
                  <input type="range" min={20000} max={1000000} step={5000} value={maxPrix} onChange={(e) => setMaxPrix(Number(e.target.value))} style={{ width: '100%', accentColor: '#C9A84C' }} />
                </div>
                {/* Km */}
                <div>
                  <p style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)', marginBottom: 10 }}>
                    Km max — <span style={{ color: '#C9A84C' }}>{maxKm >= 200000 ? '∞' : `${maxKm.toLocaleString('fr-FR')} km`}</span>
                  </p>
                  <input type="range" min={0} max={200000} step={5000} value={maxKm} onChange={(e) => setMaxKm(Number(e.target.value))} style={{ width: '100%', accentColor: '#C9A84C' }} />
                </div>
              </div>
              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={reset} className="flex items-center gap-1.5" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-code,monospace)', background: 'none', border: 'none' }}>
                  <X size={11} /> Réinitialiser
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compteur résultats */}
      <p style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-code,monospace)', marginBottom: 24 }}>
        {results.length} VÉHICULE{results.length !== 1 ? 'S' : ''} TROUVÉ{results.length !== 1 ? 'S' : ''}
      </p>

      {/* Grille */}
      {results.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 24px', border: '1px solid #2A2A2A' }}>
          <p className="font-display" style={{ fontSize: 36, color: 'rgba(255,255,255,0.1)', marginBottom: 12 }}>AUCUN RÉSULTAT</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>Modifiez vos critères</p>
          <button onClick={reset} style={{ fontSize: 12, color: '#C9A84C', fontFamily: 'var(--font-code,monospace)', background: 'none', border: 'none' }}>
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((v, i) => <VehicleCard key={v.slug} vehicle={v} index={i} />)}
        </div>
      )}
    </div>
  )
}
