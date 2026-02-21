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

  return (
    <div className="min-h-screen pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-2xl mx-auto px-6">
        <div className="page-section-header" style={{ marginBottom: 40 }}>
          <p className="section-tag">Estimation gratuite</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(40px, 7vw, 64px)', color: 'var(--color-navy)', lineHeight: 0.95, marginBottom: 16 }}>
            Reprise
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
            Renseignez votre vehicule et recevez une estimation dans les 2 heures. Offre ferme, sans engagement.
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-4">
          {['Votre vehicule', 'Historique', 'Vos coordonnees', 'Estimation'].map((s, i) => (
            <div key={s} style={{ flex: 1, height: 4, borderRadius: 50, transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)', background: i + 1 <= step ? 'var(--color-navy)' : 'var(--color-border)' }} />
          ))}
        </div>
        <div className="flex justify-between mb-10">
          {['Vehicule', 'Historique', 'Coordonnees', 'Resultat'].map((s, i) => (
            <p key={s} style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' as const, transition: 'color 0.3s', color: i + 1 <= step ? 'var(--color-navy)' : 'var(--color-text-muted)', opacity: i + 1 <= step ? 1 : 0.4 }}>{s}</p>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>

              {step === 1 && (
                <div className="glass-card" style={{ padding: 32 }}>
                  <h2 className="font-display" style={{ fontSize: 22, color: 'var(--color-navy)', marginBottom: 24 }}>Votre vehicule</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="grid grid-cols-2 gap-4">
                      <input value={form.marque} onChange={(e) => update('marque', e.target.value)} placeholder="Marque (ex: BMW)" className="input-rounded" />
                      <input value={form.modele} onChange={(e) => update('modele', e.target.value)} placeholder="Modele (ex: M3)" className="input-rounded" />
                    </div>
                    <input value={form.version} onChange={(e) => update('version', e.target.value)} placeholder="Version (ex: Competition xDrive)" className="input-rounded" />
                    <div className="grid grid-cols-2 gap-4">
                      <input value={form.annee} onChange={(e) => update('annee', e.target.value)} type="number" placeholder="Annee (ex: 2021)" className="input-rounded" />
                      <input value={form.km} onChange={(e) => update('km', e.target.value)} type="number" placeholder="Kilometrage actuel" className="input-rounded" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <select value={form.boite} onChange={(e) => update('boite', e.target.value)} className="input-rounded" style={{ color: form.boite ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                        <option value="">Boite de vitesse</option>
                        <option>Automatique</option>
                        <option>Manuelle</option>
                        <option>PDK / DCT</option>
                      </select>
                      <select value={form.carburant} onChange={(e) => update('carburant', e.target.value)} className="input-rounded" style={{ color: form.carburant ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                        <option value="">Carburant</option>
                        <option>Essence</option>
                        <option>Diesel</option>
                        <option>Hybride</option>
                        <option>Electrique</option>
                      </select>
                    </div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', color: 'var(--color-text-muted)', textTransform: 'uppercase' as const, marginBottom: 10 }}>Etat general</p>
                      <div className="grid grid-cols-4 gap-3">
                        {['Excellent', 'Bon', 'Correct', 'Mauvais'].map((e) => (
                          <button key={e} onClick={() => update('etat', e)} style={{ padding: '10px 0', borderRadius: 12, border: '1.5px solid', fontSize: 13, fontWeight: 500, transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)', background: form.etat === e ? 'rgba(12,27,51,0.06)' : 'transparent', color: form.etat === e ? 'var(--color-navy)' : 'var(--color-text-muted)', borderColor: form.etat === e ? 'var(--color-navy)' : 'var(--color-border)' }}>{e}</button>
                        ))}
                      </div>
                    </div>
                    <button onClick={() => setStep(2)} className="btn-primary" style={{ width: '100%', padding: '16px 32px', fontSize: 15, gap: 8 }}>
                      Continuer <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="glass-card" style={{ padding: 32 }}>
                  <h2 className="font-display" style={{ fontSize: 22, color: 'var(--color-navy)', marginBottom: 24 }}>Historique</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {[
                      { key: 'nbProp', label: 'Nombre de proprietaires', opts: ['1', '2', '3', '4+'] },
                      { key: 'ctOk', label: 'Controle technique a jour ?', opts: ['oui', 'non', 'Bientot a refaire'] },
                      { key: 'accident', label: "Historique d'accident ?", opts: ['non', 'Mineur repare', 'Oui declare'] },
                      { key: 'carnet', label: "Carnet d'entretien suivi ?", opts: ['oui', 'Partiel', 'non'] },
                    ].map((field) => (
                      <div key={field.key}>
                        <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', color: 'var(--color-text-muted)', textTransform: 'uppercase' as const, marginBottom: 10 }}>{field.label}</p>
                        <div className="flex flex-wrap gap-3">
                          {field.opts.map((opt) => (
                            <button key={opt} onClick={() => update(field.key, opt)} style={{ padding: '8px 18px', borderRadius: 50, border: '1.5px solid', fontSize: 13, fontWeight: 500, transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)', background: form[field.key as keyof typeof form] === opt ? 'rgba(12,27,51,0.06)' : 'transparent', color: form[field.key as keyof typeof form] === opt ? 'var(--color-navy)' : 'var(--color-text-muted)', borderColor: form[field.key as keyof typeof form] === opt ? 'var(--color-navy)' : 'var(--color-border)' }}>{opt}</button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div>
                      <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', color: 'var(--color-text-muted)', textTransform: 'uppercase' as const, marginBottom: 10 }}>Photos (1-5 photos)</p>
                      <label style={{ display: 'block', border: '2px dashed var(--color-border)', borderRadius: 16, padding: 32, textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.25s' }}>
                        <Upload size={24} style={{ color: 'var(--color-text-muted)', opacity: 0.4, margin: '0 auto 12px', display: 'block' }} />
                        <span style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>Glissez vos photos ici ou cliquez</span>
                        <input type="file" multiple accept="image/*" className="hidden" />
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => setStep(1)} className="btn-secondary" style={{ width: '100%', padding: '14px 24px' }}>
                        Retour
                      </button>
                      <button onClick={() => setStep(3)} className="btn-primary" style={{ width: '100%', padding: '14px 24px' }}>
                        Continuer
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="glass-card" style={{ padding: 32 }}>
                  <h2 className="font-display" style={{ fontSize: 22, color: 'var(--color-navy)', marginBottom: 24 }}>Vos coordonnees</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="grid grid-cols-2 gap-4">
                      <input value={form.prenom} onChange={(e) => update('prenom', e.target.value)} placeholder="Prenom" className="input-rounded" />
                      <input value={form.nom} onChange={(e) => update('nom', e.target.value)} placeholder="Nom" className="input-rounded" />
                    </div>
                    <input value={form.tel} onChange={(e) => update('tel', e.target.value)} type="tel" placeholder="Telephone" className="input-rounded" />
                    <input value={form.email} onChange={(e) => update('email', e.target.value)} type="email" placeholder="Email" className="input-rounded" />
                    <p style={{ fontSize: 13, color: 'var(--color-text-muted)', opacity: 0.6 }}>Notre equipe vous contacte sous 2 heures ouvrees.</p>
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => setStep(2)} className="btn-secondary" style={{ width: '100%', padding: '14px 24px' }}>
                        Retour
                      </button>
                      <button onClick={() => { setSent(true); setStep(4) }} className="btn-primary" style={{ width: '100%', padding: '14px 24px', fontSize: 13 }}>
                        Estimer mon vehicule
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center" style={{ paddingTop: 16 }}>
              <div className="glass-card" style={{ padding: '48px 32px', marginBottom: 24 }}>
                <div style={{ width: 72, height: 72, borderRadius: 20, background: 'rgba(12,27,51,0.04)', border: '1.5px solid var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <Check size={28} style={{ color: 'var(--color-accent)' }} />
                </div>
                <p className="section-tag" style={{ marginBottom: 16 }}>Estimation indicative</p>
                {estimationMin && estimationMax && (
                  <div style={{ marginBottom: 32 }}>
                    <p className="font-display" style={{ fontSize: 'clamp(36px, 6vw, 52px)', color: 'var(--color-navy)', marginBottom: 8 }}>
                      {estimationMin.toLocaleString('fr-FR')} - {estimationMax.toLocaleString('fr-FR')} EUR
                    </p>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>Fourchette basee sur les informations fournies</p>
                  </div>
                )}
              </div>

              <div className="glass-card" style={{ padding: 28, textAlign: 'left', marginBottom: 24 }}>
                <h3 className="font-display" style={{ fontSize: 20, color: 'var(--color-navy)', marginBottom: 16 }}>Prochaine etape</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    'Notre expert vous contacte sous 2h pour affiner l\'estimation',
                    'Visite physique ou inspection photos possible',
                    'Offre ferme valable 7 jours',
                    'Paiement immediat a la signature',
                  ].map((s) => (
                    <div key={s} className="flex items-start gap-3">
                      <div style={{ width: 20, height: 20, borderRadius: 6, background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        <Check size={10} style={{ color: 'var(--color-accent)' }} />
                      </div>
                      <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>{s}</p>
                    </div>
                  ))}
                </div>
              </div>

              <a href="tel:+33123456789" className="btn-primary" style={{ gap: 10 }}>
                <Phone size={16} /> Appeler maintenant
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
