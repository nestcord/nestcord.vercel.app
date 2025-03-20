import { ChatContainer } from "@/components/messages/Chat-Container"
import {Aside} from "@/components/navigation/Aside"
import Sidebar from "@/components/navigation/Sidebar"
import Feed from "@/components/status/Feed"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Home | Nestcord",
    description:
        "Nestcord is a modern social platform to connect, chat, and share with friends—anytime, anywhere.",
}

export default function Home() {
    return (
        <main className="min-h-screen bg-white text-black dark:bg-background dark:text-white">
            
            <div className="mx-auto flex max-w-7xl">
                <Sidebar />
                <Feed />
                <Aside />
            </div>

            <ChatContainer />
        </main>
    )
}
