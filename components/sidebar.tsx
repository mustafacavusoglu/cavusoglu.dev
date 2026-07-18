"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  Briefcase,
  FolderKanban,
  User,
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const mainNavItems = [
    { name: "About", href: "/about", icon: <User className="h-4 w-4" /> },
    { name: "Experiences", href: "/experiences", icon: <Briefcase className="h-4 w-4" /> },
    { name: "Projects", href: "/projects", icon: <FolderKanban className="h-4 w-4" /> },
  ]

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card/50">
      <nav className="flex-1 space-y-1 p-4">
        {/* Main Navigation */}
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

        {/* Divider */}
        <div className="py-2">
          <div className="border-t" />
        </div>

        {/* My Notes */}
        <Link
          href="/mynotes"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname.startsWith("/mynotes")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <BookOpen className="h-4 w-4" />
          My Notes
        </Link>
      </nav>
    </aside>
  )
}
