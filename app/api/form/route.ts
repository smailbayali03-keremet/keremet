import { prisma } from '@/lib/prisma'

export const dynamic = 'force-static'

export async function POST(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token') || ''

  if (!token) {
    return Response.json({ error: 'Token жоқ' }, { status: 400 })
  }

  const { name, cabinet, requestType, urgency, notes } = await request.json()

  if (!name || !cabinet || !requestType || !urgency) {
    return Response.json({ error: 'Барлық міндетті өрістерді толтырыңыз' }, { status: 400 })
  }

  const existing = await prisma.request.findUnique({ where: { token } })
  if (!existing) {
    return Response.json({ error: 'Жарамсыз токен' }, { status: 404 })
  }

  const updated = await prisma.request.update({
    where: { token },
    data: { name, cabinet, requestType, urgency, notes: notes || '' },
  })

  return Response.json(updated)
}
