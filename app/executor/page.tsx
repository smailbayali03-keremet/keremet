'use client'

import { useState, useEffect, useCallback } from 'react'

interface Request {
  id: number
  name: string
  cabinet: string
  requestType: string
  urgency: string
  notes: string | null
  status: string
  whatsappPhone: string
  createdAt: string
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, role: 'executor' }),
    })
    const data = await res.json()
    setLoading(false)
    if (data.success) {
      onLogin()
    } else {
      setError(data.message || 'Пароль қате')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #FAFAF8 0%, #FFF8ED 100%)' }}>
      <div className="elite-card p-10 max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>
            <span className="text-white text-2xl">🎨</span>
          </div>
          <h1 className="text-2xl font-bold font-playfair text-[#1A1A1A]">Орындаушы панель</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">Auzhan.ktl — Дизайнер</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Паролді енгізіңіз"
              className="input-elegant"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-gold w-full py-3 rounded-xl">
            {loading ? 'Кіруде...' : 'Кіру'}
          </button>
        </form>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'done') return <span className="badge-done">✓ Орындалды</span>
  if (status === 'notdone') return <span className="badge-notdone">✗ Орындалмады</span>
  return <span className="badge-pending">⏳ Күтуде</span>
}

function Dashboard() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRequests = useCallback(async () => {
    const res = await fetch('/api/requests')
    const data = await res.json()
    setRequests(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchRequests()
  }, [fetchRequests])

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/requests/update?id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchRequests()
  }

  async function logout() {
    await fetch('/api/auth', { method: 'DELETE' })
    window.location.reload()
  }

  const pending = requests.filter(r => r.status === 'pending')
  const completed = requests.filter(r => r.status !== 'pending')

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF8' }}>
      {/* Header */}
      <header className="bg-white border-b border-[#E8E0D0] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>
            <span className="text-white font-bold font-playfair text-sm">A</span>
          </div>
          <span className="text-lg font-bold font-playfair text-[#1A1A1A]">Auzhan<span className="text-[#C9A84C]">.ktl</span></span>
          <span className="ml-2 px-3 py-1 rounded-full text-xs font-medium bg-[#EEF9F3] text-[#1E7B4B] border border-[#A3E4C0]">Дизайнер</span>
        </div>
        <button onClick={logout} className="text-sm px-4 py-2 rounded-lg text-[#6B6B6B] hover:text-red-500 transition-colors">
          Шығу
        </button>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Active Tasks */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-bold font-playfair text-[#1A1A1A]">Орындалатын тапсырмалар</h2>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FEF9EC] text-[#A07830] border border-[#F0D98A]">{pending.length}</span>
          </div>

          {loading ? (
            <div className="text-center py-10 text-[#6B6B6B]">Жүктелуде...</div>
          ) : pending.length === 0 ? (
            <div className="elite-card p-12 text-center text-[#6B6B6B]">
              <div className="text-4xl mb-3">🎉</div>
              <p className="font-medium">Барлық тапсырма орындалды!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pending.map(req => (
                <div key={req.id} className="elite-card p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        {req.urgency === 'urgent' && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-600 border border-orange-200">
                            🔥 СРОЧНО
                          </span>
                        )}
                        <span className="badge-pending">⏳ Күтуде</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-xs text-[#6B6B6B] mb-1">Аты-жөні</div>
                          <div className="font-semibold text-[#1A1A1A]">{req.name}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6B6B6B] mb-1">Кабинет</div>
                          <div className="font-semibold text-[#1A1A1A]">{req.cabinet}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6B6B6B] mb-1">Не керек</div>
                          <div className="font-semibold text-[#C9A84C]">{req.requestType}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6B6B6B] mb-1">Уақыт</div>
                          <div className="text-sm text-[#6B6B6B]">{new Date(req.createdAt).toLocaleDateString('kk-KZ')}</div>
                        </div>
                      </div>
                      {req.notes && (
                        <div className="p-3 rounded-lg bg-[#FAFAF8] border border-[#E8E0D0]">
                          <div className="text-xs text-[#6B6B6B] mb-1">Ескерту</div>
                          <div className="text-sm text-[#1A1A1A]">{req.notes}</div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 min-w-[140px]">
                      <button
                        onClick={() => updateStatus(req.id, 'done')}
                        className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-md"
                        style={{ background: 'linear-gradient(135deg, #1E7B4B, #15603A)' }}
                      >
                        ✓ Орындалды
                      </button>
                      <button
                        onClick={() => updateStatus(req.id, 'notdone')}
                        className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                      >
                        ✗ Орындалмады
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Tasks */}
        {completed.length > 0 && (
          <div>
            <h2 className="text-xl font-bold font-playfair text-[#1A1A1A] mb-5">Тарих</h2>
            <div className="space-y-3">
              {completed.map(req => (
                <div key={req.id} className="elite-card p-4 opacity-70">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-semibold text-sm text-[#1A1A1A]">{req.name}</div>
                        <div className="text-xs text-[#6B6B6B]">{req.requestType} • {req.cabinet} • {new Date(req.createdAt).toLocaleDateString('kk-KZ')}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={req.status} />
                      <button
                        onClick={() => updateStatus(req.id, 'pending')}
                        className="text-xs px-3 py-1 rounded-lg border border-[#E8E0D0] text-[#6B6B6B] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                      >
                        ↩ Қайтару
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ExecutorPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    fetch('/api/requests')
      .then(res => {
        if (res.ok) setLoggedIn(true)
        setChecking(false)
      })
      .catch(() => setChecking(false))
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="text-[#C9A84C] text-lg font-playfair">Жүктелуде...</div>
      </div>
    )
  }

  if (!loggedIn) return <LoginForm onLogin={() => setLoggedIn(true)} />
  return <Dashboard />
}
