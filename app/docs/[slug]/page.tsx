import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getContentBySlug, allContent } from "@/lib/content"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allContent.map((item) => ({
    slug: item.slug,
  }))
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params
  const content = getContentBySlug(slug)

  if (!content) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container max-w-4xl px-4 py-8 md:px-8">
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <div className="mb-6">
              <Badge variant="secondary" className="mb-3">
                {content.category}
              </Badge>
              <p className="text-muted-foreground">{content.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {content.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <MarkdownRenderer content={content.content} />
          </div>
        </main>
      </div>
    </div>
  )
}
