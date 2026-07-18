import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  FolderKanban,
  User,
  MapPin,
  ArrowRight,
  Mail,
  Linkedin,
  Github,
} from "lucide-react"
import Link from "next/link"
import { readFileSync } from "fs"
import { join } from "path"

const experiences = [
  { title: "MLOps Engineer", company: "Intertech", period: "Nov 2025 – Present" },
  { title: "Data Scientist", company: "Teknosa", period: "Sept 2023 – Oct 2025" },
  { title: "AI Engineer", company: "MLP Care", period: "Sept 2022 – Sept 2023" },
]

async function getProjects() {
  const filePath = join(process.cwd(), "public", "projects.json")
  const fileContent = readFileSync(filePath, "utf-8")
  return JSON.parse(fileContent)
}

export default async function HomePage() {
  const projects = await getProjects()
  const featuredProjects = (projects as any[]).filter(
    (p) => p.description && p.description.length > 0
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container px-4 py-12 md:px-8 lg:px-12 max-w-4xl">
            {/* 1. About */}
            <section id="about" className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-semibold">About</h2>
              </div>

              <div className="relative overflow-hidden rounded-2xl border bg-card p-8 md:p-10">
                <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
                    Mustafa Çavuşoğlu
                  </h1>
                  <p className="text-lg text-primary font-semibold mb-4">
                    ML / MLOps Engineer
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Building scalable machine learning systems and infrastructure.
                    Passionate about automation, containerization, and making ML
                    models production-ready.
                  </p>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Turkey</span>
                    </div>
                    <a
                      href="mailto:mustafacavussoglu@gmail.com"
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      <span>mustafacavussoglu@gmail.com</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mustafacavusoglu12/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com/mustafacavusoglu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Experiences */}
            <section id="experiences" className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-lg bg-accent/10 p-2 text-accent">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-semibold">Experiences</h2>
              </div>

              <div className="space-y-4">
                {experiences.map((exp, i) => (
                  <Card key={i} className="group hover:border-primary/40 transition-colors">
                    <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-semibold">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.company} &middot; {exp.period}
                        </p>
                      </div>
                      <Link href="/experiences">
                        <Button variant="outline" size="sm" className="shrink-0">
                          View Details
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* 3. Projects */}
            <section id="projects" className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <FolderKanban className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-semibold">Projects</h2>
              </div>

              <div className="space-y-4">
                {featuredProjects.map((project: any, i: number) => (
                  <Card key={i} className="group hover:border-primary/40 transition-colors">
                    <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm" className="shrink-0">
                          View Details
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
