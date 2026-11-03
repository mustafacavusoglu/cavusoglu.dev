import type { Metadata } from "next"
import Link from "next/link"
import { Header, Footer } from "@/components/header"
import { NotesTabs } from "@/components/notes-tabs"
import { categories } from "@/lib/content"

export const metadata: Metadata = {
  title: "Notes – Mustafa Çavuşoğlu",
  description: "Everyday Linux, Docker, Git, Kubernetes/OpenShift, uv and Conda commands.",
}

export default function NotesPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[880px] px-5 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24">
        <h1 className="mb-3 text-[28px] font-semibold tracking-tight sm:text-[32px]">Notes</h1>
        <p className="mb-8 max-w-[580px] leading-relaxed text-body">
          Everyday commands I use at work, up to seven per topic. Replace anything in angle brackets.
        </p>
        <NotesTabs />

        <section className="mt-14">
          <h2 className="mb-2 text-xl font-semibold tracking-tight">Guides</h2>
          <p className="mb-6 max-w-[580px] leading-relaxed text-body">
            Longer step-by-step guides, grouped by topic.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/mynotes/${c.slug}`}
                  className="flex items-center justify-between rounded-md border border-line px-4 py-3 hover:border-ink"
                >
                  <span className="font-medium">{c.name}</span>
                  <span className="text-sm text-body">{c.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}
