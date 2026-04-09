import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-static'

export async function PATCH(request: Request) {
  const session = await getSession()
  if (!session.role) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(request.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return Response.json({ error: 'ID жоқ' }, { status: 400 })
  }

  const { status } = await request.json()

  const updated = await prisma.request.update({
    where: { id: Number(id) },
    data: { status },
  })

  return Response.json(updated)
}
