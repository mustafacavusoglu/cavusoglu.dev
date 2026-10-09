import Link from "next/link"
import { readFileSync } from "fs"
import { join } from "path"
import { Header, Footer } from "@/components/header"
import { topics } from "@/lib/notes"
import { GameGrid } from "@/components/games"

const jobs = [
  {
    period: "Nov 2025 — Present",
    title: "MLOps Engineer",
    company: "Intertech · Hybrid",
    desc: "Deploying machine learning models at scale. Building MLOps infrastructure and CI/CD pipelines for ML workflows on Red Hat OpenShift.",
    stack: "Python · Kubernetes · OpenShift · MLflow · Docker",
  },
  {
    period: "Sep 2023 — Oct 2025",
    title: "Data Scientist",
    company: "Teknosa · Hybrid",
    desc: "Built end-to-end data pipelines for predictive modeling with Dask and SQL, served through FastAPI.",
    stack: "Python · Dask · SQL · FastAPI",
  },
  {
    period: "Sep 2022 — Sep 2023",
    title: "AI Engineer",
    company: "MLP Care · Hybrid",
    desc: "Developed deep learning computer vision models for mammography analysis on HPC infrastructure.",
    stack: "Python · PyTorch · HPC · Bash",
  },
]

interface Project {
  name: string
  description: string | null
  url: string
  primaryLanguage?: { name: string } | null
}

function getProjects(): Project[] {
  const projects: Project[] = JSON.parse(readFileSync(join(process.cwd(), "public", "projects.json"), "utf-8"))
  return projects.filter((p) => p.description)
}

const sectionTitle = "text-[13px] font-medium uppercase tracking-[0.08em] text-muted"
const button = "inline-flex min-h-11 items-center rounded-md px-[18px] text-sm font-medium"

export default function HomePage() {
  const projects = getProjects()

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[880px] px-6">
        <section className="border-b border-line pt-24 pb-18">
          <p className="mb-4 font-mono text-[13px] text-muted">ML / MLOps Engineer · Turkey</p>
          <h1 className="mb-6 max-w-[680px] text-[34px] leading-tight font-semibold tracking-tight sm:text-[44px]">
            I build the infrastructure that takes machine learning models to production.
          </h1>
          <p className="mb-8 max-w-[620px] text-[17px] leading-relaxed text-body">
            Currently an MLOps Engineer at Intertech, deploying models on OpenShift with CI/CD and MLflow. Previously
            data science at Teknosa and computer vision for mammography at MLP Care.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:mustafacavussoglu@gmail.com" className={`${button} bg-ink text-white hover:bg-black`}>
              Get in touch
            </a>
            <a href="https://www.linkedin.com/in/mustafacavusoglu12/" className={`${button} border border-zinc-300 hover:border-ink`}>
              LinkedIn
            </a>
            <a href="https://medium.com/@mustafacavussoglu" className={`${button} border border-zinc-300 hover:border-ink`}>
              Medium
            </a>
          </div>
        </section>

        <section id="experience" className="scroll-mt-4 border-b border-line py-16">
          <h2 className={`${sectionTitle} mb-8`}>Experience</h2>
          <div className="flex flex-col gap-10">
            {jobs.map((job) => (
              <div key={job.title} className="flex flex-wrap gap-x-8 gap-y-2">
                <div className="flex-[0_0_180px] pt-[3px] font-mono text-[13px] text-muted">{job.period}</div>
                <div className="min-w-0 flex-[1_1_400px]">
                  <h3 className="mb-1 text-lg font-semibold">{job.title}</h3>
                  <p className="mb-3 text-[15px] text-body">{job.company}</p>
                  <p className="mb-3.5 text-[15px] leading-relaxed text-body">{job.desc}</p>
                  <p className="font-mono text-xs text-muted">{job.stack}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-mt-4 border-b border-line py-16">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className={sectionTitle}>Projects</h2>
            <a href="https://github.com/mustafacavusoglu" className="text-sm text-accent hover:text-accent-hover hover:underline">
              All repositories →
            </a>
          </div>
          <div className="flex flex-col">
            {projects.map((p) => (
              <a
                key={p.name}
                href={p.url}
                className="group flex flex-wrap justify-between gap-x-6 gap-y-1.5 border-t border-line-soft py-5"
              >
                <div className="min-w-0 flex-[1_1_420px]">
                  <div className="mb-1.5 font-mono text-[15px] font-medium group-hover:text-accent">{p.name}</div>
                  <div className="text-[15px] leading-relaxed text-body">{p.description}</div>
                </div>
                <div className="pt-[3px] font-mono text-xs text-muted">{p.primaryLanguage?.name}</div>
              </a>
            ))}
          </div>
        </section>

        <section id="games" className="scroll-mt-4 border-b border-line py-16">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className={sectionTitle}>Games</h2>
            <Link href="/games" className="text-sm text-accent hover:text-accent-hover hover:underline">
              All games →
            </Link>
          </div>
          <GameGrid />
        </section>

        <section className="pt-16 pb-24">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className={sectionTitle}>Notes</h2>
            <Link href="/mynotes" className="text-sm text-accent hover:text-accent-hover hover:underline">
              Open notes →
            </Link>
          </div>
          <p className="mb-6 max-w-[560px] text-[15px] leading-relaxed text-body">
            Commands I actually reach for at work. Up to seven per topic, no filler.
          </p>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <Link
                key={t}
                href="/mynotes"
                className="inline-flex min-h-9 items-center rounded-md border border-line px-3.5 text-sm hover:border-ink"
              >
                {t}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
