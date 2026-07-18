import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/content"
import {
  TerminalSquare,
  Container,
  GitBranch,
  Package,
  Boxes,
  Workflow,
  Globe,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import type React from "react"

const categoryIcons: Record<string, React.ReactNode> = {
  Linux: <TerminalSquare className="h-5 w-5" />,
  Docker: <Container className="h-5 w-5" />,
  Git: <GitBranch className="h-5 w-5" />,
  uv: <Package className="h-5 w-5" />,
  Miniconda: <Boxes className="h-5 w-5" />,
  Kubernetes: <Workflow className="h-5 w-5" />,
  Network: <Globe className="h-5 w-5" />,
  OpenShift: <Container className="h-5 w-5" />,
}

export default function MyNotesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container px-4 py-12 md:px-8 lg:px-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-2">My Notes</h1>
            <p className="text-muted-foreground mb-8">
              Technical documentation and reference guides organized by topic.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link key={category.slug} href={`/mynotes/${category.slug}`}>
                  <Card className="group h-full hover:border-primary/40 hover:shadow-md transition-all duration-200">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                      <div className="rounded-xl bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {categoryIcons[category.name] || <TerminalSquare className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-semibold">{category.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {category.count} guide{category.count !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-auto" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
