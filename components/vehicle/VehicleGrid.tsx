'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, Car } from 'lucide-react'
import VehicleCard, { VehicleCardData } from './VehicleCard'

interface Props { vehicles: VehicleCardData[] }

const MARQUES    = ['Toutes', 'Porsche', 'Ferrari', 'Lamborghini', 'McLaren', 'BMW', 'Aston Martin', 'Bentley', 'Rolls-Royce', 'Bugatti', 'Autre']
const CARBURANTS = ['Tous', 'Essence', 'Diesel', 'Hybride', 'Electrique']

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

  const activeFilters = (marque !== 'Toutes' ? 1 : 0) + (carb !== 'Tous' ? 1 : 0) + (maxPrix < 1000000 ? 1 : 0) + (maxKm < 200000 ? 1 : 0)

  return (
    <div>
      {/* Search bar + sort + filter toggle */}
      <div className="flex flex-col md:flex-row gap-3" style={{ marginBottom: 16 }}>
        {/* Search input */}
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#5A6B80' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une marque, un modele..."
            className="input-rounded"
            style={{ paddingLeft: 44 }}
          />
        </div>

        {/* Sort dropdown */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input-rounded"
          style={{ width: 'auto', minWidth: 180, color: '#5A6B80', cursor: 'pointer' }}
        >
          <option value="recent">Plus recents</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix decroissant</option>
          <option value="km">Kilometrage</option>
        </select>

        {/* Filter toggle */}
        <button
          onClick={() => setFilters((v) => !v)}
          className="btn-secondary flex items-center gap-2"
          style={{
            padding: '12px 20px',
            borderColor: filters ? '#0C1B33' : undefined,
            background: filters ? 'rgba(12,27,51,0.03)' : undefined,
          }}
        >
          <SlidersHorizontal size={15} />
          Filtres
          {activeFilters > 0 && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 20, height: 20, borderRadius: '50%',
              background: '#0C1B33', color: '#fff', fontSize: 11, fontWeight: 600,
            }}>
              {activeFilters}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {filters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', marginBottom: 16 }}
          >
            <div className="glass-card" style={{ padding: 28 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Marque */}
                <div>
                  <p className="section-tag" style={{ marginBottom: 12 }}>Marque</p>
                  <div className="flex flex-wrap gap-2">
                    {MARQUES.map((m) => (
                      <button
                        key={m}
                        onClick={() => setMarque(m)}
                        style={{
                          fontSize: 12, fontWeight: 500, padding: '6px 14px',
                          borderRadius: 50, border: '1.5px solid',
                          transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
                          ...(marque === m
                            ? { background: '#0C1B33', color: '#fff', borderColor: '#0C1B33' }
                            : { background: '#fff', color: '#5A6B80', borderColor: '#E2E5EA' }
                          ),
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Carburant */}
                <div>
                  <p className="section-tag" style={{ marginBottom: 12 }}>Carburant</p>
                  <div className="flex flex-wrap gap-2">
                    {CARBURANTS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCarb(c)}
                        style={{
                          fontSize: 12, fontWeight: 500, padding: '6px 14px',
                          borderRadius: 50, border: '1.5px solid',
                          transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
                          ...(carb === c
                            ? { background: '#0C1B33', color: '#fff', borderColor: '#0C1B33' }
                            : { background: '#fff', color: '#5A6B80', borderColor: '#E2E5EA' }
                          ),
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prix max */}
                <div>
                  <p className="section-tag" style={{ marginBottom: 12 }}>
                    Prix max{' '}
                    <span style={{ color: '#0C1B33', fontWeight: 600 }}>
                      {maxPrix >= 1000000 ? 'Illimite' : `${maxPrix.toLocaleString('fr-FR')} EUR`}
                    </span>
                  </p>
                  <input
                    type="range" min={20000} max={1000000} step={5000}
                    value={maxPrix} onChange={(e) => setMaxPrix(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#0C1B33', marginTop: 8 }}
                  />
                </div>

                {/* Km max */}
                <div>
                  <p className="section-tag" style={{ marginBottom: 12 }}>
                    Km max{' '}
                    <span style={{ color: '#0C1B33', fontWeight: 600 }}>
                      {maxKm >= 200000 ? 'Illimite' : `${maxKm.toLocaleString('fr-FR')} km`}
                    </span>
                  </p>
                  <input
                    type="range" min={0} max={200000} step={5000}
                    value={maxKm} onChange={(e) => setMaxKm(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#0C1B33', marginTop: 8 }}
                  />
                </div>
              </div>

              {/* Reset */}
              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={reset}
                  className="flex items-center gap-2"
                  style={{
                    fontSize: 13, color: '#5A6B80', background: 'none', border: 'none',
                    fontWeight: 500, transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#0C1B33' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#5A6B80' }}
                >
                  <X size={14} /> Reinitialiser les filtres
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count */}
      <p style={{ fontSize: 13, color: '#5A6B80', marginBottom: 24, fontWeight: 500 }}>
        {results.length} vehicule{results.length !== 1 ? 's' : ''} trouve{results.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {results.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '80px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(12,27,51,0.04)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Car size={28} style={{ color: '#5A6B80' }} />
            </div>
          </div>
          <h3 className="font-display" style={{ fontSize: 22, color: '#0C1B33', marginBottom: 8 }}>
            Aucun resultat
          </h3>
          <p style={{ fontSize: 14, color: '#5A6B80', marginBottom: 24, maxWidth: 320, margin: '0 auto 24px' }}>
            Aucun vehicule ne correspond a vos criteres. Essayez de modifier vos filtres.
          </p>
          <button
            onClick={reset}
            className="btn-primary"
            style={{ fontSize: 13 }}
          >
            Reinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((v, i) => <VehicleCard key={v.slug} vehicle={v} index={i} />)}
        </div>
      )}
    </div>
  )
}
