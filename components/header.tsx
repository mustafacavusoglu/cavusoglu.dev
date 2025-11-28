"use client"

import Link from "next/link"
import { Terminal } from "lucide-react"
import { SearchCommand } from "./search-command"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Terminal className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Mustafa Cavusoglu  </span>
        </Link>
        <div className="flex items-center gap-4">
          <SearchCommand />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
