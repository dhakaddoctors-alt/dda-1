import { NextResponse } from "next/server";
import type { Session } from "next-auth";
import { auth } from "@/auth";
import { approveMember } from "@/lib/members";

export const runtime = "edge";

export async function POST(request: Request) {
  let session: Session | null = null;

  try {
    session = (await auth()) as Session | null;
  } catch {
    session = null;
  }

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { memberId?: string };
    if (!body.memberId) {
      return NextResponse.json({ error: "Member id is required." }, { status: 400 });
    }

    await approveMember(body.memberId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Approval failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
