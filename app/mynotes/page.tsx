import type { Metadata } from "next"
import { Header, Footer } from "@/components/header"
import { NotesTabs } from "@/components/notes-tabs"

export const metadata: Metadata = {
  title: "Notes – Mustafa Çavuşoğlu",
  description: "Everyday Linux, Docker, Git, Kubernetes/OpenShift, uv and Conda commands.",
}

export default function NotesPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[880px] px-6 pt-16 pb-24">
        <h1 className="mb-3 text-[32px] font-semibold tracking-tight">Notes</h1>
        <p className="mb-8 max-w-[580px] leading-relaxed text-body">
          Everyday commands I use at work, up to seven per topic. Replace anything in angle brackets.
        </p>
        <NotesTabs />
      </main>
      <Footer />
    </>
  )
}
