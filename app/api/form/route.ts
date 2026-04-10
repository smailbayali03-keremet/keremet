import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token') || ''

  if (!token) {
    return Response.json({ error: 'Token жоқ' }, { status: 400 })
  }

  const { name, cabinet, requestType, topic, size, info, style, urgency, notes } = await request.json()

  if (!name || !requestType || !urgency) {
    return Response.json({ error: 'Міндетті өрістерді толтырыңыз' }, { status: 400 })
  }

  const existing = await prisma.request.findUnique({ where: { token } })
  if (!existing) {
    return Response.json({ error: 'Жарамсыз токен' }, { status: 404 })
  }

  const updated = await prisma.request.update({
    where: { token },
    data: {
      name,
      cabinet: cabinet || '',
      requestType,
      topic: topic || '',
      size: size || '',
      info: info || '',
      style: style || '',
      urgency,
      notes: notes || '',
    },
  })

  return Response.json(updated)
}
