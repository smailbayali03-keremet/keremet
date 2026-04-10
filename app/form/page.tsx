'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const REQUEST_TYPES = ['Афиша', 'Пост', 'Буклет', 'Грамота', 'Баннер', 'Сертификат', 'Басқа']
const URGENCY_OPTIONS = [
  { value: 'urgent', label: '⚡ Жедел (1-2 сағат)' },
  { value: 'normal', label: '📅 Кез-келген уақытта' },
]

function FormContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''
  const typeFromUrl = searchParams.get('type') || ''

  const [step, setStep] = useState<'form' | 'success'>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    cabinet: '',
    requestType: typeFromUrl ? REQUEST_TYPES.find(t => t.toLowerCase().startsWith(typeFromUrl)) || '' : '',
    topic: '',
    size: '',
    info: '',
    style: '',
    urgency: 'normal',
    notes: '',
  })

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.requestType) {
      setError('Аты-жөні мен тапсырыс түрін толтырыңыз')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/form?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStep('success')
      } else {
        const data = await res.json()
        setError(data.error || 'Қате болды')
      }
    } catch {
      setError('Байланыс қатесі')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #FAFAF8 0%, #FFF9F0 50%, #FAFAF8 100%)' }}>
      {/* NAV */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 flex items-center justify-between" style={{ background: 'rgba(250,250,248,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(232,224,208,0.5)' }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>
            <span className="text-white font-bold font-playfair text-sm">A</span>
          </div>
          <span className="text-base font-bold font-playfair text-[#1A1A1A]">Auzhan<span className="text-[#C9A84C]">_ktl</span><span className="text-[#6B6B6B] font-normal hidden sm:inline">.Designer</span></span>
        </Link>
        <Link href="/services" className="text-sm text-[#6B6B6B] hover:text-[#C9A84C] transition-colors">
          ← Қызметтер
        </Link>
      </div>

      <AnimatePresence mode="wait">
        {step === 'form' ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pt-24 pb-16 px-4 max-w-2xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E8E0D0] bg-white mb-5 text-xs font-semibold tracking-widest uppercase text-[#C9A84C]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                Тапсырыс беру
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold font-playfair text-[#1A1A1A] mb-2">
                Тапсырыс беру
              </h1>
              <p className="text-[#6B6B6B]">Форманы толтырыңыз, дизайнер хабарласады</p>
              <div className="h-px mt-6" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-3xl border border-[#E8E0D0] p-6 md:p-8 shadow-sm" style={{ boxShadow: '0 8px 40px rgba(201,168,76,0.08)' }}>
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Тапсырыс түрі */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
                    Атауы <span className="text-[#C9A84C]">*</span>
                    <span className="text-xs font-normal text-[#6B6B6B] ml-2">— не дайындау керек?</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {REQUEST_TYPES.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => set('requestType', type)}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all duration-200 ${
                          form.requestType === type
                            ? 'border-[#C9A84C] bg-[#C9A84C] text-white'
                            : 'border-[#E8E0D0] text-[#6B6B6B] hover:border-[#C9A84C] hover:text-[#C9A84C]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Тақырыбы */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Тақырыбы
                    <span className="text-xs font-normal text-[#6B6B6B] ml-2">— іс-шара, мерекенің атауы</span>
                  </label>
                  <input
                    className="input-elegant"
                    placeholder="мыс: Наурыз мерекесі, 22 наурыз сағат 10:00"
                    value={form.topic}
                    onChange={e => set('topic', e.target.value)}
                  />
                </div>

                {/* Инф */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Инф
                    <span className="text-xs font-normal text-[#6B6B6B] ml-2">— толық ақпарат</span>
                  </label>
                  <textarea
                    className="input-elegant resize-none"
                    rows={4}
                    placeholder="мыс: 22 наурыз, сағат 10:00. Наурыз мерекесіне орай іс шара өтеді..."
                    value={form.info}
                    onChange={e => set('info', e.target.value)}
                  />
                </div>

                {/* Стилі + Мөлшері */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Стилі
                      <span className="text-xs font-normal text-[#6B6B6B] ml-2">— дизайн бағыты</span>
                    </label>
                    <input
                      className="input-elegant"
                      placeholder="мыс: Қазақи дәстүрде"
                      value={form.style}
                      onChange={e => set('style', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Мөлшері
                      <span className="text-xs font-normal text-[#6B6B6B] ml-2">— өлшем</span>
                    </label>
                    <input
                      className="input-elegant"
                      placeholder="мыс: A3, 1080×1080"
                      value={form.size}
                      onChange={e => set('size', e.target.value)}
                    />
                  </div>
                </div>

                {/* Мерзімі */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
                    Мерзімі <span className="text-[#C9A84C]">*</span>
                    <span className="text-xs font-normal text-[#6B6B6B] ml-2">— қашан керек?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {URGENCY_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => set('urgency', opt.value)}
                        className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all duration-200 text-left ${
                          form.urgency === opt.value
                            ? 'border-[#C9A84C] bg-[#FFF9EE] text-[#1A1A1A]'
                            : 'border-[#E8E0D0] text-[#6B6B6B] hover:border-[#C9A84C]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Separator */}
                <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #E8E0D0, transparent)' }} />

                {/* Аты-жөні + Кабинет */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Аты-жөні <span className="text-[#C9A84C]">*</span>
                    </label>
                    <input
                      className="input-elegant"
                      placeholder="мыс: Молдір Сейткали"
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Кабинет
                    </label>
                    <input
                      className="input-elegant"
                      placeholder="мыс: 201"
                      value={form.cabinet}
                      onChange={e => set('cabinet', e.target.value)}
                    />
                  </div>
                </div>

                {/* Ескерту */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Қосымша ескерту
                  </label>
                  <textarea
                    className="input-elegant resize-none"
                    rows={2}
                    placeholder="Қосымша тілектер, ескертулер..."
                    value={form.notes}
                    onChange={e => set('notes', e.target.value)}
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-4 rounded-full font-bold text-sm tracking-wide transition-all hover:shadow-xl hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)', color: 'white' }}
                  >
                    {loading ? 'Жіберілуде...' : 'Жіберу →'}
                  </button>
                  <Link
                    href="/services"
                    className="py-4 px-8 rounded-full font-semibold text-sm border-2 border-[#E8E0D0] text-[#6B6B6B] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all text-center"
                  >
                    Бас тарту
                  </Link>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          /* SUCCESS PAGE */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen flex items-center justify-center px-4"
          >
            <div className="text-center max-w-lg">
              {/* Checkmark */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center text-4xl"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)', boxShadow: '0 20px 60px rgba(201,168,76,0.35)' }}
              >
                ✓
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold font-playfair text-[#1A1A1A] mb-4">
                  Қабылданды!
                </h1>
                <p className="text-xl text-[#6B6B6B] mb-3">
                  Сізге жақын арада хабарласамыз!
                </p>
                <p className="text-sm text-[#6B6B6B] mb-10">
                  Тапсырысыңыз дизайнерге жіберілді. Орындалу барысын WhatsApp арқылы хабарлаймыз.
                </p>

                {/* Gold line */}
                <div className="h-px mb-10" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/services"
                    className="px-8 py-4 rounded-full font-semibold text-sm transition-all hover:shadow-xl hover:scale-105 text-center"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)', color: 'white' }}
                  >
                    Тағы тапсырыс беру
                  </Link>
                  <Link
                    href="/"
                    className="px-8 py-4 rounded-full font-semibold text-sm border-2 border-[#E8E0D0] text-[#6B6B6B] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all text-center"
                  >
                    Басты бетке
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FormPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAFAF8' }}>
        <div className="w-8 h-8 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
      </div>
    }>
      <FormContent />
    </Suspense>
  )
}
