"use client"

import { useState } from "react"
import { notes, topics } from "@/lib/notes"

export function NotesTabs() {
  const [topic, setTopic] = useState(topics[0])

  return (
    <>
      <div role="tablist" aria-label="Topics" className="-mx-5 flex gap-2 overflow-x-auto border-b border-line px-5 pb-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-6">
        {topics.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={t === topic}
            onClick={() => setTopic(t)}
            className={
              "min-h-10 shrink-0 cursor-pointer rounded-md border px-4 text-sm whitespace-nowrap sm:min-h-11 " +
              (t === topic ? "border-ink bg-ink font-medium text-white" : "border-zinc-300 bg-white text-body hover:text-ink")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <ol className="list-none">
        {notes[topic].map((n) => (
          <li key={n.title} className="flex flex-wrap gap-x-6 gap-y-3 border-b border-line-soft py-5 last:border-0 sm:py-6">
            <div className="min-w-0 flex-[1_1_260px]">
              <div className="mb-1 font-semibold">{n.title}</div>
              <div className="text-sm leading-relaxed text-[#5a5a63]">{n.why}</div>
            </div>
            <pre className="m-0 min-w-0 flex-[1_1_420px] overflow-x-auto rounded-md border border-[#ebebee] bg-code px-3.5 py-3 font-mono text-[13px] leading-relaxed text-ink">
              {n.cmd}
            </pre>
          </li>
        ))}
      </ol>
    </>
  )
}
