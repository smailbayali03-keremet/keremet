'use client'

import { useEffect, useRef } from 'react'

interface Props {
  text: string
  className?: string
}

export default function GlitterText({ text, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number

    function resize() {
      if (!canvas || !container) return
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Sparkle pool
    const sparkles: {
      x: number; y: number; size: number; alpha: number;
      life: number; maxLife: number; rotation: number;
    }[] = []

    function spawnSparkle() {
      if (!canvas) return
      sparkles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 3,
        alpha: 0,
        life: 0,
        maxLife: Math.random() * 40 + 30,
        rotation: Math.random() * Math.PI,
      })
    }

    function drawStar(cx: number, cy: number, size: number, alpha: number, rotation: number) {
      if (!ctx) return
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(rotation)
      ctx.globalAlpha = alpha

      // 4-point star
      const arms = 4
      ctx.beginPath()
      for (let i = 0; i < arms * 2; i++) {
        const angle = (i * Math.PI) / arms
        const r = i % 2 === 0 ? size : size * 0.2
        const x = Math.cos(angle) * r
        const y = Math.sin(angle) * r
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()

      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size)
      grad.addColorStop(0, '#FFFDE7')
      grad.addColorStop(0.3, '#E8D5A3')
      grad.addColorStop(1, '#C9A84C')
      ctx.fillStyle = grad
      ctx.fill()

      // Glow
      ctx.shadowColor = '#C9A84C'
      ctx.shadowBlur = size * 2
      ctx.fill()

      ctx.restore()
    }

    let frame = 0

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn new sparkles
      if (frame % 4 === 0) spawnSparkle()

      // Update and draw
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i]
        s.life++
        const progress = s.life / s.maxLife

        if (progress < 0.3) {
          s.alpha = progress / 0.3
        } else if (progress > 0.7) {
          s.alpha = (1 - progress) / 0.3
        } else {
          s.alpha = 1
        }

        s.y -= 0.3
        s.rotation += 0.02

        drawStar(s.x, s.y, s.size, s.alpha, s.rotation)

        if (s.life >= s.maxLife) sparkles.splice(i, 1)
      }

      frame++
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Canvas overlay */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: '-20px',
          width: 'calc(100% + 40px)',
          height: 'calc(100% + 40px)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
      {/* Text */}
      <span
        className="relative font-bold font-playfair"
        style={{
          background: 'linear-gradient(90deg, #C9A84C, #E8D5A3, #F5E6B8, #C9A84C, #A07830, #C9A84C)',
          backgroundSize: '300% auto',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'glitterMove 3s linear infinite',
        }}
      >
        {text}
      </span>

      <style>{`
        @keyframes glitterMove {
          0% { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
      `}</style>
    </div>
  )
}
