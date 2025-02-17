"use server";

import { createClient } from "@/lib/db";

/**
 * Server function to update the view count of a status.
 * This function updates the view count for a given status in the database.
 * 
 * @param {string} id - The unique identifier for the status.
 * @param {number} views - The new view count for the status.
 * @param {string} authorId - The unique identifier for the author of the status.
 * 
 * @returns {Promise<void>} - A promise that resolves when the status is updated.
 * @throws {Error} If there is an error during the database operation.
 */

export async function updateStatusViews(id: string, views: number, authorId: string) {
    const db = await createClient();

    const viewsNumber = Number(views);

    await db
        .from("status")
        .upsert({ 
            id: id, 
            views: viewsNumber,
            author: authorId
        })
        .select() 
        .single();

    return true;
}