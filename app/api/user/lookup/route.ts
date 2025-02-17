import { NextResponse } from 'next/server'

import { createClient } from "@/lib/db";

export async function GET() {

    const db = await createClient();

    const { data: userData } = await db.auth.getUser();
    
    const query = db
    .from("users")
    .select("id, name, username, avatar")
    .neq("id", userData.user?.id)
    .limit(4);

    const { data } = await query;

    return NextResponse.json({ data }, { status: 200 });
}