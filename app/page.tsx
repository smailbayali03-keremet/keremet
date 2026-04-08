import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #FAFAF8 0%, #FFF8ED 50%, #FAFAF8 100%)' }}>
      {/* Header */}
      <header className="w-full px-8 py-5 flex items-center justify-between border-b border-[#E8E0D0] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>
            <span className="text-white font-bold text-lg font-playfair">A</span>
          </div>
          <span className="text-xl font-bold font-playfair text-[#1A1A1A]">Auzhan<span className="text-[#C9A84C]">.ktl</span></span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/admin" className="text-sm font-medium text-[#6B6B6B] hover:text-[#C9A84C] transition-colors">
            Админ панель
          </Link>
          <Link href="/executor" className="text-sm font-medium text-white px-4 py-2 rounded-lg transition-all hover:shadow-md" style={{ background: 'linear-gradient(135deg, #C9A84C, #A07830)' }}>
            Орындаушы
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#E8E0D0] bg-white mb-10 text-sm text-[#6B6B6B] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Жүйе іске қосылды
        </div>

        <h1 className="text-5xl md:text-7xl font-bold font-playfair mb-6 leading-tight text-[#1A1A1A]">
          Auzhan
          <span className="block gold-shimmer mt-2">Автоматизация</span>
        </h1>

        <p className="text-lg text-[#6B6B6B] max-w-lg mb-14 leading-relaxed">
          Мектеп қызметкерлері <strong>WhatsApp</strong> арқылы өтініш береді.
          Дизайнер орындайды. Директорға <strong>отчет</strong> дайын.
        </p>

        {/* Steps */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full max-w-3xl">
          <div className="flex-1 elite-card p-6 text-left w-full">
            <div className="w-10 h-10 rounded-full bg-[#FEF9EC] border border-[#F0D98A] flex items-center justify-center mb-4">
              <span className="text-[#C9A84C] font-bold text-sm">1</span>
            </div>
            <div className="text-lg font-semibold text-[#1A1A1A] mb-2">WhatsApp-та жазыңыз</div>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">Бот сізбен сөйлесіп, автоматты сілтеме жібереді</p>
          </div>

          <div className="text-[#C9A84C] text-3xl hidden sm:block">→</div>

          <div className="flex-1 elite-card p-6 text-left w-full">
            <div className="w-10 h-10 rounded-full bg-[#FEF9EC] border border-[#F0D98A] flex items-center justify-center mb-4">
              <span className="text-[#C9A84C] font-bold text-sm">2</span>
            </div>
            <div className="text-lg font-semibold text-[#1A1A1A] mb-2">Формаңызды толтырыңыз</div>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">Аты-жөні, кабинет, не керек екенін жазыңыз</p>
          </div>

          <div className="text-[#C9A84C] text-3xl hidden sm:block">→</div>

          <div className="flex-1 elite-card p-6 text-left w-full">
            <div className="w-10 h-10 rounded-full bg-[#FEF9EC] border border-[#F0D98A] flex items-center justify-center mb-4">
              <span className="text-[#C9A84C] font-bold text-sm">3</span>
            </div>
            <div className="text-lg font-semibold text-[#1A1A1A] mb-2">Орындалады</div>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">Дизайнер орындап, статус жаңартады</p>
          </div>
        </div>

        <hr className="gold-divider w-40 mb-12" />

        <div className="flex gap-12 text-center">
          <div>
            <div className="text-4xl font-bold font-playfair text-[#C9A84C]">100%</div>
            <div className="text-sm text-[#6B6B6B] mt-1">Цифрлық</div>
          </div>
          <div>
            <div className="text-4xl font-bold font-playfair text-[#C9A84C]">24/7</div>
            <div className="text-sm text-[#6B6B6B] mt-1">Өтініш</div>
          </div>
          <div>
            <div className="text-4xl font-bold font-playfair text-[#C9A84C]">1-2h</div>
            <div className="text-sm text-[#6B6B6B] mt-1">Жедел</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-[#6B6B6B] border-t border-[#E8E0D0] bg-white/50">
        © 2024 <span className="font-playfair font-semibold text-[#C9A84C]">Auzhan.ktl</span> — Барлық құқықтар қорғалған
      </footer>
    </main>
  )
}
