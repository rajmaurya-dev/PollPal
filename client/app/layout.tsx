import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/navbar'
import { Toaster } from 'react-hot-toast'
import HydrationZustand from './HydrationZustand'
const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ weight: ["400"], subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'PollPal |  An AI Powered Polling App',
  description: 'Create polls with a tap, let AI do the rest. PollPal makes sharing opinions fun and effortless with your friend squad',
  keywords: ['poll', 'polling', 'AI', 'opinion', 'friends', 'fun', 'share', 'create', 'vote', 'pollpal', 'poll pal'
  ],
  openGraph: {
    url: "https://pollpal.vercel.app",
    type: "website",
    title: "PollPal |  An AI Powered Polling App",
    description: "Create polls with a tap, let AI do the rest. PollPal makes sharing opinions fun and effortless with your friend squad",
    images: [
      {
        url: "poll-pal.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "PollPal",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PollPal |  An AI Powered Polling App",
    description: "Create polls with a tap, let AI do the rest. PollPal makes sharing opinions fun and effortless with your friend squad",
    creator: "@rajmauryafr",
    images: [
      {
        url: "poll-pal.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "PollPal",
      }
    ]
  },
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
        <HydrationZustand>
          <main className="app">
            <Navbar />
            <Toaster />
            {children}
          </main>
        </HydrationZustand >
      </body>
    </html>
  )
}
