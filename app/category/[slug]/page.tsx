import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { CommandCard } from "@/components/command-card"
import { Button } from "@/components/ui/button"
import { categories, getContentByCategory } from "@/lib/content"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  const content = getContentByCategory(slug)

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
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">{category.name}</h1>
              <p className="text-muted-foreground">{content.length} guides available</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
