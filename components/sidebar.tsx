"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { categories } from "@/lib/content"
import {
  TerminalSquare,
  Container,
  GitBranch,
  Package,
  Boxes,
  Workflow,
  ChevronDown,
  BookOpen,
  Briefcase,
  FolderKanban,
  User,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const categoryIcons: Record<string, React.ReactNode> = {
  Linux: <TerminalSquare className="h-4 w-4" />,
  Docker: <Container className="h-4 w-4" />,
  Git: <GitBranch className="h-4 w-4" />,
  uv: <Package className="h-4 w-4" />,
  Miniconda: <Boxes className="h-4 w-4" />,
  Kubernetes: <Workflow className="h-4 w-4" />,
}

export function Sidebar() {
  const pathname = usePathname()
  const [knowledgeOpen, setKnowledgeOpen] = useState(true)

  const mainNavItems = [
    { name: "About", href: "/about", icon: <User className="h-4 w-4" /> },
    { name: "Experiences", href: "/experiences", icon: <Briefcase className="h-4 w-4" /> },
    { name: "Projects", href: "/projects", icon: <FolderKanban className="h-4 w-4" /> },
  ]

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card/50">
      <nav className="flex-1 space-y-1 p-4">
        {/* Main Navigation */}
        <div className="pb-4">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        {/* Knowledge Center - Collapsible */}
        <Collapsible open={knowledgeOpen} onOpenChange={setKnowledgeOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4" />
              Knowledge Center
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-200",
                knowledgeOpen && "rotate-180",
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 pt-1 space-y-1">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === `/category/${category.slug}`
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {categoryIcons[category.name] || <TerminalSquare className="h-4 w-4" />}
                {category.name}
                <span className="ml-auto text-xs opacity-60">{category.count}</span>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </nav>
    </aside>
  )
}
