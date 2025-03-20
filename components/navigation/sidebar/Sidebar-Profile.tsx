"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@/contexts/UserContext"
import { MoreHorizontal, LogOut, User, Settings, Palette, Loader2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import EditProfile from "@/components/profile/Edit-Profile"
import Link from "next/link"
import { db } from "@/lib/client"
import { redirect } from "next/navigation"
export function SidebarProfile() {
  const { user, isLoading } = useUser()

  const handleSession = () => {
    db.auth.signOut()
    redirect("/")
  }

  if (isLoading) return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
  )
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="mb-4 flex items-center justify-between gap-2 rounded-full p-5 hover:bg-indigo-200 dark:hover:bg-indigo-800 cursor-pointer transition-colors">
          <div className="flex items-center gap-3 truncate">

            <Avatar className="h-10 w-10 border-2 border-transparent">
              <AvatarImage src={user?.avatar} alt={`${user?.name}'s avatar`} />
              <AvatarFallback className="bg-gray-700 text-white">{user?.name?.[0]}</AvatarFallback>
            </Avatar>

            <div className="hidden xl:block">
              <p className="font-bold text-sm leading-tight">{user?.name}</p>
              <p className="text-xs text-gray-500 leading-tight">@{user?.username}</p>
            </div>
          </div>

          <MoreHorizontal className="h-5 w-5 hidden xl:block text-gray-400" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60 bg-background border border-gray-800 text-black dark:text-white p-0 rounded-xl shadow-xl"
      >
        <div className="p-3 border-b border-gray-800">
          <p className="font-bold text-lg">{user?.name}</p>
          <p className="text-sm text-gray-500">@{user?.username}</p>
        </div>

        <Link href={`/${user?.username}`} className="block">
          <DropdownMenuItem className="hover:cursor-pointer hover:bg-gray-800 py-3 px-4 text-black dark:text-white">
            <User className="w-5 h-5 mr-3 text-black dark:text-white" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>

        <Link href="/settings" className="block">
          <DropdownMenuItem className="hover:cursor-pointer hover:bg-gray-800 py-3 px-4 text-black dark:text-white">
            <Settings className="w-5 h-5 mr-3 text-black dark:text-white" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>

        <EditProfile />

        <DropdownMenuSeparator className="border-t border-gray-800 my-1" />

        <DropdownMenuLabel className="hover:cursor-pointer  py-3 px-4 text-black dark:text-white">
  <div className="flex items-center">
    <Palette className="w-5 h-5 mr-3 text-black dark:text-white" />
    <span className="text-black dark:text-white">App Theme</span>
  </div>
</DropdownMenuLabel>


        <ThemeToggle variant="dropdown" />

        <DropdownMenuSeparator className="border-t border-gray-800 my-1" />

        <DropdownMenuItem
          className="hover:cursor-pointer hover:bg-gray-800 py-3 px-4 text-red-500"
          onClick={handleSession}
        >
          <LogOut className="w-5 h-5 mr-3 text-red-500" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


