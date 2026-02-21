'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingDown, Shield, ArrowRight, ChevronRight } from 'lucide-react'

/* ─── Catalogue marque → modèle → { versions: {nom: prixNeuf}, dep: tauxAnnuel } ─── */
const CATALOG: Record<string, Record<string, { dep: number; v: Record<string, number> }>> = {
  Porsche: {
    '911': { dep: 0.91, v: { 'Carrera': 120000, 'Carrera S': 135000, 'Carrera 4S': 155000, 'Turbo S': 230000, 'GT3': 178000, 'GT3 RS': 235000, 'Targa 4S': 152000 } },
    'Cayenne': { dep: 0.84, v: { 'E-Hybrid': 88000, 'Turbo': 152000, 'Turbo GT': 205000 } },
    'Panamera': { dep: 0.83, v: { '4S E-Hybrid': 118000, 'Turbo S': 190000, 'Turbo S E-Hybrid': 210000 } },
    'Taycan': { dep: 0.80, v: { '4S': 110000, 'Turbo': 155000, 'Turbo S': 195000, 'Cross Turismo Turbo S': 200000 } },
    'Macan': { dep: 0.85, v: { 'GTS': 82000, 'Turbo': 102000 } },
  },
  Ferrari: {
    '296 GTB': { dep: 0.93, v: { 'Standard': 325000, 'Assetto Fiorano': 345000 } },
    'F8 Tributo': { dep: 0.92, v: { 'Coupé': 252000, 'Spider': 278000 } },
    'SF90 Stradale': { dep: 0.94, v: { 'Coupé': 435000, 'Spider': 490000 } },
    'Roma': { dep: 0.91, v: { 'Coupé': 238000, 'Spider': 262000 } },
    'Purosangue': { dep: 0.93, v: { 'V12': 405000 } },
    '812': { dep: 0.93, v: { 'Superfast': 355000, 'GTS': 395000, 'Competizione': 500000 } },
  },
  Lamborghini: {
    'Huracán': { dep: 0.88, v: { 'EVO': 225000, 'EVO RWD': 198000, 'STO': 335000, 'Tecnica': 268000 } },
    'Urus': { dep: 0.86, v: { 'S': 255000, 'Performante': 290000 } },
    'Revuelto': { dep: 0.93, v: { 'Standard': 600000 } },
  },
  McLaren: {
    '720S': { dep: 0.83, v: { 'Coupé': 288000, 'Spider': 318000 } },
    '765LT': { dep: 0.89, v: { 'Coupé': 375000, 'Spider': 415000 } },
    'Artura': { dep: 0.82, v: { 'Standard': 228000, 'Spider': 255000 } },
    'GT': { dep: 0.81, v: { 'Standard': 210000 } },
  },
  BMW: {
    'M2': { dep: 0.83, v: { 'Competition': 84000 } },
    'M3': { dep: 0.83, v: { 'Competition': 92000, 'Competition xDrive': 102000, 'CS': 152000 } },
    'M4': { dep: 0.82, v: { 'Competition': 98000, 'Competition xDrive': 108000, 'CSL': 198000 } },
    'M5': { dep: 0.81, v: { 'Competition': 130000, 'CS': 185000 } },
    'M8': { dep: 0.80, v: { 'Coupé Competition': 148000, 'Gran Coupé Competition': 153000 } },
    'XM': { dep: 0.79, v: { 'Standard': 195000, 'Label': 250000 } },
  },
  'Mercedes-AMG': {
    'AMG GT': { dep: 0.82, v: { '63 S 4MATIC+': 178000, '63 S E Performance': 205000 } },
    'AMG G63': { dep: 0.86, v: { 'Standard': 235000, 'Brabus 800': 385000 } },
    'AMG C63': { dep: 0.81, v: { 'S E Performance': 90000 } },
    'AMG E63': { dep: 0.81, v: { 'S': 122000 } },
    'SL 63': { dep: 0.82, v: { 'AMG': 210000 } },
    'Maybach S': { dep: 0.84, v: { 'S580': 195000, 'S680': 255000 } },
  },
  Bentley: {
    'Continental GT': { dep: 0.84, v: { 'V8': 242000, 'W12': 272000, 'Speed': 292000 } },
    'Continental GTC': { dep: 0.84, v: { 'V8': 258000, 'W12 Speed': 305000 } },
    'Bentayga': { dep: 0.83, v: { 'V8': 188000, 'Speed': 252000, 'EWB': 215000 } },
    'Flying Spur': { dep: 0.82, v: { 'V8': 218000, 'W12 Speed': 272000 } },
  },
  'Rolls-Royce': {
    'Ghost': { dep: 0.88, v: { 'Standard': 355000, 'Extended': 395000, 'Black Badge': 440000 } },
    'Wraith': { dep: 0.88, v: { 'Coupé': 345000, 'Black Badge': 408000 } },
    'Cullinan': { dep: 0.89, v: { 'Standard': 400000, 'Black Badge': 465000 } },
    'Spectre': { dep: 0.87, v: { 'Standard': 345000 } },
  },
  'Aston Martin': {
    'DB11': { dep: 0.80, v: { 'V8': 178000, 'V12 AMR': 225000 } },
    'DBS': { dep: 0.85, v: { '770 Ultimate': 370000 } },
    'Vantage': { dep: 0.80, v: { 'V8': 152000, 'F1 Edition': 168000 } },
    'DBX': { dep: 0.82, v: { '707': 238000 } },
  },
  Bugatti: {
    'Chiron': { dep: 0.96, v: { 'Sport': 3200000, 'Super Sport 300+': 4000000 } },
    'Veyron': { dep: 0.95, v: { '16.4': 1500000, 'Grand Sport Vitesse': 2000000 } },
  },
  Koenigsegg: {
    'Agera': { dep: 0.97, v: { 'RS': 2500000 } },
    'Jesko': { dep: 0.97, v: { 'Absolut': 3500000 } },
  },
}

const OPTIONS_PRIX = [
  { key: 'sport_exhaust',   label: 'Échappement Sport',     mult: 0.025 },
  { key: 'carbon',          label: 'Pack Carbone',           mult: 0.045 },
  { key: 'audio_premium',   label: 'Audio Haute-Fidélité',   mult: 0.018 },
  { key: 'peinture',        label: 'Peinture Spéciale',      mult: 0.022 },
  { key: 'jantes_forgees',  label: 'Jantes Forgées',         mult: 0.015 },
  { key: 'pack_nuit',       label: 'Pack Nuit / Black',      mult: 0.020 },
  { key: 'toit_panoramique',label: 'Toit Panoramique',       mult: 0.012 },
  { key: 'assistance_full', label: 'Assistance intégrale',   mult: 0.010 },
]

const ETAT_FACTOR: Record<string, number> = { Excellent: 1.10, Bon: 1.00, Correct: 0.87, Mauvais: 0.72 }

/* ────────────────────────────────────────────────────────────── */
function SimulateurPrix() {
  const [marque,  setMarque]  = useState('')
  const [modele,  setModele]  = useState('')
  const [version, setVersion] = useState('')
  const [annee,   setAnnee]   = useState(2021)
  const [km,      setKm]      = useState(25000)
  const [etat,    setEtat]    = useState('Bon')
  const [opts,    setOpts]    = useState<Record<string, boolean>>({})
  const [result,  setResult]  = useState<null | { min: number; moy: number; max: number; base: number; dep: number }>(null)

  const marques = Object.keys(CATALOG)
  const modeles = marque ? Object.keys(CATALOG[marque]) : []
  const versions = (marque && modele) ? Object.keys(CATALOG[marque]?.[modele]?.v ?? {}) : []

  const toggleOpt = (k: string) => setOpts((p) => ({ ...p, [k]: !p[k] }))
  const handleMarque = (m: string) => { setMarque(m); setModele(''); setVersion(''); setResult(null) }
  const handleModele = (m: string) => { setModele(m); setVersion(''); setResult(null) }

  const calculate = () => {
    const modelData = CATALOG[marque]?.[modele]
    const basePrix = modelData?.v?.[version] ?? 60000
    const dep = modelData?.dep ?? 0.85
    const age = 2026 - annee

    // Dépréciation
    const rawVal = basePrix * Math.pow(dep, age)

    // Facteur kilométrage (15 000 km/an = référence)
    const refKm = 15000 * age
    const kmRatio = refKm > 0 ? km / refKm : 1
    const kmFactor = kmRatio < 1
      ? 1 + (1 - kmRatio) * 0.12
      : Math.max(0.78, 1 - (kmRatio - 1) * 0.08)

    // État
    const etatF = ETAT_FACTOR[etat] ?? 1

    // Options sélectionnées
    const optsMult = 1 + OPTIONS_PRIX.filter((o) => opts[o.key]).reduce((acc, o) => acc + o.mult, 0)

    const moy = Math.round(rawVal * kmFactor * etatF * optsMult)
    setResult({ min: Math.round(moy * 0.90), moy, max: Math.round(moy * 1.10), base: basePrix, dep })
  }

  const SELECT = {
    width: '100%', background: '#F8F9FA', border: '1px solid #2A2A2A',
    color: 'rgba(0,0,0,0.65)', padding: '12px 16px', fontSize: 13,
    outline: 'none', fontFamily: 'var(--font-code,monospace)',
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <TrendingDown size={20} style={{ color: '#C9A84C' }} />
        <h2 className="font-display" style={{ fontSize: 28, color: '#0F0F0F' }}>SIMULATEUR DE PRIX MARCHÉ</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* ─ Formulaire ─ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Marque */}
          <div>
            <p style={{ fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.25em', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', marginBottom: 8 }}>Marque</p>
            <select value={marque} onChange={(e) => handleMarque(e.target.value)} style={SELECT}>
              <option value="">— Sélectionner une marque</option>
              {marques.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>

          {/* Modèle */}
          <div>
            <p style={{ fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.25em', color: marque ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.12)', textTransform: 'uppercase', marginBottom: 8 }}>Modèle</p>
            <select value={modele} onChange={(e) => handleModele(e.target.value)} disabled={!marque} style={{ ...SELECT, color: modele ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0.28)', opacity: marque ? 1 : 0.5 }}>
              <option value="">— Sélectionner un modèle</option>
              {modeles.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>

          {/* Version */}
          <div>
            <p style={{ fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.25em', color: modele ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.12)', textTransform: 'uppercase', marginBottom: 8 }}>Version</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {versions.length > 0 ? versions.map((v) => (
                <button
                  key={v}
                  onClick={() => setVersion(v)}
                  style={{
                    padding: '7px 14px', border: '1px solid', fontSize: 12,
                    fontFamily: 'var(--font-code,monospace)', transition: 'all 0.15s',
                    background: version === v ? '#C9A84C' : 'transparent',
                    color: version === v ? '#000' : 'rgba(0,0,0,0.4)',
                    borderColor: version === v ? '#C9A84C' : 'rgba(0,0,0,0.1)',
                  }}
                >
                  {v}
                  {version === v && CATALOG[marque]?.[modele]?.v?.[v] && (
                    <span style={{ marginLeft: 8, opacity: 0.7 }}>
                      {(CATALOG[marque][modele].v[v] / 1000).toFixed(0)}k €
                    </span>
                  )}
                </button>
              )) : (
                <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.12)', fontFamily: 'var(--font-code,monospace)' }}>
                  {modele ? '—' : 'Sélectionnez d\'abord un modèle'}
                </p>
              )}
            </div>
          </div>

          {/* Année */}
          <div>
            <p style={{ fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.25em', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', marginBottom: 8 }}>
              Année — <span style={{ color: '#C9A84C' }}>{annee}</span>
            </p>
            <input type="range" min={2010} max={2025} value={annee} onChange={(e) => setAnnee(Number(e.target.value))} style={{ width: '100%', accentColor: '#C9A84C' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-code,monospace)', color: 'rgba(0,0,0,0.18)', marginTop: 4 }}>
              <span>2010</span><span>2025</span>
            </div>
          </div>

          {/* Kilométrage */}
          <div>
            <p style={{ fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.25em', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', marginBottom: 8 }}>
              Kilométrage — <span style={{ color: '#C9A84C' }}>{km.toLocaleString('fr-FR')} km</span>
              <span style={{ color: 'rgba(0,0,0,0.18)', fontSize: 9, marginLeft: 8 }}>
                (réf. {(15000 * (2026 - annee)).toLocaleString('fr-FR')} km attendu)
              </span>
            </p>
            <input type="range" min={0} max={200000} step={2500} value={km} onChange={(e) => setKm(Number(e.target.value))} style={{ width: '100%', accentColor: '#C9A84C' }} />
          </div>

          {/* État */}
          <div>
            <p style={{ fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.25em', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', marginBottom: 8 }}>État général</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
              {['Excellent', 'Bon', 'Correct', 'Mauvais'].map((e) => (
                <button key={e} onClick={() => setEtat(e)} style={{ padding: '10px 0', border: '1px solid', fontSize: 11, fontFamily: 'var(--font-code,monospace)', transition: 'all 0.15s', background: etat === e ? 'rgba(201,168,76,0.1)' : 'transparent', color: etat === e ? '#C9A84C' : 'rgba(0,0,0,0.4)', borderColor: etat === e ? '#C9A84C' : 'rgba(0,0,0,0.1)' }}>
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div>
            <p style={{ fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.25em', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', marginBottom: 8 }}>
              Options présentes <span style={{ color: 'rgba(0,0,0,0.12)' }}>(valorisation +)</span>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {OPTIONS_PRIX.map((o) => (
                <button key={o.key} onClick={() => toggleOpt(o.key)} style={{ padding: '6px 12px', border: '1px solid', fontSize: 11, fontFamily: 'var(--font-code,monospace)', transition: 'all 0.15s', background: opts[o.key] ? 'rgba(201,168,76,0.1)' : 'transparent', color: opts[o.key] ? '#C9A84C' : 'rgba(0,0,0,0.28)', borderColor: opts[o.key] ? '#C9A84C' : 'rgba(0,0,0,0.1)' }}>
                  {o.label} <span style={{ opacity: 0.5 }}>+{(o.mult * 100).toFixed(1)}%</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={calculate}
            disabled={!version}
            style={{ padding: '16px', background: version ? '#C9A84C' : '#1A1A1A', color: version ? '#000' : 'rgba(0,0,0,0.18)', fontFamily: 'var(--font-heading,sans-serif)', fontSize: 15, letterSpacing: '0.2em', border: 'none', transition: 'background 0.2s' }}
          >
            CALCULER LE PRIX MARCHÉ
          </button>
        </div>

        {/* ─ Résultat ─ */}
        <div>
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Header résumé */}
                <div style={{ background: '#F8F9FA', border: '1px solid #C9A84C', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ChevronRight size={12} style={{ color: '#C9A84C' }} />
                  <p style={{ fontSize: 12, fontFamily: 'var(--font-code,monospace)', color: '#C9A84C', letterSpacing: '0.1em' }}>
                    {marque} {modele} {version} — {annee} — {km.toLocaleString('fr-FR')} km
                  </p>
                </div>

                {/* Prix */}
                <div style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid #2A2A2A', padding: 24 }}>
                  <p style={{ fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.25em', color: 'rgba(0,0,0,0.28)', textTransform: 'uppercase', marginBottom: 20 }}>Estimation prix marché français</p>
                  {[
                    { label: 'Fourchette basse',  value: result.min, main: false },
                    { label: 'Prix médian estimé', value: result.moy, main: true  },
                    { label: 'Fourchette haute',   value: result.max, main: false },
                  ].map((r) => (
                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: r.main ? '16px 0' : '12px 0', borderTop: r.main ? '1px solid #2A2A2A' : undefined, borderBottom: r.main ? '1px solid #2A2A2A' : undefined }}>
                      <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', fontFamily: 'var(--font-code,monospace)' }}>{r.label}</span>
                      <span style={{ fontFamily: 'var(--font-code,monospace)', fontSize: r.main ? 28 : 18, color: r.main ? '#C9A84C' : 'rgba(0,0,0,0.45)' }}>
                        {r.value.toLocaleString('fr-FR')} €
                      </span>
                    </div>
                  ))}
                  {/* Vs prix neuf */}
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #1A1A1A', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.28)', fontFamily: 'var(--font-code,monospace)' }}>Prix neuf ({version})</span>
                    <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.28)', fontFamily: 'var(--font-code,monospace)', textDecoration: 'line-through' }}>
                      {result.base.toLocaleString('fr-FR')} €
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: '#4ade80', fontFamily: 'var(--font-code,monospace)' }}>Décote cumulée</span>
                    <span style={{ fontSize: 13, color: '#4ade80', fontFamily: 'var(--font-code,monospace)' }}>
                      -{Math.round((1 - result.moy / result.base) * 100)}% — {(result.base - result.moy).toLocaleString('fr-FR')} €
                    </span>
                  </div>
                </div>

                {/* Courbe de dépréciation */}
                <div style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid #2A2A2A', padding: 24 }}>
                  <p style={{ fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.25em', color: 'rgba(0,0,0,0.28)', textTransform: 'uppercase', marginBottom: 16 }}>
                    Évolution de la valeur — taux {((1 - result.dep) * 100).toFixed(0)}%/an
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[0, 1, 2, 3, 5, 7, 10].map((y) => {
                      const val = Math.round(result.base * Math.pow(result.dep, 2026 - annee + y))
                      const pct = val / result.base
                      return (
                        <div key={y} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 10, fontFamily: 'var(--font-code,monospace)', color: 'rgba(0,0,0,0.28)', width: 52, flexShrink: 0 }}>
                            {y === 0 ? 'Actuel' : `+${y} an${y > 1 ? 's' : ''}`}
                          </span>
                          <div style={{ flex: 1, height: 4, background: '#1A1A1A', position: 'relative' }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct * 100}%` }}
                              transition={{ duration: 0.6, delay: y * 0.06 }}
                              style={{ height: '100%', background: y === 0 ? '#C9A84C' : `rgba(201,168,76,${0.6 - y * 0.04})` }}
                            />
                          </div>
                          <span style={{ fontSize: 10, fontFamily: 'var(--font-code,monospace)', color: y === 0 ? '#C9A84C' : 'rgba(0,0,0,0.28)', width: 90, textAlign: 'right', flexShrink: 0 }}>
                            {val.toLocaleString('fr-FR')} €
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <p style={{ fontSize: 10, color: 'rgba(0,0,0,0.18)', fontFamily: 'var(--font-code,monospace)', lineHeight: 1.6 }}>
                  * Estimation indicative basée sur les données marché. Les prix réels varient selon l&apos;historique, les options et l&apos;état exact du véhicule.
                </p>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #2A2A2A', padding: 48 }}>
                <div style={{ textAlign: 'center' }}>
                  <TrendingDown size={32} style={{ color: 'rgba(255,255,255,0.06)', margin: '0 auto 16px', display: 'block' }} />
                  <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.18)', fontFamily: 'var(--font-code,monospace)', lineHeight: 1.6 }}>
                    Sélectionnez une marque, un modèle<br />et une version pour estimer le prix
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────── */
function SimulateurAssurance() {
  const [valeur,    setValeur]    = useState(150000)
  const [age,       setAge]       = useState(30)
  const [permis,    setPermis]    = useState(10)
  const [bonus,     setBonus]     = useState(0.5)
  const [km,        setKm]        = useState(15000)
  const [usage,     setUsage]     = useState('Mixte')
  const [garage,    setGarage]    = useState(true)
  const [antivol,   setAntivol]   = useState(true)
  const [result, setResult] = useState<null | { tiers: [number,number]; etendu: [number,number]; tous: [number,number]; annuel: number }>(null)

  const calculate = () => {
    // Base proportionnelle à la valeur du véhicule
    const baseRate = valeur < 80000  ? 0.022
                   : valeur < 150000 ? 0.028
                   : valeur < 300000 ? 0.035
                   : valeur < 600000 ? 0.045
                   : 0.055
    const baseAnnual = valeur * baseRate

    const ageFactor    = age < 25 ? 1.75 : age < 30 ? 1.25 : age < 65 ? 1.0 : 1.15
    const bonusFactor  = bonus
    const kmFactor     = 1 + (km - 15000) / 120000
    const usageFactor  = usage === 'Domicile-Travail' ? 1.12 : usage === 'Professionnel' ? 1.30 : 1.0
    const garageFactor = garage  ? 0.90 : 1.0
    const antivolFactor= antivol ? 0.94 : 1.0

    const annual  = baseAnnual * ageFactor * bonusFactor * kmFactor * usageFactor * garageFactor * antivolFactor
    const monthly = annual / 12

    setResult({
      tiers:  [Math.round(monthly * 0.28), Math.round(monthly * 0.38)],
      etendu: [Math.round(monthly * 0.58), Math.round(monthly * 0.72)],
      tous:   [Math.round(monthly * 0.88), Math.round(monthly * 1.08)],
      annuel: Math.round(annual),
    })
  }

  const SLIDER = (label: string, val: number | string, extra?: string) => (
    <p style={{ fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.25em', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', marginBottom: 8 }}>
      {label} — <span style={{ color: '#C9A84C' }}>{val}</span>
      {extra && <span style={{ color: 'rgba(0,0,0,0.18)', marginLeft: 8, fontSize: 9 }}>{extra}</span>}
    </p>
  )

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <Shield size={20} style={{ color: '#C9A84C' }} />
        <h2 className="font-display" style={{ fontSize: 28, color: '#0F0F0F' }}>SIMULATEUR ASSURANCE</h2>
      </div>
      <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.35)', fontFamily: 'var(--font-code,monospace)', marginBottom: 32 }}>
        * Estimation indicative uniquement. Contactez un assureur pour un devis réglementé.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Valeur du véhicule */}
          <div>
            {SLIDER('Valeur du véhicule', valeur >= 1000000 ? `${(valeur/1000000).toFixed(1)} M€` : `${valeur.toLocaleString('fr-FR')} €`)}
            <input type="range" min={20000} max={1000000} step={5000} value={valeur} onChange={(e) => setValeur(Number(e.target.value))} style={{ width: '100%', accentColor: '#C9A84C' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--font-code,monospace)', color: 'rgba(0,0,0,0.18)', marginTop: 4 }}>
              <span>20 000 €</span><span>1 000 000 €</span>
            </div>
          </div>

          {/* Âge */}
          <div>
            {SLIDER('Âge du conducteur', `${age} ans`)}
            <input type="range" min={18} max={75} step={1} value={age} onChange={(e) => setAge(Number(e.target.value))} style={{ width: '100%', accentColor: '#C9A84C' }} />
          </div>

          {/* Années de permis */}
          <div>
            {SLIDER('Années de permis', `${permis} an${permis > 1 ? 's' : ''}`)}
            <input type="range" min={0} max={50} step={1} value={permis} onChange={(e) => setPermis(Number(e.target.value))} style={{ width: '100%', accentColor: '#C9A84C' }} />
          </div>

          {/* Bonus/malus */}
          <div>
            {SLIDER('Coefficient bonus/malus', bonus.toFixed(2), bonus < 0.8 ? '— Excellent profil' : bonus > 1 ? '— Malus actif' : '')}
            <input type="range" min={0.5} max={3.5} step={0.05} value={bonus} onChange={(e) => setBonus(Number(e.target.value))} style={{ width: '100%', accentColor: '#C9A84C' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--font-code,monospace)', color: 'rgba(0,0,0,0.18)', marginTop: 4 }}>
              <span>0.50 (max bonus)</span><span>3.50 (malus)</span>
            </div>
          </div>

          {/* Km/an */}
          <div>
            {SLIDER('Kilométrage annuel', `${km.toLocaleString('fr-FR')} km`)}
            <input type="range" min={3000} max={50000} step={1000} value={km} onChange={(e) => setKm(Number(e.target.value))} style={{ width: '100%', accentColor: '#C9A84C' }} />
          </div>

          {/* Usage */}
          <div>
            <p style={{ fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.25em', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', marginBottom: 8 }}>Type d&apos;usage</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Loisir', 'Mixte', 'Domicile-Travail', 'Professionnel'].map((u) => (
                <button key={u} onClick={() => setUsage(u)} style={{ flex: 1, padding: '8px 0', border: '1px solid', fontSize: 10, fontFamily: 'var(--font-code,monospace)', transition: 'all 0.15s', background: usage === u ? 'rgba(201,168,76,0.1)' : 'transparent', color: usage === u ? '#C9A84C' : 'rgba(0,0,0,0.35)', borderColor: usage === u ? '#C9A84C' : 'rgba(0,0,0,0.1)' }}>
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Abattements */}
          <div>
            <p style={{ fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.25em', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', marginBottom: 8 }}>Réductions applicables</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[{ key: 'garage', label: 'Box / Garage fermé', val: garage, set: setGarage }, { key: 'antivol', label: 'Antivol homologué', val: antivol, set: setAntivol }].map((item) => (
                <button key={item.key} onClick={() => item.set(!item.val)} style={{ flex: 1, padding: '10px 12px', border: '1px solid', fontSize: 11, fontFamily: 'var(--font-code,monospace)', transition: 'all 0.15s', background: item.val ? 'rgba(74,222,128,0.08)' : 'transparent', color: item.val ? '#4ade80' : 'rgba(0,0,0,0.35)', borderColor: item.val ? 'rgba(74,222,128,0.3)' : 'rgba(0,0,0,0.1)' }}>
                  {item.val ? '✓ ' : ''}{item.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={calculate} style={{ padding: '16px', background: '#C9A84C', color: '#000', fontFamily: 'var(--font-heading,sans-serif)', fontSize: 15, letterSpacing: '0.2em', border: 'none' }}>
            ESTIMER MON ASSURANCE
          </button>
        </div>

        {/* ─ Résultat assurance ─ */}
        <div>
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                {/* Budget annuel total */}
                <div style={{ background: '#F8F9FA', border: '1px solid #C9A84C', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: 11, fontFamily: 'var(--font-code,monospace)', color: 'rgba(0,0,0,0.45)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Budget tous risques / an</p>
                  <p style={{ fontFamily: 'var(--font-code,monospace)', fontSize: 22, color: '#C9A84C' }}>{result.annuel.toLocaleString('fr-FR')} €</p>
                </div>

                {[
                  { label: 'Tiers Simple',  range: result.tiers,  desc: 'Responsabilité civile uniquement',       recommended: false, mult: 0.33 },
                  { label: 'Tiers Étendu', range: result.etendu, desc: '+ Vol, incendie, bris de glace',         recommended: true,  mult: 0.65 },
                  { label: 'Tous Risques', range: result.tous,   desc: 'Protection maximale — tous sinistres',   recommended: false, mult: 1.00 },
                ].map((opt) => (
                  <div key={opt.label} style={{ border: `1px solid ${opt.recommended ? '#C9A84C' : 'rgba(0,0,0,0.1)'}`, background: opt.recommended ? 'rgba(201,168,76,0.05)' : 'transparent', padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p className="font-display" style={{ fontSize: 18, color: '#0F0F0F', marginBottom: 4 }}>{opt.label}</p>
                        <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)', fontFamily: 'var(--font-code,monospace)' }}>{opt.desc}</p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                        <p style={{ fontFamily: 'var(--font-code,monospace)', color: '#C9A84C', fontSize: 15 }}>{opt.range[0]} – {opt.range[1]} €/mois</p>
                        <p style={{ fontSize: 10, color: 'rgba(0,0,0,0.28)', fontFamily: 'var(--font-code,monospace)', marginTop: 2 }}>{Math.round(result.annuel * opt.mult).toLocaleString('fr-FR')} €/an est.</p>
                        {opt.recommended && <p style={{ fontSize: 10, color: '#C9A84C', fontFamily: 'var(--font-code,monospace)', marginTop: 2 }}>RECOMMANDÉ</p>}
                      </div>
                    </div>
                  </div>
                ))}

                <a href="tel:+33123456789" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: '1px solid #C9A84C', color: '#C9A84C', padding: '16px', fontFamily: 'var(--font-heading,sans-serif)', fontSize: 13, letterSpacing: '0.2em', textDecoration: 'none' }}>
                  OBTENIR UN DEVIS RÉEL <ArrowRight size={14} />
                </a>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #2A2A2A', padding: 48 }}>
                <div style={{ textAlign: 'center' }}>
                  <Shield size={32} style={{ color: 'rgba(255,255,255,0.06)', margin: '0 auto 16px', display: 'block' }} />
                  <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.18)', fontFamily: 'var(--font-code,monospace)', lineHeight: 1.6 }}>
                    Renseignez votre profil<br />pour voir l&apos;estimation
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────── */
export default function SimulateursPage() {
  const [tab, setTab] = useState<'prix' | 'assurance'>('prix')

  return (
    <div style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 96 }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)', marginBottom: 12 }}>Outils en ligne</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(52px,8vw,96px)', color: '#0F0F0F', lineHeight: 0.95, marginBottom: 16 }}>SIMULATEURS</h1>
          <p style={{ fontSize: 15, color: 'rgba(0,0,0,0.4)', maxWidth: 480, lineHeight: 1.7 }}>
            Estimez le prix marché exact de votre véhicule ou simulez le coût de votre assurance.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 48 }}>
          {([['prix', TrendingDown, 'PRIX MARCHÉ'], ['assurance', Shield, 'ASSURANCE']] as const).map(([key, Icon, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', fontFamily: 'var(--font-heading,sans-serif)', fontSize: 13, letterSpacing: '0.2em', border: '1px solid', transition: 'all 0.2s', background: tab === key ? '#C9A84C' : 'transparent', color: tab === key ? '#000' : 'rgba(0,0,0,0.45)', borderColor: tab === key ? '#C9A84C' : 'rgba(0,0,0,0.1)' }}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid #2A2A2A', padding: 48 }}>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {tab === 'prix' ? <SimulateurPrix /> : <SimulateurAssurance />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
