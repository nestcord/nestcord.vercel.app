import { fetchStatus } from "@/components/actions/Fetch-Status"

import Sidebar from "@/components/navigation/Sidebar"
import {Aside} from "@/components/navigation/Aside"
import { Statuscomment } from "@/components/status/Status-Comment"
import { ChatContainer } from "@/components/messages/Chat-Container"

export default async function Status({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const status = await fetchStatus(id);
    if (status) {
        return (
            <main className="min-h-screen bg-white text-black dark:bg-background dark:text-white">
            

            <div className="mx-auto flex max-w-7xl">
                <Sidebar />
                <Statuscomment id={status.id} />
                <Aside />
            </div>

            <ChatContainer />
        </main>
        )
    }

    
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const status = await fetchStatus(id)
    return {
        title: `On Nestcord: "${status?.content}"`,
    }
}
