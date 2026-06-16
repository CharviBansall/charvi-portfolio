/**
 * Hover transition presets — use via transitions: { hover: 'lift' } on any card or project.
 * Or pass raw Tailwind classes: transitions: { hover: 'hover:rotate-1 duration-500' }
 */
export const TRANSITION_PRESETS = {
  lift: 'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg',
  scale: 'transition-transform duration-500 ease-out hover:scale-[1.02]',
  glow: 'transition-shadow duration-300 hover:shadow-xl hover:shadow-violet-300/25',
  fade: 'transition-opacity duration-300 hover:opacity-100 opacity-95',
  tilt: 'transition-transform duration-300 hover:-rotate-1',
  none: '!translate-y-0 !shadow-none hover:!translate-y-0 hover:!shadow-none',
}

/** Entrance animation presets (or use raw classes on transitions.enter). */
export const ENTER_PRESETS = {
  'slide-up': 'animate-slide-up',
  'fade-in': 'animate-fade-in',
  'zoom-in': 'animate-zoom-in',
}

const LOGO_SIZE = {
  sm: 'w-8 h-8',
  md: 'w-11 h-11',
  lg: 'w-16 h-16',
}

const LOGO_POSITION = {
  'top-left': 'absolute top-4 left-4 z-20',
  'top-right': 'absolute top-4 right-4 z-20',
  'bottom-right': 'absolute bottom-4 right-4 z-20',
}

const IMAGE_POSITION = {
  background: 'absolute inset-0 z-0',
  cover: 'absolute inset-0 z-0',
  top: 'relative z-10 w-full h-28 sm:h-32 mb-3 -mx-1 rounded-xl overflow-hidden shrink-0',
}

export function resolveTransitionClass(value, presets) {
  if (!value) return ''
  return presets[value] ?? value
}

export function logoClasses(logo) {
  const size = LOGO_SIZE[logo.size ?? 'md']
  const position = LOGO_POSITION[logo.position ?? 'top-right']
  return `${size} ${position} object-contain pointer-events-none ${logo.className ?? ''}`
}

export function imageWrapperClasses(image) {
  const position = image.position ?? 'background'
  if (image.fillCard || position === 'cover') {
    return 'absolute inset-0 z-0 h-full w-full'
  }
  return IMAGE_POSITION[position] ?? IMAGE_POSITION.background
}

export function imageClasses(image) {
  const position = image.position ?? 'background'
  if (image.fillCard || position === 'cover') {
    return `h-full w-full min-h-full min-w-full object-cover ${image.className ?? 'object-center'}`
  }
  const base =
    position === 'top'
      ? 'w-full h-full object-cover'
      : 'object-cover w-full h-full'
  const defaultOpacity =
    position === 'background' && !image.className ? 'opacity-25' : ''
  return `${base} ${image.className ?? defaultOpacity}`
}
