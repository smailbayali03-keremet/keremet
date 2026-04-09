'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const REQUEST_TYPES = ['Сертификат', 'Куәлік', 'Баннер', 'Презентация', 'Афиша', 'Диплом', 'Грамота', 'Басқа']

function FormContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''

  const [step, setStep] = useState<'form' | 'success'>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [cabinet, setCabinet] = useState('')
  const [requestType, setRequestType] = useState('')
  const [urgency, setUrgency] = useState('')
  const [notes, setNotes] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !cabinet || !requestType || !urgency) {
      setError('Барлық міндетті өрістерді толтырыңыз')
      return
    }
    setLoading(true)
    setError('')
    const res = await fetch(`/api/form?token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, cabinet, requestType, urgency, notes }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'Қате болды'); return }
    setStep('success')
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #FAFAF8 0%, #FFF8ED 100%)' }}>
        <div className="elite-card p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>
            <span className="text-white text-4xl font-bold">✓</span>
          </div>
          <h2 className="text-2xl font-bold font-playfair text-[#1A1A1A] mb-3">Өтінішіңіз қабылданды!</h2>
          <p className="text-[#6B6B6B] mb-6">Дизайнер жақын арада орындайды.</p>
          <div className="p-4 rounded-xl bg-[#FEF9EC] border border-[#F0D98A]">
            <p className="text-xs text-[#6B6B6B] font-mono">{token?.slice(0, 8)}...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #FAFAF8 0%, #FFF8ED 100%)' }}>
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-[#E8E0D0] bg-white/80 backdrop-blur-md">
        <span className="text-lg font-bold font-playfair text-[#1A1A1A]">Auzhan<span className="text-[#C9A84C]">_ktl</span><span className="text-[#6B6B6B] font-normal">.Designer</span></span>
        <span className="text-sm text-[#6B6B6B]">Өтініш формасы</span>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="elite-card p-8 max-w-lg w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold font-playfair text-[#1A1A1A] mb-2">Өтініш беру</h1>
            <hr className="gold-divider w-24 mx-auto mt-4" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Аты-жөні <span className="text-[#C9A84C]">*</span></label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Мысалы: Айгүл Бекова" className="input-elegant" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Кабинет нөмірі <span className="text-[#C9A84C]">*</span></label>
              <input type="text" value={cabinet} onChange={e => setCabinet(e.target.value)} placeholder="Мысалы: 205" className="input-elegant" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Не керек? <span className="text-[#C9A84C]">*</span></label>
              <div className="grid grid-cols-2 gap-2">
                {REQUEST_TYPES.map(type => (
                  <button key={type} type="button" onClick={() => setRequestType(type)}
                    className="py-3 px-4 rounded-lg border text-sm font-medium transition-all text-left"
                    style={{ border: requestType === type ? '2px solid #C9A84C' : '1.5px solid #E8E0D0', background: requestType === type ? '#FEF9EC' : 'white', color: requestType === type ? '#A07830' : '#1A1A1A' }}>
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Жеделдік <span className="text-[#C9A84C]">*</span></label>
              <div className="flex gap-3">
                {[['urgent','🔥 Срочно (1-2 сағат)'],['anytime','🕐 Кез келген уақытта']].map(([val, label]) => (
                  <button key={val} type="button" onClick={() => setUrgency(val)} className="flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all"
                    style={{ border: urgency === val ? '2px solid #C9A84C' : '1.5px solid #E8E0D0', background: urgency === val ? '#FEF9EC' : 'white', color: urgency === val ? '#A07830' : '#1A1A1A' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Қосымша ескерту <span className="text-[#6B6B6B] font-normal">(міндетті емес)</span></label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Толығырақ жазыңыз..." rows={3} className="input-elegant resize-none" />
            </div>
            {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}
            <button type="submit" disabled={loading} className="btn-gold w-full py-4 text-base rounded-xl">
              {loading ? 'Жіберілуде...' : 'Өтінішті жіберу'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function FormPage() {
  return <Suspense><FormContent /></Suspense>
}
