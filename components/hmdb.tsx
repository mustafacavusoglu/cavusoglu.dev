"use client"

import { useEffect, useState } from "react"

const USERS = ["Hilal", "Mustafa"] as const
type User = (typeof USERS)[number]
type Rating = { score: number; comment: string; at: number }
type Film = { id: string; title: string; year: number | null; image: string | null; imdb: number | null; ratings: Partial<Record<User, Rating>> }
type Hit = Pick<Film, "id" | "title" | "year" | "image">

const api = (path: string, body?: object) =>
  fetch(`/api/hmdb${path}`, body ? { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) } : undefined).then(
    async (r) => (r.ok ? r.json() : Promise.reject(new Error((await r.json().catch(() => ({}))).error ?? r.statusText))),
  )

// IMDb serves any width from the same URL: ._V1_.jpg → ._V1_UX<w>_.jpg
const poster = (url: string | null, w: number) => url?.replace(/\._V1_.*\.jpg$/, `._V1_UX${w}_.jpg`)

export function Hmdb() {
  const [films, setFilms] = useState<Film[] | null>(null)
  const [q, setQ] = useState("")
  const [hits, setHits] = useState<Hit[]>([])
  const [error, setError] = useState("")
  const [me, setMe] = useState<User | null>(null) // asked on every visit, never remembered

  const run = (p: Promise<Film[]>) => p.then(setFilms).catch((e) => setError(String(e.message ?? e)))

  useEffect(() => {
    run(api(""))
  }, [])

  useEffect(() => {
    if (q.trim().length < 2) return setHits([])
    const t = setTimeout(() => api(`/search?q=${encodeURIComponent(q)}`).then(setHits).catch(() => setHits([])), 300)
    return () => clearTimeout(t)
  }, [q])

  const add = (id: string) => {
    setQ("")
    setHits([])
    run(api("/add", { id }))
  }

  if (!me)
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-white px-6">
        <h2 className="text-[28px] font-semibold tracking-tight">Kimsin?</h2>
        <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
          {USERS.map((u) => (
            <button key={u} onClick={() => setMe(u)} className="flex-1 rounded-xl border border-line py-6 text-xl font-medium hover:border-ink hover:bg-ink hover:text-white">
              {u}
            </button>
          ))}
        </div>
      </div>
    )

  return (
    <div>
      <p className="-mt-5 mb-6 text-sm text-muted">
        <span className="font-medium text-ink">{me}</span> olarak ·{" "}
        <button onClick={() => setMe(null)} className="underline hover:text-ink">
          değiştir
        </button>
      </p>
      <div className="relative mb-10">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="IMDb'de film ara ve ekle…"
          className="w-full rounded-lg border border-line px-4 py-3 text-[15px] outline-none focus:border-ink"
        />
        {hits.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-line bg-white shadow-lg">
            {hits.map((h) => (
              <li key={h.id}>
                <button onClick={() => add(h.id)} className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-code">
                  {h.image ? <img src={poster(h.image, 80)} alt="" className="h-12 w-8 rounded object-cover" /> : <span className="h-12 w-8 rounded bg-code" />}
                  <span>
                    {h.title} <span className="text-muted">{h.year}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <p className="mb-6 text-sm text-red-600" onClick={() => setError("")}>
          {error}
        </p>
      )}
      {films === null && <p className="text-muted">Yükleniyor…</p>}
      {films?.length === 0 && <p className="text-muted">Henüz film yok. Yukarıdan arayıp ekleyin.</p>}

      <div className="flex flex-col gap-8">
        {films?.map((f) => (
          <FilmCard key={f.id} film={f} user={me} onRate={(r) => run(api("/rate", { id: f.id, ...r }))} onRemove={() => confirm(`"${f.title}" silinsin mi?`) && run(api("/remove", { id: f.id }))} />
        ))}
      </div>
    </div>
  )
}

function FilmCard({ film, user, onRate, onRemove }: { film: Film; user: User; onRate: (r: { user: User; score: number; comment: string }) => void; onRemove: () => void }) {
  // Starts from what this person already gave, so saving again edits it.
  const [score, setScore] = useState(film.ratings[user]?.score ?? 8)
  const [comment, setComment] = useState(film.ratings[user]?.comment ?? "")
  const rated = USERS.filter((u) => film.ratings[u])
  const avg = rated.length ? rated.reduce((s, u) => s + film.ratings[u]!.score, 0) / rated.length : null

  return (
    <article className="flex gap-4 border-t border-line-soft pt-8 first:border-0 first:pt-0 sm:gap-6">
      <a href={`https://www.imdb.com/title/${film.id}/`} target="_blank" rel="noreferrer" className="shrink-0">
        {film.image ? (
          <img src={poster(film.image, 300)} alt={`${film.title} afişi`} loading="lazy" className="aspect-[2/3] w-[96px] rounded-lg border border-line object-cover sm:w-[150px]" />
        ) : (
          <div className="aspect-[2/3] w-[96px] rounded-lg bg-code sm:w-[150px]" />
        )}
      </a>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-semibold leading-snug">
            {film.title} <span className="font-normal text-muted">{film.year}</span>
          </h2>
          <button onClick={onRemove} className="text-xs text-muted hover:text-red-600" aria-label="Filmi sil">
            sil
          </button>
        </div>

        <div className="mt-3 flex items-center gap-3 font-mono">
          <span className="rounded-md bg-[#f5c518] px-2 py-1 text-sm font-semibold text-black">IMDb {film.imdb?.toFixed(1) ?? "–"}</span>
          <span className="text-xs text-muted">vs</span>
          <span tabIndex={0} className="group relative cursor-default rounded-md bg-ink px-2 py-1 text-sm font-semibold text-white outline-none">
            Bizim {avg?.toFixed(1) ?? "–"}
            <span className="pointer-events-none absolute top-full left-0 z-10 mt-1 hidden whitespace-nowrap rounded-md border border-line bg-white px-3 py-2 text-xs font-normal text-ink shadow-lg group-hover:block group-focus:block">
              {USERS.map((u) => (
                <span key={u} className="block">
                  {u}: {film.ratings[u]?.score ?? "–"}/10
                </span>
              ))}
            </span>
          </span>
        </div>

        {rated.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {rated.map((u) => (
              <li key={u}>
                <span className="font-medium">{u}</span> <span className="font-mono text-muted">{film.ratings[u]!.score}/10</span>
                {film.ratings[u]!.comment && <span className="text-body"> · {film.ratings[u]!.comment}</span>}
              </li>
            ))}
          </ul>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onRate({ user, score, comment })
          }}
          className="mt-4 flex flex-col gap-2 rounded-lg border border-line-soft p-3"
        >
          <span className="text-sm font-medium">{user}</span>
          <label className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={10}
              step={0.1}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="flex-1 accent-ink"
              aria-label="Puan"
            />
            <span className="w-14 text-right font-mono text-sm font-semibold">{score.toFixed(1)}/10</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={200}
            rows={2}
            placeholder="Yorum (isteğe bağlı)"
            className="w-full resize-none rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-ink"
          />
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted">{comment.length}/200</span>
            <button className="rounded-md bg-accent px-4 py-1.5 text-sm font-medium text-white hover:bg-accent-hover">Kaydet</button>
          </div>
        </form>
      </div>
    </article>
  )
}
