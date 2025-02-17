import { createClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const id = searchParams.get("id");
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const db = await createClient();

    let query = db
        .from("status")
        .select("id, author(id, name, username, avatar, biography, created_at), content, attachment, comments, likes, views, created_at, updated_at")
        .order("created_at", { ascending: false }) // Ordena por fecha más reciente
        .order("id", { ascending: false }) // Desempate en caso de fechas iguales
        .limit(limit + 1); // +1 para ver si hay más datos

    if (cursor) {
        const validCursor = new Date(cursor.split('.')[0]).toISOString();
        query = query.lt("created_at", validCursor); // Filtra los posts más antiguos
    }

    if (id) {
        query = query.eq("id", id);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: "Error fetching statuses" }, { status: 500 });
    }

    const hasMore = data.length > limit;
    const status = hasMore ? data.slice(0, limit) : data;
    const nextCursor = hasMore && status.length > 0 ? status[status.length - 1].created_at : null;

    return NextResponse.json({ status, nextCursor }, { status: 200 });
}
