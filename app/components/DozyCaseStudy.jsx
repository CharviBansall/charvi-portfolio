'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DozyPersonaCarousel from './DozyPersonaCarousel'

const NAV_ITEMS = [
  { id: 'problem', label: 'Problem' },
  { id: 'research', label: 'Research & Insights' },
  { id: 'exploration', label: 'Exploration' },
  { id: 'reflection', label: 'Reflection' },
]

function useSectionSpy(sectionIds) {
  const [active, setActive] = useState('hero')
  const refs = useRef({})

  useEffect(() => {
    const elements = sectionIds
      .map((id) => refs.current[id])
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -45% 0px', threshold: [0, 0.2, 0.5] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  return { active, refs }
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${className} ${
        visible ? 'animate-dozy-reveal opacity-100' : 'opacity-0 translate-y-6'
      }`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {children}
    </div>
  )
}

function StoryHeadline({ title, light = false }) {
  const lines = title.split(/(?<=\.)\s+/).filter(Boolean)

  return (
    <h2
      className={`font-display text-[1.75rem] font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl ${
        light ? 'text-white' : 'text-dozy-navy'
      }`}
    >
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h2>
  )
}

function Eyebrow({ children, light = false }) {
  return (
    <p
      className={
        light
          ? 'text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-200/80'
          : 'dozy-tag'
      }
    >
      {children}
    </p>
  )
}

function BodyText({ children, light = false, className = '' }) {
  return (
    <p
      className={`max-w-xl text-base leading-relaxed sm:text-lg ${
        light ? 'text-blue-100/75' : 'text-neutral-500'
      } ${className}`}
    >
      {children}
    </p>
  )
}

function VisualPlaceholder({ label, aspect = 'wide', className = '' }) {
  const aspectClass =
    aspect === 'phone'
      ? 'aspect-[9/19] max-w-[200px]'
      : aspect === 'square'
        ? 'aspect-square'
        : 'aspect-[16/10]'

  return (
    <div
      className={`dozy-card flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-dozy-blue-mist to-white p-8 ${aspectClass} ${className}`}
    >
      <span className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-dozy-navy-mid/40">
        {label}
      </span>
    </div>
  )
}

function SectionImage({ image, className = '', compact = false }) {
  if (!image?.src) return null

  const width = image.width ?? 1600
  const height = image.height ?? 1000

  return (
    <figure
      className={`dozy-card overflow-hidden ${compact ? 'p-1.5' : 'p-2 sm:p-3'} ${className}`}
    >
      <div
        className={`flex justify-center overflow-hidden rounded-xl bg-neutral-100/80 ${
          compact ? 'p-2' : 'rounded-2xl p-3 sm:p-4'
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={width}
          height={height}
          className="h-auto w-full max-w-full object-contain"
          sizes={compact ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 1200px'}
        />
      </div>
      {image.caption ? (
        <figcaption className={`px-1 ${compact ? 'mt-2' : 'mt-3 px-2'}`}>
          <span
            className={`font-semibold uppercase tracking-[0.18em] text-neutral-400 ${
              compact ? 'text-[9px] leading-snug' : 'text-[11px]'
            }`}
          >
            {image.caption}
          </span>
        </figcaption>
      ) : null}
    </figure>
  )
}

function DeviceStrip({ images, light = false, lightFrames = false, className = '' }) {
  if (!images?.length) return null

  const frameClass = light
    ? 'border-white/15 bg-black/20 shadow-black/30'
    : lightFrames
      ? 'border-neutral-200/80 bg-white shadow-neutral-200/40'
      : 'border-neutral-200/80 bg-neutral-900 shadow-neutral-200/50'

  return (
    <div
      className={`flex flex-wrap items-end justify-center gap-3 sm:gap-4 lg:gap-5 ${className}`}
    >
      {images.map((image) => {
        const isWatch = image.device === 'watch'

        return (
          <figure
            key={image.src}
            className={`group ${
              isWatch
                ? 'w-[26%] min-w-[88px] max-w-[130px] sm:max-w-[150px]'
                : 'w-[28%] min-w-[96px] max-w-[200px] flex-1'
            }`}
          >
            <div
              className={`overflow-hidden border shadow-lg transition-transform duration-300 group-hover:scale-[1.03] ${
                isWatch ? 'rounded-[1.35rem]' : 'rounded-[1.75rem]'
              } ${frameClass}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={isWatch ? 368 : 390}
                height={isWatch ? 448 : 844}
                className="h-auto w-full"
                sizes={isWatch ? '130px' : '(max-width: 640px) 28vw, 200px'}
              />
            </div>
            {image.caption ? (
              <figcaption
                className={`mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] ${
                  light ? 'text-blue-200/60' : 'text-neutral-400'
                }`}
              >
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        )
      })}
    </div>
  )
}

function FindingsCard({ findings }) {
  if (!findings?.items?.length) return null

  return (
    <div className="dozy-card p-6 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dozy-accent">
        {findings.label}
      </p>
      <ol className="mt-5 space-y-3">
        {findings.items.map((item, i) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-neutral-600 sm:text-base"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dozy-blue-mist text-xs font-bold text-dozy-accent">
              {i + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </div>
  )
}

function OpportunityCard({ designOpportunity }) {
  if (!designOpportunity?.items?.length) return null

  return (
    <div className="dozy-card bg-gradient-to-br from-dozy-navy to-dozy-navy-mid p-6 text-white sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200/70">
        {designOpportunity.label}
      </p>
      <ul className="mt-5 space-y-3">
        {designOpportunity.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 text-base font-medium text-white/90 sm:text-lg"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-300" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function DozyNav({ active, onNavigate }) {
  return (
    <nav className="sticky top-4 z-50 mb-10 flex flex-wrap items-center gap-2 sm:gap-3">
      <Link
        href="/"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white shadow-sm transition-transform duration-200 hover:scale-105"
        aria-label="Back to home"
      >
        C
      </Link>
      <div className="flex flex-1 flex-wrap items-center gap-1 rounded-full border border-neutral-200/60 bg-white/85 px-2 py-1.5 shadow-sm backdrop-blur-md">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`nav-pill text-xs sm:text-sm ${
              active === item.id
                ? 'bg-dozy-navy text-white shadow-sm'
                : 'text-neutral-500 hover:bg-dozy-blue-mist hover:text-dozy-navy'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <a
        href="https://www.appdozy.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-dozy-navy shadow-sm transition-all duration-200 hover:border-dozy-accent hover:text-dozy-accent"
      >
        appdozy.com ↗
      </a>
    </nav>
  )
}

export default function DozyCaseStudy({ project, page }) {
  const sectionIds = useMemo(
    () => ['hero', ...NAV_ITEMS.map((n) => n.id)],
    [],
  )
  const { active, refs } = useSectionSpy(sectionIds)

  const byId = Object.fromEntries(page.sections.map((s) => [s.id, s]))
  const problem = byId.problem
  const competitive = byId['competitive-research']
  const research = byId.research
  const exploration = byId['design-exploration']
  const reflection = byId.reflection

  const scrollTo = (id) => {
    refs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="min-h-screen w-full px-4 pb-20 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
      <DozyNav active={active} onNavigate={scrollTo} />

      {/* Hero */}
      <section
        id="hero"
        ref={(el) => {
          refs.current.hero = el
        }}
        className="mb-20 sm:mb-28"
      >
        <Reveal>
          <div className="dozy-gradient relative overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-300/10 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
              <div>
                <Eyebrow light>{project.cardLabel ?? 'Product design · iOS · Health'}</Eyebrow>
                <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.06] tracking-tight text-white sm:text-4xl lg:text-[3.25rem]">
                  {page.heroTitle}
                </h1>
                <BodyText light className="mt-5">
                  {page.heroSubtitle}
                </BodyText>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-dozy-navy transition-all duration-200 hover:bg-blue-50 hover:shadow-md"
                  >
                    Visit appdozy.com ↗
                  </a>
                ) : null}
                <dl className="mt-8 flex flex-wrap gap-3">
                  {[
                    { label: 'Role', value: page.meta.role },
                    { label: 'Timeline', value: page.meta.timeline },
                    { label: 'Focus', value: page.meta.focus },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm transition-colors duration-200 hover:bg-white/15"
                    >
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200/70">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-white/90">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <DeviceStrip images={page.heroImages} light />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Problem */}
      <section
        id="problem"
        ref={(el) => {
          refs.current.problem = el
        }}
        className="mb-20 scroll-mt-28 sm:mb-28"
      >
        <Reveal>
          <Eyebrow>{problem?.eyebrow}</Eyebrow>
          <StoryHeadline title={problem?.title ?? ''} />
        </Reveal>

        <Reveal className="mt-8 sm:mt-10" delay={80}>
          {problem?.competitorImages?.length ? (
            <div className="dozy-card overflow-hidden p-4 sm:p-6">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-dozy-accent">
                What exists today
              </p>
              <DeviceStrip images={problem.competitorImages} lightFrames />
            </div>
          ) : problem?.placeholders?.[0] ? (
            <VisualPlaceholder
              label={problem.placeholders[0].label}
              aspect={problem.placeholders[0].aspect}
            />
          ) : null}
        </Reveal>

        <Reveal className="mt-6 sm:mt-8" delay={120}>
          <BodyText>{problem?.paragraphs?.[0]}</BodyText>
        </Reveal>

        {competitive ? (
          <Reveal className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8" delay={160}>
            <div className="dozy-card p-6 sm:p-8">
              <Eyebrow>{competitive.eyebrow}</Eyebrow>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-dozy-navy sm:text-2xl">
                {competitive.title}
              </h3>
              <BodyText className="mt-4">{competitive.paragraphs?.[0]}</BodyText>
            </div>
            <OpportunityCard designOpportunity={competitive.designOpportunity} />
          </Reveal>
        ) : null}
      </section>

      {/* Research */}
      <section
        id="research"
        ref={(el) => {
          refs.current.research = el
        }}
        className="mb-20 scroll-mt-28 sm:mb-28"
      >
        <Reveal>
          <Eyebrow>{research?.eyebrow}</Eyebrow>
          <StoryHeadline title={research?.title ?? ''} />
        </Reveal>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-8">
          <Reveal delay={80}>
            {research?.personaCarousel ? (
              <DozyPersonaCarousel
                label={research.personaCarousel.label}
                slides={research.personaCarousel.slides}
                inline
              />
            ) : null}
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col justify-center gap-6">
              <FindingsCard findings={research?.findings} />
              <FindingsCard findings={research?.insights} />
            </div>
          </Reveal>
        </div>

        {research?.placeholders?.length ? (
          <Reveal className="mt-8 grid grid-cols-2 gap-4 lg:max-w-2xl" delay={160}>
            {research.placeholders.map((ph) => (
              <VisualPlaceholder key={ph.label} label={ph.label} aspect={ph.aspect} />
            ))}
          </Reveal>
        ) : null}
      </section>

      {/* Exploration */}
      <section
        id="exploration"
        ref={(el) => {
          refs.current.exploration = el
        }}
        className="mb-20 scroll-mt-28 sm:mb-28"
      >
        <Reveal>
          <div className="w-full">
            <Eyebrow>{exploration?.eyebrow}</Eyebrow>
            <StoryHeadline title={exploration?.title ?? ''} />
            <div className="mt-5 space-y-3 sm:mt-6">
              {exploration?.paragraphs?.map((p) => (
                <BodyText key={p.slice(0, 32)} className="!max-w-none w-full text-pretty">
                  {p}
                </BodyText>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-6 grid gap-4 md:grid-cols-2" delay={80}>
          {exploration?.image ? (
            <SectionImage image={exploration.image} compact />
          ) : null}
          {exploration?.mindMapImage ? (
            <SectionImage image={exploration.mindMapImage} compact />
          ) : null}
        </Reveal>

        <Reveal className="mt-4 grid gap-3 sm:grid-cols-3" delay={120}>
          {exploration?.placeholders?.map((ph) => (
            <VisualPlaceholder key={ph.label} label={ph.label} aspect="square" />
          ))}
        </Reveal>
      </section>

      {/* Reflection */}
      <section
        id="reflection"
        ref={(el) => {
          refs.current.reflection = el
        }}
        className="scroll-mt-28"
      >
        <Reveal>
          <div className="dozy-card overflow-hidden">
            <div className="dozy-gradient px-6 py-10 sm:px-10 sm:py-12">
              <Eyebrow light>{reflection?.eyebrow}</Eyebrow>
              <StoryHeadline title={reflection?.title ?? ''} light />
            </div>
            <div className="p-6 sm:p-10">
              {reflection?.points?.length ? (
                <div className="space-y-8">
                  {reflection.points.map((point) => (
                    <div key={point.lead}>
                      <p className="font-display text-lg font-semibold leading-snug text-dozy-navy sm:text-xl">
                        {point.lead}
                      </p>
                      <BodyText className="mt-3 !max-w-none">{point.body}</BodyText>
                    </div>
                  ))}
                </div>
              ) : (
                <BodyText>{reflection?.paragraphs?.[0]}</BodyText>
              )}
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full bg-dozy-navy px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-dozy-navy-mid hover:shadow-md"
                >
                  ← Back to portfolio
                </Link>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-dozy-navy transition-all duration-200 hover:border-dozy-accent hover:text-dozy-accent"
                  >
                    Visit Dozy ↗
                  </a>
                ) : null}
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="chip border border-blue-100 bg-dozy-blue-mist text-dozy-navy-mid"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="mt-12 text-center">
        <p className="text-xs text-neutral-400">
          built with care & caffeine · © {new Date().getFullYear()} Charvi
        </p>
      </footer>
    </main>
  )
}
