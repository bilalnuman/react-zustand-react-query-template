import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        return NextResponse.json({ status: 200, message: "Token retrieved successfully", token });
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