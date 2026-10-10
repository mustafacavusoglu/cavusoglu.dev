import type { Metadata } from "next"
import { Header, Footer } from "@/components/header"
import { GameGrid } from "@/components/games"

export const metadata: Metadata = {
  title: "Games – Mustafa Çavuşoğlu",
  description: "Small browser games: Avcı Kasap, Yörünge, Nebula Front and Hayatta Kal. No sign-up, progress stays in your browser.",
}

export default function GamesPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[880px] px-6 pt-16 pb-24">
        <h1 className="mb-3 text-[32px] font-semibold tracking-tight">Games</h1>
        <p className="mb-8 max-w-[580px] leading-relaxed text-body">
          Games I build on the side. They run in the browser, no sign-up; your progress stays on your device.
        </p>
        <GameGrid />
      </main>
      <Footer />
    </>
  )
}
