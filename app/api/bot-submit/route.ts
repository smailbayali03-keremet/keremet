import { prisma } from '@/lib/prisma'
import { generateToken } from '@/lib/token'

export async function POST(request: Request) {
  const { phone } = await request.json()

  const token = generateToken()

  await prisma.request.create({
    data: {
      token,
      whatsappPhone: phone,
      name: '',
      cabinet: '',
      requestType: '',
      urgency: '',
    },
  })

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const link = `${baseUrl}/form/${token}`

  return Response.json({ token, link })
}
