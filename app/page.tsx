'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowDown, ArrowRight, ShieldCheck, Eye, Clock, Award,
  Car, CheckCircle, Tag, Repeat,
} from 'lucide-react'
import { getFeatured, byStatus } from '@/lib/data'
import VehicleCard from '@/components/vehicle/VehicleCard'

const featured   = getFeatured()
const venteCount = byStatus('vente').length
const venduCount = byStatus('vendu').length
const prepCount  = byStatus('preparation').length

/* ── Animated counter ── */
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

/* ── Section wrapper for scroll animations ── */
function AnimatedSection({ children, className, style, delay = 0 }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoEnded, setVideoEnded] = useState(false)

  return (
    <div>

      {/* ════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="hero-section" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {/* Video */}
        <video
          ref={videoRef}
          autoPlay muted playsInline
          onEnded={() => setVideoEnded(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          src="/videos/hf_20260221_001748_34f2ff8a-ba4b-46e9-8248-aa648c6fdc3e.mp4"
        />

        {/* Navy overlay after video ends */}
        <AnimatePresence>
          {videoEnded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{ position: 'absolute', inset: 0, zIndex: 15, background: '#0C1B33' }}
            />
          )}
        </AnimatePresence>

        {/* Hero content (text + CTAs) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: videoEnded ? 1 : 0 }}
          transition={{ duration: 0.9, delay: videoEnded ? 0.5 : 0 }}
          className="hero-content"
          style={{
            position: 'relative', zIndex: 25, height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: '0 64px', maxWidth: 1344, margin: '0 auto',
          }}
        >
          <p className="hero-tagline" style={{
            fontSize: 11, letterSpacing: '0.3em', color: '#C9A84C',
            textTransform: 'uppercase', fontWeight: 500, marginBottom: 24,
          }}>
            Concession Premium
          </p>

          <h1
            className="font-display hero-title"
            style={{ fontSize: 'clamp(56px,9vw,130px)', lineHeight: 0.9, color: '#FFFFFF', marginBottom: 24 }}
          >
            L&apos;EXCELLENCE<br />
            <span style={{ color: '#C9A84C' }}>AUTOMOBILE</span><br />
            A PORTEE DE MAIN
          </h1>

          <p className="hero-subtitle" style={{
            fontSize: 16, color: 'rgba(255,255,255,0.55)', maxWidth: 440,
            marginBottom: 40, lineHeight: 1.7,
          }}>
            Chaque vehicule est selectionne, inspecte et prepare avec une rigueur absolue.
          </p>

          <div className="hero-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Link
              href="/vente"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#FFFFFF', color: '#0C1B33',
                padding: '16px 36px', borderRadius: 50,
                fontWeight: 500, fontSize: 15, letterSpacing: '0.03em',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              Decouvrir nos vehicules <ArrowRight size={16} />
            </Link>
            <Link
              href="/reprise"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'transparent', color: '#FFFFFF',
                padding: '16px 36px', borderRadius: 50,
                border: '1.5px solid rgba(255,255,255,0.25)',
                fontWeight: 500, fontSize: 15, letterSpacing: '0.03em',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              Estimer ma reprise
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: videoEnded ? 1 : 0 }}
          transition={{ delay: videoEnded ? 1 : 0, duration: 0.8 }}
          style={{
            position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 25,
          }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ArrowDown size={16} style={{ color: 'rgba(255,255,255,0.35)' }} />
          </motion.div>
          <span style={{
            fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)',
            textTransform: 'uppercase', fontWeight: 500,
          }}>
            Scroll
          </span>
        </motion.div>

        {/* Stats bottom-right */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: videoEnded ? 1 : 0 }}
          transition={{ delay: videoEnded ? 0.6 : 0, duration: 0.8 }}
          style={{
            position: 'absolute', bottom: 40, right: 64, zIndex: 25,
            display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'right',
          }}
        >
          {[
            { label: 'Vehicules en stock',  value: venteCount,       suffix: ''   },
            { label: 'Vehicules vendus',     value: venduCount + 100, suffix: '+'  },
            { label: "Annees d'expertise",   value: 12,               suffix: ''   },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display" style={{ fontSize: 28, color: '#C9A84C' }}>
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p style={{
                fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase', fontWeight: 500,
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          CATEGORIES SECTION
      ════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px', background: '#FAFBFC' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimatedSection>
            <p className="section-tag">Explorez notre catalogue</p>
            <h2 className="font-display" style={{
              fontSize: 'clamp(36px,6vw,64px)', color: '#0C1B33',
              lineHeight: 1.05, marginBottom: 56,
            }}>
              Nos categories
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                href: '/vente', label: 'A vendre', count: venteCount,
                desc: 'Notre selection de vehicules disponibles immediatement.',
                Icon: Tag, color: '#16a34a', badgeClass: 'badge-vente',
              },
              {
                href: '/preparation', label: 'En preparation', count: prepCount,
                desc: 'Vehicules en cours de controle et de remise en etat.',
                Icon: Clock, color: '#9A7D2E', badgeClass: 'badge-preparation',
              },
              {
                href: '/vendu', label: 'Vendus', count: venduCount,
                desc: 'Decouvrez les vehicules qui ont trouve leur proprietaire.',
                Icon: CheckCircle, color: '#5A6B80', badgeClass: 'badge-vendu',
              },
            ].map((cat, i) => (
              <AnimatedSection key={cat.href} delay={i * 0.1}>
                <Link href={cat.href} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                  <div className="glass-card" style={{ padding: 32, height: '100%' }}>
                    {/* Icon circle */}
                    <div style={{
                      width: 56, height: 56, borderRadius: '50%',
                      background: `${cat.color}10`, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', marginBottom: 20,
                    }}>
                      <cat.Icon size={24} style={{ color: cat.color }} />
                    </div>

                    {/* Badge */}
                    <span className={cat.badgeClass} style={{ marginBottom: 16, display: 'inline-block' }}>
                      {cat.label}
                    </span>

                    {/* Count */}
                    <p className="font-display" style={{ fontSize: 48, color: '#0C1B33', marginBottom: 8, lineHeight: 1 }}>
                      <Counter to={cat.count} />
                    </p>
                    <p style={{ fontSize: 12, color: '#5A6B80', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>
                      vehicules
                    </p>

                    {/* Description */}
                    <p style={{ fontSize: 14, color: '#5A6B80', lineHeight: 1.65, marginBottom: 24 }}>
                      {cat.desc}
                    </p>

                    {/* Link */}
                    <div className="flex items-center gap-2" style={{ fontSize: 13, color: '#0C1B33', fontWeight: 500 }}>
                      Voir tout <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          FEATURED VEHICLES
      ════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px', background: '#F5F6F8' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimatedSection style={{ marginBottom: 56 }}>
            <p className="section-tag">Selection du moment</p>
            <h2 className="font-display" style={{
              fontSize: 'clamp(36px,6vw,64px)', color: '#0C1B33', lineHeight: 1.05,
            }}>
              Vehicules vedettes
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {featured.map((v, i) => <VehicleCard key={v.slug} vehicle={v} index={i} />)}
          </div>

          <AnimatedSection style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/vente" className="btn-secondary" style={{ gap: 10 }}>
              Voir tout le stock <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          WHY RS STARK / STATS
      ════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px', background: '#FAFBFC' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimatedSection style={{ marginBottom: 64 }}>
            <p className="section-tag">Pourquoi RS Stark</p>
            <h2 className="font-display" style={{
              fontSize: 'clamp(36px,6vw,64px)', color: '#0C1B33', lineHeight: 1.05,
            }}>
              L&apos;excellence en chiffres
            </h2>
          </AnimatedSection>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ marginBottom: 72 }}>
            {[
              { value: 150, suffix: '',      label: "Points d'inspection", Icon: ShieldCheck },
              { value: 98,  suffix: '%',     label: 'Clients satisfaits',  Icon: Award },
              { value: 2,   suffix: 'h',     label: 'Reponse reprise',     Icon: Clock },
              { value: 6,   suffix: ' mois', label: 'De garantie incluse', Icon: CheckCircle },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.08}>
                <div className="glass-card" style={{ padding: 28, textAlign: 'center' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'rgba(201,168,76,0.08)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}>
                    <stat.Icon size={22} style={{ color: '#C9A84C' }} />
                  </div>
                  <p className="font-display" style={{ fontSize: 40, color: '#0C1B33', marginBottom: 6, lineHeight: 1 }}>
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </p>
                  <p style={{ fontSize: 12, color: '#5A6B80', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: ShieldCheck, title: 'Garantie 6 mois', desc: 'Chaque vehicule beneficie d\'une garantie complete de 6 mois minimum.' },
              { Icon: Eye, title: 'Inspection 150 points', desc: 'Un controle rigoureux et systematique avant chaque mise en vente.' },
              { Icon: Car, title: 'Visite 360', desc: 'Explorez chaque vehicule sous tous les angles, en detail.' },
              { Icon: Repeat, title: 'Reprise immediate', desc: 'Estimation de votre vehicule sous 2 heures, offre ferme garantie 7 jours.' },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <div style={{ padding: '8px 0' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'rgba(12,27,51,0.04)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                  }}>
                    <item.Icon size={20} style={{ color: '#0C1B33' }} />
                  </div>
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: '#0C1B33', marginBottom: 8 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: 14, color: '#5A6B80', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          CTA REPRISE (Trade-In)
      ════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px', background: '#F5F6F8' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <AnimatedSection>
            <div style={{
              background: '#0C1B33', borderRadius: 24,
              padding: 'clamp(40px, 6vw, 80px)',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
              {/* Decorative gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at top right, rgba(201,168,76,0.12), transparent 60%)',
                pointerEvents: 'none',
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <p className="section-tag" style={{ color: '#C9A84C', marginBottom: 20 }}>
                  Reprise express
                </p>

                <h2 className="font-display" style={{
                  fontSize: 'clamp(32px,5vw,56px)', color: '#FFFFFF',
                  lineHeight: 1.05, marginBottom: 20,
                }}>
                  Estimez votre vehicule en 2h
                </h2>

                <p style={{
                  fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 480,
                  margin: '0 auto 40px', lineHeight: 1.7,
                }}>
                  Renseignez votre vehicule actuel et recevez une estimation sous 2 heures.
                  Offre ferme garantie 7 jours.
                </p>

                <div className="hero-cta-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
                  <Link
                    href="/reprise"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 10,
                      background: '#C9A84C', color: '#0C1B33',
                      padding: '16px 36px', borderRadius: 50,
                      fontWeight: 600, fontSize: 15, letterSpacing: '0.03em',
                      textDecoration: 'none',
                      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    Estimer ma reprise <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/simulateurs"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 10,
                      background: 'transparent', color: '#FFFFFF',
                      padding: '16px 36px', borderRadius: 50,
                      border: '1.5px solid rgba(255,255,255,0.2)',
                      fontWeight: 500, fontSize: 15, letterSpacing: '0.03em',
                      textDecoration: 'none',
                      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    Simuler mon prix
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
