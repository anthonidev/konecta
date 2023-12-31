import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "@/styles/globals.css";
import { ProviderRedux, ProviderToast, ProviderUI } from '@/providers';
import Nav from '@/components/common/Nav';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KONECTA',
  description: 'PRUEBA TÉCNICA FRONTEND',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-100 dark:bg-gray-900 dark:text-gray-100  px-4 sm:px-6 lg:px-8 min-h-screen"}
      >
        <ProviderRedux>
          <ProviderUI>
            <main
            >
              <Nav />
              {children}
            </main>
            <ProviderToast />
          </ProviderUI>
        </ProviderRedux>
      </body>
    </html>
  )
}
