'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

const marques = ['Ferrari', 'Porsche', 'Lamborghini', 'McLaren', 'Aston Martin', 'Bentley', 'Rolls-Royce', 'Bugatti', 'Koenigsegg', 'BMW', 'Mercedes', 'Autre']
const couleurs = [
  { name: 'Noir', hex: '#0A0A0A' }, { name: 'Blanc', hex: '#F5F5F5' },
  { name: 'Rouge', hex: '#DC2626' }, { name: 'Bleu', hex: '#2563EB' },
  { name: 'Gris', hex: '#6B7280' }, { name: 'Or', hex: '#C9A84C' },
  { name: 'Vert', hex: '#16A34A' }, { name: 'Jaune', hex: '#EAB308' },
]
const options = ['GPS', 'Toit ouvrant', 'Sièges chauffants', 'Carbon Pack', 'Audio Premium', 'Caméra 360°', 'Pack sport', 'Cuir pleine fleur']

export default function RecherchePage() {
  const [step, setStep] = useState(1)
  const [sent, setSent] = useState(false)
  const [selectedMarques, setSelectedMarques] = useState<string[]>([])
  const [couleur, setCouleur] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [budget, setBudget] = useState(200000)
  const [apport, setApport] = useState(50000)
  const [financement, setFinancement] = useState('non')
  const [mensualites, setMensualites] = useState(2000)
  const [acompte, setAcompte] = useState(false)
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')

  const toggleMarque = (m: string) => setSelectedMarques((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m])
  const toggleOption = (o: string) => setSelectedOptions((prev) => prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o])

  const inputCls = 'w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#C9A84C] text-white placeholder-white/20 px-4 py-3 text-sm outline-none transition-colors font-mono'

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-3">Service sur mesure</p>
          <h1 className="font-display text-6xl text-white mb-4">RECHERCHE PERSONNALISÉE</h1>
          <p className="text-white/40">Décrivez votre véhicule idéal. Notre équipe se charge de le trouver et vous contacte sous 24h.</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`flex-1 h-0.5 transition-all duration-500 ${s <= step ? 'bg-[#C9A84C]' : 'bg-[#2A2A2A]'}`} />
          ))}
        </div>
        <div className="flex justify-between mb-10 text-[10px] font-mono tracking-widest uppercase">
          {['Véhicule idéal', 'Budget', 'Acompte', 'Coordonnées'].map((s, i) => (
            <span key={s} className={i + 1 <= step ? 'text-[#C9A84C]' : 'text-white/20'}>{s}</span>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>

              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-4">Marque(s) souhaitée(s)</p>
                    <div className="flex flex-wrap gap-2">
                      {marques.map((m) => (
                        <button key={m} onClick={() => toggleMarque(m)} className={`px-3 py-2 border text-sm font-mono transition-all ${selectedMarques.includes(m) ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#2A2A2A] text-white/40 hover:border-white/20'}`}>{m}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-4">Couleur préférée</p>
                    <div className="flex gap-3">
                      {couleurs.map((c) => (
                        <button key={c.name} onClick={() => setCouleur(c.name)} title={c.name} className={`w-8 h-8 rounded-full border-2 transition-all ${couleur === c.name ? 'border-[#C9A84C] scale-110' : 'border-transparent hover:border-white/30'}`} style={{ backgroundColor: c.hex }} />
                      ))}
                    </div>
                    {couleur && <p className="text-xs text-[#C9A84C] font-mono mt-2">{couleur} sélectionné</p>}
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-4">Options importantes</p>
                    <div className="flex flex-wrap gap-2">
                      {options.map((o) => (
                        <button key={o} onClick={() => toggleOption(o)} className={`px-3 py-2 border text-sm font-mono transition-all ${selectedOptions.includes(o) ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#2A2A2A] text-white/40 hover:border-white/20'}`}>{o}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="w-full py-4 bg-[#C9A84C] text-black font-display tracking-[0.2em] text-lg hover:bg-[#E2C06A] transition-colors">
                    CONTINUER <ArrowRight className="inline ml-2" size={16} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <label className="text-xs font-mono tracking-widest text-white/30 uppercase block mb-3">
                      Budget maximum — <span className="text-[#C9A84C]">{budget.toLocaleString('fr-FR')} €</span>
                    </label>
                    <input type="range" min={20000} max={1000000} step={5000} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full accent-[#C9A84C]" />
                    <div className="flex justify-between text-xs font-mono text-white/20 mt-1">
                      <span>20 000 €</span><span>1 000 000 €</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-mono tracking-widest text-white/30 uppercase block mb-3">
                      Apport disponible — <span className="text-[#C9A84C]">{apport.toLocaleString('fr-FR')} €</span>
                    </label>
                    <input type="range" min={0} max={budget} step={1000} value={apport} onChange={(e) => setApport(Number(e.target.value))} className="w-full accent-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-3">Financement souhaité ?</p>
                    <div className="flex gap-3">
                      {['oui', 'non'].map((o) => (
                        <button key={o} onClick={() => setFinancement(o)} className={`px-6 py-3 border font-mono text-sm uppercase transition-all ${financement === o ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#2A2A2A] text-white/40 hover:border-white/20'}`}>{o}</button>
                      ))}
                    </div>
                  </div>
                  {financement === 'oui' && (
                    <div>
                      <label className="text-xs font-mono tracking-widest text-white/30 uppercase block mb-3">
                        Mensualités cibles — <span className="text-[#C9A84C]">{mensualites.toLocaleString('fr-FR')} €/mois</span>
                      </label>
                      <input type="range" min={200} max={10000} step={100} value={mensualites} onChange={(e) => setMensualites(Number(e.target.value))} className="w-full accent-[#C9A84C]" />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setStep(1)} className="py-4 border border-[#2A2A2A] text-white/40 font-display tracking-widest hover:border-white/20 transition-all">RETOUR</button>
                    <button onClick={() => setStep(3)} className="py-4 bg-[#C9A84C] text-black font-display tracking-[0.2em] hover:bg-[#E2C06A] transition-colors">CONTINUER</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl text-white">ACOMPTE DE PRIORITÉ</h2>
                  <div className={`border p-6 transition-all ${acompte ? 'border-[#C9A84C] bg-[#C9A84C]/5' : 'border-[#2A2A2A]'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-display text-xl text-white mb-1">Être prioritaire pour 200 €</p>
                        <p className="text-sm text-white/40">Votre dossier passe en tête de liste. Acompte 100% remboursable.</p>
                      </div>
                      <button onClick={() => setAcompte(!acompte)} className={`w-6 h-6 border flex items-center justify-center transition-all ${acompte ? 'bg-[#C9A84C] border-[#C9A84C]' : 'border-[#2A2A2A]'}`}>
                        {acompte && <Check size={12} className="text-black" />}
                      </button>
                    </div>
                    {acompte && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                        <div className="mt-4 pt-4 border-t border-[#2A2A2A]">
                          <p className="text-xs font-mono text-white/30 mb-3">Paiement sécurisé via Stripe</p>
                          <div className="space-y-3">
                            <input type="text" placeholder="Numéro de carte" className={inputCls} />
                            <div className="grid grid-cols-2 gap-3">
                              <input type="text" placeholder="MM/AA" className={inputCls} />
                              <input type="text" placeholder="CVV" className={inputCls} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div className="border border-[#2A2A2A] p-4">
                    <p className="text-sm text-white/40 italic">Je préfère continuer sans acompte — ma demande sera traitée dans l&apos;ordre d&apos;arrivée.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setStep(2)} className="py-4 border border-[#2A2A2A] text-white/40 font-display tracking-widest hover:border-white/20 transition-all">RETOUR</button>
                    <button onClick={() => setStep(4)} className="py-4 bg-[#C9A84C] text-black font-display tracking-[0.2em] hover:bg-[#E2C06A] transition-colors">CONTINUER</button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-white mb-6">VOS COORDONNÉES</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom" className={inputCls} />
                    <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" className={inputCls} />
                  </div>
                  <input value={tel} onChange={(e) => setTel(e.target.value)} type="tel" placeholder="Téléphone" className={inputCls} />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className={inputCls} />
                  <select className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#C9A84C] text-white/60 px-4 py-3 text-sm outline-none transition-colors font-mono">
                    <option>Disponibilité pour un rappel</option>
                    <option>Matin (9h – 12h)</option>
                    <option>Après-midi (14h – 18h)</option>
                    <option>Soir (18h – 20h)</option>
                  </select>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button onClick={() => setStep(3)} className="py-4 border border-[#2A2A2A] text-white/40 font-display tracking-widest hover:border-white/20 transition-all">RETOUR</button>
                    <button onClick={() => setSent(true)} className="py-4 bg-[#C9A84C] text-black font-display tracking-[0.2em] hover:bg-[#E2C06A] transition-colors">ENVOYER MA DEMANDE</button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="sent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
              <div className="w-20 h-20 border border-[#C9A84C] flex items-center justify-center mx-auto mb-8">
                <Check size={32} className="text-[#C9A84C]" />
              </div>
              <h2 className="font-display text-4xl text-white mb-4">DEMANDE ENREGISTRÉE</h2>
              <p className="text-white/40 mb-2">Notre équipe vous contacte dans les 24 heures.</p>
              <p className="text-white/20 text-sm mb-8 font-mono">Un email de confirmation vous a été envoyé.</p>
              <div className="bg-[#111] border border-[#2A2A2A] p-6 text-left">
                <p className="font-display text-lg text-white mb-4">RÉCAPITULATIF</p>
                <div className="space-y-2 text-sm font-mono text-white/40">
                  {selectedMarques.length > 0 && <p>Marques : {selectedMarques.join(', ')}</p>}
                  {couleur && <p>Couleur : {couleur}</p>}
                  <p>Budget : {budget.toLocaleString('fr-FR')} €</p>
                  <p>Financement : {financement}</p>
                  {acompte && <p className="text-[#C9A84C]">✓ Acompte priorité versé</p>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
