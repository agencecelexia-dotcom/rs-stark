'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Upload, ArrowRight, Phone } from 'lucide-react'

export default function ReprisePage() {
  const [step, setStep] = useState(1)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    marque: '', modele: '', annee: '', version: '', km: '',
    etat: '', boite: '', carburant: '', nbProp: '1',
    ctOk: 'oui', accident: 'non', carnet: 'oui',
    nom: '', prenom: '', tel: '', email: '',
  })

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const estimationMin = form.km && form.annee
    ? Math.max(5000, Math.round((2026 - Number(form.annee)) * -3500 + 80000 - Number(form.km) * 0.3))
    : null
  const estimationMax = estimationMin ? Math.round(estimationMin * 1.15) : null

  const inputCls = 'w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#C9A84C] text-white placeholder-white/20 px-4 py-3 text-sm outline-none transition-colors font-mono'
  const selectCls = 'w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#C9A84C] text-white/70 px-4 py-3 text-sm outline-none transition-colors font-mono'
  const btnCls = 'w-full py-4 bg-[#C9A84C] text-black font-display tracking-[0.2em] text-lg hover:bg-[#E2C06A] transition-colors'

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-3">Estimation gratuite</p>
          <h1 className="font-display text-6xl text-white mb-4">REPRISE</h1>
          <p className="text-white/40">Renseignez votre véhicule et recevez une estimation dans les 2 heures. Offre ferme, sans engagement.</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-10">
          {['Votre véhicule', 'Historique', 'Vos coordonnées', 'Estimation'].map((s, i) => (
            <div key={s} className={`flex-1 h-0.5 transition-all duration-500 ${i + 1 <= step ? 'bg-[#C9A84C]' : 'bg-[#2A2A2A]'}`} />
          ))}
        </div>
        <div className="flex justify-between mb-10">
          {['Véhicule', 'Historique', 'Coordonnées', 'Résultat'].map((s, i) => (
            <p key={s} className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${i + 1 <= step ? 'text-[#C9A84C]' : 'text-white/20'}`}>{s}</p>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>

              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-white mb-6">VOTRE VÉHICULE</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input value={form.marque} onChange={(e) => update('marque', e.target.value)} placeholder="Marque (ex: BMW)" className={inputCls} />
                    <input value={form.modele} onChange={(e) => update('modele', e.target.value)} placeholder="Modèle (ex: M3)" className={inputCls} />
                  </div>
                  <input value={form.version} onChange={(e) => update('version', e.target.value)} placeholder="Version (ex: Competition xDrive)" className={inputCls} />
                  <div className="grid grid-cols-2 gap-4">
                    <input value={form.annee} onChange={(e) => update('annee', e.target.value)} type="number" placeholder="Année (ex: 2021)" className={inputCls} />
                    <input value={form.km} onChange={(e) => update('km', e.target.value)} type="number" placeholder="Kilométrage actuel" className={inputCls} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <select value={form.boite} onChange={(e) => update('boite', e.target.value)} className={selectCls}>
                      <option value="">Boîte de vitesse</option>
                      <option>Automatique</option>
                      <option>Manuelle</option>
                      <option>PDK / DCT</option>
                    </select>
                    <select value={form.carburant} onChange={(e) => update('carburant', e.target.value)} className={selectCls}>
                      <option value="">Carburant</option>
                      <option>Essence</option>
                      <option>Diesel</option>
                      <option>Hybride</option>
                      <option>Électrique</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-3">État général</p>
                    <div className="grid grid-cols-4 gap-3">
                      {['Excellent', 'Bon', 'Correct', 'Mauvais'].map((e) => (
                        <button key={e} onClick={() => update('etat', e)} className={`py-3 border text-sm font-mono transition-all ${form.etat === e ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#2A2A2A] text-white/40 hover:border-white/20'}`}>{e}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className={btnCls}>
                    CONTINUER <ArrowRight className="inline ml-2" size={16} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl text-white mb-6">HISTORIQUE</h2>
                  {[
                    { key: 'nbProp', label: 'Nombre de propriétaires', opts: ['1', '2', '3', '4+'] },
                    { key: 'ctOk', label: 'Contrôle technique à jour ?', opts: ['oui', 'non', 'Bientôt à refaire'] },
                    { key: 'accident', label: "Historique d'accident ?", opts: ['non', 'Mineur réparé', 'Oui déclaré'] },
                    { key: 'carnet', label: "Carnet d'entretien suivi ?", opts: ['oui', 'Partiel', 'non'] },
                  ].map((field) => (
                    <div key={field.key}>
                      <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-3">{field.label}</p>
                      <div className="flex flex-wrap gap-3">
                        {field.opts.map((opt) => (
                          <button key={opt} onClick={() => update(field.key, opt)} className={`px-4 py-2 border text-sm font-mono transition-all ${form[field.key as keyof typeof form] === opt ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#2A2A2A] text-white/40 hover:border-white/20'}`}>{opt}</button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div>
                    <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-3">Photos (1-5 photos)</p>
                    <label className="border border-dashed border-[#2A2A2A] hover:border-[#C9A84C] p-8 flex flex-col items-center justify-center gap-3 transition-colors block">
                      <Upload size={24} className="text-white/20" />
                      <span className="text-sm text-white/20 font-mono">Glissez vos photos ici ou cliquez</span>
                      <input type="file" multiple accept="image/*" className="hidden" />
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setStep(1)} className="py-4 border border-[#2A2A2A] text-white/40 font-display tracking-widest hover:border-white/20 transition-all">RETOUR</button>
                    <button onClick={() => setStep(3)} className="py-4 bg-[#C9A84C] text-black font-display tracking-[0.2em] hover:bg-[#E2C06A] transition-colors">CONTINUER</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-white mb-6">VOS COORDONNÉES</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input value={form.prenom} onChange={(e) => update('prenom', e.target.value)} placeholder="Prénom" className={inputCls} />
                    <input value={form.nom} onChange={(e) => update('nom', e.target.value)} placeholder="Nom" className={inputCls} />
                  </div>
                  <input value={form.tel} onChange={(e) => update('tel', e.target.value)} type="tel" placeholder="Téléphone" className={inputCls} />
                  <input value={form.email} onChange={(e) => update('email', e.target.value)} type="email" placeholder="Email" className={inputCls} />
                  <p className="text-xs text-white/20 font-mono">Notre équipe vous contacte sous 2 heures ouvrées.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setStep(2)} className="py-4 border border-[#2A2A2A] text-white/40 font-display tracking-widest hover:border-white/20 transition-all">RETOUR</button>
                    <button onClick={() => { setSent(true); setStep(4) }} className="py-4 bg-[#C9A84C] text-black font-display tracking-[0.2em] hover:bg-[#E2C06A] transition-colors">ESTIMER MON VÉHICULE</button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
              <div className="w-20 h-20 border border-[#C9A84C] flex items-center justify-center mx-auto mb-8">
                <Check size={32} className="text-[#C9A84C]" />
              </div>
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-4">Estimation indicative</p>
              {estimationMin && estimationMax && (
                <div className="mb-8">
                  <p className="font-display text-6xl text-white mb-2">
                    {estimationMin.toLocaleString('fr-FR')} € — {estimationMax.toLocaleString('fr-FR')} €
                  </p>
                  <p className="text-white/30 text-sm">Fourchette basée sur les informations fournies</p>
                </div>
              )}
              <div className="bg-[#111] border border-[#2A2A2A] p-6 text-left mb-8">
                <h3 className="font-display text-xl text-white mb-4">PROCHAINE ÉTAPE</h3>
                <div className="space-y-3">
                  {[
                    'Notre expert vous contacte sous 2h pour affiner l\'estimation',
                    'Visite physique ou inspection photos possible',
                    'Offre ferme valable 7 jours',
                    'Paiement immédiat à la signature',
                  ].map((s) => (
                    <div key={s} className="flex items-start gap-3">
                      <Check size={12} className="text-[#C9A84C] mt-0.5 shrink-0" />
                      <p className="text-sm text-white/50">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
              <a href="tel:+33123456789" className="inline-flex items-center gap-3 border border-[#C9A84C] text-[#C9A84C] px-8 py-4 font-display tracking-[0.2em] hover:bg-[#C9A84C] hover:text-black transition-all">
                <Phone size={16} /> APPELER MAINTENANT
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
