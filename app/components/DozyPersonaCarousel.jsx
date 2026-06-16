'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'

export default function DozyPersonaCarousel({ label, slides, inline = false }) {
  const [index, setIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)

  const count = slides?.length ?? 0
  const current = slides?.[index]

  const goTo = useCallback(
    (next) => {
      if (!count) return
      setIndex((next + count) % count)
    },
    [count],
  )

  if (!count || !current) return null

  if (inline) {
    return (
      <div className="w-full">
        {label ? (
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-dozy-accent">
            {label}
          </p>
        ) : null}

        <div
          onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStart === null) return
            const delta = e.changedTouches[0].clientX - touchStart
            if (Math.abs(delta) > 48) goTo(index + (delta < 0 ? 1 : -1))
            setTouchStart(null)
          }}
        >
          <div className="relative aspect-[4/3] w-full min-h-[360px] overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-sm sm:min-h-[420px]">
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-dozy-navy bg-dozy-navy text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-dozy-navy-mid hover:border-dozy-navy-mid"
              aria-label="Next persona"
            >
              →
            </button>
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain object-left p-1 sm:p-2"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority={index === 0}
            />
          </div>

          {current.quote ? (
            <p className="mt-3 w-full border-l-2 border-dozy-accent pl-3 text-sm font-medium leading-snug text-dozy-navy/80 sm:text-[15px]">
              &ldquo;{current.quote}&rdquo;
            </p>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div className="dozy-card overflow-hidden">
      {label ? (
        <p className="border-b border-neutral-100 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-dozy-accent">
          {label}
        </p>
      ) : null}

      <div
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart === null) return
          const delta = e.changedTouches[0].clientX - touchStart
          if (Math.abs(delta) > 48) goTo(index + (delta < 0 ? 1 : -1))
          setTouchStart(null)
        }}
      >
        <div className="bg-[#faf7f6] p-4 sm:p-6">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain object-center p-3 sm:p-4"
              sizes="(max-width: 768px) 100vw, 768px"
              priority={index === 0}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-neutral-100 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-sm text-neutral-500 transition-all duration-200 hover:border-dozy-accent hover:text-dozy-accent"
            aria-label="Previous persona"
          >
            ←
          </button>

          <div className="min-w-0 flex-1 text-center">
            <p className="truncate text-sm font-semibold text-dozy-navy sm:text-base">
              {current.name}
            </p>
            {current.role ? (
              <p className="mt-0.5 truncate text-xs text-neutral-400">{current.role}</p>
            ) : null}
            <div className="mt-3 flex justify-center gap-1.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === index
                      ? 'w-5 bg-dozy-accent'
                      : 'w-1.5 bg-neutral-200 hover:bg-blue-200'
                  }`}
                  aria-label={`Go to ${slide.name}`}
                  aria-current={i === index ? 'true' : undefined}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-sm text-neutral-500 transition-all duration-200 hover:border-dozy-accent hover:text-dozy-accent"
            aria-label="Next persona"
          >
            →
          </button>
        </div>
      </div>

      {current.quote ? (
        <blockquote className="border-t border-neutral-100 bg-dozy-blue-mist/50 px-5 py-5 sm:px-8">
          <p className="font-display text-base font-medium leading-snug text-dozy-navy sm:text-lg">
            &ldquo;{current.quote}&rdquo;
          </p>
        </blockquote>
      ) : null}
    </div>
  )
}
