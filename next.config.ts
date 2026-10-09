import type { NextConfig } from "next";

// Static HTML in out/, served by Cloudflare (wrangler.jsonc). Old-page redirects live in public/_redirects.
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
