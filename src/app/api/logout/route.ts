import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    // Clear the session cookie
    cookies().delete('session');

    // Redirect or return a success message
    return NextResponse.json({ message: "Logged out successfully" });
}