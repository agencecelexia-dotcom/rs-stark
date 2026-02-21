'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, Instagram, Youtube, MessageCircle, Mail, Check } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nom: '', tel: '', objet: '', message: '' })
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <div className="min-h-screen pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="page-section-header" style={{ marginBottom: 48 }}>
          <p className="section-tag">Nous joindre</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(48px, 7vw, 80px)', color: 'var(--color-navy)', lineHeight: 0.95 }}>
            Contact
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* LEFT -- Info */}
          <div className="space-y-10">
            {/* Quick CTA */}
            <div className="grid grid-cols-2 gap-4">
              <a href="tel:+33123456789" className="glass-card group" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12, textDecoration: 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(12,27,51,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={20} style={{ color: 'var(--color-navy)' }} />
                </div>
                <p className="font-display" style={{ fontSize: 18, color: 'var(--color-navy)' }}>Appeler</p>
                <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>01 23 45 67 89</p>
              </a>
              <a href="https://wa.me/33123456789" className="glass-card group" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12, textDecoration: 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(34,197,94,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={20} style={{ color: '#16a34a' }} />
                </div>
                <p className="font-display" style={{ fontSize: 18, color: 'var(--color-navy)' }}>WhatsApp</p>
                <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>Reponse rapide</p>
              </a>
            </div>

            {/* Info blocks */}
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--color-border)' }}>
                <div className="flex items-start gap-4">
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(12,27,51,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={18} style={{ color: 'var(--color-navy)' }} />
                  </div>
                  <div>
                    <p className="font-display" style={{ fontSize: 16, color: 'var(--color-navy)', marginBottom: 4 }}>Adresse</p>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>12 Avenue des Champs-Elysees<br />75008 Paris, France</p>
                  </div>
                </div>
              </div>
              <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--color-border)' }}>
                <div className="flex items-start gap-4">
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(12,27,51,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={18} style={{ color: 'var(--color-navy)' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="font-display" style={{ fontSize: 16, color: 'var(--color-navy)', marginBottom: 8 }}>Horaires</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div className="flex justify-between gap-8" style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
                        <span>Lundi - Vendredi</span><span>9h00 - 19h00</span>
                      </div>
                      <div className="flex justify-between gap-8" style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
                        <span>Samedi</span><span>10h00 - 18h00</span>
                      </div>
                      <div className="flex justify-between gap-8" style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
                        <span>Dimanche</span><span>Sur rendez-vous</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '24px 28px' }}>
                <div className="flex items-start gap-4">
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(12,27,51,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={18} style={{ color: 'var(--color-navy)' }} />
                  </div>
                  <div>
                    <p className="font-display" style={{ fontSize: 16, color: 'var(--color-navy)', marginBottom: 4 }}>Email</p>
                    <a href="mailto:contact@rsstark.fr" style={{ color: 'var(--color-text-muted)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}>contact@rsstark.fr</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Reseaux */}
            <div>
              <p className="section-tag" style={{ marginBottom: 16 }}>Reseaux sociaux</p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { icon: Instagram, label: '@rsstark', color: 'hover:border-pink-500 hover:text-pink-500' },
                  { icon: Youtube, label: 'RS Stark', color: 'hover:border-red-600 hover:text-red-500' },
                  { icon: MessageCircle, label: 'TikTok', color: 'hover:border-[var(--color-navy)] hover:text-[var(--color-navy)]' },
                ].map(({ icon: Icon, label, color }) => (
                  <a key={label} href="#" className={`flex items-center gap-2 transition-all ${color}`} style={{ border: '1.5px solid var(--color-border)', borderRadius: 50, padding: '10px 20px', color: 'var(--color-text-muted)', fontSize: 14, textDecoration: 'none' }}>
                    <Icon size={16} /> {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Google Maps placeholder */}
            <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(145deg, #E8EBF0 0%, #F0F2F5 100%)', border: '1px solid var(--color-border)' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(12,27,51,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={24} style={{ color: 'var(--color-text-muted)', opacity: 0.5 }} />
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>Google Maps integre ici</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 12, opacity: 0.5 }}>12 Av. des Champs-Elysees, Paris</p>
              </div>
            </div>
          </div>

          {/* RIGHT -- Form */}
          <div>
            {sent ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card flex flex-col items-center justify-center text-center" style={{ padding: '64px 32px' }}>
                <div style={{ width: 72, height: 72, borderRadius: 20, background: 'rgba(12,27,51,0.04)', border: '1.5px solid var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
                  <Check size={28} style={{ color: 'var(--color-accent)' }} />
                </div>
                <h3 className="font-display" style={{ fontSize: 32, color: 'var(--color-navy)', marginBottom: 12 }}>Message envoye</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: 8, fontSize: 15 }}>Notre equipe vous repond sous 2 heures.</p>
                <button onClick={() => { setSent(false); setForm({ nom: '', tel: '', objet: '', message: '' }) }} style={{ marginTop: 24, color: 'var(--color-accent)', fontSize: 14, fontWeight: 500, background: 'none', border: 'none', textDecoration: 'underline', textUnderlineOffset: 4 }}>Envoyer un autre message</button>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="glass-card" style={{ padding: 36 }}>
                <div style={{ marginBottom: 28 }}>
                  <h2 className="font-display" style={{ fontSize: 24, color: 'var(--color-navy)', marginBottom: 8 }}>Envoyez-nous un message</h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>Reponse garantie sous 2 heures en jours ouvres.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <input required value={form.nom} onChange={(e) => update('nom', e.target.value)} placeholder="Nom complet" className="input-rounded" />
                  <input required value={form.tel} onChange={(e) => update('tel', e.target.value)} type="tel" placeholder="Telephone" className="input-rounded" />
                  <select value={form.objet} onChange={(e) => update('objet', e.target.value)} className="input-rounded" style={{ color: form.objet ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                    <option value="">Objet du message</option>
                    <option>Demande d&apos;information sur un vehicule</option>
                    <option>Demande de reprise</option>
                    <option>Demande de financement</option>
                    <option>Prise de rendez-vous</option>
                    <option>Autre</option>
                  </select>
                  <textarea required value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Votre message..." rows={6} className="input-rounded" style={{ resize: 'none' }} />
                  <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px 32px', fontSize: 15, letterSpacing: '0.06em' }}>
                    Envoyer le message
                  </button>
                  <p style={{ fontSize: 12, color: 'var(--color-text-muted)', textAlign: 'center', opacity: 0.6 }}>En soumettant ce formulaire, vous acceptez notre politique de confidentialite.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
