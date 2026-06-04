import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import ProjectHero from '@/components/project/ProjectHero'
import ProjectOverview from '@/components/project/ProjectOverview'
import ProjectTech from '@/components/project/ProjectTech'
import ProjectCTA from '@/components/project/ProjectCTA'
import NextProject from '@/components/project/NextProject'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — Ferdyan Syahwal`,
    description: project.shortDesc,
  }
}

export default function ProjectPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const currentIndex = projects.indexOf(project)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <main>
      <Navbar />
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectTech project={project} />
      <ProjectCTA project={project} />
      <NextProject project={nextProject} />
      <Footer />
    </main>
  )
}