"use client"

import { useState } from "react"
import Link from "next/link"

const links = [
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Notes", href: "/mynotes" },
  { name: "Resume", href: "/cv" },
  { name: "GitHub", href: "https://github.com/mustafacavusoglu" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[880px] items-center justify-between px-5 sm:h-16 sm:px-6">
        <Link href="/" onClick={() => setOpen(false)} className="text-[15px] font-semibold text-ink sm:text-base">
          Mustafa Çavuşoğlu
        </Link>
        <nav className="hidden gap-1 text-sm sm:flex">
          {links.map((l) => (
            <Link key={l.name} href={l.href} className="px-2.5 py-3 text-body hover:text-ink">
              {l.name}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="-mr-2 grid size-11 place-items-center rounded-md text-ink sm:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="border-t border-line-soft px-5 pb-3 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-between border-b border-line-soft text-[15px] text-ink last:border-0"
            >
              {l.name}
              <span className="text-muted">{l.href.startsWith("http") ? "↗" : "→"}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[880px] flex-col gap-2 px-5 py-7 text-[13px] text-muted sm:flex-row sm:justify-between sm:px-6">
        <span>© {new Date().getFullYear()} Mustafa Çavuşoğlu</span>
        <a href="mailto:mustafacavussoglu@gmail.com" className="hover:text-ink">
          mustafacavussoglu@gmail.com
        </a>
      </div>
    </footer>
  )
}
