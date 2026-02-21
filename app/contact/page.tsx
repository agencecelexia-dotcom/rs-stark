'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, Instagram, Youtube, MessageCircle, Mail, Check } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nom: '', tel: '', objet: '', message: '' })
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const inputCls = 'w-full bg-white/70 border border-black/10 focus:border-[#C9A84C] text-[#0F0F0F] placeholder-black/25 px-4 py-3 text-sm outline-none transition-colors font-mono'

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-3">Nous joindre</p>
          <h1 className="font-display text-6xl md:text-8xl text-[#0F0F0F]">CONTACT</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT — Info */}
          <div className="space-y-10">
            {/* Quick CTA */}
            <div className="grid grid-cols-2 gap-4">
              <a href="tel:+33123456789" className="group border border-black/10 hover:border-[#C9A84C] p-5 flex flex-col gap-3 transition-all">
                <Phone size={20} className="text-[#C9A84C]" />
                <p className="font-display text-xl text-[#0F0F0F] group-hover:text-[#C9A84C] transition-colors">APPELER</p>
                <p className="text-sm text-black/45 font-mono">01 23 45 67 89</p>
              </a>
              <a href="https://wa.me/33123456789" className="group border border-black/10 hover:border-green-600 p-5 flex flex-col gap-3 transition-all">
                <MessageCircle size={20} className="text-green-400" />
                <p className="font-display text-xl text-[#0F0F0F]">WHATSAPP</p>
                <p className="text-sm text-black/45 font-mono">Réponse rapide</p>
              </a>
            </div>

            {/* Info blocks */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 border-b border-black/10 pb-6">
                <MapPin size={18} className="text-[#C9A84C] mt-0.5 shrink-0" />
                <div>
                  <p className="font-display text-lg text-[#0F0F0F] mb-1">ADRESSE</p>
                  <p className="text-black/45 text-sm">12 Avenue des Champs-Élysées<br />75008 Paris, France</p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b border-black/10 pb-6">
                <Clock size={18} className="text-[#C9A84C] mt-0.5 shrink-0" />
                <div>
                  <p className="font-display text-lg text-[#0F0F0F] mb-2">HORAIRES</p>
                  <div className="space-y-1 text-sm text-black/45 font-mono">
                    <div className="flex justify-between gap-8"><span>Lundi – Vendredi</span><span>9h00 – 19h00</span></div>
                    <div className="flex justify-between gap-8"><span>Samedi</span><span>10h00 – 18h00</span></div>
                    <div className="flex justify-between gap-8"><span>Dimanche</span><span>Sur rendez-vous</span></div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-6">
                <Mail size={18} className="text-[#C9A84C] mt-0.5 shrink-0" />
                <div>
                  <p className="font-display text-lg text-[#0F0F0F] mb-1">EMAIL</p>
                  <a href="mailto:contact@rsstark.fr" className="text-black/45 text-sm font-mono hover:text-white transition-colors">contact@rsstark.fr</a>
                </div>
              </div>
            </div>

            {/* Réseaux */}
            <div>
              <p className="text-xs font-mono tracking-widest text-black/35 uppercase mb-4">Réseaux sociaux</p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: '@rsstark', color: 'hover:border-pink-500 hover:text-pink-500' },
                  { icon: Youtube, label: 'RS Stark', color: 'hover:border-red-600 hover:text-red-500' },
                  { icon: MessageCircle, label: 'TikTok', color: 'hover:border-white hover:text-white' },
                ].map(({ icon: Icon, label, color }) => (
                  <a key={label} href="#" className={`flex items-center gap-2 border border-black/10 px-4 py-2 text-black/45 text-sm transition-all ${color}`}>
                    <Icon size={14} /> {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Google Maps placeholder */}
            <div className="relative aspect-video bg-white/60 border border-black/10 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                <MapPin size={32} className="text-[#C9A84C]/40" />
                <p className="text-black/25 text-sm font-mono">Google Maps intégré ici</p>
                <p className="text-white/10 text-xs font-mono">12 Av. des Champs-Élysées, Paris</p>
              </div>
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            </div>
          </div>

          {/* RIGHT — Form */}
          <div>
            {sent ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-20 h-20 border border-[#C9A84C] flex items-center justify-center mx-auto mb-8">
                  <Check size={32} className="text-[#C9A84C]" />
                </div>
                <h3 className="font-display text-4xl text-[#0F0F0F] mb-4">MESSAGE ENVOYÉ</h3>
                <p className="text-black/45 mb-2">Notre équipe vous répond sous 2 heures.</p>
                <button onClick={() => { setSent(false); setForm({ nom: '', tel: '', objet: '', message: '' }) }} className="mt-8 text-[#C9A84C] text-sm font-mono hover:underline">Envoyer un autre message</button>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
                <div className="border-b border-black/10 pb-6 mb-6">
                  <p className="font-display text-2xl text-[#0F0F0F]">ENVOYEZ-NOUS UN MESSAGE</p>
                  <p className="text-black/35 text-sm mt-2">Réponse garantie sous 2 heures en jours ouvrés.</p>
                </div>
                <input required value={form.nom} onChange={(e) => update('nom', e.target.value)} placeholder="Nom complet" className={inputCls} />
                <input required value={form.tel} onChange={(e) => update('tel', e.target.value)} type="tel" placeholder="Téléphone" className={inputCls} />
                <select value={form.objet} onChange={(e) => update('objet', e.target.value)} className="w-full bg-white/70 border border-black/10 focus:border-[#C9A84C] text-black/65 px-4 py-3 text-sm outline-none transition-colors font-mono">
                  <option value="">Objet du message</option>
                  <option>Demande d&apos;information sur un véhicule</option>
                  <option>Demande de reprise</option>
                  <option>Demande de financement</option>
                  <option>Prise de rendez-vous</option>
                  <option>Autre</option>
                </select>
                <textarea required value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Votre message..." rows={6} className={`${inputCls} resize-none`} />
                <button type="submit" className="w-full py-4 bg-[#C9A84C] text-black font-display tracking-[0.2em] text-lg hover:bg-[#E2C06A] transition-colors">
                  ENVOYER LE MESSAGE
                </button>
                <p className="text-[10px] text-black/25 font-mono text-center">En soumettant ce formulaire, vous acceptez notre politique de confidentialité.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
