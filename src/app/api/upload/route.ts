import { NextRequest, NextResponse } from "next/server";
import { getCloudflareEnv, toPublicR2Url } from "@/lib/cloudflare";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const env = getCloudflareEnv();
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

    const url = toPublicR2Url(filename);
    if (!url) {
      return NextResponse.json(
        { error: "R2_PUBLIC_URL is not configured." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
