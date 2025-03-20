import { useUser } from "@/contexts/UserContext"
import { useState } from "react"

import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"

import {
    EllipsisVertical,
    AtSign,
    Trash,
    Flag,
    ChartNoAxesColumn,
} from "lucide-react"
import { reportPost } from "../actions/Report-Post"
import { deletePost } from "../actions/Delete-Post"
export default function StatusCardOptions({
    author,
    username,
    id,
}: {
    author: string
    username: string
    id: string
}) {
    const { user } = useUser()
    const [open, setOpen] = useState(false) // Estado para manejar el DropdownMenu

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
    }

    const handleStatusReport = async () => {
        await reportPost(id, author).then((success) => {
            if (success) console.info("\x1b[36m%s\x1b[0m", "[LOG]", `Created report to status ${id}`);
        })
    }

    return (
        <DropdownMenu open={open} onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto max-sm:ml-0 h-8 w-8 text-gray-500 hover:text-indigo-500 hover:cursor-pointer rounded-full hover:bg-indigo-500/10"
                >
                    <EllipsisVertical className="w-8 h-8" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLabel className="text-sm font-medium">
                    Options
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <Link href={`/${username}`}>
                    <DropdownMenuItem className="hover:cursor-pointer">
                        <AtSign className="w-4 h-4" />
                        <span>@{username} Profile</span>
                    </DropdownMenuItem>
                </Link>

                <Link href={`/status/${id}/analytics`}>
                    <DropdownMenuItem className="hover:cursor-pointer">
                        <ChartNoAxesColumn className="w-4 h-4" />
                        <span>View post analytics</span>
                    </DropdownMenuItem>
                </Link>

                {author === user?.id && (
                    <DropdownMenuItem className="hover:cursor-pointer" onClick={() => deletePost(id)}>
                        <Trash className="w-4 h-4" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                )}

                {author !== user?.id && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                                className="hover:cursor-pointer"
                                onSelect={(e) => {
                                    e.preventDefault() // Previene que el menú se cierre
                                    setOpen(true) // Mantiene el menú abierto
                                }}
                            >
                                <Flag className="w-4 h-4" />
                                <span>Report</span>
                            </DropdownMenuItem>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you sure you want to report this status?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This cannot be undone. This will send a
                                    report to the moderators and it will be
                                    reviewed as soon as possible.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={handleStatusReport}>
                                    Confirm
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
