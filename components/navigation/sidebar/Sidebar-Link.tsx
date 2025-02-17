"use client"

import type { NavLink } from "@/components/navigation/Sidebar"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

type SidebarLinkProps = NavLink

export function SidebarLink({ href, name, icon }: SidebarLinkProps) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition justify-center xl:justify-start",
                isActive && "font-bold text-black dark:text-white"
            )}
        >
            <span>{icon}</span>
            <span className="hidden xl:block">{name}</span>
        </Link>
    )
}
