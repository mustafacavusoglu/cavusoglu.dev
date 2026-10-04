import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

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
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
