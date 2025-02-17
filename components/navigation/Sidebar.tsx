import Link from "next/link"
import Image from "next/image"
import { Home, Search, Bell, User, Feather } from "lucide-react"

import { SidebarLink } from "@/components/navigation/sidebar/Sidebar-Link"
import { SidebarProfile } from "@/components/navigation/sidebar/Sidebar-Profile"
export type NavLink = {
    href: string
    name: string
    icon: React.JSX.Element
}

const NavLinks: Readonly<NavLink[]> = [
    { href: "/home", name: "Home", icon: <Home size={24} /> },
    { href: "/explore", name: "Explore", icon: <Search size={24} /> },
    { href: "/notifications", name: "Notifications", icon: <Bell size={24} /> },
    { href: "/profile", name: "Profile", icon: <User size={24} /> },
]

export default function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 h-full w-20 xl:w-72 p-4 flex flex-col justify-between border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            {/* Logo */}
            <div className="flex items-center justify-center xl:justify-start mb-6">
                <Link href="/home">
                    <Image
                        src="/assets/NestcordAppIcon.webp"
                        width={40}
                        height={40}
                        alt="Nestcord Logo"
                    />
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-4">
                {NavLinks.map((link) => (
                    <SidebarLink key={link.href} {...link} />
                ))}
            </nav>

            {/* Post Button */}
            <button className="hidden xl:flex items-center justify-center gap-2 p-4 w-full bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                <p className="hidden xl:block">Post</p>
            </button>

            <SidebarProfile />

            {/* Floating Icon Button for Mobile */}
            <button className="xl:hidden fixed bottom-4 left-4 bg-blue-500 p-4 rounded-full text-white shadow-lg hover:bg-blue-600">
                <Feather size={24} />
            </button>
        </aside>
    )
}
