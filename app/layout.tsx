import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Nilkanth Holidays - Best Travel Agency in Ahmedabad | Tour Operator & Travel Consultant',
  description: 'Discover world-class tours across India and internationally. Nilkanth Holidays is the best travel agency in Ahmedabad offering tour packages, flight booking, visa consultancy, and customized holiday packages for honeymoon, family trips, and corporate tours.',
  keywords: 'best travel agency in Ahmedabad, tour operator Ahmedabad, travel consultant Ahmedabad, tour package Ahmedabad, honeymoon package from Ahmedabad, Kashmir tour, Goa package, Kerala package, Dubai tour package, Maldives honeymoon package, international travel agency Ahmedabad, visa consultant Ahmedabad, flight booking Ahmedabad, family vacation packages Ahmedabad, group tour packages, religious tour packages, corporate tour planner Ahmedabad, travel agency Ahmedabad, trip planner Ahmedabad, vacation planner Ahmedabad, travel booking agency Ahmedabad, cheap travel packages, Manali package, Bali package, Thailand package, Europe tour package',
  generator: 'v0.app',
  robots: 'index, follow',
  openGraph: {
    title: 'Nilkanth Holidays - Best Travel Agency in Ahmedabad | Tour Operator & Holiday Packages',
    description: 'Expert travel planning and tour packages from Ahmedabad. Offering international and domestic tours, visa consultancy, flight bookings, and customized holiday experiences.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://nilkanthholidays.in',
  },
  icons: {
    icon: [
      {
        url: '/images/okk.png',
        type: 'image/png',
      },
    ],
    apple: '/images/okk.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://nilkanthholidays.in" />
        <link rel="preload" as="image" href="/images/abc.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Nilkanth Holidays',
              description: 'Best Travel Agency in Ahmedabad - Tour Operator & Travel Consultant',
              image: 'https://nilkanthholidays.com/logo.png',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Ahmedabad',
                addressRegion: 'Gujarat',
                addressCountry: 'India'
              },
              sameAs: [
                'https://www.instagram.com/nilkanthholidays.in'
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
