import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

// Markdown styled with the site's own tokens (ink, body, line, code). Used by the llm-d guides only.
export function GuideMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="mt-12 mb-4 border-t border-line pt-8 text-[22px] leading-snug font-semibold tracking-tight text-ink first:mt-0 first:border-0 first:pt-0">
            {children}
          </h2>
        ),
        h3: ({ children }) => <h3 className="mt-9 mb-3 text-[18px] leading-snug font-semibold text-ink">{children}</h3>,
        h4: ({ children }) => <h4 className="mt-6 mb-2 text-base font-semibold text-ink">{children}</h4>,
        p: ({ children }) => <p className="mb-4 leading-[1.75] text-body">{children}</p>,
        a: ({ href, children }) => (
          <a
            href={href}
            {...(href?.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            className="text-accent underline underline-offset-2 hover:text-accent-hover"
          >
            {children}
          </a>
        ),
        strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
        ul: ({ children }) => <ul className="my-4 ml-5 list-disc space-y-1.5 leading-[1.75] text-body marker:text-muted">{children}</ul>,
        ol: ({ children }) => <ol className="my-4 ml-5 list-decimal space-y-1.5 leading-[1.75] text-body marker:text-muted">{children}</ol>,
        hr: () => <hr className="my-10 border-line" />,
        blockquote: ({ children }) => (
          <blockquote className="my-6 border-l-2 border-line pl-4 text-body [&>p]:mb-2 [&>p:last-child]:mb-0">{children}</blockquote>
        ),
        // Fenced blocks arrive as <pre><code>; inline code has no language class and no newline.
        code: ({ className, children }) => {
          const isBlock = /language-/.test(className ?? "") || String(children).includes("\n")
          return isBlock ? (
            <code className="font-mono">{children}</code>
          ) : (
            <code className="rounded bg-code px-1.5 py-0.5 font-mono text-[0.875em] text-ink">{children}</code>
          )
        },
        pre: ({ children }) => (
          <pre className="my-5 overflow-x-auto rounded-md border border-line bg-code px-4 py-3.5 font-mono text-[13px] leading-relaxed text-ink">
            {children}
          </pre>
        ),
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => <th className="border-b border-line px-3 py-2.5 font-medium whitespace-nowrap text-ink">{children}</th>,
        td: ({ children }) => <td className="border-b border-line-soft px-3 py-2.5 align-top leading-relaxed text-body">{children}</td>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
