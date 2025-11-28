import type React from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { CommandCard } from "@/components/command-card"
import { allContent, categories } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TerminalSquare,
  Container,
  GitBranch,
  Package,
  Boxes,
  Workflow,
  Search,
  Briefcase,
  FolderKanban,
  User,
  MapPin,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const categoryIcons: Record<string, React.ReactNode> = {
  Linux: <TerminalSquare className="h-5 w-5" />,
  Docker: <Container className="h-5 w-5" />,
  Git: <GitBranch className="h-5 w-5" />,
  uv: <Package className="h-5 w-5" />,
  Miniconda: <Boxes className="h-5 w-5" />,
  Kubernetes: <Workflow className="h-5 w-5" />,
}

const experiences = [
  { title: "ML Engineer", company: "Company Name", period: "2022 - Present" },
  { title: "Data Scientist", company: "Previous Company", period: "2020 - 2022" },
]

const projects = [
  { name: "ML Pipeline Framework", description: "End-to-end ML pipeline with Kubernetes" },
  { name: "Model Monitoring System", description: "Real-time model performance tracking" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container px-4 py-8 md:px-8 lg:px-12">
            {/* Hero Section - Updated with name */}
            <section className="mb-12">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border p-8 md:p-12">
                <div className="relative z-10">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">Mustafa Çavuşoğlu</h1>
                  <p className="text-xl md:text-2xl text-primary font-medium mb-4">ML / MLOps Engineer</p>
                  <p className="text-lg text-muted-foreground max-w-2xl mb-6 text-pretty">
                    Building scalable machine learning systems and infrastructure. Passionate about automation,
                    containerization, and making ML models production-ready.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Turkey</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      <span>Press</span>
                      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium">
                        <span className="text-xs">⌘</span>K
                      </kbd>
                      <span>to search</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-primary/5 blur-2xl" />
              </div>
            </section>

            {/* Summary Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {/* About Summary */}
              <Card className="group hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">About</CardTitle>
                    <CardDescription>Who I am</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    ML/MLOps Engineer with expertise in building production-grade machine learning systems, Kubernetes
                    orchestration, and CI/CD pipelines.
                  </p>
                  <Link href="/about" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              {/* Experiences Summary */}
              <Card className="group hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Experiences</CardTitle>
                    <CardDescription>Work history</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {experiences.map((exp, i) => (
                      <div key={i} className="text-sm">
                        <p className="font-medium">{exp.title}</p>
                        <p className="text-muted-foreground text-xs">
                          {exp.company} • {exp.period}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/experiences"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View all <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              {/* Projects Summary */}
              <Card className="group hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <FolderKanban className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Projects</CardTitle>
                    <CardDescription>Featured work</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {projects.map((project, i) => (
                      <div key={i} className="text-sm">
                        <p className="font-medium">{project.name}</p>
                        <p className="text-muted-foreground text-xs">{project.description}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View all <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Knowledge Center Overview */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Knowledge Center</h2>
                <Badge variant="secondary">{allContent.length} guides</Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                  <a
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md hover:shadow-primary/5"
                  >
                    <div className="rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {categoryIcons[category.name]}
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{category.name}</p>
                      <p className="text-xs text-muted-foreground">{category.count} guides</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Recent Guides */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Recent Guides</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {allContent.slice(0, 6).map((item) => (
                  <CommandCard key={item.slug} item={item} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
