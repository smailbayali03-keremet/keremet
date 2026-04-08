const { Client, LocalAuth } = require('whatsapp-web.js')
const QRCode = require('qrcode')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
const QR_PATH = path.join(__dirname, '..', 'public', 'qr.png')

// Conversation state store
const sessions = {}

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: path.join(__dirname, '.wwebjs_auth') }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
})

client.on('qr', async (qr) => {
  console.log('\n📱 QR код жасалуда...')
  try {
    await QRCode.toFile(QR_PATH, qr, {
      width: 400,
      margin: 2,
      color: { dark: '#1A1A1A', light: '#FFFFFF' },
    })
    console.log(`\n✅ QR код сақталды!`)
    console.log(`\n🌐 Браузерде ашыңыз: ${BASE_URL}/qr\n`)
    console.log(`📲 Немесе телефоныздан: http://[компьютер-IP]:3000/qr`)
  } catch (err) {
    console.error('QR жасау қатесі:', err.message)
  }
})

client.on('ready', () => {
  // Remove QR file after successful login
  if (fs.existsSync(QR_PATH)) fs.unlinkSync(QR_PATH)
  console.log('\n✅ WhatsApp боты іске қосылды! Auzhan.ktl дайын.\n')
})

client.on('auth_failure', () => {
  console.log('❌ Аутентификация қатесі. Қайта іске қосыңыз.')
})

client.on('message', async (message) => {
  const phone = message.from
  const text = message.body.trim().toLowerCase()

  if (phone.includes('@g.us')) return

  const session = sessions[phone] || { step: 'start' }

  if (session.step === 'start' || text === '/жаңа' || text === 'жаңа' || text === 'жана') {
    sessions[phone] = { step: 'waiting_request' }
    await message.reply(
      `Сәлеметсіз бе! 👋\n\n*Auzhan.ktl* — мектеп автоматизация жүйесі.\n\nНе керек екенін жазыңыз, сілтеме жіберемін:`
    )
    return
  }

  if (session.step === 'waiting_request') {
    sessions[phone] = { step: 'sent_link', requestDescription: message.body }
    try {
      const response = await axios.post(`${BASE_URL}/api/bot-submit`, {
        phone: phone.replace('@c.us', ''),
      })
      const { link } = response.data
      await message.reply(
        `Рақмет! ✨\n\nТөмендегі сілтемеге өтіп, формаңызды толтырыңыз:\n\n🔗 ${link}\n\n` +
        `Формада:\n• Аты-жөніңіз\n• Кабинет нөміріңіз\n• Не керек екені\n• Жеделдік дәрежесі\n\n` +
        `Дизайнер жақын арада орындайды! 🎨`
      )
    } catch (err) {
      await message.reply(`Кешіріңіз, қате болды. Қайтадан жазып көріңіз.`)
    }
    setTimeout(() => { delete sessions[phone] }, 5 * 60 * 1000)
    return
  }

  if (session.step === 'sent_link') {
    await message.reply(`Сілтеме жіберілді! 🔗\n\nЕгер жаңа өтініш керек болса — "жаңа" деп жазыңыз.`)
    return
  }

  // Default restart
  delete sessions[phone]
  sessions[phone] = { step: 'waiting_request' }
  await message.reply(`Сәлеметсіз бе! 👋 Не керек екенін жазыңыз:`)
})

client.initialize()
console.log('🚀 Auzhan.ktl WhatsApp боты іске қосылуда...')
