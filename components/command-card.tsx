import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ContentItem } from "@/lib/content"

interface CommandCardProps {
  item: ContentItem
}

export function CommandCard({ item }: CommandCardProps) {
  return (
    <Link href={`/docs/${item.slug}`}>
      <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md hover:shadow-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {item.category}
            </Badge>
          </div>
          <CardTitle className="text-lg mt-2">{item.title}</CardTitle>
          <CardDescription className="line-clamp-2">{item.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
