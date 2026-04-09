import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session.role) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const requests = await prisma.request.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(requests)
}
export const dynamic = 'force-static'
