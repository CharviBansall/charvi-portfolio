'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import {
  CARDS,
  PROJECTS,
  COURSES,
  SOCIALS,
  HERO_ROLES,
  cardShellClasses,
  getCardVisuals,
  projectHref,
} from '../data/cards'

import CardMedia from './CardMedia'
import HeroBreakout from './HeroBreakout'
import ProjectDetailModal from './ProjectDetailModal'

const Grainient = dynamic(() => import('./Grainient/Grainient'), { ssr: false })

const UMASS_RED = '#881C1C'

const STATUS_BADGE = {
  emerald: 'bg-emerald-500/20 text-emerald-400',
  orange: 'bg-orange-500/20 text-orange-500',
  blue: 'bg-blue-500/20 text-blue-300',
}

function Clock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'America/New_York',
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])
  return <span>{time}</span>
}

function heroArticle(role) {
  return /^[aeiou]/i.test(role) ? 'an' : 'a'
}

function HeroContent() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % HERO_ROLES.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const role = HERO_ROLES[roleIndex]

  return (
    <div className="relative flex h-full min-h-0 w-full flex-1 flex-col">
      <HeroBreakout className="absolute inset-0 z-[1]" />
      <div className="relative z-10 pt-[2.75rem] pointer-events-none sm:pt-[3.25rem] lg:pt-[3.75rem]">
        <h1 className="text-2xl font-normal leading-[1.15] tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl xl:text-5xl">
          Charvi is {heroArticle(role)}{' '}
          <span
            key={role}
            className="inline-block italic text-neutral-700 animate-fade-in"
          >
            {role}.
          </span>
        </h1>
      </div>
      <p className="relative z-10 mt-auto text-sm leading-relaxed text-neutral-600 sm:text-base lg:text-lg pointer-events-none">
        &ldquo;Give me a long enough lever and a fulcrum on which to place it and I
        will move the earth.&rdquo;
      </p>
    </div>
  )
}

function ProjectContent({ project }) {
  if (project.cardCover) {
    if (!project.openLink) return null

    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center pb-4 sm:pb-5">
        <span className="rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold tracking-wide text-neutral-900 shadow-sm backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
          Visit
        </span>
      </div>
    )
  }

  const isDark = project.textColor === 'text-white'
  const label = project.cardLabel ?? 'Project'

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <span
          className={`text-[10px] font-medium uppercase tracking-[0.18em] ${
            isDark ? 'text-white/40' : 'text-neutral-400'
          }`}
        >
          {label}
        </span>
        {!project.hideStatus && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              STATUS_BADGE[project.statusColor]
            }`}
          >
            {project.status}
          </span>
        )}
      </div>
      <div>
        <h2
          className={`text-xl font-semibold tracking-tight transition-all duration-300 group-hover:tracking-normal lg:text-2xl ${project.textColor}`}
        >
          {project.title}
        </h2>
        <p
          className={`mt-2 text-sm leading-snug ${
            isDark ? 'text-white/50' : 'text-neutral-500'
          }`}
        >
          {project.tagline}
          {project.link
            ? `. ${project.link.replace(/^https?:\/\/(www\.)?/, '')}`
            : null}
        </p>
      </div>
      <div
        className={`absolute bottom-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs
        opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200
        ${isDark ? 'bg-white/10 text-white' : 'bg-neutral-900/10 text-neutral-700'}`}
      >
        ↗
      </div>
    </>
  )
}

function ClockContent() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <p className="font-mono text-2xl font-medium tabular-nums text-neutral-900 sm:text-3xl">
        <Clock />
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-widest text-neutral-400">
        NY
      </p>
    </div>
  )
}

function PhotoContent({ card }) {
  if (!card.title) return null

  return (
    <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-white via-white/90 to-transparent px-4 pb-8 pt-4">
      <p className="font-sans text-sm font-semibold tracking-tight text-neutral-700 sm:text-base">
        {card.title}
      </p>
    </div>
  )
}

function QuoteContent() {
  return (
    <>
      <div className="font-display text-3xl font-semibold leading-[0.92] tracking-tight text-neutral-800 transition-transform duration-300 group-hover:scale-[1.02] origin-left sm:text-4xl lg:text-[2.75rem] lg:leading-[0.9]">
        <span className="block">do</span>
        <span className="block">what</span>
        <span className="block">excites</span>
      </div>
      <span className="text-xs text-neutral-400">— Kelly Wakasa</span>
    </>
  )
}

function CourseworkContent({ courses, hoveredCourse, onHoverCourse }) {
  const list = courses ?? COURSES

  if (!list.length) return null

  return (
    <>
      <span className="text-[10px] sm:text-xs font-medium text-neutral-400 uppercase tracking-widest">
        Coursework
      </span>
      <div className="flex flex-wrap gap-1 sm:gap-1.5 content-end">
        {list.map((c) => (
          <span
            key={c}
            onMouseEnter={() => onHoverCourse(c)}
            onMouseLeave={() => onHoverCourse(null)}
            className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full transition-colors duration-200 cursor-default ${
              hoveredCourse === c
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {c}
          </span>
        ))}
      </div>
    </>
  )
}

function EducationContent() {
  return (
    <>
      <span
        className="absolute top-3 right-3 z-20 rounded-full px-2.5 py-1 font-sans text-xs font-semibold tabular-nums backdrop-blur-sm sm:top-4 sm:right-4"
        style={{ backgroundColor: 'rgba(136, 28, 28, 0.08)', color: UMASS_RED }}
      >
        2028
      </span>
      <div className="flex h-full min-h-0 items-center gap-3 pr-12 sm:gap-4 sm:pr-14">
        <div className="relative h-14 w-14 shrink-0 sm:h-[4.5rem] sm:w-[4.5rem]">
          <Image
            src="/images/umass-seal.png"
            alt="University of Massachusetts seal"
            fill
            className="object-contain"
            sizes="72px"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
          <span className="font-sans text-[10px] font-medium uppercase tracking-widest text-[#881C1C]/70 sm:text-xs">
            Education
          </span>
          <h2
            className="font-sans text-sm font-semibold leading-snug sm:text-base"
            style={{ color: UMASS_RED }}
          >
            University of Massachusetts Amherst
          </h2>
          <p className="font-sans text-xs sm:text-sm" style={{ color: UMASS_RED }}>
            B.S. Biomedical Engineering
          </p>
        </div>
      </div>
    </>
  )
}

function ConnectContent() {
  return (
    <>
      <span className="text-xs text-neutral-400 uppercase tracking-widest">
        Connect
      </span>
      <div className="flex flex-col gap-1">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
          >
            <span className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center text-xs font-medium shrink-0">
              {s.icon}
            </span>
            {s.label}
          </a>
        ))}
      </div>
    </>
  )
}

function CardContent({ card, project, hoveredCourse, onHoverCourse }) {
  switch (card.type) {
    case 'hero':
      return <HeroContent />
    case 'project':
      return project ? <ProjectContent project={project} /> : null
    case 'clock':
      return <ClockContent />
    case 'quote':
      return <QuoteContent />
    case 'coursework':
      return (
        <CourseworkContent
          courses={card.courses}
          hoveredCourse={hoveredCourse}
          onHoverCourse={onHoverCourse}
        />
      )
    case 'education':
      return <EducationContent />
    case 'connect':
      return <ConnectContent />
    case 'photo':
      return <PhotoContent card={card} />
    case 'empty':
      return null
    default:
      return null
  }
}

function BentoCard({
  card,
  project,
  image,
  logo,
  hoveredCourse,
  onHoverCourse,
  onProjectClick,
  sectionRef,
}) {
  const shell = cardShellClasses(card, project)
  const projectStyles =
    card.type === 'project' && project && !project.cardCover
      ? `${project.bg ?? ''} ${project.textColor ?? ''}`
      : ''

  const anchorProps = card.sectionAnchor
    ? { id: card.sectionAnchor, ref: sectionRef }
    : {}

  const coverBgStyle = {
    ...(card.bgColor ? { backgroundColor: card.bgColor } : {}),
    ...(project?.cardCover && project?.cardCoverBg
      ? { backgroundColor: project.cardCoverBg }
      : {}),
  }
  const hasBgStyle = Object.keys(coverBgStyle).length > 0

  const externalHref =
    card.openLink && card.link
      ? projectHref(card.link)
      : card.clickable && project?.openLink
        ? projectHref(project.link)
        : null

  const caseStudyHref =
    card.clickable && project?.caseStudyId
      ? `/projects/${project.caseStudyId}`
      : null

  const className = `${shell} ${projectStyles}`.trim()
  const children = (
    <>
      {card.type === 'hero' ? (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Grainient
            color1="#faf9f7"
            color2="#edecea"
            color3="#e6e4ef"
            timeSpeed={0.15}
            colorBalance={0.05}
            warpStrength={0.65}
            warpFrequency={4}
            warpSpeed={1.2}
            warpAmplitude={60}
            blendAngle={12}
            blendSoftness={0.12}
            rotationAmount={320}
            noiseScale={1.5}
            grainAmount={0.05}
            grainScale={2}
            grainAnimated={false}
            contrast={1.12}
            gamma={1.05}
            saturation={0.72}
            centerX={0}
            centerY={0}
            zoom={0.95}
          />
        </div>
      ) : null}
      <CardMedia image={image} logo={logo} />
      {(!project?.cardCover && card.type !== 'photo') ||
      (card.type === 'photo' && card.title) ||
      (project?.cardCover && project?.openLink) ? (
        <div
          className={`z-10 ${
            project?.cardCover
              ? 'pointer-events-none absolute inset-0'
              : `relative flex min-h-0 flex-1 flex-col ${
                  card.type === 'clock'
                    ? 'items-center justify-center'
                    : 'justify-between'
                } ${card.type === 'photo' ? 'pointer-events-none' : ''}`
          }`}
        >
          <CardContent
            card={card}
            project={project}
            hoveredCourse={hoveredCourse}
            onHoverCourse={onHoverCourse}
          />
        </div>
      ) : null}
    </>
  )

  if (caseStudyHref) {
    return (
      <Link
        {...anchorProps}
        href={caseStudyHref}
        className={className}
        style={hasBgStyle ? coverBgStyle : undefined}
        aria-label={`Read more about ${project.title}`}
      >
        {children}
      </Link>
    )
  }

  if (externalHref) {
    return (
      <a
        {...anchorProps}
        href={externalHref}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={hasBgStyle ? coverBgStyle : undefined}
        aria-label={
          project
            ? `Open ${project.title} — ${project.link}`
            : `Open ${card.title ?? card.id} — ${card.link}`
        }
      >
        {children}
      </a>
    )
  }

  return (
    <div
      {...anchorProps}
      onClick={
        card.clickable && project && !project.caseStudyId
          ? () => onProjectClick(project)
          : undefined
      }
      className={className}
      style={hasBgStyle ? coverBgStyle : undefined}
      aria-hidden={card.ariaHidden || undefined}
      role={card.clickable ? 'button' : undefined}
    >
      {children}
    </div>
  )
}

export default function BentoGrid({ workRef, contactRef }) {
  const [modalProject, setModalProject] = useState(null)
  const [hoveredCourse, setHoveredCourse] = useState(null)

  const sectionRefs = {
    work: workRef,
    contact: contactRef,
  }

  return (
    <>
      <div className="bento-grid">
        {CARDS.map((card) => {
          const project = card.projectId ? PROJECTS[card.projectId] : null
          const sectionRef = card.sectionAnchor
            ? sectionRefs[card.sectionAnchor]
            : undefined
          const visuals = getCardVisuals(card, project)

          return (
            <BentoCard
              key={card.id}
              card={card}
              project={project}
              image={visuals.image}
              logo={visuals.logo}
              hoveredCourse={hoveredCourse}
              onHoverCourse={setHoveredCourse}
              onProjectClick={setModalProject}
              sectionRef={sectionRef}
            />
          )
        })}
      </div>

      {modalProject && (
        <ProjectDetailModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </>
  )
}
