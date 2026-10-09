import Link from "next/link"

const links = [
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Games", href: "/#games" },
  { name: "Notes", href: "/mynotes" },
  { name: "GitHub", href: "https://github.com/mustafacavusoglu" },
]

export function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex min-h-16 max-w-[880px] flex-wrap items-center justify-between gap-3 px-6">
        <Link href="/" className="text-base font-semibold text-ink">
          Mustafa Çavuşoğlu
        </Link>
        <nav className="flex flex-wrap gap-1 text-sm">
          {links.map((l) => (
            <Link key={l.name} href={l.href} className="px-2.5 py-3 text-body hover:text-ink">
              {l.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[880px] flex-wrap justify-between gap-3 px-6 py-7 text-[13px] text-muted">
        <span>© {new Date().getFullYear()} Mustafa Çavuşoğlu</span>
        <a href="mailto:mustafacavussoglu@gmail.com" className="hover:text-ink">
          mustafacavussoglu@gmail.com
        </a>
      </div>
    </footer>
  )
}
