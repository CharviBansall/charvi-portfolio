'use client'

import { useEffect } from 'react'
import { projectHref } from '../data/cards'

const STATUS_MODAL = {
  emerald: 'bg-emerald-500/20 text-emerald-600',
  orange: 'bg-orange-500/20 text-orange-600',
  blue: 'bg-blue-500/20 text-blue-600',
}

export default function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-700"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="mb-4 flex items-center gap-3">
          <h2 className="text-2xl font-semibold">{project.title}</h2>
          {!project.hideStatus && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                STATUS_MODAL[project.statusColor]
              }`}
            >
              {project.status}
            </span>
          )}
        </div>

        <p className="mb-6 leading-relaxed text-neutral-600">{project.description}</p>

        <div className="mb-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-neutral-400">
            Tech stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="chip bg-neutral-100 text-neutral-600 hover:bg-neutral-200">
                {t}
              </span>
            ))}
          </div>
        </div>

        {project.link ? (
          <a
            href={projectHref(project.link)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Visit {project.link}
            <span className="text-xs">↗</span>
          </a>
        ) : null}
      </div>
    </div>
  )
}
