// Cloudflare Access signs every request it lets through (Cf-Access-Jwt-Assertion). The API checks that
// signature itself, so a path missing from the Access app, or any other way around Access, still gets 403.
// Returns the signed-in email, or null.

const dec = (s) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));
const json = (s) => JSON.parse(new TextDecoder().decode(dec(s)));
let keys = [];

async function key(team, kid, fetchFn) {
  let k = keys.find((x) => x.kid === kid);
  if (!k) {
    // Access rotates its keys every few weeks: refetch when we meet an unknown one
    keys = (await (await fetchFn(`https://${team}.cloudflareaccess.com/cdn-cgi/access/certs`)).json()).keys ?? [];
    k = keys.find((x) => x.kid === kid);
  }
  return k && crypto.subtle.importKey("jwk", k, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
}

export async function accessEmail(req, team, aud, fetchFn = fetch) {
  const jwt = req.headers.get("cf-access-jwt-assertion");
  if (!jwt || !team || !aud) return null;
  try {
    const [h, p, s] = jwt.split(".");
    const head = json(h);
    if (head.alg !== "RS256") return null;
    const k = await key(team, head.kid, fetchFn);
    if (!k || !(await crypto.subtle.verify("RSASSA-PKCS1-v1_5", k, dec(s), new TextEncoder().encode(`${h}.${p}`)))) return null;
    const c = json(p);
    const ok = c.iss === `https://${team}.cloudflareaccess.com` && [].concat(c.aud).includes(aud) && c.exp * 1000 > Date.now();
    return ok && c.email ? c.email : null;
  } catch {
    return null;
  }
}
