'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import GlitterText from './components/GlitterText'

// Animated text that splits into words
function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const words = text.split(' ')

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block' }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.25em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.08,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Character by character animation for hero
function HeroTitle({ text, className, delay = 0, gold = false }: { text: string; className?: string; delay?: number; gold?: boolean }) {
  const chars = text.split('')
  return (
    <span className={className} style={{ display: 'inline-flex', overflow: 'hidden' }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          initial={{ y: '100%', opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: delay + i * 0.045,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

// Fade up card
function FadeCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

// Horizontal marquee
function Marquee({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden py-5 border-y border-[#E8E0D0]" style={{ background: 'white' }}>
      <motion.div
        style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-sm font-semibold tracking-widest uppercase text-[#C9A84C] flex items-center gap-3">
            {item} <span className="text-[#E8E0D0]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function ProModal({ onClose }: { onClose: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password === 'LifeisOmir') {
      window.location.href = '/admin'
    } else {
      setError('Пароль қате')
      setPassword('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-end pt-16 pr-4 md:pr-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl border border-[#E8E0D0] p-5 w-72 shadow-2xl"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(201,168,76,0.1)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <span className="text-sm font-semibold text-[#1A1A1A] font-playfair">Дизайнер панелі</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            autoFocus
            type="password"
            className="input-elegant text-sm"
            placeholder="Пароль"
            value={password}
            onChange={e => { setPassword(e.target.value); setError('') }}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button type="submit" className="w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>
            Кіру
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function Home() {
  const [showProModal, setShowProModal] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Lenis smooth scroll
  useEffect(() => {
    let lenis: any
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    })
    return () => lenis?.destroy()
  }, [])

  const marqueeItems = [
    'WhatsApp автоматизация',
    'Элитный дизайн',
    'Жедел орындау',
    'Мектеп жүйесі',
    'Цифрлық шешім',
  ]

  return (
    <div ref={containerRef} style={{ background: '#FAFAF8' }}>
      {/* NAV */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between"
        style={{ background: 'rgba(250,250,248,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(232,224,208,0.6)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>
            <span className="text-white font-bold font-playfair">A</span>
          </div>
          <span className="text-lg font-bold font-playfair text-[#1A1A1A]">Auzhan<span className="text-[#C9A84C]">_ktl</span><span className="text-[#6B6B6B] font-normal">.Designer</span></span>
        </div>
        <nav className="flex items-center gap-4 md:gap-8">
          {[
            { label: 'Қызметтер', href: '/services' },
            { label: 'Тапсырыс', href: '/form' },
          ].map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="hidden md:block text-sm font-medium text-[#6B6B6B] hover:text-[#C9A84C] transition-colors cursor-pointer"
            >
              {item.label}
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            onClick={() => setShowProModal(true)}
            className="text-xs font-medium text-[#B0A090] hover:text-[#C9A84C] transition-colors cursor-pointer tracking-wider"
          >
            Pro
          </motion.button>
        </nav>

        <AnimatePresence>
          {showProModal && <ProModal onClose={() => setShowProModal(false)} />}
        </AnimatePresence>
      </motion.header>

      {/* HERO */}
      <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20">
        {/* BG circles */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[700px] h-[700px] rounded-full absolute" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
        </motion.div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center px-6 relative z-10 max-w-5xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8E0D0] bg-white mb-10 text-xs font-semibold tracking-widest uppercase text-[#C9A84C]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            Мектеп автоматизация жүйесі
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="flex items-center justify-center gap-0 leading-none mb-4 tracking-tight"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-bold font-playfair text-[#1A1A1A] text-4xl md:text-6xl">Auzhan</span>
            <GlitterText text=".ktl" className="text-4xl md:text-6xl" />
          </motion.h1>

          {/* Gold animated underline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 2, background: 'linear-gradient(90deg, transparent, #C9A84C, #E8D5A3, #C9A84C, transparent)', transformOrigin: 'center', maxWidth: 260, margin: '0 auto 2rem' }}
          />

          <div className="overflow-hidden mb-12">
            <motion.p
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-[#6B6B6B] max-w-xl mx-auto leading-relaxed"
            >
              WhatsApp арқылы өтініш — бот сілтеме жібереді — дизайнер орындайды — директорға отчет
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/admin"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-white font-semibold text-sm tracking-wide transition-all hover:shadow-xl hover:scale-105 text-center"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}
            >
              Кіру →
            </Link>
            <Link
              href="/executor"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm tracking-wide border-2 border-[#E8E0D0] text-[#1A1A1A] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all text-center"
            >
              Орындаушы
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase text-[#6B6B6B]">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-0.5 h-10 bg-gradient-to-b from-[#C9A84C] to-transparent rounded-full"
          />
        </motion.div>
      </section>

      {/* MARQUEE */}
      <Marquee items={marqueeItems} />

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-32 px-6 max-w-6xl mx-auto">
        <FadeCard>
          <div className="text-center mb-12 md:mb-20">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C] mb-4 block">Жүйе қалай жұмыс істейді</span>
            <h2 className="text-4xl md:text-7xl font-bold font-playfair text-[#1A1A1A] leading-tight">
              3 қадам
            </h2>
          </div>
        </FadeCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              title: 'WhatsApp',
              desc: 'Мұғалім ботқа хабарлама жазады. Бот адамша сөйлесіп, автоматты сілтеме жібереді.',
              icon: '💬',
            },
            {
              num: '02',
              title: 'Форма',
              desc: 'Сілтемені ашып, аты-жөні, кабинет, не керек екенін толтырады. 2 минут.',
              icon: '📋',
            },
            {
              num: '03',
              title: 'Нәтиже',
              desc: 'Дизайнер орындайды. Статус жаңарады. Директорға отчет автоматты дайын.',
              icon: '✨',
            },
          ].map((step, i) => (
            <FadeCard key={step.num} delay={i * 0.15}>
              <div className="group p-8 rounded-2xl border border-[#E8E0D0] bg-white hover:border-[#C9A84C] transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-default h-full">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl font-bold font-playfair" style={{ color: 'rgba(201,168,76,0.2)' }}>{step.num}</span>
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <h3 className="text-2xl font-bold font-playfair text-[#1A1A1A] mb-3">{step.title}</h3>
                <p className="text-[#6B6B6B] leading-relaxed">{step.desc}</p>
                <div className="mt-6 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
              </div>
            </FadeCard>
          ))}
        </div>
      </section>

      {/* BIG STATS */}
      <section className="py-16 md:py-24 px-6" style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeCard>
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-6xl font-bold font-playfair text-white">
                Нәтижелер <span className="gold-shimmer">сөйлейді</span>
              </h2>
            </div>
          </FadeCard>
          <div className="grid grid-cols-3 gap-3 md:gap-1">
            {[
              { value: '100%', label: 'Цифрлық процесс' },
              { value: '1-2h', label: 'Жедел орындау' },
              { value: '24/7', label: 'Өтініш қабылдау' },
            ].map((stat, i) => (
              <FadeCard key={stat.label} delay={i * 0.15}>
                <div className="text-center py-8 md:py-12 px-2 md:px-6 border border-white/10 rounded-2xl hover:border-[#C9A84C]/40 transition-colors">
                  <div className="text-3xl md:text-8xl font-bold font-playfair mb-2 md:mb-3" style={{ color: '#C9A84C' }}>{stat.value}</div>
                  <div className="text-white/60 text-xs md:text-sm tracking-widest uppercase">{stat.label}</div>
                </div>
              </FadeCard>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 md:py-32 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <FadeCard>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C] mb-4 block">Артықшылықтары</span>
            <h2 className="text-3xl md:text-5xl font-bold font-playfair text-[#1A1A1A] leading-tight mb-6">
              Неге дәл<br /><span className="gold-shimmer">Auzhan.ktl?</span>
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed text-lg">
              Қағаз жұмысы жоқ. Ұмытып кету жоқ. Барлығы бір жерде — ашық, жылдам, элитный.
            </p>
          </FadeCard>
          <div className="space-y-4">
            {[
              { title: 'WhatsApp интеграция', desc: 'Бот автоматты жауап берып сілтеме жібереді' },
              { title: 'Элитный дизайн', desc: 'Кәсіби, заманауи, директорға тапсыруға дайын' },
              { title: 'Нақты уақыт статусы', desc: 'Орындалды / орындалмады — лезде жаңарады' },
              { title: 'Директорға отчет', desc: 'Бір кнопкамен баспа шығару функциясы' },
            ].map((f, i) => (
              <FadeCard key={f.title} delay={i * 0.1}>
                <div className="flex items-start gap-4 p-5 rounded-xl border border-[#E8E0D0] bg-white hover:border-[#C9A84C] hover:shadow-lg transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>
                    <span className="text-white text-sm font-bold">0{i + 1}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#1A1A1A] mb-1 group-hover:text-[#C9A84C] transition-colors">{f.title}</div>
                    <div className="text-sm text-[#6B6B6B]">{f.desc}</div>
                  </div>
                </div>
              </FadeCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-32 px-6">
        <FadeCard>
          <div className="max-w-3xl mx-auto text-center rounded-3xl p-8 md:p-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A1A1A, #2D2D2D)' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.15) 0%, transparent 70%)' }} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-bold font-playfair text-white mb-4 md:mb-6 leading-tight">
                Бастауға<br /><span className="gold-shimmer">дайынсыз ба?</span>
              </h2>
              <p className="text-white/60 text-base md:text-lg mb-8 md:mb-10">Мектебіңіздің жұмысын автоматтандыруды бүгін бастаңыз</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/admin" className="w-full sm:w-auto px-8 md:px-10 py-4 rounded-full text-[#1A1A1A] font-bold text-sm tracking-wide transition-all hover:shadow-2xl hover:scale-105 text-center" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8D5A3)' }}>
                  Админ панель →
                </Link>
                <Link href="/executor" className="w-full sm:w-auto px-8 md:px-10 py-4 rounded-full text-white font-semibold text-sm tracking-wide border border-white/20 hover:border-[#C9A84C] transition-all text-center">
                  Орындаушы
                </Link>
              </div>
            </div>
          </div>
        </FadeCard>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-8 border-t border-[#E8E0D0] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>
            <span className="text-white font-bold text-sm font-playfair">A</span>
          </div>
          <span className="font-bold font-playfair text-[#1A1A1A]">Auzhan<span className="text-[#C9A84C]">_ktl</span><span className="text-[#6B6B6B] font-normal">.Designer</span></span>
        </div>
        <p className="text-sm text-[#6B6B6B]">© 2024 Auzhan_ktl.Designer</p>
        <div className="flex gap-6">
          <Link href="/admin" className="text-sm text-[#6B6B6B] hover:text-[#C9A84C] transition-colors">Админ</Link>
          <Link href="/executor" className="text-sm text-[#6B6B6B] hover:text-[#C9A84C] transition-colors">Орындаушы</Link>
        </div>
      </footer>
    </div>
  )
}
