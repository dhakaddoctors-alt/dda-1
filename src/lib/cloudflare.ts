import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/db";

type RuntimeEnv = CloudflareEnv & {
  R2_PUBLIC_URL?: string;
};

export function getCloudflareEnv(): RuntimeEnv {
  return getRequestContext().env as RuntimeEnv;
}

export function getRuntimeDb() {
  return getDb(getCloudflareEnv());
}

export function toPublicR2Url(key: string | null) {
  if (!key) {
    return null;
  }

  const baseUrl = getCloudflareEnv().R2_PUBLIC_URL;
  if (!baseUrl) {
    return null;
  }

  return `${baseUrl.replace(/\/$/, "")}/${key}`;
}
