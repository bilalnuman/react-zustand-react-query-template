import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("accessToken");
        return NextResponse.json({ status: 200, message: "Logged out successfully" });
    } catch (error) {

        return NextResponse.json(
            {
                message:
                    error instanceof Error ? error.message : "Failed to logout",
            },
            { status: 500 }
        );
    }
}