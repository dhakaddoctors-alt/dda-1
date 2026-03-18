import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { members, users } from "@/db/schema";
import { getCloudflareEnv, getRuntimeDb } from "@/lib/cloudflare";
import { hashPassword } from "@/lib/password";

export const runtime = "edge";

function makeRegistrationNumber() {
  const year = new Date().getUTCFullYear();
  const token = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  return `DDA-${year}-${token}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fullName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const phone = String(formData.get("phone") ?? "").trim();
    const organization = String(formData.get("organization") ?? "").trim();
    const registrationNumber = String(formData.get("registrationNumber") ?? "").trim() || makeRegistrationNumber();
    const address = String(formData.get("address") ?? "").trim();
    const fileEntry = formData.get("file");

    if (!fullName || !email || !password || !phone || !address) {
      return NextResponse.json({ error: "Missing required registration fields." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    const db = getRuntimeDb();
    const [existingUser] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
    if (existingUser) {
      return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    }

    let photoUrl: string | null = null;
    if (fileEntry instanceof File && fileEntry.size > 0) {
      const env = getCloudflareEnv();
      const extension = fileEntry.name.includes(".") ? fileEntry.name.split(".").pop() ?? "bin" : "bin";
      photoUrl = `member-uploads/${crypto.randomUUID()}.${extension}`;
      await env.R2.put(photoUrl, await fileEntry.arrayBuffer(), {
        httpMetadata: {
          contentType: fileEntry.type || "application/octet-stream",
        },
      });
    }

    const userId = crypto.randomUUID();
    await db.insert(users).values({
      id: userId,
      name: fullName,
      email,
      passwordHash: await hashPassword(password),
      role: "member",
    });

    await db.insert(members).values({
      userId,
      fullName,
      organization: organization || null,
      phone,
      address,
      registrationNumber,
      photoUrl,
      isApproved: false,
    });

    return NextResponse.json({
      ok: true,
      registrationNumber,
      message: "Registration submitted. Sign in after your account is approved.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
