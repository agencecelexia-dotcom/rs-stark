import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { FavoritesProvider } from '@/lib/favorites-context'
import FloatingContact from '@/components/layout/FloatingContact'

const heading = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const code = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-code',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "RS Stark — Automobiles d'Exception",
  description: "Concession automobile premium. Véhicules d'exception sélectionnés avec rigueur.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${heading.variable} ${body.variable} ${code.variable}`}>
      <body>
        <FavoritesProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingContact />
        </FavoritesProvider>
      </body>
    </html>
  )
}
