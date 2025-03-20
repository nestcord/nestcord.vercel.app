"use server"

import { createClient } from "@/lib/db"

export async function reportPost(status_id: string, author: string) {
    const db = await createClient()

    try {
        // Realiza un upsert, asegurándote de que onConflict tenga un solo valor de tipo string
        const { data, error } = await db
        .from("reports")
        .upsert({
            status_id: status_id,
            author: author,
            onConflict: status_id,
        })
        // Si hubo un error al insertar o hacer upsert, lo manejamos
        if (error) {
            console.error("Error reporting the post:", error)
            return false
        }

        // Si no hubo datos en el resultado, eso significa que ya se había reportado el post
        if (!data || data === 0) {
            return false
        }

        return true
    } catch (error) {
        console.error("Unexpected error while reporting the post:", error)
        return false
    }
}
