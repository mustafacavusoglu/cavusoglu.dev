import type { Metadata } from "next"
import { Header, Footer } from "@/components/header"
import { GameGrid } from "@/components/games"

// Not linked from the header or sitemap: only reachable by typing /games (like /hmdb).

export const metadata: Metadata = {
  title: "Games – Mustafa Çavuşoğlu",
  description: "Small browser games: Avcı Kasap, Yörünge, Nebula Front, Hayatta Kal and Sessiz Film. No sign-up, progress stays in your browser.",
  robots: { index: false, follow: false },
}

export default function GamesPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[880px] px-5 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24">
        <h1 className="mb-3 text-[28px] font-semibold tracking-tight sm:text-[32px]">Games</h1>
        <p className="mb-8 max-w-[580px] leading-relaxed text-body">
          Games I build on the side. They run in the browser, no sign-up; your progress stays on your device.
        </p>
        <GameGrid />
      </main>
      <Footer />
    </>
  )
}
