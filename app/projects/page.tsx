import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Star } from "lucide-react"
import { readFileSync } from "fs"
import { join } from "path"

async function getProjects() {
  const filePath = join(process.cwd(), 'public', 'projects.json')
  const fileContent = readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContent)
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container px-4 py-8 md:px-8 lg:px-12 max-w-5xl">
            <h1 className="text-3xl font-bold mb-2">Projects</h1>
            <p className="text-muted-foreground mb-8">Open source projects and side work on GitHub</p>

            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project: any, index: number) => (
                <Card key={index} className="group hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{project.name}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span>{project.stargazerCount}</span>
                        </div>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description || "No description available"}
                    </p>
                    <Badge variant="secondary">{project.primaryLanguage?.name || "Unknown"}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
