import { notFound } from 'next/navigation'
import DozyCaseStudy from '../../components/DozyCaseStudy'
import ProjectCaseStudy from '../../components/ProjectCaseStudy'
import { PROJECTS } from '../../data/cards'
import { getProjectPage } from '../../data/project-pages'

export function generateStaticParams() {
  return Object.values(PROJECTS)
    .filter((p) => p.caseStudyId)
    .map((p) => ({ slug: p.caseStudyId }))
}

export function generateMetadata({ params }) {
  const project = PROJECTS[params.slug]
  if (!project?.caseStudyId) return { title: 'Project' }

  const page = getProjectPage(project.caseStudyId)
  const description =
    page?.heroSubtitle ?? project.tagline ?? project.description

  return {
    title: `${project.title} — Charvi`,
    description,
  }
}

export default function ProjectPage({ params }) {
  const project = PROJECTS[params.slug]
  const page = getProjectPage(project?.caseStudyId)

  if (!project || !page) notFound()

  if (params.slug === 'dozy') {
    return <DozyCaseStudy project={project} page={page} />
  }

  return <ProjectCaseStudy project={project} page={page} />
}
