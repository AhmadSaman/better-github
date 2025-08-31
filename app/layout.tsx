import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import NavDock from '@/components/nav-dock'
import { cookies } from 'next/headers'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Better Github',
    description:
        'A lightweight web app that uses the GitHub API to fetch repositories and users with advanced filtering, helpful UI components for fast exploration.',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const cookieStore = await cookies()
    const theme = cookieStore.get('theme')?.value

    return (
        <html lang="en" className={theme === 'dark' ? 'dark' : ''}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-[radial-gradient(#80808080_0.05px,transparent_1px)] [background-size:12px_12px] antialiased`}
            >
                {children}
                <NavDock />
            </body>
        </html>
    )
}
