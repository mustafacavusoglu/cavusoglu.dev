import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old pages folded into the single-page home and the notes page
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/experiences", destination: "/#experience", permanent: true },
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/category/:slug", destination: "/mynotes", permanent: true },
      { source: "/mynotes/:path+", destination: "/mynotes", permanent: true },
    ];
  },
};

export default nextConfig;
