import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"

const mainFont = Roboto({
  subsets: ["cyrillic-ext"],
  preload: true,
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nalaikh City Development Corporation",
  description:
    "Green Nalaikh – Eco-friendly urban development and sustainable city initiatives.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="mn">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${mainFont.className} antialiased bg-background`}>
        {children}
      </body>
    </html>
  )
}
