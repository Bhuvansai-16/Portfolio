import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "B's Portfolio"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // Suppress hydration warnings caused by Grammarly extension
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}

