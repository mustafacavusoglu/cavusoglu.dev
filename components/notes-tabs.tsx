"use client"

import { useState } from "react"
import { notes, topics } from "@/lib/notes"

export function NotesTabs() {
  const [topic, setTopic] = useState(topics[0])

  return (
    <>
      <div role="tablist" aria-label="Topics" className="flex flex-wrap gap-2 border-b border-line pb-6">
        {topics.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={t === topic}
            onClick={() => setTopic(t)}
            className={
              "min-h-11 cursor-pointer rounded-md border px-4 text-sm " +
              (t === topic ? "border-ink bg-ink font-medium text-white" : "border-zinc-300 bg-white text-body hover:text-ink")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <ol className="list-none">
        {notes[topic].map((n) => (
          <li key={n.title} className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line-soft py-6">
            <div className="min-w-0 flex-[1_1_260px]">
              <div className="mb-1 font-semibold">{n.title}</div>
              <div className="text-sm leading-relaxed text-[#5a5a63]">{n.why}</div>
            </div>
            <pre className="m-0 min-w-0 flex-[1_1_420px] whitespace-pre-wrap break-words rounded-md border border-[#ebebee] bg-code px-3.5 py-3 font-mono text-[13px] leading-relaxed text-ink">
              {n.cmd}
            </pre>
          </li>
        ))}
      </ol>
    </>
  )
}
