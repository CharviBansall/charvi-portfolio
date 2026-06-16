import {
  resolveTransitionClass,
  TRANSITION_PRESETS,
  ENTER_PRESETS,
} from './card-visuals'

/** @typedef {'hero' | 'project' | 'clock' | 'quote' | 'coursework' | 'education' | 'connect' | 'empty' | 'photo'} CardType */

/**
 * @typedef {Object} CardImage
 * @property {string} src - Path under /public, e.g. '/images/photo.jpg'
 * @property {string} [alt]
 * @property {'background' | 'cover' | 'top'} [position] - background = full-bleed behind text
 * @property {string} [className] - Extra Tailwind on the <Image>
 * @property {boolean} [priority] - Next.js LCP priority
 */

/**
 * @typedef {Object} CardLogo
 * @property {string} src
 * @property {string} [alt]
 * @property {'sm' | 'md' | 'lg'} [size]
 * @property {'top-left' | 'top-right' | 'bottom-right'} [position]
 * @property {number} [width] - Passed to next/image
 * @property {number} [height]
 * @property {string} [className]
 */

/**
 * @typedef {Object} CardTransitions
 * @property {string} [enter] - Preset: slide-up | fade-in | zoom-in — or raw Tailwind classes
 * @property {string} [hover] - Preset: lift | scale | glow | fade | tilt | none — or raw classes
 */

/**
 * @typedef {Object} CardGrid
 * @property {number} [colStart] - lg column start (1–6)
 * @property {number} [rowStart] - lg row start
 * @property {number} [rowSpan] - grid row span (default 1)
 */

/**
 * @typedef {Object} CardConfig
 * @property {string} id
 * @property {CardType} type
 * @property {string} [bg] - Tailwind background classes
 * @property {string} [cardClassName] - Extra classes on the card shell
 * @property {CardGrid} [grid] - Large-screen placement
 * @property {'hero' | 'pair' | 'triple' | 'wide'} [span] - Preset column spans
 * @property {string} [animate] - Shorthand for transitions.enter (legacy)
 * @property {CardTransitions} [transitions]
 * @property {CardImage} [image]
 * @property {CardLogo} [logo]
 * @property {string} [projectId] - For type `project`, key into PROJECTS
 * @property {'home' | 'work' | 'contact'} [sectionAnchor] - Nav scroll target
 * @property {boolean} [clickable]
 * @property {boolean} [ariaHidden]
 */

export const PROJECTS = {
  turtl: {
    id: 'turtl',
    title: 'Turtl',
    tagline: 'AI study companion',
    link: 'turtleai.dev',
    status: 'Live',
    statusColor: 'emerald',
    hideStatus: true,
    cardCover: true,
    cardCoverBg: '#478862',
    description:
      'An AI-powered study companion that adapts to your learning style. Built with a focus on spaced repetition and contextual understanding to help students retain more in less time.',
    tech: ['Next.js', 'OpenAI', 'Supabase', 'Tailwind'],
    image: {
      src: '/images/turtl-logo-cropped.png',
      alt: 'Turtl',
      position: 'cover',
      fillCard: true,
      className: 'object-cover object-center',
      priority: true,
    },
    transitions: { hover: 'scale', enter: 'slide-up' },
    openLink: true,
  },
  'posture-patch': {
    id: 'posture-patch',
    title: 'Posture Patch',
    tagline: 'Wearable for real-time posture feedback',
    status: 'Prototype',
    statusColor: 'orange',
    bg: 'bg-[#fff8f0]',
    textColor: 'text-neutral-900',
    caseStudyId: 'posture-patch',
    description:
      'A wearable that detects slouching and triggers a vibration motor after 2 seconds — calibrated to your personal baseline, reset anytime with a button.',
    tech: ['Arduino', 'IMU', 'Vibration Motor', 'CAD'],
  },
  'dozy': {
    id: 'dozy',
    title: 'Dozy',
    tagline: 'Personalized nap planning from sleep history',
    link: 'https://www.appdozy.com',
    status: 'Live',
    statusColor: 'emerald',
    hideStatus: true,
    cardLabel: 'Product design · iOS · Health',
    bg: 'bg-gradient-to-br from-[#07070c] via-[#0c0d14] to-[#101222]',
    textColor: 'text-white',
    caseStudyId: 'dozy',
    discipline: 'Product design',
    description:
      'Dozy helps students recover sleep without guessing when to nap — turning Apple Health history into personalized nap recommendations.',
    tech: ['SwiftUI', 'HealthKit', 'Product Design', 'User Research'],
  },
  orca: {
    id: 'orca',
    title: 'Orca',
    tagline: '3D printed in PLA — filed & painted',
    status: 'Complete',
    statusColor: 'emerald',
    bg: 'bg-white',
    textColor: 'text-neutral-900',
    caseStudyId: 'orca',
    description:
      'A PLA orca — printed purple by accident, sanded, filed, and hand-painted.',
    tech: ['PLA', '3D Printing', 'Filing', 'Paint'],
  },
  streakit: {
    id: 'streakit',
    title: 'Streakit',
    tagline: 'Snackpass for local SMBs',
    status: 'In progress',
    statusColor: 'orange',
    hideStatus: true,
    bg: 'bg-white',
    textColor: 'text-neutral-900',
    caseStudyId: 'streakit',
    discipline: 'Product design',
    description:
      'Product design case study — Wallet loyalty for neighborhood shops, and what customer discovery ruled out.',
    tech: ['Figma', 'Customer discovery', 'Apple Wallet', 'Design thinking'],
  },
}

export const COURSES = [
  'Biomechanics',
  'Mechanics of Materials',
  'Thermodynamics',
  'Anatomy & Kinesiology',
  'Multivariable Calc',
  'Linguistics',
]

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/CharviBansall', icon: 'G' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'in' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'X' },
  { label: 'Email', href: 'mailto:cbansal@umass.edu', icon: '@' },
]

export const NAV_ITEMS = [
  { label: 'Home', section: 'home' },
  { label: 'Work', section: 'work' },
  { label: 'Contact', section: 'contact' },
]

export const HERO_ROLES = [
  'builder',
  'student',
  'designer',
  'creator',
  'engineer',
]

/** Edit this array to customize every card. */
export const CARDS = [
  {
    id: 'hero',
    type: 'hero',
    span: 'hero',
    grid: { colStart: 1, rowStart: 1 },
    cardClassName: 'group font-display !bg-transparent',
    transitions: { enter: 'slide-up', hover: 'lift' },
  },
  {
    id: 'turtl',
    type: 'project',
    projectId: 'turtl',
    grid: { colStart: 4, rowStart: 1 },
    cardClassName: '!p-0 overflow-hidden',
    clickable: true,
  },
  {
    id: 'posture-patch',
    type: 'project',
    projectId: 'posture-patch',
    grid: { colStart: 5, rowStart: 1 },
    animate: 'animate-slide-up',
    clickable: true,
  },
  {
    id: 'clock',
    type: 'clock',
    grid: { colStart: 6, rowStart: 1 },
    cardClassName: 'group',
    animate: 'animate-slide-up animate-delay-300',
  },
  {
    id: 'quote',
    type: 'quote',
    bg: 'bg-[#f0f0ff]',
    grid: { colStart: 4, rowStart: 2 },
    cardClassName: 'group hover:bg-[#e8e8ff]',
    transitions: { enter: 'slide-up animate-delay-300', hover: 'scale' },
  },
  {
    id: 'streakit',
    type: 'project',
    projectId: 'streakit',
    grid: { colStart: 5, rowStart: 2 },
    animate: 'animate-slide-up animate-delay-400',
    clickable: true,
  },
  {
    id: 'coursework-b',
    type: 'coursework',
    bg: 'bg-white',
    courses: [],
    grid: { colStart: 6, rowStart: 2 },
    cardClassName: 'p-4 sm:p-5',
    animate: 'animate-slide-up animate-delay-400',
  },
  {
    id: 'dozy',
    type: 'project',
    projectId: 'dozy',
    grid: { colStart: 1, rowStart: 3 },
    cardClassName:
      'ring-1 ring-inset ring-white/[0.08] shadow-2xl shadow-black/30 hover:ring-white/[0.14]',
    animate: 'animate-slide-up animate-delay-600',
    clickable: true,
  },
  {
    id: 'orca',
    type: 'project',
    projectId: 'orca',
    bg: 'bg-white',
    grid: { colStart: 2, rowStart: 3 },
    animate: 'animate-slide-up animate-delay-600',
    clickable: true,
  },
  {
    id: 'education',
    type: 'education',
    bgColor: '#ffffff',
    bg: 'text-[#881C1C]',
    span: 'pair',
    grid: { colStart: 4, rowStart: 3 },
    cardClassName: 'group overflow-hidden !bg-white',
    transitions: { enter: 'slide-up animate-delay-600', hover: 'scale' },
    sectionAnchor: 'work',
  },
  {
    id: 'flowers',
    type: 'photo',
    title: 'plant a flower!',
    link: 'https://www.charvisgarden.com',
    openLink: true,
    bg: 'bg-white',
    grid: { colStart: 3, rowStart: 3 },
    cardClassName: '!p-0 overflow-hidden',
    image: {
      src: '/images/flowers.png',
      alt: 'Hand-drawn flowers',
      position: 'cover',
      fillCard: true,
      className: 'object-cover object-center',
    },
    transitions: { enter: 'slide-up animate-delay-600', hover: 'scale' },
  },
  {
    id: 'connect',
    type: 'connect',
    grid: { colStart: 6, rowStart: 3 },
    animate: 'animate-slide-up animate-delay-600',
    sectionAnchor: 'contact',
  },
]

const SPAN_CLASS = {
  hero: 'bento-span-hero',
  pair: 'bento-span-pair',
  triple: 'bento-span-triple',
  wide: 'bento-span-wide',
}

/** Full class names so Tailwind JIT picks them up (no dynamic string building). */
const LG_COL_START = {
  1: 'lg:col-start-1',
  2: 'lg:col-start-2',
  3: 'lg:col-start-3',
  4: 'lg:col-start-4',
  5: 'lg:col-start-5',
  6: 'lg:col-start-6',
  7: 'lg:col-start-7',
  8: 'lg:col-start-8',
}

const LG_ROW_START = {
  1: 'lg:row-start-1',
  2: 'lg:row-start-2',
  3: 'lg:row-start-3',
  4: 'lg:row-start-4',
}

const ROW_SPAN = {
  1: 'row-span-1',
  2: 'row-span-2',
}

/** Build grid + shell classes from a card config. */
export function cardShellClasses(card, project = null) {
  const isMediaOnly = project?.cardCover || card.type === 'photo'
  const parts = [
    'bento-card',
    isMediaOnly
      ? 'relative block !p-0 overflow-hidden'
      : 'flex flex-col justify-between',
  ]

  if (card.span && SPAN_CLASS[card.span]) {
    parts.push(SPAN_CLASS[card.span])
  } else {
    parts.push('col-span-1')
  }

  const rowSpan = card.grid?.rowSpan ?? 1
  if (ROW_SPAN[rowSpan]) parts.push(ROW_SPAN[rowSpan])

  if (card.grid?.colStart && LG_COL_START[card.grid.colStart]) {
    parts.push(LG_COL_START[card.grid.colStart])
  }
  if (card.grid?.rowStart && LG_ROW_START[card.grid.rowStart]) {
    parts.push(LG_ROW_START[card.grid.rowStart])
  }

  if (card.bg) parts.push(card.bg)
  if (card.cardClassName) parts.push(card.cardClassName)
  if (card.clickable || card.openLink) parts.push('cursor-pointer group')

  const enter =
    card.transitions?.enter ??
    project?.transitions?.enter ??
    card.animate ??
    ENTER_PRESETS['slide-up']
  const hover =
    card.transitions?.hover ?? project?.transitions?.hover ?? 'lift'
  parts.push(resolveTransitionClass(enter, ENTER_PRESETS))
  parts.push(resolveTransitionClass(hover, TRANSITION_PRESETS))

  return parts.filter(Boolean).join(' ')
}

/** Full URL for a project `link` field (domain or full URL). */
export function projectHref(link) {
  if (!link) return null
  if (link.startsWith('http://') || link.startsWith('https://')) return link
  return `https://${link}`
}

/** Merge image / logo from card config + linked project (card wins). */
export function getCardVisuals(card, project = null) {
  return {
    image: card.image ?? project?.image ?? null,
    logo: card.logo ?? project?.logo ?? null,
  }
}
