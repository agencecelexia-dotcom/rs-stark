'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingDown, Shield, ArrowRight, ChevronRight } from 'lucide-react'

/* --- Catalogue marque -> modele -> { versions: {nom: prixNeuf}, dep: tauxAnnuel } --- */
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
    'F8 Tributo': { dep: 0.92, v: { 'Coupe': 252000, 'Spider': 278000 } },
    'SF90 Stradale': { dep: 0.94, v: { 'Coupe': 435000, 'Spider': 490000 } },
    'Roma': { dep: 0.91, v: { 'Coupe': 238000, 'Spider': 262000 } },
    'Purosangue': { dep: 0.93, v: { 'V12': 405000 } },
    '812': { dep: 0.93, v: { 'Superfast': 355000, 'GTS': 395000, 'Competizione': 500000 } },
  },
  Lamborghini: {
    'Huracan': { dep: 0.88, v: { 'EVO': 225000, 'EVO RWD': 198000, 'STO': 335000, 'Tecnica': 268000 } },
    'Urus': { dep: 0.86, v: { 'S': 255000, 'Performante': 290000 } },
    'Revuelto': { dep: 0.93, v: { 'Standard': 600000 } },
  },
  McLaren: {
    '720S': { dep: 0.83, v: { 'Coupe': 288000, 'Spider': 318000 } },
    '765LT': { dep: 0.89, v: { 'Coupe': 375000, 'Spider': 415000 } },
    'Artura': { dep: 0.82, v: { 'Standard': 228000, 'Spider': 255000 } },
    'GT': { dep: 0.81, v: { 'Standard': 210000 } },
  },
  BMW: {
    'M2': { dep: 0.83, v: { 'Competition': 84000 } },
    'M3': { dep: 0.83, v: { 'Competition': 92000, 'Competition xDrive': 102000, 'CS': 152000 } },
    'M4': { dep: 0.82, v: { 'Competition': 98000, 'Competition xDrive': 108000, 'CSL': 198000 } },
    'M5': { dep: 0.81, v: { 'Competition': 130000, 'CS': 185000 } },
    'M8': { dep: 0.80, v: { 'Coupe Competition': 148000, 'Gran Coupe Competition': 153000 } },
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
    'Wraith': { dep: 0.88, v: { 'Coupe': 345000, 'Black Badge': 408000 } },
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
  { key: 'sport_exhaust',   label: 'Echappement Sport',     mult: 0.025 },
  { key: 'carbon',          label: 'Pack Carbone',           mult: 0.045 },
  { key: 'audio_premium',   label: 'Audio Haute-Fidelite',   mult: 0.018 },
  { key: 'peinture',        label: 'Peinture Speciale',      mult: 0.022 },
  { key: 'jantes_forgees',  label: 'Jantes Forgees',         mult: 0.015 },
  { key: 'pack_nuit',       label: 'Pack Nuit / Black',      mult: 0.020 },
  { key: 'toit_panoramique',label: 'Toit Panoramique',       mult: 0.012 },
  { key: 'assistance_full', label: 'Assistance integrale',   mult: 0.010 },
]

const ETAT_FACTOR: Record<string, number> = { Excellent: 1.10, Bon: 1.00, Correct: 0.87, Mauvais: 0.72 }

/* ------------------------------------------------------------------ */
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

    const rawVal = basePrix * Math.pow(dep, age)

    const refKm = 15000 * age
    const kmRatio = refKm > 0 ? km / refKm : 1
    const kmFactor = kmRatio < 1
      ? 1 + (1 - kmRatio) * 0.12
      : Math.max(0.78, 1 - (kmRatio - 1) * 0.08)

    const etatF = ETAT_FACTOR[etat] ?? 1

    const optsMult = 1 + OPTIONS_PRIX.filter((o) => opts[o.key]).reduce((acc, o) => acc + o.mult, 0)

    const moy = Math.round(rawVal * kmFactor * etatF * optsMult)
    setResult({ min: Math.round(moy * 0.90), moy, max: Math.round(moy * 1.10), base: basePrix, dep })
  }

  const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 10 }

  return (
    <div>
      <div className="flex items-center gap-3" style={{ marginBottom: 32 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(12,27,51,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TrendingDown size={20} style={{ color: 'var(--color-navy)' }} />
        </div>
        <h2 className="font-display" style={{ fontSize: 24, color: 'var(--color-navy)' }}>Simulateur de prix marche</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* -- Formulaire -- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Marque */}
          <div>
            <p style={labelStyle}>Marque</p>
            <select value={marque} onChange={(e) => handleMarque(e.target.value)} className="input-rounded" style={{ color: marque ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
              <option value="">-- Selectionner une marque</option>
              {marques.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>

          {/* Modele */}
          <div>
            <p style={{ ...labelStyle, opacity: marque ? 1 : 0.3 }}>Modele</p>
            <select value={modele} onChange={(e) => handleModele(e.target.value)} disabled={!marque} className="input-rounded" style={{ color: modele ? 'var(--color-text)' : 'var(--color-text-muted)', opacity: marque ? 1 : 0.5 }}>
              <option value="">-- Selectionner un modele</option>
              {modeles.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>

          {/* Version */}
          <div>
            <p style={{ ...labelStyle, opacity: modele ? 1 : 0.3 }}>Version</p>
            <div className="flex flex-wrap gap-2">
              {versions.length > 0 ? versions.map((v) => (
                <button
                  key={v}
                  onClick={() => setVersion(v)}
                  style={{
                    padding: '8px 16px', borderRadius: 50, border: '1.5px solid', fontSize: 13,
                    fontWeight: 500, transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                    background: version === v ? 'var(--color-navy)' : 'transparent',
                    color: version === v ? '#fff' : 'var(--color-text-muted)',
                    borderColor: version === v ? 'var(--color-navy)' : 'var(--color-border)',
                  }}
                >
                  {v}
                  {version === v && CATALOG[marque]?.[modele]?.v?.[v] && (
                    <span style={{ marginLeft: 8, opacity: 0.7 }}>
                      {(CATALOG[marque][modele].v[v] / 1000).toFixed(0)}k EUR
                    </span>
                  )}
                </button>
              )) : (
                <p style={{ fontSize: 13, color: 'var(--color-text-muted)', opacity: 0.4 }}>
                  {modele ? '--' : 'Selectionnez d\'abord un modele'}
                </p>
              )}
            </div>
          </div>

          {/* Annee */}
          <div>
            <p style={labelStyle}>
              Annee -- <span style={{ color: 'var(--color-accent)' }}>{annee}</span>
            </p>
            <input type="range" min={2010} max={2025} value={annee} onChange={(e) => setAnnee(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--color-navy)' }} />
            <div className="flex justify-between" style={{ fontSize: 11, color: 'var(--color-text-muted)', opacity: 0.5, marginTop: 4 }}>
              <span>2010</span><span>2025</span>
            </div>
          </div>

          {/* Kilometrage */}
          <div>
            <p style={labelStyle}>
              Kilometrage -- <span style={{ color: 'var(--color-accent)' }}>{km.toLocaleString('fr-FR')} km</span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 10, marginLeft: 8, opacity: 0.5 }}>
                (ref. {(15000 * (2026 - annee)).toLocaleString('fr-FR')} km attendu)
              </span>
            </p>
            <input type="range" min={0} max={200000} step={2500} value={km} onChange={(e) => setKm(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--color-navy)' }} />
          </div>

          {/* Etat */}
          <div>
            <p style={labelStyle}>Etat general</p>
            <div className="grid grid-cols-4 gap-2">
              {['Excellent', 'Bon', 'Correct', 'Mauvais'].map((e) => (
                <button key={e} onClick={() => setEtat(e)} style={{ padding: '10px 0', borderRadius: 12, border: '1.5px solid', fontSize: 12, fontWeight: 500, transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)', background: etat === e ? 'rgba(12,27,51,0.06)' : 'transparent', color: etat === e ? 'var(--color-navy)' : 'var(--color-text-muted)', borderColor: etat === e ? 'var(--color-navy)' : 'var(--color-border)' }}>
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div>
            <p style={labelStyle}>
              Options presentes <span style={{ opacity: 0.4 }}>(valorisation +)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {OPTIONS_PRIX.map((o) => (
                <button key={o.key} onClick={() => toggleOpt(o.key)} style={{ padding: '7px 14px', borderRadius: 50, border: '1.5px solid', fontSize: 12, fontWeight: 500, transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)', background: opts[o.key] ? 'rgba(12,27,51,0.06)' : 'transparent', color: opts[o.key] ? 'var(--color-navy)' : 'var(--color-text-muted)', borderColor: opts[o.key] ? 'var(--color-navy)' : 'var(--color-border)' }}>
                  {o.label} <span style={{ opacity: 0.5 }}>+{(o.mult * 100).toFixed(1)}%</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={calculate}
            disabled={!version}
            className="btn-primary"
            style={{ width: '100%', padding: '16px 32px', fontSize: 15, opacity: version ? 1 : 0.4 }}
          >
            Calculer le prix marche
          </button>
        </div>

        {/* -- Resultat -- */}
        <div>
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Header resume */}
                <div className="glass-card" style={{ padding: '14px 20px', borderColor: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ChevronRight size={14} style={{ color: 'var(--color-accent)' }} />
                  <p style={{ fontSize: 13, color: 'var(--color-accent)', fontWeight: 500, letterSpacing: '0.04em' }}>
                    {marque} {modele} {version} -- {annee} -- {km.toLocaleString('fr-FR')} km
                  </p>
                </div>

                {/* Prix */}
                <div className="glass-card" style={{ padding: 28 }}>
                  <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 20 }}>Estimation prix marche francais</p>
                  {[
                    { label: 'Fourchette basse',  value: result.min, main: false },
                    { label: 'Prix median estime', value: result.moy, main: true  },
                    { label: 'Fourchette haute',   value: result.max, main: false },
                  ].map((r) => (
                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: r.main ? '16px 0' : '12px 0', borderTop: r.main ? '1px solid var(--color-border)' : undefined, borderBottom: r.main ? '1px solid var(--color-border)' : undefined }}>
                      <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{r.label}</span>
                      <span className="font-display" style={{ fontSize: r.main ? 28 : 18, color: r.main ? 'var(--color-navy)' : 'var(--color-text-muted)' }}>
                        {r.value.toLocaleString('fr-FR')} EUR
                      </span>
                    </div>
                  ))}
                  {/* Vs prix neuf */}
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Prix neuf ({version})</span>
                    <span style={{ fontSize: 13, color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                      {result.base.toLocaleString('fr-FR')} EUR
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                    <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 500 }}>Decote cumulee</span>
                    <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 500 }}>
                      -{Math.round((1 - result.moy / result.base) * 100)}% -- {(result.base - result.moy).toLocaleString('fr-FR')} EUR
                    </span>
                  </div>
                </div>

                {/* Courbe de depreciation */}
                <div className="glass-card" style={{ padding: 28 }}>
                  <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 16 }}>
                    Evolution de la valeur -- taux {((1 - result.dep) * 100).toFixed(0)}%/an
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[0, 1, 2, 3, 5, 7, 10].map((y) => {
                      const val = Math.round(result.base * Math.pow(result.dep, 2026 - annee + y))
                      const pct = val / result.base
                      return (
                        <div key={y} className="flex items-center gap-3">
                          <span style={{ fontSize: 11, color: 'var(--color-text-muted)', width: 52, flexShrink: 0, fontWeight: 500 }}>
                            {y === 0 ? 'Actuel' : `+${y} an${y > 1 ? 's' : ''}`}
                          </span>
                          <div style={{ flex: 1, height: 6, background: 'var(--color-border)', borderRadius: 50, position: 'relative', overflow: 'hidden' }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct * 100}%` }}
                              transition={{ duration: 0.6, delay: y * 0.06 }}
                              style={{ height: '100%', borderRadius: 50, background: y === 0 ? 'var(--color-navy)' : `rgba(12,27,51,${0.6 - y * 0.04})` }}
                            />
                          </div>
                          <span style={{ fontSize: 11, color: y === 0 ? 'var(--color-navy)' : 'var(--color-text-muted)', width: 90, textAlign: 'right', flexShrink: 0, fontWeight: y === 0 ? 600 : 400 }}>
                            {val.toLocaleString('fr-FR')} EUR
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <p style={{ fontSize: 12, color: 'var(--color-text-muted)', opacity: 0.5, lineHeight: 1.6 }}>
                  * Estimation indicative basee sur les donnees marche. Les prix reels varient selon l&apos;historique, les options et l&apos;etat exact du vehicule.
                </p>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 16, border: '2px dashed var(--color-border)', padding: 48 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(12,27,51,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <TrendingDown size={24} style={{ color: 'var(--color-text-muted)', opacity: 0.3 }} />
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.7, opacity: 0.6 }}>
                    Selectionnez une marque, un modele<br />et une version pour estimer le prix
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

/* ------------------------------------------------------------------ */
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

  const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 10 }

  const SLIDER = (label: string, val: number | string, extra?: string) => (
    <p style={labelStyle}>
      {label} -- <span style={{ color: 'var(--color-accent)' }}>{val}</span>
      {extra && <span style={{ opacity: 0.5, marginLeft: 8, fontSize: 10 }}>{extra}</span>}
    </p>
  )

  return (
    <div>
      <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(12,27,51,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={20} style={{ color: 'var(--color-navy)' }} />
        </div>
        <h2 className="font-display" style={{ fontSize: 24, color: 'var(--color-navy)' }}>Simulateur assurance</h2>
      </div>
      <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 32, opacity: 0.6 }}>
        * Estimation indicative uniquement. Contactez un assureur pour un devis reglemente.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Valeur du vehicule */}
          <div>
            {SLIDER('Valeur du vehicule', valeur >= 1000000 ? `${(valeur/1000000).toFixed(1)} M EUR` : `${valeur.toLocaleString('fr-FR')} EUR`)}
            <input type="range" min={20000} max={1000000} step={5000} value={valeur} onChange={(e) => setValeur(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--color-navy)' }} />
            <div className="flex justify-between" style={{ fontSize: 11, color: 'var(--color-text-muted)', opacity: 0.4, marginTop: 4 }}>
              <span>20 000 EUR</span><span>1 000 000 EUR</span>
            </div>
          </div>

          {/* Age */}
          <div>
            {SLIDER('Age du conducteur', `${age} ans`)}
            <input type="range" min={18} max={75} step={1} value={age} onChange={(e) => setAge(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--color-navy)' }} />
          </div>

          {/* Annees de permis */}
          <div>
            {SLIDER('Annees de permis', `${permis} an${permis > 1 ? 's' : ''}`)}
            <input type="range" min={0} max={50} step={1} value={permis} onChange={(e) => setPermis(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--color-navy)' }} />
          </div>

          {/* Bonus/malus */}
          <div>
            {SLIDER('Coefficient bonus/malus', bonus.toFixed(2), bonus < 0.8 ? '-- Excellent profil' : bonus > 1 ? '-- Malus actif' : '')}
            <input type="range" min={0.5} max={3.5} step={0.05} value={bonus} onChange={(e) => setBonus(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--color-navy)' }} />
            <div className="flex justify-between" style={{ fontSize: 11, color: 'var(--color-text-muted)', opacity: 0.4, marginTop: 4 }}>
              <span>0.50 (max bonus)</span><span>3.50 (malus)</span>
            </div>
          </div>

          {/* Km/an */}
          <div>
            {SLIDER('Kilometrage annuel', `${km.toLocaleString('fr-FR')} km`)}
            <input type="range" min={3000} max={50000} step={1000} value={km} onChange={(e) => setKm(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--color-navy)' }} />
          </div>

          {/* Usage */}
          <div>
            <p style={labelStyle}>Type d&apos;usage</p>
            <div className="grid grid-cols-4 gap-2">
              {['Loisir', 'Mixte', 'Domicile-Travail', 'Professionnel'].map((u) => (
                <button key={u} onClick={() => setUsage(u)} style={{ padding: '10px 4px', borderRadius: 12, border: '1.5px solid', fontSize: 11, fontWeight: 500, transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)', background: usage === u ? 'rgba(12,27,51,0.06)' : 'transparent', color: usage === u ? 'var(--color-navy)' : 'var(--color-text-muted)', borderColor: usage === u ? 'var(--color-navy)' : 'var(--color-border)' }}>
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Abattements */}
          <div>
            <p style={labelStyle}>Reductions applicables</p>
            <div className="grid grid-cols-2 gap-3">
              {[{ key: 'garage', label: 'Box / Garage ferme', val: garage, set: setGarage }, { key: 'antivol', label: 'Antivol homologue', val: antivol, set: setAntivol }].map((item) => (
                <button key={item.key} onClick={() => item.set(!item.val)} style={{ padding: '12px 14px', borderRadius: 12, border: '1.5px solid', fontSize: 12, fontWeight: 500, transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)', background: item.val ? 'rgba(22,163,106,0.06)' : 'transparent', color: item.val ? '#16a34a' : 'var(--color-text-muted)', borderColor: item.val ? 'rgba(22,163,106,0.25)' : 'var(--color-border)' }}>
                  {item.val ? '+ ' : ''}{item.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={calculate} className="btn-primary" style={{ width: '100%', padding: '16px 32px', fontSize: 15 }}>
            Estimer mon assurance
          </button>
        </div>

        {/* -- Resultat assurance -- */}
        <div>
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                {/* Budget annuel total */}
                <div className="glass-card" style={{ padding: '18px 24px', borderColor: 'var(--color-accent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Budget tous risques / an</p>
                  <p className="font-display" style={{ fontSize: 22, color: 'var(--color-navy)' }}>{result.annuel.toLocaleString('fr-FR')} EUR</p>
                </div>

                {[
                  { label: 'Tiers Simple',  range: result.tiers,  desc: 'Responsabilite civile uniquement',       recommended: false, mult: 0.33 },
                  { label: 'Tiers Etendu', range: result.etendu, desc: '+ Vol, incendie, bris de glace',         recommended: true,  mult: 0.65 },
                  { label: 'Tous Risques', range: result.tous,   desc: 'Protection maximale -- tous sinistres',   recommended: false, mult: 1.00 },
                ].map((opt) => (
                  <div key={opt.label} className="glass-card" style={{ padding: 22, borderColor: opt.recommended ? 'var(--color-accent)' : undefined, background: opt.recommended ? 'rgba(201,168,76,0.03)' : undefined }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p className="font-display" style={{ fontSize: 17, color: 'var(--color-navy)', marginBottom: 4 }}>{opt.label}</p>
                        <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{opt.desc}</p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                        <p style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: 15 }}>{opt.range[0]} - {opt.range[1]} EUR/mois</p>
                        <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>{Math.round(result.annuel * opt.mult).toLocaleString('fr-FR')} EUR/an est.</p>
                        {opt.recommended && <p style={{ fontSize: 11, color: 'var(--color-accent)', fontWeight: 600, marginTop: 4 }}>RECOMMANDE</p>}
                      </div>
                    </div>
                  </div>
                ))}

                <a href="tel:+33123456789" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', gap: 8 }}>
                  Obtenir un devis reel <ArrowRight size={14} />
                </a>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 16, border: '2px dashed var(--color-border)', padding: 48 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(12,27,51,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Shield size={24} style={{ color: 'var(--color-text-muted)', opacity: 0.3 }} />
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.7, opacity: 0.6 }}>
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

/* ------------------------------------------------------------------ */
export default function SimulateursPage() {
  const [tab, setTab] = useState<'prix' | 'assurance'>('prix')

  return (
    <div className="page-section" style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 96, background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>

        <div className="page-section-header" style={{ marginBottom: 48 }}>
          <p className="section-tag">Outils en ligne</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(48px, 7vw, 80px)', color: 'var(--color-navy)', lineHeight: 0.95, marginBottom: 16 }}>
            Simulateurs
          </h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-muted)', maxWidth: 520, lineHeight: 1.7 }}>
            Estimez le prix marche exact de votre vehicule ou simulez le cout de votre assurance.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3" style={{ marginBottom: 48 }}>
          {([['prix', TrendingDown, 'Prix marche'], ['assurance', Shield, 'Assurance']] as const).map(([key, Icon, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="flex items-center gap-2"
              style={{
                padding: '12px 28px', borderRadius: 50, fontSize: 14, fontWeight: 500,
                letterSpacing: '0.04em', border: '1.5px solid',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                background: tab === key ? 'var(--color-navy)' : 'transparent',
                color: tab === key ? '#fff' : 'var(--color-text-muted)',
                borderColor: tab === key ? 'var(--color-navy)' : 'var(--color-border)',
              }}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        <div className="glass-card" style={{ padding: 48 }}>
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
