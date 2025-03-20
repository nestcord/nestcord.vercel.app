"use server"

import { createClient } from "@/lib/db"

export async function deletePost(id: string) {
    const db = await createClient()

    await db.from("status").delete().eq("id", id)

    return true
}
