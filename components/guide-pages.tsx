import Link from "next/link"
import { Header, Footer } from "@/components/header"
import { GuideMarkdown } from "@/components/guide-markdown"
import type { ContentItem } from "@/lib/content"

// Layout for the llm-d guides, built from the same pieces as /mynotes: Header, 880px column, ink/body/line tokens.
const main = "mx-auto max-w-[880px] px-5 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24"
const back = "mb-8 inline-block text-sm text-muted hover:text-ink"

export function GuideListing({ title, items }: { title: string; items: ContentItem[] }) {
  return (
    <>
      <Header />
      <main className={main}>
        <Link href="/mynotes" className={back}>
          ← Notes
        </Link>
        <h1 className="mb-3 text-[28px] font-semibold tracking-tight sm:text-[32px]">{title}</h1>
        <p className="mb-8 max-w-[580px] leading-relaxed text-body">
          Notes on benchmarking LLM inference with llm-d-benchmark, from the first install to DeepSeek V4.1 Flash on 32 GPUs.
        </p>
        <ol className="list-none border-t border-line-soft">
          {items.map((item) => (
            <li key={item.slug} className="border-b border-line-soft">
              <Link href={`/mynotes/${item.category.toLowerCase()}/${item.slug}`} className="group block py-5 sm:py-6">
                <div className="mb-1 font-semibold text-ink group-hover:text-accent">{item.title}</div>
                <div className="text-sm leading-relaxed text-[#5a5a63]">{item.description}</div>
              </Link>
            </li>
          ))}
        </ol>
      </main>
      <Footer />
    </>
  )
}

export function GuideDetail({ item, siblings }: { item: ContentItem; siblings: ContentItem[] }) {
  const index = siblings.findIndex((s) => s.slug === item.slug)
  const prev = siblings[index - 1]
  const next = siblings[index + 1]
  const href = (s: ContentItem) => `/mynotes/${s.category.toLowerCase()}/${s.slug}`
  // The markdown opens with its own "# Title"; the page header already shows the title.
  const body = item.content.replace(/^#\s.*\n+/, "")

  return (
    <>
      <Header />
      <main className={main}>
        <Link href={`/mynotes/${item.category.toLowerCase()}`} className={back}>
          ← {item.category}
        </Link>
        <h1 className="mb-3 max-w-[680px] text-[28px] leading-[1.2] font-semibold tracking-tight sm:text-[32px]">{item.title}</h1>
        <p className="mb-4 max-w-[620px] leading-relaxed text-body">{item.description}</p>
        <p className="mb-10 border-b border-line pb-8 font-mono text-[13px] text-muted">{item.tags.join(" · ")}</p>

        <article className="max-w-[760px]">
          <GuideMarkdown content={body} />
        </article>

        {(prev || next) && (
          <nav className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-sm sm:flex-row sm:justify-between">
            {prev ? (
              <Link href={href(prev)} className="text-body hover:text-ink">
                <span className="block text-muted">Previous</span>
                {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={href(next)} className="text-body hover:text-ink sm:text-right">
                <span className="block text-muted">Next</span>
                {next.title}
              </Link>
            )}
          </nav>
        )}
      </main>
      <Footer />
    </>
  )
}
