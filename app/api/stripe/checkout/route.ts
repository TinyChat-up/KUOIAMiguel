import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ ok: false, message: "Stripe desactivado en este playground." }, { status: 400 });
}
