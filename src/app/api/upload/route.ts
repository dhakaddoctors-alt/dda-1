import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const env = getRequestContext().env as any;
    const bucket = env.R2;
    
    if (!bucket) {
      return NextResponse.json({ error: "R2 Storage not bound" }, { status: 500 });
    }

    const buffer = await file.arrayBuffer();
    const extension = file.name.split('.').pop() || 'png';
    const filename = `profile-${Date.now()}.${extension}`;

    await bucket.put(filename, buffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    // Replace with your actual R2 public URL
    const url = `https://pub-your-r2-dev-url.r2.dev/${filename}`;

    return NextResponse.json({ url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
