import type { Metadata, Viewport } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { UserContextProvider } from "@/contexts/UserContext"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Nestcord",
    description:
        "Nestcord is a modern social platform to connect, chat, and share with friends—anytime, anywhere.",
    keywords: [
        "Nestcord",
        "Nestcord Web",
        "Nestcord App",
        "social network",
        "instant messaging",
        "live chats",
        "social posts",
        "online community",
        "friends online",
        "social media",
        "modern social network",
        "chat app",
        "private messages",
        "digital community",
    ],
    openGraph: {
        title: "Nestcord",
        description:
            "Nestcord is a modern social platform to connect, chat, and share with friends—anytime, anywhere.",
        url: "https://nestcord.vercel.app/",
        siteName: "Nestcord",
        locale: "en_US",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
        },
    },
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} antialiased`}>
              <UserContextProvider>
                {children}
              </UserContextProvider>
            </body>
        </html>
    )
}
