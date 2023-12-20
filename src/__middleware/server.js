import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export default async function middleware(r) {
  if (!r.url.includes("/auth")) {
    return NextResponse.next();
    return NextResponse.json({ message: r.url + "unauthenticated", token: "B" + r.headers }, { status: 401 });
  }
  return NextResponse.next();
}
