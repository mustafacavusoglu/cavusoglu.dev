import type { Metadata } from "next"
import { Hmdb } from "@/components/hmdb"

// Not linked from the header or sitemap: only reachable by typing /hmdb.
export const metadata: Metadata = {
  title: "hmdb",
  description: "Hilal & Mustafa film defteri",
  robots: { index: false, follow: false },
}

export default function HmdbPage() {
  return (
    <main className="mx-auto max-w-[880px] px-5 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24">
      <h1 className="font-mono text-[28px] font-semibold tracking-tight sm:text-[32px]">hmdb</h1>
      <p className="mt-2 mb-8 text-body">Hilal &amp; Mustafa&apos;nın izlediği filmler.</p>
      <Hmdb />
    </main>
  )
}
