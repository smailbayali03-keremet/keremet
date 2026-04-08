import { cookies } from 'next/headers'

const ADMIN_PASSWORD = 'LifeisOmir'
const EXECUTOR_PASSWORD = 'LifeisOmir'

export function verifyAdmin(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export function verifyExecutor(password: string): boolean {
  return password === EXECUTOR_PASSWORD
}

export async function getSession(): Promise<{ role: 'admin' | 'executor' | null }> {
  const cookieStore = await cookies()
  const role = cookieStore.get('role')?.value
  if (role === 'admin' || role === 'executor') {
    return { role }
  }
  return { role: null }
}
