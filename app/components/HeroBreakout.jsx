'use client'

import { useCallback, useEffect, useRef } from 'react'

const HI_SCORE_KEY = 'charvi-breakout-hi'
const BRICK_COLS = 10
const BRICK_GAP = 2
const MAX_BRICK_ROWS = 5
const ROW_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6']
const ROW_COLORS_DARK = ['#b91c1c', '#c2410c', '#a16207', '#15803d', '#1d4ed8']
const ROW_POINTS = [7, 6, 5, 4, 3]
const BALL_RADIUS = 5
const STARTING_LIVES = 3
const BASE_BALL_SPEED = 4.2
const SPEED_PER_LEVEL = 0.38
const MAX_BALL_SPEED = 9
const LEVEL_BONUS = 25

function loadHiScore() {
  try {
    return Number(localStorage.getItem(HI_SCORE_KEY)) || 0
  } catch {
    return 0
  }
}

function saveHiScore(score) {
  try {
    localStorage.setItem(HI_SCORE_KEY, String(score))
  } catch {
    // ignore storage errors
  }
}

function getLevelConfig(level) {
  const lv = Math.max(1, level)
  return {
    ballSpeed: Math.min(MAX_BALL_SPEED, BASE_BALL_SPEED + (lv - 1) * SPEED_PER_LEVEL),
    maxBallSpeed: Math.min(10, 7.2 + (lv - 1) * 0.3),
    paddleScale: Math.max(0.62, 1 - (lv - 1) * 0.04),
    brickRows: Math.min(MAX_BRICK_ROWS, 4 + Math.floor((lv - 1) / 2)),
    topRowHits: lv >= 4 ? 2 : 1,
  }
}

function buildBricks(width, top, brickH, level) {
  const { brickRows, topRowHits } = getLevelConfig(level)
  const bricks = []
  const totalGap = BRICK_GAP * (BRICK_COLS + 1)
  const colW = (width - totalGap) / BRICK_COLS

  for (let row = 0; row < brickRows; row += 1) {
    for (let col = 0; col < BRICK_COLS; col += 1) {
      const hits = row === 0 ? topRowHits : 1
      bricks.push({
        x: BRICK_GAP + col * (colW + BRICK_GAP),
        y: top + row * (brickH + BRICK_GAP),
        w: colW,
        h: brickH,
        alive: true,
        hits,
        maxHits: hits,
        color: ROW_COLORS[row % ROW_COLORS.length],
        darkColor: ROW_COLORS_DARK[row % ROW_COLORS_DARK.length],
        points: ROW_POINTS[row % ROW_POINTS.length] + Math.floor(level / 3),
      })
    }
  }

  return bricks
}

export default function HeroBreakout({ className = '' }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const activeRef = useRef(false)
  const pointerXRef = useRef(null)
  const rafRef = useRef(0)
  const stateRef = useRef({
    width: 300,
    height: 96,
    started: false,
    gameOver: false,
    levelCleared: false,
    level: 1,
    score: 0,
    hiScore: 0,
    lives: STARTING_LIVES,
    paddle: { x: 120, w: 52, h: 5 },
    ball: { x: 146, y: 80, vx: 0, vy: 0, r: BALL_RADIUS, stuck: true },
    bricks: [],
    brickH: 8,
    topPad: 18,
  })

  const applyPaddleForLevel = useCallback((s) => {
    const { width, height, level } = s
    const { paddleScale } = getLevelConfig(level)
    const paddleW = Math.max(34, width * 0.16 * paddleScale)
    const paddleY = height - 8
    const center = s.paddle.x + s.paddle.w / 2
    s.paddle.w = paddleW
    s.paddle.y = paddleY
    s.paddle.h = 5
    s.paddle.x = Math.max(0, Math.min(width - paddleW, center - paddleW / 2))
  }, [])

  const resetRound = useCallback(
    (keepProgress = false) => {
      const s = stateRef.current
      const { width, height, topPad, brickH } = s
      const level = keepProgress ? s.level : 1
      const paddleW = Math.max(34, width * 0.16 * getLevelConfig(level).paddleScale)
      const paddleY = height - 8
      const paddleX = width / 2 - paddleW / 2

      s.started = false
      s.gameOver = false
      s.levelCleared = false
      s.level = level
      if (!keepProgress) {
        s.score = 0
        s.lives = STARTING_LIVES
      }
      s.paddle = { x: paddleX, w: paddleW, h: 5, y: paddleY }
      s.ball = {
        x: paddleX + paddleW / 2,
        y: paddleY - BALL_RADIUS - 1,
        vx: 0,
        vy: 0,
        r: BALL_RADIUS,
        stuck: true,
      }
      s.bricks = buildBricks(width, topPad, brickH, s.level)
      pointerXRef.current = paddleX + paddleW / 2
    },
    []
  )

  const resetBall = useCallback(() => {
    const s = stateRef.current
    const { paddle } = s
    s.ball = {
      x: paddle.x + paddle.w / 2,
      y: paddle.y - BALL_RADIUS - 1,
      vx: 0,
      vy: 0,
      r: BALL_RADIUS,
      stuck: true,
    }
  }, [])

  const advanceLevel = useCallback(() => {
    const s = stateRef.current
    s.score += s.level * LEVEL_BONUS
    s.level += 1
    s.levelCleared = true
    applyPaddleForLevel(s)
    s.bricks = buildBricks(s.width, s.topPad, s.brickH, s.level)
    resetBall()
    if (s.score > s.hiScore) {
      s.hiScore = s.score
      saveHiScore(s.score)
    }
  }, [applyPaddleForLevel, resetBall])

  const launchBall = useCallback(() => {
    const s = stateRef.current
    const { ballSpeed } = getLevelConfig(s.level)
    const angle = (Math.random() * 0.5 + 0.25) * Math.PI
    s.ball.vx = Math.cos(angle) * ballSpeed * (Math.random() > 0.5 ? 1 : -1)
    s.ball.vy = -Math.sin(angle) * ballSpeed
    s.ball.stuck = false
  }, [])

  const launchOrRestart = useCallback(() => {
    const s = stateRef.current
    if (s.gameOver) {
      resetRound(false)
      return
    }
    if (s.levelCleared) {
      s.levelCleared = false
      s.started = true
      launchBall()
      return
    }
    if (!s.started) s.started = true
    if (s.ball.stuck) launchBall()
  }, [launchBall, resetRound])

  useEffect(() => {
    stateRef.current.hiScore = loadHiScore()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.floor(rect.width))
      const h = Math.max(1, Math.floor(rect.height))
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const s = stateRef.current
      s.width = w
      s.height = h
      s.brickH = Math.max(6, Math.floor(h * 0.052))
      s.topPad = 4
      resetRound(true)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    const tick = () => {
      const s = stateRef.current
      const { width, height, paddle, ball, bricks, level } = s
      const { maxBallSpeed } = getLevelConfig(level)
      const running =
        s.started && !s.gameOver && !s.levelCleared && activeRef.current

      if (pointerXRef.current != null) {
        paddle.x = Math.max(
          0,
          Math.min(width - paddle.w, pointerXRef.current - paddle.w / 2)
        )
      }

      if (ball.stuck) {
        ball.x = paddle.x + paddle.w / 2
        ball.y = paddle.y - ball.r - 1
      }

      if (running && !ball.stuck) {
        ball.x += ball.vx
        ball.y += ball.vy

        if (ball.x - ball.r <= 0) {
          ball.x = ball.r
          ball.vx = Math.abs(ball.vx)
        } else if (ball.x + ball.r >= width) {
          ball.x = width - ball.r
          ball.vx = -Math.abs(ball.vx)
        }

        if (ball.y - ball.r <= 0) {
          ball.y = ball.r
          ball.vy = Math.abs(ball.vy)
        }

        if (
          ball.vy > 0 &&
          ball.y + ball.r >= paddle.y &&
          ball.y + ball.r <= paddle.y + paddle.h + ball.r &&
          ball.x >= paddle.x &&
          ball.x <= paddle.x + paddle.w
        ) {
          const hit = (ball.x - paddle.x) / paddle.w - 0.5
          const speed = Math.min(maxBallSpeed, Math.hypot(ball.vx, ball.vy) * 1.02)
          ball.vx = hit * speed * 1.4
          ball.vy = -Math.abs(speed)
          ball.y = paddle.y - ball.r - 0.5
        }

        if (ball.y - ball.r > height) {
          s.lives -= 1
          if (s.lives <= 0) {
            s.gameOver = true
          } else {
            resetBall()
          }
        }

        for (const brick of bricks) {
          if (!brick.alive) continue
          if (
            ball.x + ball.r > brick.x &&
            ball.x - ball.r < brick.x + brick.w &&
            ball.y + ball.r > brick.y &&
            ball.y - ball.r < brick.y + brick.h
          ) {
            if (brick.hits > 1) {
              brick.hits -= 1
              brick.color = brick.darkColor
            } else {
              brick.alive = false
              s.score += brick.points
            }

            const overlapLeft = ball.x + ball.r - brick.x
            const overlapRight = brick.x + brick.w - (ball.x - ball.r)
            const overlapTop = ball.y + ball.r - brick.y
            const overlapBottom = brick.y + brick.h - (ball.y - ball.r)
            const minOverlap = Math.min(
              overlapLeft,
              overlapRight,
              overlapTop,
              overlapBottom
            )

            if (minOverlap === overlapLeft || minOverlap === overlapRight) {
              ball.vx *= -1
            } else {
              ball.vy *= -1
            }
          }
        }

        if (bricks.every((b) => !b.alive)) {
          advanceLevel()
        }
      }

      if (s.gameOver && s.score > s.hiScore) {
        s.hiScore = s.score
        saveHiScore(s.score)
      }

      ctx.clearRect(0, 0, width, height)

      for (const brick of bricks) {
        if (!brick.alive) continue
        ctx.fillStyle = brick.color
        ctx.fillRect(brick.x, brick.y, brick.w, brick.h)
      }

      ctx.fillStyle = '#525252'
      ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h)

      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2)
      ctx.fill()

      ctx.font = '600 10px ui-monospace, monospace'
      ctx.fillStyle = 'rgba(115, 115, 115, 0.9)'
      const pad = 6
      for (let i = 0; i < STARTING_LIVES; i += 1) {
        ctx.beginPath()
        ctx.arc(pad + 4 + i * 12, 12, 3.5, 0, Math.PI * 2)
        if (i < s.lives) {
          ctx.fill()
        } else {
          ctx.strokeStyle = 'rgba(163, 163, 163, 0.45)'
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      const levelText = `LV ${String(s.level).padStart(2, '0')}`
      ctx.fillText(levelText, width * 0.5 - ctx.measureText(levelText).width / 2, 12)

      const scoreText = String(s.score).padStart(4, '0')
      const hiText = `HI ${String(s.hiScore).padStart(4, '0')}`
      const scoreW = ctx.measureText(scoreText).width
      const hiW = ctx.measureText(hiText).width
      ctx.fillText(scoreText, width - pad - scoreW, 12)
      if (s.hiScore > 0 || s.started) {
        ctx.fillText(hiText, width - pad - scoreW - 8 - hiW, 12)
      }

      if (ball.stuck && !s.gameOver && !s.levelCleared) {
        ctx.fillStyle = 'rgba(115, 115, 115, 0.75)'
        ctx.fillText('tap to launch', width * 0.5 - 38, paddle.y - 10)
      } else if (s.levelCleared) {
        ctx.fillStyle = 'rgba(38, 38, 38, 0.72)'
        ctx.fillText(`level ${s.level}`, width * 0.5 - 28, paddle.y - 10)
        ctx.fillStyle = 'rgba(115, 115, 115, 0.75)'
        ctx.fillText('tap to continue', width * 0.5 - 42, paddle.y + 8)
      } else if (s.gameOver) {
        ctx.fillStyle = 'rgba(38, 38, 38, 0.72)'
        ctx.fillText('tap to retry', width * 0.5 - 36, paddle.y - 10)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const io = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    io.observe(container)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      io.disconnect()
    }
  }, [advanceLevel, resetBall, resetRound])

  const setPointer = useCallback((clientX) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    pointerXRef.current = clientX - rect.left
  }, [])

  return (
    <div
      ref={containerRef}
      className={`cursor-pointer select-none ${className || 'relative mt-3 h-20 w-full shrink-0 sm:mt-4 sm:h-24 lg:h-[6.5rem]'}`}
      onPointerDown={(e) => {
        e.preventDefault()
        setPointer(e.clientX)
        launchOrRestart()
      }}
      onPointerMove={(e) => setPointer(e.clientX)}
      onPointerEnter={(e) => setPointer(e.clientX)}
      role="application"
      aria-label="Mini Breakout game. Move paddle and tap to launch the ball."
    >
      <canvas ref={canvasRef} className="block h-full w-full touch-none" />
    </div>
  )
}
