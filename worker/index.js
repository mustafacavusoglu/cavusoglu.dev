// Everything except /api/* is served straight from ./out by the assets layer (see wrangler.jsonc).
// /api/room/<code> opens a WebSocket into one Durable Object per room code: the relay for Hayatta Kal co-op
// and Sessiz Film races (which prefix their codes with SF).
// /api/hmdb/* is the hidden /hmdb film log: one Durable Object ("hmdb") holds every film and its ratings.
// /api/words is the /words flashcard progress: one Durable Object per signed-in email.
// /api/resume holds the /resume CVs (Markdown), also one Durable Object per signed-in email.
// All three sit behind Cloudflare Access; see access.js. Two read-only exceptions stay open: /api/filmler (the hmdb
// list) and /api/cv (the one CV Mustafa marked public in /resume).

import { DurableObject } from "cloudflare:workers";
import { accessEmail } from "./access.js";

const MAX = 4; // default room size; a game may ask for up to 5 with ?max=
const pid = (ws) => ws.deserializeAttachment();

// A dumb relay: stamps each message with the sender's id and passes it on (to everyone else, or to
// `to`). The lowest connected id is the host, whose game is authoritative for the world.
export class Room {
  constructor(ctx) {
    this.ctx = ctx;
  }

  fetch(req) {
    if (req.headers.get("Upgrade") !== "websocket") return new Response("WebSocket only", { status: 426 });
    const { 0: client, 1: server } = new WebSocketPair();
    const ids = this.ctx.getWebSockets().map(pid);
    const max = Math.min(5, Number(new URL(req.url).searchParams.get("max")) || MAX);
    if (ids.length >= max) {
      server.accept();
      server.send('{"t":"full"}');
      server.close(4000, "full");
      return new Response(null, { status: 101, webSocket: client });
    }
    const id = Math.max(0, ...ids) + 1; // ids only grow, so the lowest id is always the longest-connected player
    this.ctx.acceptWebSocket(server);
    server.serializeAttachment(id);
    server.send(JSON.stringify({ t: "hello", id, host: Math.min(id, ...ids), peers: ids }));
    this.broadcast(server, JSON.stringify({ t: "join", id }));
    return new Response(null, { status: 101, webSocket: client });
  }

  webSocketMessage(ws, data) {
    if (typeof data !== "string") return;
    let m;
    try {
      m = JSON.parse(data);
    } catch {
      return;
    }
    m.from = pid(ws);
    const out = JSON.stringify(m);
    for (const s of this.ctx.getWebSockets()) if (s !== ws && (m.to == null || pid(s) === m.to)) trySend(s, out);
  }

  webSocketClose(ws) {
    this.leave(ws);
  }

  webSocketError(ws) {
    this.leave(ws);
  }

  leave(ws) {
    const rest = this.ctx.getWebSockets().filter((s) => s !== ws);
    if (!rest.length) return;
    this.broadcast(ws, JSON.stringify({ t: "leave", id: pid(ws), host: Math.min(...rest.map(pid)) }));
  }

  broadcast(from, msg) {
    for (const s of this.ctx.getWebSockets()) if (s !== from) trySend(s, msg);
  }
}

function trySend(ws, msg) {
  try {
    ws.send(msg);
  } catch {}
}

const OWNER = "mustafacavussoglu@gmail.com"; // already public on the site itself

// ---- hmdb ----

// Access only lets two Gmail accounts in, so anyone who isn't Mustafa is Hilal (keeps her address out of this public repo).
// ponytail: breaks the day a third email is added to the Access app; map emails in a secret then.
const hmdbUser = (email) => (email === OWNER ? "Mustafa" : "Hilal");

// Film records live under "m:<imdb id>": { id, title, year, image, imdb, added, ratings: { Hilal: { score, comment, at } } }
export class Hmdb extends DurableObject {
  async list() {
    return [...(await this.ctx.storage.list({ prefix: "m:" })).values()].sort((a, b) => b.added - a.added);
  }
  async add(film) {
    const old = await this.ctx.storage.get("m:" + film.id);
    await this.ctx.storage.put("m:" + film.id, old ? { ...old, imdb: film.imdb ?? old.imdb } : { ...film, added: Date.now(), ratings: {} });
    return this.list();
  }
  async rate(id, user, rating) {
    const film = await this.ctx.storage.get("m:" + id);
    if (film) await this.ctx.storage.put("m:" + id, { ...film, ratings: { ...film.ratings, [user]: rating } });
    return this.list();
  }
  async remove(id) {
    await this.ctx.storage.delete("m:" + id);
    return this.list();
  }
}

// IMDb's own search box endpoint: title, year, poster. No rating, so that comes from its GraphQL API.
async function imdbSearch(q) {
  const r = await fetch(`https://v3.sg.media-imdb.com/suggestion/x/${encodeURIComponent(q.toLowerCase())}.json`);
  const { d = [] } = await r.json();
  return d
    .filter((x) => /^tt\d+$/.test(x.id) && ["movie", "tvSeries", "tvMiniSeries", "tvMovie"].includes(x.qid))
    .map((x) => ({ id: x.id, title: x.l, year: x.y ?? null, image: x.i?.imageUrl ?? null }));
}

async function imdbRating(id) {
  try {
    const r = await fetch("https://graphql.imdb.com/", {
      method: "POST",
      headers: { "content-type": "application/json", "x-imdb-client-name": "imdb-web-next-localized" },
      body: JSON.stringify({ query: `{ title(id: "${id}") { ratingsSummary { aggregateRating } } }` }),
    });
    return (await r.json()).data?.title?.ratingsSummary?.aggregateRating ?? null;
  } catch {
    return null; // a film without an IMDb score still gets saved
  }
}

const hmdbDb = (env) => env.HMDB.get(env.HMDB.idFromName("hmdb"));

async function hmdb(req, env, path, user) {
  const db = hmdbDb(env);
  const json = (data, status = 200) => Response.json(data, { status, headers: { "cache-control": "no-store" } });
  const bad = (msg) => json({ error: msg }, 400);

  if (req.method === "GET" && path === "") return json(await db.list());
  if (req.method === "GET" && path === "/me") return json({ user });
  if (req.method === "GET" && path === "/search") {
    const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
    return json(q.length < 2 ? [] : (await imdbSearch(q.slice(0, 60))).slice(0, 8));
  }
  if (req.method !== "POST") return json({ error: "not found" }, 404);

  let b;
  try {
    b = await req.json();
  } catch {
    return bad("bad json");
  }
  if (!/^tt\d{1,10}$/.test(b?.id)) return bad("bad id");

  if (path === "/add") {
    const film = (await imdbSearch(b.id)).find((x) => x.id === b.id);
    if (!film) return bad("not on IMDb");
    return json(await db.add({ ...film, imdb: await imdbRating(b.id) }));
  }
  if (path === "/rate") {
    const score = Math.round(Number(b.score) * 10) / 10; // one decimal: 1.0 … 10.0
    const comment = typeof b.comment === "string" ? b.comment.trim() : "";
    if (!(score >= 1 && score <= 10)) return bad("score must be 1-10");
    if (comment.length > 200) return bad("comment max 200");
    return json(await db.rate(b.id, user, { score, comment, at: Date.now() }));
  }
  if (path === "/remove") return json(await db.remove(b.id));
  return json({ error: "not found" }, 404);
}

// ---- words ----

// Keys: "w:<word>" -> [box, due ms, right, wrong]; "d:<YYYY-MM-DD>" -> [answered, right]
export class Words extends DurableObject {
  async get() {
    const s = {}, log = {};
    for (const [k, v] of await this.ctx.storage.list()) (k[0] === "w" ? s : log)[k.slice(2)] = v;
    return { s, log };
  }
  async put(entries) {
    for (let i = 0; i < entries.length; i += 128) await this.ctx.storage.put(Object.fromEntries(entries.slice(i, i + 128)));
  }
  async reset() {
    await this.ctx.storage.deleteAll();
  }
}

const nums = (v, n) => Array.isArray(v) && v.length === n && v.every((x) => Number.isFinite(x) && x >= 0);

async function words(req, db, path) {
  const json = (data, status = 200) => Response.json(data, { status, headers: { "cache-control": "no-store" } });
  if (req.method === "GET" && path === "") return json(await db.get());
  if (req.method === "POST" && path === "/reset") return await db.reset(), json({ ok: true });
  if (req.method !== "POST" || path !== "") return json({ error: "not found" }, 404);
  let b;
  try {
    b = await req.json();
  } catch {
    return json({ error: "bad json" }, 400);
  }
  const s = Object.entries(b?.s ?? {}), log = Object.entries(b?.log ?? {});
  if (s.length + log.length > 6000) return json({ error: "too many" }, 400);
  if (!s.every(([w, v]) => w.length <= 40 && nums(v, 4)) || !log.every(([d, v]) => /^\d{4}-\d\d-\d\d$/.test(d) && nums(v, 2)))
    return json({ error: "bad entry" }, 400);
  await db.put([...s.map(([w, v]) => ["w:" + w, v]), ...log.map(([d, v]) => ["d:" + d, v])]);
  return json({ ok: true });
}

// ---- resume ----

// Keys: "r:<id>" -> { id, name, md, fit (squeeze onto one page), size (text %, 80-120), updated }
// "pub" -> id of the CV shown at /cv (only ever set in the owner's object)
export class Resumes extends DurableObject {
  async list() {
    return [...(await this.ctx.storage.list({ prefix: "r:" })).values()].sort((a, b) => b.updated - a.updated);
  }
  async pub() {
    return (await this.ctx.storage.get("pub")) ?? null;
  }
  async publish(id) {
    await this.ctx.storage.put("pub", id);
  }
  async published() {
    const id = await this.pub();
    return id ? ((await this.ctx.storage.get("r:" + id)) ?? null) : null;
  }
  async save(doc) {
    await this.ctx.storage.put("r:" + doc.id, doc);
    return doc;
  }
  async remove(id) {
    await this.ctx.storage.delete("r:" + id);
  }
}

async function resume(req, db, path, owner) {
  const json = (data, status = 200) => Response.json(data, { status, headers: { "cache-control": "no-store" } });
  if (req.method === "GET" && path === "") return json(await db.list());
  // the live CV behind /cv: edits show up there without publishing again
  if (path === "/pub") {
    if (req.method === "GET") return json({ id: owner ? await db.pub() : null, can: owner });
    if (req.method !== "PUT" || !owner) return json({ error: "owner only" }, 403);
    const id = (await req.json().catch(() => null))?.id;
    if (!/^[a-z0-9]{8,32}$/.test(id)) return json({ error: "bad id" }, 400);
    return await db.publish(id), json({ id, can: true });
  }
  const id = path.match(/^\/([a-z0-9]{8,32})$/)?.[1];
  if (!id) return json({ error: "not found" }, 404);
  if (req.method === "DELETE") return await db.remove(id), json({ ok: true });
  if (req.method !== "PUT") return json({ error: "not found" }, 404);
  let b;
  try {
    b = await req.json();
  } catch {
    return json({ error: "bad json" }, 400);
  }
  const name = typeof b?.name === "string" ? b.name.trim() : "";
  if (!name || name.length > 80) return json({ error: "name 1-80 chars" }, 400);
  if (typeof b.md !== "string" || b.md.length > 100_000) return json({ error: "md max 100k" }, 400);
  const size = Number.isInteger(b.size) && b.size >= 80 && b.size <= 120 ? b.size : 100;
  return json(await db.save({ id, name, md: b.md, fit: b.fit === true, size, updated: Date.now() }));
}

// `wrangler dev` has no Access in front of it; Cloudflare never routes a real request with this hostname.
const signedIn = (req, env) =>
  new URL(req.url).hostname === "localhost" ? "dev@localhost" : accessEmail(req, env.ACCESS_TEAM, env.ACCESS_AUD);

export default {
  async fetch(req, env) {
    const path = new URL(req.url).pathname;
    const m = path.match(/^\/api\/room\/([A-Z0-9]{4,8})$/);
    if (m) return env.ROOMS.get(env.ROOMS.idFromName(m[1])).fetch(req);
    // /filmler and /cv: public, read-only, outside Access on purpose; GET only.
    if (path === "/api/filmler" && req.method === "GET")
      return Response.json(await hmdbDb(env).list(), { headers: { "cache-control": "public, max-age=60" } });
    if (path === "/api/cv" && req.method === "GET") {
      const cv = await env.RESUMES.get(env.RESUMES.idFromName(OWNER)).published();
      return cv ? Response.json({ name: cv.name, md: cv.md, fit: cv.fit, size: cv.size }, { headers: { "cache-control": "public, max-age=60" } })
        : Response.json({ error: "none" }, { status: 404 });
    }
    const area = path.match(/^\/api\/(hmdb|words|resume)(\/.*)?$/);
    if (area) {
      const email = await signedIn(req, env);
      if (!email) return Response.json({ error: "sign in" }, { status: 403 });
      const sub = area[2] ?? "", me = email.toLowerCase();
      if (area[1] === "hmdb") return hmdb(req, env, sub, hmdbUser(me));
      if (area[1] === "resume") return resume(req, env.RESUMES.get(env.RESUMES.idFromName(me)), sub, me === OWNER);
      return words(req, env.WORDS.get(env.WORDS.idFromName(me)), sub);
    }
    return env.ASSETS.fetch(req);
  },
};
