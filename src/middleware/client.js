import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export default async function middleware(r) {
  if (0) {
    return NextResponse.json({ message: r.url + "unauthenticated" }, { status: 401 });
  }
  return NextResponse.next();
}
