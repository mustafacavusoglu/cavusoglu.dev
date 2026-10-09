import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"

const plexSans = IBM_Plex_Sans({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--font-plex-sans" })
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://cavusoglu.dev"),
  title: "Mustafa Çavuşoğlu – ML / MLOps Engineer",
  description: "Personal website and portfolio of Mustafa Çavuşoğlu, ML / MLOps Engineer. Experience, open-source projects and technical notes on Linux, Docker, Git and Kubernetes.",
  authors: [{ name: "Mustafa Çavuşoğlu", url: "https://cavusoglu.dev" }],
  openGraph: {
    type: "profile",
    url: "https://cavusoglu.dev",
    title: "Mustafa Çavuşoğlu – ML / MLOps Engineer",
    description: "Personal website and portfolio of Mustafa Çavuşoğlu, ML / MLOps Engineer.",
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
