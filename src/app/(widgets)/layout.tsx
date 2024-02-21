import React from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@radix-ui/themes/styles.css';
import { Flex, Heading } from '@radix-ui/themes';
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Northeastern University Library',
    description: 'Oakland Campus',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                {children}
            </body>
        </html>
    )
}
