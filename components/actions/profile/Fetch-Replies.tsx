"use server"
import { createClient } from "@/lib/db"
export async function fetchProfileReplies(id: string) {
  const db = await createClient()

  // Aquí, seleccionamos los datos de la tabla `status` relacionados con los likes
  const { data: likes, error } = await db
    .from("status_replies")
    .select("id, status(id, author, content, attachment, comments, views, likes, created_at, updated_at), author(*)") // Selecciona todos los campos de la tabla `status` usando `status(*)`
    .eq("author", id) // Filtra por el `user_id`

    console.log(likes)
  if (error) {
    console.error("Error al obtener los likes:", error)
    return null
  }

  return likes
}
