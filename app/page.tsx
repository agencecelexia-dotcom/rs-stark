'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowDown, ArrowRight, X } from 'lucide-react'
import { getFeatured, byStatus } from '@/lib/data'
import VehicleCard from '@/components/vehicle/VehicleCard'

const featured  = getFeatured()
const venteCount = byStatus('vente').length
const venduCount = byStatus('vendu').length
const prepCount  = byStatus('preparation').length

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
  { critere: 'Garantie',              nous: '6 mois inclus',        lbc: false,      centrale: false      },
  { critere: 'Inspection 150 points', nous: 'Systématique',         lbc: false,      centrale: 'Variable' },
  { critere: 'Visite 360°',           nous: 'Sur chaque véhicule',  lbc: false,      centrale: false      },
  { critere: 'Reprise immédiate',     nous: 'Estimation en 2h',     lbc: false,      centrale: false      },
  { critere: 'Prix le plus bas',      nous: '✓ Garanti',            lbc: false,      centrale: false      },
  { critere: 'Financement sur mesure',nous: 'Partenaires premium',  lbc: false,      centrale: false      },
]

export default function HomePage() {
  return (
    <div>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <video
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          src="/videos/intro.mp4"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, rgba(10,10,10,0.85), rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.9))' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0A0A0A 0%, transparent 45%)' }} />

        <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 64px', maxWidth: 1344, margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)', marginBottom: 24 }}
          >
            Concession Premium — Paris
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display"
            style={{ fontSize: 'clamp(56px,9vw,130px)', lineHeight: 0.9, color: 'white', marginBottom: 24 }}
          >
            L&apos;EXCELLENCE<br />
            <span className="text-gold">AUTOMOBILE</span><br />
            À PORTÉE DE MAIN
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
            style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 400, marginBottom: 40, lineHeight: 1.7 }}
          >
            Chaque véhicule est sélectionné, inspecté et préparé avec une rigueur absolue.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}
          >
            <Link href="/vente" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C9A84C', color: '#000', padding: '16px 32px', fontFamily: 'var(--font-heading,sans-serif)', fontSize: 16, letterSpacing: '0.2em', textDecoration: 'none' }}>
              DÉCOUVRIR NOS VÉHICULES <ArrowRight size={16} />
            </Link>
            <Link href="/reprise" style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '16px 32px', fontFamily: 'var(--font-heading,sans-serif)', fontSize: 16, letterSpacing: '0.2em', textDecoration: 'none' }}>
              ESTIMER MA REPRISE
            </Link>
          </motion.div>
        </div>

        {/* Scroll */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ArrowDown size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
          </motion.div>
          <span style={{ fontSize: 10, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-code,monospace)', textTransform: 'uppercase' }}>Scroll</span>
        </motion.div>

        {/* Stats */}
        <div style={{ position: 'absolute', bottom: 40, right: 64, display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'right' }}>
          {[
            { label: 'Véhicules en stock',  value: venteCount,       suffix: ''   },
            { label: 'Véhicules vendus',    value: venduCount + 100, suffix: '+'  },
            { label: "Années d'expertise",  value: 12,               suffix: ''   },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display" style={{ fontSize: 28, color: '#C9A84C' }}><Counter to={s.value} suffix={s.suffix} /></p>
              <p style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATÉGORIES ── */}
      <section style={{ padding: '96px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { href: '/vente',       label: 'À VENDRE',        count: venteCount, desc: 'Notre sélection de véhicules disponibles immédiatement.', color: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.2)'  },
            { href: '/vendu',       label: 'VENDUS',          count: venduCount, desc: 'Découvrez les véhicules qui ont trouvé leur propriétaire.', color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)'  },
            { href: '/preparation', label: 'EN PRÉPARATION',  count: prepCount,  desc: 'Véhicules en cours de contrôle. Bientôt disponibles.',     color: '#eab308', bg: 'rgba(234,179,8,0.08)',  border: 'rgba(234,179,8,0.2)'  },
          ].map((cat, i) => (
            <motion.div key={cat.href} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <Link href={cat.href} style={{ display: 'block', border: '1px solid #2A2A2A', background: '#111', padding: 32, textDecoration: 'none', position: 'relative', overflow: 'hidden' }}>
                <span style={{ display: 'inline-block', background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`, fontFamily: 'var(--font-code,monospace)', fontSize: 10, letterSpacing: '0.2em', padding: '3px 8px', textTransform: 'uppercase', marginBottom: 24 }}>{cat.label}</span>
                <p className="font-display" style={{ fontSize: 64, color: cat.color, marginBottom: 16, lineHeight: 1 }}>{cat.count}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 24 }}>{cat.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.15em' }}>
                  VOIR TOUT <ArrowRight size={11} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── VÉHICULES VEDETTES ── */}
      <section style={{ padding: '96px 24px', background: '#080808' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 64 }}>
            <p style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)', marginBottom: 12 }}>Sélection du moment</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px,7vw,80px)', color: 'white', lineHeight: 0.95 }}>VÉHICULES<br />VEDETTES</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map((v, i) => <VehicleCard key={v.slug} vehicle={v} index={i} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/vente" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, border: '1px solid #C9A84C', color: '#C9A84C', padding: '16px 32px', fontFamily: 'var(--font-heading,sans-serif)', fontSize: 15, letterSpacing: '0.2em', textDecoration: 'none' }}>
              VOIR TOUT LE STOCK <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── POURQUOI RS STARK ── */}
      <section style={{ padding: '96px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)', marginBottom: 12 }}>Transparence totale</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display" style={{ fontSize: 'clamp(40px,7vw,80px)', color: 'white', lineHeight: 0.95 }}>POURQUOI<br />CHOISIR RS STARK</motion.h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: 580, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2A2A2A' }}>
                  <th style={{ textAlign: 'left', paddingBottom: 16, paddingRight: 24, fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontWeight: 400 }}>Critère</th>
                  <th style={{ paddingBottom: 16, paddingLeft: 24, paddingRight: 24 }}><span className="font-display" style={{ color: '#C9A84C', fontSize: 18, letterSpacing: '0.2em' }}>RS STARK</span></th>
                  <th style={{ paddingBottom: 16, paddingLeft: 24, paddingRight: 24, fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontWeight: 400 }}>LeBonCoin</th>
                  <th style={{ paddingBottom: 16, paddingLeft: 24, paddingRight: 24, fontSize: 10, fontFamily: 'var(--font-code,monospace)', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontWeight: 400 }}>La Centrale</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <motion.tr key={row.critere} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} style={{ borderBottom: '1px solid #2A2A2A' }}>
                    <td style={{ padding: '16px 24px 16px 0', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{row.critere}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'center' }}><span style={{ color: '#C9A84C', fontSize: 13 }}>{row.nous}</span></td>
                    <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                      {row.lbc === false ? <X size={14} style={{ color: 'rgba(239,68,68,0.5)', margin: '0 auto', display: 'block' }} /> : <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{row.lbc}</span>}
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                      {row.centrale === false ? <X size={14} style={{ color: 'rgba(239,68,68,0.5)', margin: '0 auto', display: 'block' }} /> : <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{row.centrale}</span>}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5" style={{ marginTop: 80 }}>
            {[
              { value: 150, suffix: '',      label: "Points d'inspection" },
              { value: 98,  suffix: '%',     label: 'Clients satisfaits'  },
              { value: 2,   suffix: 'h',     label: 'Réponse reprise'     },
              { value: 6,   suffix: ' mois', label: 'De garantie incluse' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ border: '1px solid #2A2A2A', padding: 24, textAlign: 'center' }}>
                <p className="font-display" style={{ fontSize: 48, color: '#C9A84C', marginBottom: 8 }}><Counter to={stat.value} suffix={stat.suffix} /></p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)' }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA REPRISE ── */}
      <section style={{ padding: '128px 24px', background: '#080808', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top left, rgba(201,168,76,0.06), transparent 60%)' }} />
        <div style={{ maxWidth: 896, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase', fontFamily: 'var(--font-code,monospace)', marginBottom: 24 }}>Reprise express</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px,8vw,96px)', color: 'white', lineHeight: 0.9, marginBottom: 24 }}>
              ESTIMEZ VOTRE<br />VÉHICULE EN 2H
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', maxWidth: 480, margin: '0 auto 48px', lineHeight: 1.7 }}>
              Renseignez votre véhicule actuel et recevez une estimation sous 2 heures. Offre ferme garantie 7 jours.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
              <Link href="/reprise" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C9A84C', color: '#000', padding: '20px 40px', fontFamily: 'var(--font-heading,sans-serif)', fontSize: 18, letterSpacing: '0.2em', textDecoration: 'none' }}>
                ESTIMER MA REPRISE <ArrowRight size={16} />
              </Link>
              <Link href="/simulateurs" style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '20px 40px', fontFamily: 'var(--font-heading,sans-serif)', fontSize: 18, letterSpacing: '0.2em', textDecoration: 'none' }}>
                SIMULER MON PRIX
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
