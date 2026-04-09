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
      body: JSON.stringify({ password, role: 'admin' }),
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
            <span className="text-white text-2xl">🔐</span>
          </div>
          <h1 className="text-2xl font-bold font-playfair text-[#1A1A1A]">Админ панель</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">Auzhan.ktl</p>
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
  const [filter, setFilter] = useState<'all' | 'pending' | 'done' | 'notdone'>('all')

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

  function printReport() {
    window.print()
  }

  const filtered = requests.filter(r => filter === 'all' ? true : r.status === filter)
  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    done: requests.filter(r => r.status === 'done').length,
    notdone: requests.filter(r => r.status === 'notdone').length,
  }

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF8' }}>
      {/* Header */}
      <header className="bg-white border-b border-[#E8E0D0] px-6 py-4 flex items-center justify-between sticky top-0 z-10 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>
            <span className="text-white font-bold font-playfair text-sm">A</span>
          </div>
          <span className="text-lg font-bold font-playfair text-[#1A1A1A]">Auzhan<span className="text-[#C9A84C]">.ktl</span></span>
          <span className="ml-2 px-3 py-1 rounded-full text-xs font-medium bg-[#FEF9EC] text-[#A07830] border border-[#F0D98A]">Админ</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={printReport} className="text-sm px-4 py-2 rounded-lg border border-[#E8E0D0] text-[#6B6B6B] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
            📄 Отчет басып шығару
          </button>
          <button onClick={logout} className="text-sm px-4 py-2 rounded-lg text-[#6B6B6B] hover:text-red-500 transition-colors">
            Шығу
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Print Header */}
        <div className="hidden print:block mb-8">
          <h1 className="text-3xl font-bold font-playfair text-[#1A1A1A]">Auzhan.ktl — Отчет</h1>
          <p className="text-[#6B6B6B] mt-1">Күні: {new Date().toLocaleDateString('kk-KZ')}</p>
          <hr className="gold-divider mt-4" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 print:grid-cols-4">
          {[
            { label: 'Барлығы', value: stats.total, color: '#C9A84C' },
            { label: 'Күтуде', value: stats.pending, color: '#B7821A' },
            { label: 'Орындалды', value: stats.done, color: '#1E7B4B' },
            { label: 'Орындалмады', value: stats.notdone, color: '#C0392B' },
          ].map(s => (
            <div key={s.label} className="elite-card p-5 text-center">
              <div className="text-3xl font-bold font-playfair" style={{ color: s.color }}>{s.value}</div>
              <div className="text-sm text-[#6B6B6B] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 print:hidden">
          {(['all', 'pending', 'done', 'notdone'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all border"
              style={{
                background: filter === f ? 'linear-gradient(135deg, #C9A84C, #A07830)' : 'white',
                color: filter === f ? 'white' : '#6B6B6B',
                border: filter === f ? 'none' : '1.5px solid #E8E0D0',
              }}
            >
              {f === 'all' ? 'Барлығы' : f === 'pending' ? 'Күтуде' : f === 'done' ? 'Орындалды' : 'Орындалмады'}
            </button>
          ))}
        </div>

        {/* Requests Table */}
        {loading ? (
          <div className="text-center py-20 text-[#6B6B6B]">Жүктелуде...</div>
        ) : filtered.length === 0 ? (
          <div className="elite-card p-20 text-center text-[#6B6B6B]">
            <div className="text-4xl mb-4">📋</div>
            <p>Өтініштер жоқ</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(req => (
              <div key={req.id} className="elite-card p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <div className="text-xs text-[#6B6B6B] mb-1">Аты-жөні</div>
                    <div className="text-sm font-semibold text-[#1A1A1A]">{req.name || '—'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6B6B6B] mb-1">Кабинет</div>
                    <div className="text-sm font-semibold text-[#1A1A1A]">{req.cabinet || '—'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6B6B6B] mb-1">Не керек</div>
                    <div className="text-sm font-semibold text-[#1A1A1A]">{req.requestType || '—'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6B6B6B] mb-1">Жеделдік</div>
                    <div className="text-sm font-semibold text-[#1A1A1A]">
                      {req.urgency === 'urgent' ? '🔥 Срочно' : req.urgency === 'anytime' ? '🕐 Кез келген' : '—'}
                    </div>
                  </div>
                  {req.notes && (
                    <div className="col-span-2 md:col-span-4">
                      <div className="text-xs text-[#6B6B6B] mb-1">Ескерту</div>
                      <div className="text-sm text-[#1A1A1A] bg-[#FAFAF8] rounded-lg px-3 py-2">{req.notes}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-[#6B6B6B] mb-1">Күні</div>
                    <div className="text-sm text-[#6B6B6B]">{new Date(req.createdAt).toLocaleDateString('kk-KZ')}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end min-w-[140px]">
                  <StatusBadge status={req.status} />
                  <div className="flex gap-2 print:hidden">
                    <button
                      onClick={() => updateStatus(req.id, 'done')}
                      className="text-xs px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 transition-colors"
                    >
                      ✓ Орындалды
                    </button>
                    <button
                      onClick={() => updateStatus(req.id, 'notdone')}
                      className="text-xs px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      ✗ Жоқ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminPage() {
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
