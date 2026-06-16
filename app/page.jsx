'use client'

import { useState, useEffect, useRef } from 'react'
import BentoGrid from './components/BentoGrid'
import { NAV_ITEMS } from './data/cards'

function Nav({ active, onNavigate }) {
  return (
    <nav className="sticky top-4 z-40 flex items-center gap-1 bg-white/80 backdrop-blur-md rounded-full px-2 py-1.5 w-fit mb-8 shadow-sm border border-neutral-200/50">
      <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
        C
      </div>
      {NAV_ITEMS.map((item) => (
        <button
          key={item.section}
          onClick={() => onNavigate(item.section)}
          className={`nav-pill ${
            active === item.section
              ? 'bg-neutral-900 text-white shadow-sm'
              : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}

export default function Home() {
  const [activeNav, setActiveNav] = useState('home')
  const homeRef = useRef(null)
  const workRef = useRef(null)
  const contactRef = useRef(null)

  const sectionRefs = { home: homeRef, work: workRef, contact: contactRef }

  const handleNavigate = (section) => {
    setActiveNav(section)
    sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 pb-16">
      <Nav active={activeNav} onNavigate={handleNavigate} />

      <section id="home" ref={homeRef}>
        <BentoGrid workRef={workRef} contactRef={contactRef} />
      </section>

      <footer className="mt-12 text-center">
        <p className="text-xs text-neutral-400">
          built with care & caffeine · © {new Date().getFullYear()} Charvi
        </p>
      </footer>
    </main>
  )
}
