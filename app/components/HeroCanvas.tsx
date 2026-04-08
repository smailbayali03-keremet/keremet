'use client'

import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let time = 0

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Particles
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }))

    // Orbs
    const orbs = [
      { x: 0.3, y: 0.4, r: 0.25, color: 'rgba(201,168,76,', speed: 0.0008 },
      { x: 0.7, y: 0.6, r: 0.2, color: 'rgba(160,120,48,', speed: 0.0012 },
      { x: 0.5, y: 0.2, r: 0.15, color: 'rgba(232,213,163,', speed: 0.001 },
    ]

    function draw() {
      if (!canvas || !ctx) return
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      time += 1

      // Background
      const bg = ctx.createLinearGradient(0, 0, W, H)
      bg.addColorStop(0, '#0D0D0B')
      bg.addColorStop(0.5, '#151510')
      bg.addColorStop(1, '#0A0A08')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // Orbs (soft glowing blobs)
      orbs.forEach((orb, i) => {
        const ox = W * orb.x + Math.sin(time * orb.speed * 1000 + i) * W * 0.08
        const oy = H * orb.y + Math.cos(time * orb.speed * 1000 + i * 2) * H * 0.06
        const radius = Math.min(W, H) * orb.r
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, radius)
        grad.addColorStop(0, orb.color + '0.12)')
        grad.addColorStop(0.5, orb.color + '0.05)')
        grad.addColorStop(1, orb.color + '0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(ox, oy, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Grid lines
      ctx.strokeStyle = 'rgba(201,168,76,0.04)'
      ctx.lineWidth = 1
      const gridSize = 80
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
        ctx.stroke()
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }

      // Wave lines
      for (let j = 0; j < 4; j++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(201,168,76,${0.04 + j * 0.02})`
        ctx.lineWidth = 1
        for (let x = 0; x <= W; x += 4) {
          const y = H * (0.3 + j * 0.12) +
            Math.sin((x / W) * Math.PI * 4 + time * 0.012 + j) * 30 +
            Math.sin((x / W) * Math.PI * 2 + time * 0.008) * 20
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Particles
      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        const pulse = 0.5 + 0.5 * Math.sin(time * 0.02 + p.x)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${p.alpha * pulse})`
        ctx.fill()
      })

      // Vignette
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.7)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  )
}
