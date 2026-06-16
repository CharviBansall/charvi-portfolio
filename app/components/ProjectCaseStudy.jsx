import Image from 'next/image'
import Link from 'next/link'

const STATUS_STYLES = {
  emerald: 'bg-emerald-500/15 text-emerald-700',
  orange: 'bg-orange-500/15 text-orange-700',
  blue: 'bg-blue-500/15 text-blue-700',
}

function PageImage({ image, nested = false }) {
  const isFull = image.layout !== 'half'

  return (
    <figure className={nested ? 'min-w-0' : isFull ? 'col-span-full' : ''}>
      <div
        className={
          nested
            ? 'overflow-hidden bg-neutral-200/60'
            : 'overflow-hidden rounded-2xl bg-neutral-100'
        }
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={1600}
          height={1200}
          className={
            nested
              ? 'mx-auto h-auto max-h-[min(52vh,420px)] w-full object-contain'
              : 'h-auto w-full'
          }
          sizes={
            nested || !isFull
              ? '(max-width: 768px) 50vw, 320px'
              : '(max-width: 768px) 100vw, 768px'
          }
        />
      </div>
      {!nested && image.caption ? (
        <figcaption className="mt-2 text-sm text-neutral-500">{image.caption}</figcaption>
      ) : null}
    </figure>
  )
}

function ImageGrid({ images }) {
  if (!images?.length) return null

  const isPaired =
    images.length === 2 && images.every((image) => image.layout === 'half')

  if (isPaired) {
    const caption = images.find((image) => image.caption)?.caption

    return (
      <figure className="mt-6">
        <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100">
          <div className="grid grid-cols-2 divide-x divide-neutral-200/80">
            {images.map((image) => (
              <PageImage key={image.src} image={image} nested />
            ))}
          </div>
        </div>
        {caption ? (
          <figcaption className="mt-2 text-sm text-neutral-500">{caption}</figcaption>
        ) : null}
      </figure>
    )
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {images.map((image) => (
        <PageImage key={image.src} image={image} />
      ))}
    </div>
  )
}

function CodeBlock({ code }) {
  if (!code?.content) return null

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900">
      {code.filename ? (
        <div className="border-b border-neutral-700 px-4 py-2 text-xs font-medium text-neutral-400">
          {code.filename}
        </div>
      ) : null}
      <pre className="overflow-x-auto p-4 sm:p-5">
        <code className="font-mono text-[11px] leading-relaxed text-neutral-100 sm:text-xs">
          {code.content}
        </code>
      </pre>
    </div>
  )
}

export default function ProjectCaseStudy({ project, page }) {
  const gallery = page.gallery?.filter(Boolean) ?? []

  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      <header className="sticky top-0 z-40 border-b border-neutral-200/60 bg-[#f5f4f0]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-white hover:text-neutral-900"
          >
            <span aria-hidden>←</span>
            Home
          </Link>
          {!project.hideStatus ? (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                STATUS_STYLES[project.statusColor]
              }`}
            >
              {project.status}
            </span>
          ) : null}
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
        <p className="text-xs font-medium uppercase tracking-widest text-orange-500/90">
          {project.discipline ?? 'Project'}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-neutral-600">{project.tagline}</p>

        {page.heroImage ? (
          <figure className="mt-10">
            <div className="overflow-hidden rounded-3xl bg-neutral-100">
              <Image
                src={page.heroImage}
                alt={page.heroImageAlt ?? project.title}
                width={1600}
                height={1200}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            {page.heroImageCaption ? (
              <figcaption className="mt-2 text-sm text-neutral-500">
                {page.heroImageCaption}
              </figcaption>
            ) : null}
          </figure>
        ) : (
          <div className="mt-10 rounded-3xl bg-[#fff8f0] px-6 py-10 sm:px-10">
            <p className="text-sm leading-relaxed text-neutral-600">{project.description}</p>
          </div>
        )}

        <div className="mt-14 space-y-14">
          {page.sections.map((section) => (
            <section key={section.id ?? section.title}>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i} className="text-base leading-relaxed text-neutral-700 sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
              <ImageGrid images={section.images} />
              <CodeBlock code={section.code} />
            </section>
          ))}
        </div>

        {gallery.length > 0 ? (
          <section className="mt-16 border-t border-neutral-200/80 pt-16">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
              Gallery
            </h2>
            <ImageGrid images={gallery} />
          </section>
        ) : null}

        <footer className="mt-16 border-t border-neutral-200/80 pt-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-neutral-400">
            Tech stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="chip bg-[#fff8f0] text-neutral-700">
                {t}
              </span>
            ))}
          </div>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            ← Back to portfolio
          </Link>
        </footer>
      </article>
    </div>
  )
}
