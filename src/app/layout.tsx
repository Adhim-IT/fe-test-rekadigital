import type React from "react"
import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
import "./globals.css"
import ReduxProvider from "@/components/providers/redux-provider"

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "arial"],
  preload: true,
})

export const metadata: Metadata = {
  title: "Customer Management Dashboard",
  description: "Manage your customers with ease",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body 
        className={`${quicksand.variable} font-quicksand antialiased`}
        style={{ fontFamily: 'Quicksand, system-ui, arial' }}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}