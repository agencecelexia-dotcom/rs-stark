'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { TrendingDown, Shield, ArrowRight } from 'lucide-react'

const marques = ['BMW', 'Mercedes', 'Audi', 'Porsche', 'Ferrari', 'Lamborghini', 'McLaren', 'Bentley', 'Rolls-Royce', 'Autre']

function SimulateurPrix() {
  const [marque, setMarque] = useState('')
  const [annee, setAnnee] = useState(2020)
  const [km, setKm] = useState(50000)
  const [etat, setEtat] = useState('Bon')
  const [result, setResult] = useState<null | { min: number; moy: number; max: number }>(null)

  const calculate = () => {
    const base = 60000
    const age = 2026 - annee
    const depreciation = Math.pow(0.82, age)
    const kmFactor = Math.max(0.7, 1 - (km / 500000) * 0.3)
    const etatFactor = { Excellent: 1.1, Bon: 1, Correct: 0.88, Mauvais: 0.72 }[etat] ?? 1
    const moy = Math.round(base * depreciation * kmFactor * etatFactor)
    setResult({ min: Math.round(moy * 0.88), moy, max: Math.round(moy * 1.12) })
  }

  const inputCls = 'w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#C9A84C] text-white placeholder-white/20 px-4 py-3 text-sm outline-none transition-colors font-mono'

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <TrendingDown size={20} className="text-[#C9A84C]" />
        <h2 className="font-display text-3xl text-white">SIMULATEUR DE PRIX MARCHÉ</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-5">
          <div>
            <label className="text-[10px] font-mono tracking-widest text-white/30 uppercase block mb-2">Marque</label>
            <select value={marque} onChange={(e) => setMarque(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#C9A84C] text-white/70 px-4 py-3 text-sm outline-none transition-colors font-mono">
              <option value="">Sélectionner une marque</option>
              {marques.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-mono tracking-widest text-white/30 uppercase block mb-2">
              Année — <span className="text-[#C9A84C]">{annee}</span>
            </label>
            <input type="range" min={2000} max={2025} value={annee} onChange={(e) => setAnnee(Number(e.target.value))} className="w-full accent-[#C9A84C]" />
            <div className="flex justify-between text-xs font-mono text-white/20 mt-1"><span>2000</span><span>2025</span></div>
          </div>
          <div>
            <label className="text-[10px] font-mono tracking-widest text-white/30 uppercase block mb-2">
              Kilométrage — <span className="text-[#C9A84C]">{km.toLocaleString('fr-FR')} km</span>
            </label>
            <input type="range" min={0} max={300000} step={5000} value={km} onChange={(e) => setKm(Number(e.target.value))} className="w-full accent-[#C9A84C]" />
          </div>
          <div>
            <label className="text-[10px] font-mono tracking-widest text-white/30 uppercase block mb-2">État général</label>
            <div className="grid grid-cols-4 gap-2">
              {['Excellent', 'Bon', 'Correct', 'Mauvais'].map((e) => (
                <button key={e} onClick={() => setEtat(e)} className={`py-2 border text-xs font-mono transition-all ${etat === e ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#2A2A2A] text-white/40 hover:border-white/20'}`}>{e}</button>
              ))}
            </div>
          </div>
          <button onClick={calculate} className="w-full py-4 bg-[#C9A84C] text-black font-display tracking-[0.2em] hover:bg-[#E2C06A] transition-colors">
            CALCULER LE PRIX MARCHÉ
          </button>
        </div>

        <div>
          {result ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="bg-[#111] border border-[#2A2A2A] p-6">
                <p className="text-[10px] font-mono tracking-widest text-white/30 uppercase mb-6">Prix estimé sur le marché français</p>
                {[
                  { label: 'Prix minimum', value: result.min, color: 'text-white/50' },
                  { label: 'Prix moyen', value: result.moy, color: 'text-[#C9A84C]', main: true },
                  { label: 'Prix maximum', value: result.max, color: 'text-white/50' },
                ].map((r) => (
                  <div key={r.label} className={`flex justify-between items-center py-4 ${r.main ? 'border-y border-[#2A2A2A]' : ''}`}>
                    <span className="text-sm text-white/40">{r.label}</span>
                    <span className={`font-mono ${r.main ? 'text-2xl' : 'text-lg'} ${r.color}`}>
                      {r.value.toLocaleString('fr-FR')} €
                    </span>
                  </div>
                ))}
              </div>
              {/* Depreciation bar */}
              <div className="bg-[#111] border border-[#2A2A2A] p-6">
                <p className="text-[10px] font-mono tracking-widest text-white/30 uppercase mb-4">Dépréciation estimée</p>
                <div className="space-y-2">
                  {[1, 2, 3, 5, 7, 10].map((y) => {
                    const pct = Math.round((1 - Math.pow(0.82, y)) * 100)
                    return (
                      <div key={y} className="flex items-center gap-3">
                        <span className="text-xs font-mono text-white/30 w-12">+{y} an{y > 1 ? 's' : ''}</span>
                        <div className="flex-1 bg-[#1A1A1A] h-1">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.2 }} className="h-full bg-[#C9A84C]/60" />
                        </div>
                        <span className="text-xs font-mono text-white/30 w-10">-{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <p className="text-[10px] text-white/20 font-mono">* Estimation indicative. Les prix réels peuvent varier selon l&apos;état exact, les options et le marché.</p>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center border border-dashed border-[#2A2A2A] p-12">
              <div className="text-center">
                <TrendingDown size={32} className="text-white/10 mx-auto mb-4" />
                <p className="text-white/20 text-sm font-mono">Renseignez les informations<br />pour voir l&apos;estimation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SimulateurAssurance() {
  const [age, setAge] = useState(30)
  const [permis, setPermis] = useState(10)
  const [bonus, setBonus] = useState(0.5)
  const [km, setKm] = useState(15000)
  const [couverture, setCouverture] = useState('Tous risques')
  const [result, setResult] = useState<null | { tiers: [number, number]; etendu: [number, number]; tous: [number, number] }>(null)

  const calculate = () => {
    const base = 2400
    const ageFactor = age < 25 ? 1.8 : age < 30 ? 1.3 : 1
    const bonusFactor = bonus
    const kmFactor = 1 + (km - 15000) / 100000
    const annual = base * ageFactor * bonusFactor * kmFactor
    const monthly = annual / 12
    setResult({
      tiers: [Math.round(monthly * 0.3), Math.round(monthly * 0.4)],
      etendu: [Math.round(monthly * 0.6), Math.round(monthly * 0.75)],
      tous: [Math.round(monthly * 0.9), Math.round(monthly * 1.1)],
    })
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Shield size={20} className="text-[#C9A84C]" />
        <h2 className="font-display text-3xl text-white">SIMULATEUR ASSURANCE</h2>
      </div>
      <p className="text-white/30 text-sm mb-8 font-mono">* Estimation indicative. Contactez un assureur pour un devis personnalisé réglementé.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-5">
          {[
            { label: `Âge du conducteur — ${age} ans`, min: 18, max: 75, value: age, set: setAge, step: 1 },
            { label: `Années de permis — ${permis} ans`, min: 0, max: 50, value: permis, set: setPermis, step: 1 },
            { label: `Coefficient bonus/malus — ${bonus}`, min: 0.5, max: 3.5, value: bonus, set: setBonus, step: 0.05 },
            { label: `Km/an — ${km.toLocaleString('fr-FR')} km`, min: 5000, max: 50000, value: km, set: setKm, step: 1000 },
          ].map((s) => (
            <div key={s.label}>
              <label className="text-[10px] font-mono tracking-widest text-white/30 uppercase block mb-2">
                {s.label.split(' — ')[0]} — <span className="text-[#C9A84C]">{s.label.split(' — ')[1]}</span>
              </label>
              <input type="range" min={s.min} max={s.max} step={s.step} value={s.value} onChange={(e) => s.set(Number(e.target.value) as never)} className="w-full accent-[#C9A84C]" />
            </div>
          ))}
          <button onClick={calculate} className="w-full py-4 bg-[#C9A84C] text-black font-display tracking-[0.2em] hover:bg-[#E2C06A] transition-colors">
            ESTIMER MON ASSURANCE
          </button>
        </div>

        <div>
          {result ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {[
                { label: 'Tiers Simple', range: result.tiers, desc: 'Responsabilité civile uniquement', recommended: false },
                { label: 'Tiers Étendu', range: result.etendu, desc: '+ Vol, incendie, bris de glace', recommended: true },
                { label: 'Tous Risques', range: result.tous, desc: 'Protection maximale tous sinistres', recommended: false },
              ].map((opt) => (
                <div key={opt.label} className={`border p-5 ${opt.recommended ? 'border-[#C9A84C] bg-[#C9A84C]/5' : 'border-[#2A2A2A]'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-display text-lg text-white">{opt.label}</p>
                      <p className="text-xs text-white/30 mt-0.5">{opt.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[#C9A84C] font-medium">{opt.range[0]} – {opt.range[1]} €/mois</p>
                      {opt.recommended && <p className="text-[10px] text-[#C9A84C]/60 font-mono">RECOMMANDÉ</p>}
                    </div>
                  </div>
                </div>
              ))}
              <a href="tel:+33123456789" className="flex items-center justify-center gap-2 border border-[#C9A84C] text-[#C9A84C] py-4 font-display tracking-widest hover:bg-[#C9A84C] hover:text-black transition-all">
                OBTENIR UN DEVIS RÉEL <ArrowRight size={14} />
              </a>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center border border-dashed border-[#2A2A2A] p-12">
              <div className="text-center">
                <Shield size={32} className="text-white/10 mx-auto mb-4" />
                <p className="text-white/20 text-sm font-mono">Renseignez votre profil<br />pour voir l&apos;estimation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SimulateursPage() {
  const [tab, setTab] = useState<'prix' | 'assurance'>('prix')

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-3">Outils en ligne</p>
          <h1 className="font-display text-6xl md:text-8xl text-white mb-4">SIMULATEURS</h1>
          <p className="text-white/40">Estimez le prix marché de votre véhicule ou simulez votre assurance en quelques secondes.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-12">
          <button onClick={() => setTab('prix')} className={`flex items-center gap-2 px-6 py-3 font-display tracking-widest text-sm transition-all ${tab === 'prix' ? 'bg-[#C9A84C] text-black' : 'border border-[#2A2A2A] text-white/40 hover:border-[#C9A84C] hover:text-white'}`}>
            <TrendingDown size={14} /> PRIX MARCHÉ
          </button>
          <button onClick={() => setTab('assurance')} className={`flex items-center gap-2 px-6 py-3 font-display tracking-widest text-sm transition-all ${tab === 'assurance' ? 'bg-[#C9A84C] text-black' : 'border border-[#2A2A2A] text-white/40 hover:border-[#C9A84C] hover:text-white'}`}>
            <Shield size={14} /> ASSURANCE
          </button>
        </div>

        <div className="bg-[#111] border border-[#2A2A2A] p-8 md:p-12">
          {tab === 'prix' ? <SimulateurPrix /> : <SimulateurAssurance />}
        </div>
      </div>
    </div>
  )
}
