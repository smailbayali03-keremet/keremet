import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

export const dynamic = 'force-dynamic'

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID

async function notifyTelegram(data: Record<string, string>) {
  if (!BOT_TOKEN || !ADMIN_CHAT_ID) return
  const urgencyLabel = data.urgency === 'urgent' ? '⚡ Жедел (1-2 сағат)' : '📅 Кез-келген уақытта'
  const text = [
    '🔔 *Жаңа тапсырыс — сайттан!*',
    '',
    `👤 *Аты-жөні:* ${data.name}`,
    data.cabinet ? `🚪 *Кабинет:* ${data.cabinet}` : '',
    `🎨 *Тапсырыс:* ${data.requestType}`,
    data.topic ? `📌 *Тақырып:* ${data.topic}` : '',
    data.size ? `📐 *Өлшем:* ${data.size}` : '',
    data.style ? `🖌 *Стиль:* ${data.style}` : '',
    data.info ? `📝 *Ақпарат:* ${data.info}` : '',
    `⏰ *Мерзім:* ${urgencyLabel}`,
    data.notes ? `💬 *Ескерту:* ${data.notes}` : '',
  ].filter(Boolean).join('\n')

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text, parse_mode: 'Markdown' }),
  })
}

export async function POST(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token') || ''

  const { name, cabinet, requestType, topic, size, info, style, urgency, notes } = await request.json()

  if (!name || !requestType || !urgency) {
    return Response.json({ error: 'Міндетті өрістерді толтырыңыз' }, { status: 400 })
  }

  const formData = { name, cabinet: cabinet || '', requestType, topic: topic || '', size: size || '', info: info || '', style: style || '', urgency, notes: notes || '' }

  // Notify Telegram admin
  await notifyTelegram(formData).catch(console.error)

  if (token) {
    // Existing flow: update record by token
    const existing = await prisma.request.findUnique({ where: { token } })
    if (!existing) {
      return Response.json({ error: 'Жарамсыз токен' }, { status: 404 })
    }
    const updated = await prisma.request.update({ where: { token }, data: formData })
    return Response.json(updated)
  } else {
    // New flow: create a fresh request
    const newToken = randomUUID()
    const created = await prisma.request.create({
      data: { token: newToken, whatsappPhone: '', ...formData },
    })
    return Response.json(created)
  }
}
