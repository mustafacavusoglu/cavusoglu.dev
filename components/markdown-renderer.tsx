"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-neutral dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold tracking-tight mb-4">{children}</h1>,
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-4 border-b pb-2">{children}</h2>
          ),
          h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>,
          p: ({ children }) => <p className="leading-7 mb-4 text-foreground/90">{children}</p>,
          code: ({ className, children, ...props }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code
                  className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm text-primary"
                  {...props}
                >
                  {children}
                </code>
              )
            }
            return (
              <code className={cn("font-mono text-sm", className)} {...props}>
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="mb-4 mt-4 overflow-x-auto rounded-lg border bg-card p-4 font-mono text-sm">{children}</pre>
          ),
          ul: ({ children }) => <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>,
          li: ({ children }) => <li className="text-foreground/90">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="mt-4 border-l-4 border-primary pl-4 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-4 w-full overflow-auto">
              <table className="w-full border-collapse border">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="border bg-muted px-4 py-2 text-left font-semibold">{children}</th>,
          td: ({ children }) => <td className="border px-4 py-2">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
