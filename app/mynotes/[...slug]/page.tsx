import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { CommandCard } from "@/components/command-card"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { allContent, categories, getContentByCategory, getContentBySlug } from "@/lib/content"

interface PageProps {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  const paths: { slug: string[] }[] = []

  // Category listing pages: /mynotes/linux, /mynotes/docker, etc.
  for (const cat of categories) {
    paths.push({ slug: [cat.slug] })
  }

  // Note detail pages: /mynotes/linux/linux-file-operations, etc.
  for (const item of allContent) {
    paths.push({ slug: [item.category.toLowerCase(), item.slug] })
  }

  return paths
}

export default async function MyNotesCatchAllPage({ params }: PageProps) {
  const { slug } = await params

  // /mynotes/linux → category listing
  if (slug.length === 1) {
    const categorySlug = slug[0]
    const category = categories.find((c) => c.slug === categorySlug)
    const content = getContentByCategory(categorySlug)

    if (!category || content.length === 0) {
      notFound()
    }

    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <div className="container px-4 py-8 md:px-8 lg:px-12">
              <Button variant="ghost" size="sm" asChild className="mb-6">
                <Link href="/mynotes">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to My Notes
                </Link>
              </Button>

              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">{category.name}</h1>
                <p className="text-muted-foreground">
                  {content.length} guide{content.length !== 1 ? "s" : ""} available
                </p>
              </div>

              <div className="grid gap-4 grid-cols-1">
                {content.map((item) => (
                  <CommandCard key={item.slug} item={item} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  // /mynotes/linux/linux-file-operations → note detail
  if (slug.length === 2) {
    const [categorySlug, noteSlug] = slug
    const content = getContentBySlug(noteSlug)
    const cat = categories.find((c) => c.slug === categorySlug)

    if (!content || !cat || content.category.toLowerCase() !== categorySlug) {
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
                <Link href={`/mynotes/${categorySlug}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to {cat.name}
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

  notFound()
}
