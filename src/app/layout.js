"use client";
import { Inter } from 'next/font/google'
import './globals.css'
import { useEffect } from 'react'
import { initWeb5 } from '@/store/Store';

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }) {
  useEffect(()=>{
    initWeb5()
  }, [])
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
