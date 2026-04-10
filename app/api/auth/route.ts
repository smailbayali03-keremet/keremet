import { cookies } from 'next/headers'
import { verifyAdmin, verifyExecutor } from '@/lib/auth'

export async function POST(request: Request) {
  const { password, role } = await request.json()

  if (role === 'admin' && verifyAdmin(password)) {
    const cookieStore = await cookies()
    cookieStore.set('role', 'admin', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    })
    return Response.json({ success: true })
  }

  if (role === 'executor' && verifyExecutor(password)) {
    const cookieStore = await cookies()
    cookieStore.set('role', 'executor', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    })
    return Response.json({ success: true })
  }

  return Response.json({ success: false, message: 'Пароль қате' }, { status: 401 })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('role')
  return Response.json({ success: true })
}
export const dynamic = 'force-dynamic'
