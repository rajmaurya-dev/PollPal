import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/navbar'
import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ weight: ["400"], subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'PollPal',
  description: 'Fun Project',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={poppins.className}>
        <div className="main">
          <div className='gradient' />
        </div>
        <main className="app">
          <Navbar />
          <Toaster />
          {children}
        </main>
      </body>
    </html>
  )
}
