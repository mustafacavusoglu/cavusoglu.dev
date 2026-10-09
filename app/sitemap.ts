export const dynamic = "force-static"

import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/games", "/mynotes"].map((path) => ({
    url: `https://cavusoglu.dev${path}`,
  }))
}
