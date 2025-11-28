"use client"

import Link from "next/link"
import { Terminal, Github, Linkedin, Menu } from "lucide-react"
import { SearchCommand } from "./search-command"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { MobileSidebar } from "./mobile-sidebar"
import { useState } from "react"

// Medium icon component (lucide-react doesn't have it)
function MediumIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
    </svg>
  )
}

const socialLinks = [
  { name: "GitHub", href: "https://github.com/mustafacavusoglu", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mustafacavusoglu12/", icon: Linkedin },
  { name: "Medium", href: "https://medium.com/@mustafacavussoglu", icon: MediumIcon },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0">
              <MobileSidebar onClose={() => setMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold hidden sm:inline">Mustafa Cavusoglu</span>
            <span className="text-xl font-bold sm:hidden">MC</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Social Links - Hidden on mobile, shown on desktop */}
          <div className="hidden md:flex items-center gap-1">
            {socialLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                size="icon"
                asChild
                className="h-9 w-9"
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>

          <SearchCommand />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
