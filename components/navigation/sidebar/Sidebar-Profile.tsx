"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/UserContext"
import { MoreHorizontal } from "lucide-react"

import EditProfile from "@/components/profile/Edit-Profile";

import Link from "next/link";

export function SidebarProfile() {
    const { user } = useUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center justify-between w-full p-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                    <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                            <AvatarImage
                                src={user?.avatar}
                                alt={`${user?.name}'s avatar`}
                            />
                            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                        </Avatar>

                        <div className="hidden xl:block text-left">
                            <p className="text-sm font-medium">{user?.name}</p>
                            <p className="text-xs text-gray-500">
                                @{user?.username}
                            </p>
                        </div>
                    </div>

                    <MoreHorizontal className="hidden xl:block" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
                <Link href={`${user?.username}`}>
                    <DropdownMenuItem>@{user?.username} profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                    <EditProfile />
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                    Cerrar sesión
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
