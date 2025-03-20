"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Search, Bell, Mail, User, MoreHorizontal } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useUser } from "@/contexts/UserContext"
import { SidebarProfile } from "./sidebar/Sidebar-Profile"
import SidebarCreatePost from "../status/Sidebar-Create-Post"
import Image from "next/image"
import { usePathname } from "next/navigation"
export default function Sidebar() {
  const isMobile = useIsMobile()
  const { user } = useUser()
  const [expanded] = useState(true)

  const navItems = [
    { icon: Home, label: "Home", href: "/home" },
    { icon: Search, label: "Explore", href: "/explore" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: Mail, label: "Messages", href: "/messages" },
    { icon: User, label: "Profile", href: `/${user?.username}` },
    { icon: MoreHorizontal, label: "More options", href: "#" },
  ]


  const pathname = usePathname()
  
  return (
    <div
      className={`sticky top-0 h-screen ${isMobile ? "w-[70px]" : expanded ? "w-[275px]" : "w-[88px]"} flex-shrink-0 py-2 pr-2 border-r`}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full p-3">
                <Link href="/">
                <Image src="/assets/NestcordAppIcon.webp" alt="Logo" width={80} height={80} />
                </Link>
          </div>
          <nav className="space-y-1">
          {navItems.map((item) => {
  const isActive = pathname === item.href;

  return (
    <Link
      key={item.label}
      href={item.href}
      className={`flex items-center gap-4 rounded-full p-5 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors ${
        isActive ? "font-bold text-black dark:text-white" : ""
      }`}
    >
      <item.icon className="h-7 w-7" />
      {expanded && !isMobile && <span className="text-xl">{item.label}</span>}
    </Link>
  );
})}

          </nav>
          <div >
            {expanded && !isMobile ? <SidebarCreatePost /> : <SidebarCreatePost />}
          </div>
        </div>

        <SidebarProfile />
      </div>
    </div>
  )
}