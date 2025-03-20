"use server"

import { createClient } from "@/lib/db"
import { UserType } from "@/lib/types"

// Función para subir el archivo al storage de Supabase
async function uploadAttachment(file: File): Promise<string | null> {
    const storage = (await createClient()).storage
    const filePath = `attachments/${file.name}`
    const { error } = await storage
      .from("attachments")
      .upload(filePath, file)
  
    if (error) {
      console.error("Error uploading file:", error)
      return null
    }
  
    const { data: publicURL } = storage
      .from("attachments")
      .getPublicUrl(filePath)
  
    console.log("Uploaded file URL:", publicURL.publicUrl)
    return publicURL.publicUrl
  }
  
export async function createPost(
    formData: FormData,
    attachment: File | null, // Usamos File en vez de string para manejar el archivo
    user: UserType | null
) {
    const content = formData.get("content") as string

    // Verificar si content y attachment están vacíos/nulos
    if (!content.trim() && !attachment) {
        return // Si ambos están vacíos o nulos, no hacer nada
    }

    let attachmentUrl = null

    // Si hay un archivo adjunto, subirlo y obtener la URL
    if (attachment) {
        attachmentUrl = await uploadAttachment(attachment)
        if (!attachmentUrl) {
            return // Si hubo un error al subir el archivo, no crear el post
        }
    }

    const statusData = {
        content: content.trim(), // Asegurarse de quitar espacios al principio y al final
        author: user?.id,
        attachment: attachmentUrl || null, // Guardar la URL del attachment en la columna 'attachment'
    }

    const db = await createClient()

    await db.from("status").insert([statusData])

    return true
}
