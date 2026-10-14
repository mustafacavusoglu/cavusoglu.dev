"use client"

import { useEffect, useState } from "react"
import { Pencil } from "lucide-react"

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
  const [open, setOpen] = useState("") // film id from the URL hash (#tt…), so the back button closes the detail view

  const run = (p: Promise<Film[]>) =>
    p.then(
      (f) => (setFilms(f), true),
      (e) => (setError(String(e.message ?? e)), false),
    )

  useEffect(() => {
    run(api(""))
    const sync = () => setOpen(location.hash.slice(1))
    sync()
    addEventListener("hashchange", sync)
    return () => removeEventListener("hashchange", sync)
  }, [])

  useEffect(() => {
    if (q.trim().length < 2) return setHits([])
    const t = setTimeout(() => api(`/search?q=${encodeURIComponent(q)}`).then(setHits).catch(() => setHits([])), 300)
    return () => clearTimeout(t)
  }, [q])

  const add = (id: string) => {
    setQ("")
    setHits([])
    run(api("/add", { id })).then((ok) => ok && (location.hash = id))
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

  const film = films?.find((f) => f.id === open)

  return (
    <div>
      <p className="-mt-5 mb-6 text-sm text-muted">
        <span className="font-medium text-ink">{me}</span> olarak ·{" "}
        <button onClick={() => setMe(null)} className="underline hover:text-ink">
          değiştir
        </button>
      </p>

      {error && (
        <p className="mb-6 text-sm text-red-600" onClick={() => setError("")}>
          {error}
        </p>
      )}

      {film ? (
        <Detail
          key={film.id}
          film={film}
          user={me}
          onRate={(r) => run(api("/rate", { id: film.id, user: me, ...r }))}
          onRemove={() => confirm(`"${film.title}" silinsin mi?`) && run(api("/remove", { id: film.id })).then(() => (location.hash = ""))}
        />
      ) : (
        <>
          <div className="relative mb-8">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="IMDb'de film ara ve ekle…"
              className="w-full rounded-lg border border-line px-4 py-3 text-[15px] outline-none focus:border-ink"
            />
            {hits.length > 0 && (
              <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-line bg-white shadow-lg">
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

          {films === null && <p className="text-muted">Yükleniyor…</p>}
          {films?.length === 0 && <p className="text-muted">Henüz film yok. Yukarıdan arayıp ekleyin.</p>}

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
            {films?.map((f) => (
              <a key={f.id} href={`#${f.id}`} className="group min-w-0">
                <Poster film={f} className="w-full transition group-hover:border-ink group-hover:shadow-md" />
                <div className="mt-2 truncate font-medium group-hover:text-accent">{f.title}</div>
                <div className="mb-2 text-sm text-muted">{f.year}</div>
                <Scores film={f} />
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function Poster({ film, className }: { film: Film; className: string }) {
  return film.image ? (
    <img src={poster(film.image, 300)} alt={`${film.title} afişi`} loading="lazy" className={`aspect-[2/3] rounded-lg border border-line object-cover ${className}`} />
  ) : (
    <div className={`aspect-[2/3] rounded-lg border border-line bg-code ${className}`} />
  )
}

/** IMDb vs our average; hovering (or tapping) ours shows who gave what. */
function Scores({ film }: { film: Film }) {
  const rated = USERS.filter((u) => film.ratings[u])
  const avg = rated.length ? rated.reduce((s, u) => s + film.ratings[u]!.score, 0) / rated.length : null
  return (
    <div className="flex flex-wrap items-center gap-1.5 font-mono text-[13px]">
      <span className="rounded-md bg-[#f5c518] px-1.5 py-0.5 font-semibold text-black">IMDb {film.imdb?.toFixed(1) ?? "–"}</span>
      <span tabIndex={0} onClick={(e) => e.preventDefault()} className="group/s relative cursor-default rounded-md bg-ink px-1.5 py-0.5 font-semibold text-white outline-none">
        Bizim {avg?.toFixed(1) ?? "–"}
        <span className="pointer-events-none absolute top-full left-0 z-10 mt-1 hidden whitespace-nowrap rounded-md border border-line bg-white px-3 py-2 text-xs font-normal text-ink shadow-lg group-hover/s:block group-focus/s:block">
          {USERS.map((u) => (
            <span key={u} className="block">
              {u}: {film.ratings[u]?.score ?? "–"}/10
            </span>
          ))}
        </span>
      </span>
    </div>
  )
}

function Detail({ film, user, onRate, onRemove }: { film: Film; user: User; onRate: (r: { score: number; comment: string }) => Promise<boolean>; onRemove: () => void }) {
  const mine = film.ratings[user]
  const [editing, setEditing] = useState(!mine)
  // Starts from what this person already gave, so saving again edits it.
  const [score, setScore] = useState(mine?.score ?? 8)
  const [comment, setComment] = useState(mine?.comment ?? "")

  return (
    <div>
      <a href="#" className="mb-6 inline-block text-sm text-muted hover:text-ink">
        ← Tüm filmler
      </a>
      <div className="flex gap-4 sm:gap-6">
        <a href={`https://www.imdb.com/title/${film.id}/`} target="_blank" rel="noreferrer" className="shrink-0">
          <Poster film={film} className="w-[110px] sm:w-[180px]" />
        </a>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-semibold leading-snug sm:text-2xl">{film.title}</h2>
          <div className="mt-1 mb-4 text-muted">{film.year}</div>
          <Scores film={film} />
        </div>
      </div>

      <h3 className="mt-10 mb-3 font-semibold">Yorumlar</h3>
      <ul className="flex flex-col gap-3">
        {USERS.map((u) => {
          const r = film.ratings[u]
          return (
            <li key={u} className="rounded-lg border border-line-soft p-3">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-medium">{u}</span>
                <span className="flex items-center gap-2 font-mono text-sm text-muted">
                  {r ? `${r.score}/10` : "henüz puan yok"}
                  {u === user && !editing && (
                    <button onClick={() => setEditing(true)} aria-label="Düzenle" title="Düzenle" className="-m-1.5 rounded-md p-1.5 hover:bg-code hover:text-ink">
                      <Pencil size={15} />
                    </button>
                  )}
                </span>
              </div>
              {r?.comment && !(u === user && editing) && <p className="mt-1 text-sm text-body">{r.comment}</p>}
              {u === user && editing && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    onRate({ score, comment }).then((ok) => ok && setEditing(false))
                  }}
                  className="mt-3 flex flex-col gap-2"
                >
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
                    <span className="flex items-center gap-3">
                      {mine && (
                        <button type="button" onClick={() => (setScore(mine.score), setComment(mine.comment), setEditing(false))} className="text-sm text-muted hover:text-ink">
                          Vazgeç
                        </button>
                      )}
                      <button className="rounded-md bg-accent px-4 py-1.5 text-sm font-medium text-white hover:bg-accent-hover">Kaydet</button>
                    </span>
                  </div>
                </form>
              )}
            </li>
          )
        })}
      </ul>

      <button onClick={onRemove} className="mt-10 text-xs text-muted hover:text-red-600">
        Filmi listeden sil
      </button>
    </div>
  )
}
