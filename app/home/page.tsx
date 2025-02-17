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
      <main className="flex w-full max-w-6xl mx-auto gap-0">
        <Sidebar />
        <div className="flex-1 px-4">
          <Feed />
        </div>
      </main>
    );
  }
  