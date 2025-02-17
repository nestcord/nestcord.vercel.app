"use client"

import Link from "next/link"
import Image from "next/image"
import { db } from "@/lib/client"

import { Button } from "@/components/ui/button"
import { Apple } from "lucide-react"

export default function App() {
    const handleSession = async () => {
        await db.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "https://nestcord.vercel.app/auth/callback",
            },
        })
    }
    return (
        <main className="grid min-h-screen grid-rows-[1fr,auto]">
            <div className="min-h-screen flex flex-col">
                {/* Header */}
                <header className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-10">
                        <Link href="/">
                            <Image
                                src="/assets/NestcordAppIcon.webp"
                                alt="Favicon"
                                width={50}
                                height={50}
                            />
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => handleSession()}
                            className="bg-[#1D9BF0] hover:bg-[#1A8CD8] text-sm font-medium"
                        >
                            Sign Up
                        </Button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 px-4 md:px-8 lg:px-16 py-8">
                    <div className="max-w-lg">
                        <h1 className="text-sm font-medium text-neutral-950 mb-3 dark:text-white">
                            What&apos;s happening now?
                        </h1>
                        <h2 className="text-3xl font-bold mb-8">
                            Join Nestcord today.
                        </h2>

                        <div className="space-y-4 max-w-xs">
                            <Button
                                onClick={() => handleSession()}
                                variant="outline"
                                className="w-full bg-white hover:bg-neutral-50 border border-neutral-200 text-black font-medium flex items-center justify-center gap-2
              dark:bg-white"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 48 48">
                                    <path
                                        fill="#4285F4"
                                        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
                                    />
                                </svg>
                                Sign up with Google
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full bg-white hover:bg-neutral-50 border border-neutral-200 text-black font-medium flex items-center justify-center gap-2
              dark:bg-white"
                                disabled={true}
                            >
                                <Apple className="w-5 h-5" />
                                Sign up with Apple
                            </Button>

                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-px bg-neutral-200" />
                                <span className="text-sm text-neutral-500">
                                    or
                                </span>
                                <div className="flex-1 h-px bg-neutral-200" />
                            </div>

                            <p className="text-xs text-neutral-500">
                                By signing up, you agree to the{" "}
                                <Link
                                    href="/terms"
                                    className="text-[#1D9BF0] hover:underline"
                                >
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href="/policy"
                                    className="text-[#1D9BF0] hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="px-4 py-3 text-xs text-neutral-500">
                    <nav className="flex flex-wrap gap-x-4 gap-y-2">
                        <span>© 2024 Nestcord.</span>
                    </nav>
                </footer>
            </div>
        </main>
    )
}
