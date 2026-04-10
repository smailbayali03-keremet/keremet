'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import GlitterText from './components/GlitterText'

/* ─── PRO MODAL ─────────────────────────────────────────── */
function ProModal({ onClose }: { onClose: () => void }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (pw === 'LifeisOmir') { window.location.href = '/admin' }
    else { setErr('Пароль қате'); setPw('') }
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200]" onClick={onClose}>
      <div className="absolute top-16 right-4 md:right-8" onClick={e => e.stopPropagation()}>
        <motion.div initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }} transition={{ duration: 0.18 }}
          className="bg-white/95 backdrop-blur-xl rounded-2xl border border-[#E8E0D0] p-5 w-68 shadow-2xl"
          style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.15)' }}>
          <p className="text-xs font-semibold text-[#6B6B6B] mb-3 tracking-widest uppercase">Дизайнер панелі</p>
          <form onSubmit={submit} className="space-y-3">
            <input autoFocus type="password" className="input-elegant text-sm" placeholder="Пароль"
              value={pw} onChange={e => { setPw(e.target.value); setErr('') }} />
            {err && <p className="text-xs text-red-500">{err}</p>}
            <button type="submit" className="w-full py-2.5 rounded-xl text-white text-sm font-semibold"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>Кіру</button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ─── LOADER ─────────────────────────────────────────────── */
function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    let v = 0
    const id = setInterval(() => {
      v += Math.random() * 18 + 4
      if (v >= 100) { setPct(100); clearInterval(id); setTimeout(onDone, 400) }
      else setPct(Math.floor(v))
    }, 60)
    return () => clearInterval(id)
  }, [onDone])
  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center"
      style={{ background: '#0A0A0A' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12">
        <span className="text-2xl font-bold font-playfair text-white">
          Auzhan<span style={{ color: '#C9A84C' }}>_ktl</span>
          <span className="text-white/40 font-normal">.Designer</span>
        </span>
      </motion.div>
      <div className="relative">
        <span className="text-6xl font-bold font-playfair" style={{ color: '#C9A84C' }}>{pct}</span>
        <span className="text-2xl font-bold text-white/40 ml-1">%</span>
      </div>
      <div className="w-48 h-px mt-8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
        <motion.div className="h-full" style={{ background: '#C9A84C', width: `${pct}%`, transition: 'width 0.1s' }} />
      </div>
    </motion.div>
  )
}

/* ─── NAV ────────────────────────────────────────────────── */
function Nav({ onPro }: { onPro: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-10 py-4 md:py-5 flex items-center justify-between transition-all duration-500"
      style={{ background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>
          <span className="text-white font-bold font-playfair text-sm">A</span>
        </div>
        <span className="text-base font-bold font-playfair text-white">
          Auzhan<span style={{ color: '#C9A84C' }}>_ktl</span>
          <span className="text-white/50 font-normal">.Designer</span>
        </span>
      </Link>
      <nav className="flex items-center gap-6 md:gap-8">
        {[{ label: 'Қызметтер', href: '/services' }, { label: 'Тапсырыс', href: '/form' }].map(item => (
          <Link key={item.label} href={item.href}
            className="hidden md:block text-sm font-medium text-white/60 hover:text-white transition-colors">
            {item.label}
          </Link>
        ))}
        <Link href="/services"
          className="md:hidden text-sm font-medium text-white/60 hover:text-white transition-colors">
          Тапсырыс
        </Link>
        <button onClick={onPro} className="text-[10px] font-medium text-white/20 hover:text-white/50 transition-colors tracking-widest uppercase">
          Pro
        </button>
      </nav>
    </motion.header>
  )
}

/* ─── HORIZONTAL SCROLL SERVICES ────────────────────────── */
const SERVICES = [
  { title: 'Афиша', sub: 'Іс-шара', icon: '🎭', color: 'from-amber-950 to-stone-900' },
  { title: 'Пост', sub: 'Әлеум. желі', icon: '📱', color: 'from-zinc-900 to-neutral-950' },
  { title: 'Буклет', sub: 'Ақпарат', icon: '📖', color: 'from-stone-900 to-amber-950' },
  { title: 'Грамота', sub: 'Марапат', icon: '🏆', color: 'from-neutral-900 to-zinc-950' },
  { title: 'Баннер', sub: 'Стенд', icon: '🖼️', color: 'from-amber-950 to-neutral-900' },
  { title: 'Сертификат', sub: 'Растама', icon: '📜', color: 'from-zinc-950 to-stone-900' },
]

/* ─── MAIN ───────────────────────────────────────────────── */
export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [showPro, setShowPro] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const servRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const isServInView = useInView(servRef, { once: true, margin: '-10% 0px' })

  useEffect(() => {
    let lenis: any
    if (!loaded) return
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.075, smoothWheel: true })
      const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    })
    return () => lenis?.destroy()
  }, [loaded])

  return (
    <div style={{ background: '#0A0A0A', color: 'white' }}>
      <AnimatePresence>{!loaded && <Loader onDone={() => setLoaded(true)} />}</AnimatePresence>
      <AnimatePresence>{showPro && <ProModal onClose={() => setShowPro(false)} />}</AnimatePresence>

      <Nav onPro={() => setShowPro(true)} />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* BG gradient */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-6xl mx-auto w-full">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10 text-xs font-semibold tracking-widest uppercase"
            style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.06)', color: '#C9A84C' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            Мектеп дизайн автоматизациясы
          </motion.div>

          {/* Big heading */}
          <div className="overflow-hidden mb-2">
            <motion.h1 initial={{ y: '100%' }} animate={loaded ? { y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.5rem,12vw,9rem)] font-bold font-playfair leading-none tracking-tight text-white">
              Auzhan
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.div initial={{ y: '100%' }} animate={loaded ? { y: 0 } : {}}
              transition={{ delay: 0.32, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.5rem,12vw,9rem)] font-bold font-playfair leading-none tracking-tight flex items-center justify-center">
              <GlitterText text=".ktl" className="text-[clamp(3.5rem,12vw,9rem)]" />
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 30 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="text-base md:text-xl text-white/40 max-w-md mx-auto mb-12 leading-relaxed">
            WhatsApp арқылы өтініш — форма — дизайнер орындайды
          </motion.p>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/services"
              className="group relative px-10 py-4 rounded-full font-bold text-sm tracking-widest overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)', color: '#0A0A0A' }}>
              <span className="relative z-10">Тапсырыс беру →</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A84C)' }} />
            </Link>
            <Link href="/services"
              className="px-10 py-4 rounded-full font-semibold text-sm tracking-wide text-white/60 hover:text-white transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
              Қызметтерді көру
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-widest uppercase text-white/25">Scroll</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-10 rounded-full" style={{ background: 'linear-gradient(to bottom, #C9A84C, transparent)' }} />
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden py-5 border-y" style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#0D0D0D' }}>
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
          style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap' }}>
          {[...Array(2)].map((_, ri) =>
            ['Афиша', 'Пост', 'Буклет', 'Грамота', 'Баннер', 'Сертификат', 'Дизайн қызметтері', 'WhatsApp автоматизация'].map((item, i) => (
              <span key={`${ri}-${i}`} className="text-xs font-semibold tracking-widest uppercase flex items-center gap-3"
                style={{ color: '#C9A84C' }}>
                {item} <span style={{ color: 'rgba(201,168,76,0.3)' }}>✦</span>
              </span>
            ))
          )}
        </motion.div>
      </div>

      {/* ── STATEMENT SECTION ── */}
      <section className="py-24 md:py-40 px-6 max-w-6xl mx-auto">
        <StatText delay={0}>Мұғалім WhatsApp-қа</StatText>
        <StatText delay={0.05}>хабар жазады — бот</StatText>
        <div className="overflow-hidden">
          <motion.div initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-baseline gap-4 flex-wrap">
            <span className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold font-playfair leading-tight text-white/10">сілтеме</span>
            <span className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold font-playfair leading-tight gold-shimmer">жібереді</span>
          </motion.div>
        </div>
        <StatText delay={0.1}>форма — дизайнер — нәтиже</StatText>
      </section>

      {/* ── SERVICES GRID ── */}
      <section ref={servRef} className="px-4 md:px-10 pb-24 md:pb-40">
        <div className="max-w-6xl mx-auto mb-12 flex items-end justify-between">
          <motion.h2 initial={{ opacity: 0, y: 40 }} animate={isServInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold font-playfair text-white">
            Дизайн<br /><span className="gold-shimmer">Қызметтері</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0 }} animate={isServInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            <Link href="/services" className="text-sm text-white/40 hover:text-[#C9A84C] transition-colors">
              Барлығын көру →
            </Link>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} isInView={isServInView} />
          ))}
        </div>
      </section>

      {/* ── DARK STATS ── */}
      <section className="py-20 md:py-32 px-6" style={{ background: '#060606', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4">
          {[{ v: '100%', l: 'Цифрлық' }, { v: '1-2h', l: 'Жедел' }, { v: '24/7', l: 'Қолжетімді' }].map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
              className="text-center py-8 md:py-12 rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="text-3xl md:text-7xl font-bold font-playfair mb-2" style={{ color: '#C9A84C' }}>{s.v}</div>
              <div className="text-xs md:text-sm tracking-widest uppercase text-white/25">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 md:py-40 px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16 md:mb-24">
          <span className="text-xs tracking-widest uppercase mb-4 block" style={{ color: '#C9A84C' }}>Жүйе қалай жұмыс істейді</span>
          <h2 className="text-4xl md:text-6xl font-bold font-playfair text-white">3 қадам</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { n: '01', title: 'WhatsApp', desc: 'Ботқа хабар жазасыз — бот автоматты сілтеме жібереді', icon: '💬' },
            { n: '02', title: 'Форма', desc: 'Сілтемені ашып, не керек екенін толтырасыз. 2 минут', icon: '📋' },
            { n: '03', title: 'Нәтиже', desc: 'Дизайнер орындайды. Директорға отчет автоматты дайын', icon: '✨' },
          ].map((step, i) => (
            <motion.div key={step.n} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}
              className="group p-6 md:p-8 rounded-2xl relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
              <div className="flex items-start justify-between mb-6">
                <span className="text-4xl font-bold font-playfair" style={{ color: 'rgba(201,168,76,0.15)' }}>{step.n}</span>
                <span className="text-2xl">{step.icon}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-playfair text-white mb-3">{step.title}</h3>
              <p className="text-white/40 leading-relaxed text-sm">{step.desc}</p>
              <div className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 md:px-6 pb-24 md:pb-40">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto rounded-3xl p-10 md:p-20 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.1) 0%, transparent 65%)' }} />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-6xl font-bold font-playfair text-white mb-6 leading-tight">
              Бастауға<br /><span className="gold-shimmer">дайынсыз ба?</span>
            </h2>
            <p className="text-white/40 text-base md:text-lg mb-10">Тапсырысыңызды бүгін жіберіңіз</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services"
                className="px-10 py-4 rounded-full font-bold text-sm text-[#0A0A0A] transition-all hover:scale-105 hover:shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #E8D5A3)' }}>
                Тапсырыс беру →
              </Link>
              <Link href="/form"
                className="px-10 py-4 rounded-full font-semibold text-sm text-white/60 hover:text-white transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                Тікелей форма
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="font-bold font-playfair text-white text-sm">
          Auzhan<span style={{ color: '#C9A84C' }}>_ktl</span><span className="text-white/30 font-normal">.Designer</span>
        </span>
        <p className="text-xs text-white/20">© 2024 Auzhan_ktl.Designer</p>
        <div className="flex gap-6">
          <Link href="/services" className="text-xs text-white/30 hover:text-[#C9A84C] transition-colors">Қызметтер</Link>
          <Link href="/form" className="text-xs text-white/30 hover:text-[#C9A84C] transition-colors">Тапсырыс</Link>
        </div>
      </footer>
    </div>
  )
}

function StatText({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div className="overflow-hidden">
      <motion.div initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
        transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold font-playfair leading-tight text-white/10">
        {children}
      </motion.div>
    </div>
  )
}

function ServiceCard({ s, i, isInView }: { s: typeof SERVICES[0]; i: number; isInView: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <Link href={`/services`}
        className={`group block rounded-2xl p-5 md:p-7 h-full bg-gradient-to-br ${s.color} relative overflow-hidden border border-white/5 hover:border-[#C9A84C]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl`}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
        <span className="text-2xl md:text-3xl mb-4 block">{s.icon}</span>
        <h3 className="text-lg md:text-xl font-bold font-playfair text-white mb-1 group-hover:text-[#C9A84C] transition-colors">{s.title}</h3>
        <p className="text-xs text-white/30 tracking-wider uppercase">{s.sub}</p>
        <div className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500"
          style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
      </Link>
    </motion.div>
  )
}
