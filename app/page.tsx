'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowDown, ArrowRight, X, ChevronLeft, ChevronRight, Instagram, Youtube } from 'lucide-react'
import { getFeaturedVehicles, getVehiclesByStatus, formatPrice } from '@/lib/data'
import VehicleCard from '@/components/vehicle/VehicleCard'

const featured = getFeaturedVehicles()
const venteCount = getVehiclesByStatus('vente').length
const venduCount = getVehiclesByStatus('vendu').length
const prepCount = getVehiclesByStatus('preparation').length

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(to / (1500 / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to])

  return <span ref={ref}>{count}{suffix}</span>
}

const comparisonData = [
  { critere: 'Garantie', nous: '6 mois inclus', lbc: false as const, centrale: false as const },
  { critere: 'Inspection 150 points', nous: 'Systématique', lbc: false as const, centrale: 'Variable' },
  { critere: 'Visite 360°', nous: 'Sur chaque véhicule', lbc: false as const, centrale: false as const },
  { critere: 'Reprise immédiate', nous: 'Estimation en 2h', lbc: false as const, centrale: false as const },
  { critere: 'Prix le plus bas garanti', nous: '✓', lbc: false as const, centrale: false as const },
  { critere: 'Financement sur mesure', nous: 'Partenaires premium', lbc: false as const, centrale: false as const },
]

function ComparisonRow({ row, index }: { row: typeof comparisonData[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.tr ref={ref} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: index * 0.1 }} className="border-b border-[#2A2A2A]">
      <td className="py-4 pr-6 text-sm text-white/60">{row.critere}</td>
      <td className="py-4 px-6 text-center"><span className="text-[#C9A84C] text-sm font-medium">{row.nous}</span></td>
      <td className="py-4 px-6 text-center">{row.lbc === false ? <X size={16} className="text-red-500/60 mx-auto" /> : <span className="text-white/40 text-sm">{row.lbc}</span>}</td>
      <td className="py-4 px-6 text-center">{row.centrale === false ? <X size={16} className="text-red-500/60 mx-auto" /> : <span className="text-white/40 text-sm">{row.centrale}</span>}</td>
    </motion.tr>
  )
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const prevSlide = () => setCurrentSlide((p) => (p === 0 ? featured.length - 1 : p - 1))
  const nextSlide = () => setCurrentSlide((p) => (p === featured.length - 1 ? 0 : p + 1))

  return (
    <div>
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src="/videos/intro.mp4" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-7xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-6">
            Concession Premium — Paris
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="font-display text-[clamp(56px,9vw,130px)] leading-none tracking-tight text-white mb-6">
            L&apos;EXCELLENCE<br />
            <span className="gradient-text">AUTOMOBILE</span><br />
            À PORTÉE DE MAIN
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }} className="text-white/50 text-lg max-w-md mb-10">
            Chaque véhicule est sélectionné, inspecté et préparé avec une rigueur absolue.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="flex flex-col sm:flex-row gap-4">
            <Link href="/vente" className="group flex items-center gap-3 bg-[#C9A84C] text-black px-8 py-4 font-display tracking-[0.2em] text-lg hover:bg-[#E2C06A] transition-colors">
              DÉCOUVRIR NOS VÉHICULES <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/reprise" className="flex items-center gap-3 border border-white/20 text-white px-8 py-4 font-display tracking-[0.2em] text-lg hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
              ESTIMER MA REPRISE
            </Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ArrowDown size={16} className="text-white/30" />
          </motion.div>
          <span className="text-white/20 text-[10px] tracking-[0.4em] uppercase font-mono">Scroll</span>
        </motion.div>

        <div className="absolute bottom-10 right-8 md:right-16 hidden md:flex flex-col gap-4 text-right">
          {[
            { label: 'Véhicules en stock', value: venteCount, suffix: '' },
            { label: 'Véhicules vendus', value: venduCount + 100, suffix: '+' },
            { label: "Années d'expertise", value: 12, suffix: '' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl text-[#C9A84C]"><Counter to={s.value} suffix={s.suffix} /></p>
              <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 CATÉGORIES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { href: '/vente', label: 'À VENDRE', count: venteCount, desc: 'Notre sélection actuelle de véhicules disponibles immédiatement.', color: '#22c55e', badge: 'badge-vente' },
            { href: '/vendu', label: 'VENDUS', count: venduCount, desc: 'Découvrez les véhicules qui ont trouvé leur propriétaire.', color: '#ef4444', badge: 'badge-vendu' },
            { href: '/preparation', label: 'EN PRÉPARATION', count: prepCount, desc: 'Véhicules en cours de contrôle et préparation. Bientôt disponibles.', color: '#eab308', badge: 'badge-preparation' },
          ].map((cat, i) => (
            <motion.div key={cat.href} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <Link href={cat.href} className="group block border border-[#2A2A2A] hover:border-[#C9A84C]/40 bg-[#111] p-8 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{ background: `radial-gradient(circle, ${cat.color}, transparent 70%)` }} />
                <span className={`inline-block text-[10px] font-mono tracking-[0.2em] px-2 py-1 rounded-sm mb-6 ${cat.badge}`}>{cat.label}</span>
                <p className="font-display text-6xl mb-4" style={{ color: cat.color }}>{cat.count}</p>
                <p className="text-sm text-white/40 leading-relaxed mb-6">{cat.desc}</p>
                <div className="flex items-center gap-2 text-xs text-white/30 group-hover:text-[#C9A84C] transition-colors font-mono tracking-widest">
                  VOIR TOUT <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VÉHICULES VEDETTES */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-3">Sélection du moment</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-5xl md:text-7xl text-white">VÉHICULES<br />VEDETTES</motion.h2>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button onClick={prevSlide} className="w-12 h-12 border border-[#2A2A2A] hover:border-[#C9A84C] flex items-center justify-center transition-colors"><ChevronLeft size={20} className="text-white/60" /></button>
              <button onClick={nextSlide} className="w-12 h-12 border border-[#2A2A2A] hover:border-[#C9A84C] flex items-center justify-center transition-colors"><ChevronRight size={20} className="text-white/60" /></button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <motion.div animate={{ x: `-${currentSlide * 100}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="flex">
              {featured.map((vehicle) => (
                <div key={vehicle.id} className="min-w-full">
                  <Link href={`/vehicule/${vehicle.slug}`} className="group grid grid-cols-1 md:grid-cols-2">
                    <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden" style={{ minHeight: 360 }}>
                      <Image src={vehicle.photos[0]} alt={`${vehicle.marque} ${vehicle.modele}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="50vw" />
                    </div>
                    <div className="bg-[#111] p-10 flex flex-col justify-center border border-[#2A2A2A] md:border-l-0">
                      <p className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-3">{vehicle.marque}</p>
                      <h3 className="font-display text-5xl text-white mb-2">{vehicle.modele}</h3>
                      <p className="text-white/40 mb-8">{vehicle.version} · {vehicle.annee}</p>
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {[
                          { label: 'Puissance', value: `${vehicle.puissance} ch` },
                          { label: 'Kilométrage', value: `${vehicle.km.toLocaleString('fr-FR')} km` },
                          { label: 'Boîte', value: vehicle.boite },
                        ].map((spec) => (
                          <div key={spec.label} className="border border-[#2A2A2A] p-3">
                            <p className="text-[10px] text-white/30 tracking-widest uppercase mb-1">{spec.label}</p>
                            <p className="font-mono text-sm text-white">{spec.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-end justify-between">
                        <p className="font-mono text-3xl text-[#C9A84C]">{formatPrice(vehicle.prix)}</p>
                        <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-[#C9A84C] transition-colors">Voir la fiche <ArrowRight size={14} /></div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {featured.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className={`h-px transition-all duration-300 ${i === currentSlide ? 'w-12 bg-[#C9A84C]' : 'w-4 bg-white/20'}`} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/vente" className="inline-flex items-center gap-3 border border-[#C9A84C] text-[#C9A84C] px-8 py-4 font-display tracking-[0.2em] hover:bg-[#C9A84C] hover:text-black transition-all duration-300">
              VOIR TOUT LE STOCK <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* STOCK GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <p className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-3">Stock disponible</p>
          <h2 className="font-display text-5xl text-white">DISPONIBLES MAINTENANT</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getVehiclesByStatus('vente').map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-3">Transparence totale</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-5xl md:text-7xl text-white">POURQUOI<br />CHOISIR RS STARK</motion.h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  <th className="text-left py-4 pr-6 text-xs font-mono tracking-widest text-white/30 uppercase">Critère</th>
                  <th className="py-4 px-6 text-center"><span className="text-[#C9A84C] font-display text-lg tracking-widest">RS STARK</span></th>
                  <th className="py-4 px-6 text-center text-xs font-mono tracking-widest text-white/30 uppercase">LeBonCoin</th>
                  <th className="py-4 px-6 text-center text-xs font-mono tracking-widest text-white/30 uppercase">La Centrale</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => <ComparisonRow key={row.critere} row={row} index={i} />)}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { value: 150, suffix: '', label: "Points d'inspection" },
              { value: 98, suffix: '%', label: 'Clients satisfaits' },
              { value: 2, suffix: 'h', label: 'Réponse reprise' },
              { value: 6, suffix: ' mois', label: 'De garantie incluse' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border border-[#2A2A2A] p-6 text-center">
                <p className="font-display text-5xl text-[#C9A84C] mb-2"><Counter to={stat.value} suffix={stat.suffix} /></p>
                <p className="text-xs text-white/30 tracking-widest uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA REPRISE */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-6">Reprise express</p>
            <h2 className="font-display text-5xl md:text-8xl text-white mb-6">ESTIMEZ VOTRE<br />VÉHICULE EN 2H</h2>
            <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto">Renseignez votre véhicule actuel et recevez une estimation sous 2 heures. Offre ferme garantie 7 jours.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reprise" className="group flex items-center justify-center gap-3 bg-[#C9A84C] text-black px-10 py-5 font-display tracking-[0.2em] text-xl hover:bg-[#E2C06A] transition-colors">
                ESTIMER MA REPRISE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/simulateurs" className="flex items-center justify-center border border-white/20 text-white px-10 py-5 font-display tracking-[0.2em] text-xl hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
                SIMULER MON PRIX
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RÉSEAUX */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.4em] uppercase mb-3">Suivez-nous</p>
              <h2 className="font-display text-4xl text-white">NOS RÉSEAUX</h2>
            </div>
            <div className="flex gap-4">
              <a href="#" className="flex items-center gap-2 text-sm text-white/40 hover:text-white border border-[#2A2A2A] hover:border-[#C9A84C] px-4 py-2 transition-all"><Instagram size={14} /> Instagram</a>
              <a href="#" className="flex items-center gap-2 text-sm text-white/40 hover:text-white border border-[#2A2A2A] hover:border-[#C9A84C] px-4 py-2 transition-all"><Youtube size={14} /> YouTube</a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80',
              'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80',
              'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400&q=80',
              'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80',
              'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&q=80',
              'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400&q=80',
              'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&q=80',
              'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=400&q=80',
            ].map((src, i) => (
              <motion.a key={i} href="#" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group relative aspect-square overflow-hidden">
                <Image src={src} alt={`Post ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" sizes="25vw" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram size={24} className="text-white" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
