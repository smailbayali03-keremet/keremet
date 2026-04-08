import { prisma } from '@/lib/prisma'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params

  const existing = await prisma.request.findUnique({ where: { token } })

  if (existing && existing.name) {
    return Response.json({ alreadyFilled: true })
  }

  return Response.json({ alreadyFilled: false, token })
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const body = await request.json()
  const { name, cabinet, requestType, urgency, notes, whatsappPhone } = body

  const existing = await prisma.request.findUnique({ where: { token } })

  if (existing && existing.name) {
    return Response.json({ error: 'Форма бұрын толтырылған' }, { status: 400 })
  }

  if (existing) {
    const updated = await prisma.request.update({
      where: { token },
      data: { name, cabinet, requestType, urgency, notes },
    })
    return Response.json(updated)
  }

  const created = await prisma.request.create({
    data: { token, whatsappPhone: whatsappPhone || '', name, cabinet, requestType, urgency, notes },
  })
  return Response.json(created)
}
