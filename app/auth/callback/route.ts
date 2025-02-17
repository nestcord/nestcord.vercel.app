import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")

    const db = await createClient()

    if (code !== null) {
        await db.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(origin)
}
