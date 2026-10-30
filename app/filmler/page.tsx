import type { Metadata } from "next";
import { Hmdb } from "@/components/hmdb";

// Public, read-only copy of /hmdb (which stays behind Access for adding and rating).
export const metadata: Metadata = {
  title: "Filmler",
  description: "Hilal & Mustafa'nın izlediği filmler ve puanları",
};

export default function FilmlerPage() {
  return (
    <main className="mx-auto max-w-[880px] px-5 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24">
      <h1 className="font-mono text-[28px] font-semibold tracking-tight sm:text-[32px]">
        hmdb
      </h1>
      <p className="mt-2 mb-8 text-body">
        Hilal &amp; Mustafa&apos;nın izlediği filmler.
      </p>
      <Hmdb readOnly />
    </main>
  );
}
