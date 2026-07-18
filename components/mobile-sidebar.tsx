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
  Github,
  Linkedin,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Medium icon
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

interface MobileSidebarProps {
  onClose?: () => void
}

export function MobileSidebar({ onClose }: MobileSidebarProps) {
  const pathname = usePathname()

  const mainNavItems = [
    { name: "About", href: "/about", icon: <User className="h-4 w-4" /> },
    { name: "Experiences", href: "/experiences", icon: <Briefcase className="h-4 w-4" /> },
    { name: "Projects", href: "/projects", icon: <FolderKanban className="h-4 w-4" /> },
  ]

  return (
    <div className="flex h-full flex-col">
      <nav className="flex-1 space-y-1 p-4">
        {/* Main Navigation */}
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
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
          onClick={onClose}
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

      {/* Social Links at Bottom */}
      <div className="border-t p-4">
        <div className="text-xs font-medium text-muted-foreground mb-3">Connect</div>
        <div className="flex gap-2">
          {socialLinks.map((link) => (
            <Button
              key={link.name}
              variant="outline"
              size="icon"
              asChild
              className="h-10 w-10"
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
