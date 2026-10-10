// Everything except /api/* is served straight from ./out by the assets layer (see wrangler.jsonc).
// /api/room/<code> opens a WebSocket into one Durable Object per room code: the Hayatta Kal co-op relay.

const MAX = 4;
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
    if (ids.length >= MAX) {
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

export default {
  fetch(req, env) {
    const m = new URL(req.url).pathname.match(/^\/api\/room\/([A-Z0-9]{4,8})$/);
    if (m) return env.ROOMS.get(env.ROOMS.idFromName(m[1])).fetch(req);
    return env.ASSETS.fetch(req);
  },
};
