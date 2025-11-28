"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, FileText, Terminal } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"
import { Button } from "@/components/ui/button"
import { allContent, type ContentItem } from "@/lib/content"
import { cn } from "@/lib/utils"

function getRelevanceScore(item: ContentItem, query: string): number {
  const q = query.toLowerCase()
  let score = 0

  // Title match (highest weight)
  if (item.title.toLowerCase().includes(q)) score += 100
  if (item.title.toLowerCase().startsWith(q)) score += 50

  // Category match
  if (item.category.toLowerCase().includes(q)) score += 30

  // Description match
  if (item.description.toLowerCase().includes(q)) score += 20

  // Content match
  if (item.content.toLowerCase().includes(q)) {
    const matches = item.content.toLowerCase().split(q).length - 1
    score += Math.min(matches * 5, 25)
  }

  // Tags match
  item.tags.forEach((tag) => {
    if (tag.toLowerCase().includes(q)) score += 15
  })

  return score
}

export function SearchCommand() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const filteredContent = React.useMemo(() => {
    if (!query) return allContent.slice(0, 10)

    return allContent
      .map((item) => ({ ...item, score: getRelevanceScore(item, query) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15)
  }, [query])

  const groupedContent = React.useMemo(() => {
    const groups: Record<string, typeof filteredContent> = {}
    filteredContent.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = []
      groups[item.category].push(item)
    })
    return groups
  }, [filteredContent])

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "relative h-10 w-10 md:w-auto md:justify-start rounded-lg bg-muted/50 text-sm font-normal text-muted-foreground shadow-none md:pr-12 md:px-3",
        )}
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline-flex lg:hidden">Search...</span>
        <span className="hidden lg:inline-flex">Search commands...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-xs font-medium opacity-100 md:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b border-border/50 px-3 w-full">
          <Search className="mr-2 h-4 w-4 shrink-0 text-primary" />
          <CommandPrimitive.Input
            placeholder="Search all commands and documentation..."
            value={query}
            onValueChange={setQuery}
            className="flex h-10 w-full bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus:ring-0"
          />
        </div>
        <CommandList className="max-h-[400px] overflow-y-auto p-2">
          <CommandEmpty className="py-12 text-center">
            <Terminal className="mx-auto h-10 w-10 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">No results found.</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Try different keywords</p>
          </CommandEmpty>
          {Object.entries(groupedContent).map(([category, items]) => (
            <CommandGroup
              key={category}
              heading={category}
              className="[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-primary [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2"
            >
              {items.map((item) => (
                <CommandItem
                  key={item.slug}
                  value={item.title}
                  onSelect={() => {
                    router.push(`/docs/${item.slug}`)
                    setOpen(false)
                  }}
                  className="flex items-start gap-3 px-3 py-3 rounded-lg cursor-pointer data-[selected=true]:bg-primary/10 data-[selected=true]:text-foreground"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground truncate">{item.title}</span>
                      {"score" in item && query && (
                        <span className="shrink-0 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary">
                          {Math.round((item as typeof item & { score: number }).score)}%
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground line-clamp-1">{item.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
        <div className="border-t border-border/50 px-3 py-2 text-xs text-muted-foreground flex items-center justify-between">
          <span>Navigate with ↑↓ keys</span>
          <span>Press Enter to select</span>
        </div>
      </CommandDialog>
    </>
  )
}
