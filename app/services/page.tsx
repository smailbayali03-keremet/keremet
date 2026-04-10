'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    id: 'post',
    title: 'Пост',
    subtitle: 'Әлеуметтік желі',
    desc: 'Instagram, Facebook үшін дизайнерлік пост. Брендке сай стиль.',
    icon: '📱',
    size: '1080×1080 px',
  },
  {
    id: 'afisha',
    title: 'Афиша',
    subtitle: 'Іс-шара',
    desc: 'Мерекелер, концерт, конкурс үшін кәсіби афиша дизайны.',
    icon: '🎭',
    size: 'A3 / A2',
  },
  {
    id: 'booklet',
    title: 'Буклет',
    subtitle: 'Ақпараттық',
    desc: 'Мектеп, іс-шара туралы ақпараттық буклет. Бүктемелі формат.',
    icon: '📖',
    size: 'A4 / A5',
  },
  {
    id: 'gramota',
    title: 'Грамота',
    subtitle: 'Марапат',
    desc: 'Оқушылар мен мұғалімдерге арналған мерейлі грамота дизайны.',
    icon: '🏆',
    size: 'A4 / A5',
  },
  {
    id: 'banner',
    title: 'Баннер',
    subtitle: 'Стенд / Digital',
    desc: 'Мектеп дәлізіне, сахнаға, digital экранға арналған баннер.',
    icon: '🖼️',
    size: '3×1 м / custom',
  },
  {
    id: 'certificate',
    title: 'Сертификат',
    subtitle: 'Растама',
    desc: 'Оқу курстары, олимпиада, жобалар үшін сертификат дизайны.',
    icon: '📜',
    size: 'A4 / A5',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
    >
      <Link href={`/form?type=${service.id}`} className="block group h-full">
        <div className="relative h-full bg-white border border-[#E8E0D0] rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:border-[#C9A84C] hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
          {/* BG glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />

          {/* Top row */}
          <div className="flex items-start justify-between mb-5">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-2xl md:text-3xl" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.06))', border: '1px solid rgba(201,168,76,0.2)' }}>
              {service.icon}
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C] px-3 py-1 rounded-full border border-[#E8E0D0] bg-[#FAFAF8]">
              {service.subtitle}
            </span>
          </div>

          {/* Content */}
          <h3 className="text-xl md:text-2xl font-bold font-playfair text-[#1A1A1A] mb-2 group-hover:text-[#C9A84C] transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5">{service.desc}</p>

          {/* Size tag */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6B6B6B] font-medium">{service.size}</span>
            <span className="text-xs font-semibold text-[#C9A84C] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Тапсырыс беру <span>→</span>
            </span>
          </div>

          {/* Bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: 'linear-gradient(90deg, #C9A84C, #E8D5A3)' }} />
        </div>
      </Link>
    </motion.div>
  )
}

export default function ServicesPage() {
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: true })

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>
      {/* NAV */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-5 flex items-center justify-between"
        style={{ background: 'rgba(250,250,248,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(232,224,208,0.6)' }}
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>
            <span className="text-white font-bold font-playfair text-sm">A</span>
          </div>
          <span className="text-base md:text-lg font-bold font-playfair text-[#1A1A1A]">Auzhan<span className="text-[#C9A84C]">_ktl</span><span className="text-[#6B6B6B] font-normal">.Designer</span></span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/" className="hidden md:block text-sm text-[#6B6B6B] hover:text-[#C9A84C] transition-colors">← Басты</Link>
          <Link href="/admin" className="text-sm font-semibold text-white px-4 py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>
            Кіру
          </Link>
        </div>
      </motion.header>

      {/* HERO */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8E0D0] bg-white mb-8 text-xs font-semibold tracking-widest uppercase text-[#C9A84C]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
          Кәсіби дизайн қызметтері
        </motion.div>

        <div ref={titleRef} className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl font-bold font-playfair text-[#1A1A1A] leading-tight mb-6"
          >
            Дизайн
            <br />
            <span className="gold-shimmer">Қызметтері</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-[#6B6B6B] max-w-xl mx-auto"
          >
            Қызметті таңдап, форманы толтырыңыз — дизайнер хабарласады
          </motion.p>
        </div>

        {/* Gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', maxWidth: 300, margin: '2rem auto 0', transformOrigin: 'center' }}
        />
      </section>

      {/* SERVICES GRID */}
      <section className="px-4 md:px-6 max-w-6xl mx-auto pb-20 md:pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center rounded-3xl p-8 md:p-12 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1A1A1A, #2D2D2D)' }}
        >
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.15) 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold font-playfair text-white mb-4">
              Нақты тапсырыс беру
            </h2>
            <p className="text-white/60 mb-8">Жоғарыдан қызметті таңдаңыз немесе жалпы тапсырыс жіберіңіз</p>
            <Link
              href="/form"
              className="inline-block px-10 py-4 rounded-full font-bold text-sm tracking-wide transition-all hover:shadow-2xl hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #E8D5A3)', color: '#1A1A1A' }}
            >
              Тапсырыс беру →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-[#E8E0D0] text-center">
        <p className="text-sm text-[#6B6B6B]">© 2024 Auzhan_ktl.Designer</p>
      </footer>
    </div>
  )
}
