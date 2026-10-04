import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/mynotes"].map((path) => ({
    url: `https://cavusoglu.dev${path}`,
  }))
}
