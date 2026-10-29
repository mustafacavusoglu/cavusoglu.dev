// node worker/access.test.mjs — signs tokens with a throwaway key and checks what accessEmail accepts.
import assert from "node:assert/strict";
import { accessEmail } from "./access.js";

const team = "demo", aud = "aud-words";
const pair = await crypto.subtle.generateKey(
  { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
const jwk = { ...(await crypto.subtle.exportKey("jwk", pair.publicKey)), kid: "k1" };
const fakeFetch = async () => ({ json: async () => ({ keys: [jwk] }) });
const b64 = (x) => Buffer.from(x).toString("base64url");

async function token(claims, kid = "k1", signer = pair.privateKey) {
  const body = `${b64(JSON.stringify({ alg: "RS256", kid }))}.${b64(JSON.stringify(claims))}`;
  return `${body}.${b64(new Uint8Array(await crypto.subtle.sign("RSASSA-PKCS1-v1_5", signer, new TextEncoder().encode(body))))}`;
}
const req = (jwt) => new Request("https://cavusoglu.dev/api/words", { headers: jwt ? { "cf-access-jwt-assertion": jwt } : {} });
const good = { iss: `https://${team}.cloudflareaccess.com`, aud: [aud], exp: Date.now() / 1000 + 60, email: "me@x.dev" };
const check = async (jwt, a = aud) => accessEmail(req(jwt), team, a, fakeFetch);

assert.equal(await check(await token(good)), "me@x.dev");
assert.equal(await check(null), null, "no token");
assert.equal(await check(await token(good), "aud-hmdb"), null, "token for another app");
assert.equal(await check(await token({ ...good, exp: 1 })), null, "expired");
assert.equal(await check(await token({ ...good, iss: "https://evil.cloudflareaccess.com" })), null, "wrong team");
const other = await crypto.subtle.generateKey(
  { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign"]);
assert.equal(await check(await token(good, "k1", other.privateKey)), null, "forged signature");
const [h, , sig] = (await token(good)).split(".");
assert.equal(await check(`${h}.${b64(JSON.stringify({ ...good, email: "x@evil" }))}.${sig}`), null, "tampered claims");
assert.equal(await check("garbage"), null, "garbage");
console.log("access ok");
