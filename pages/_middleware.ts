import { NextResponse } from "next/server"
import { COOKIE_NAME } from "../lib/consts"

const signedInPages = ['/', '/playlist', '/library'] //pages to protect

export default function middleware(req) {
    if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
        const token = req.cookies[COOKIE_NAME]

        if (!token) {
            return NextResponse.redirect('/signin')
        }
    }
}
