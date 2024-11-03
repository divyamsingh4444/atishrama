// middleware.js (at the root of your project)
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const token = await getToken({ req,secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = "/auth/signin";
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}
