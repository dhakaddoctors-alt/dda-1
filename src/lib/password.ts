const HASH_PREFIX = "pbkdf2_sha256";
const ITERATIONS = 120_000;
const KEY_LENGTH = 32;

function bytesToBase64(bytes: Uint8Array) {
  return Buffer.from(bytes).toString("base64");
}

function base64ToBytes(value: string) {
  return new Uint8Array(Buffer.from(value, "base64"));
}

function toArrayBuffer(bytes: Uint8Array) {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

async function derivePassword(password: string, salt: Uint8Array, iterations: number) {
  const passwordBytes = new TextEncoder().encode(password);
  const keyMaterial = await crypto.subtle.importKey("raw", toArrayBuffer(passwordBytes), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: toArrayBuffer(salt),
      iterations,
    },
    keyMaterial,
    KEY_LENGTH * 8
  );

  return new Uint8Array(bits);
}

function timingSafeEqual(left: Uint8Array, right: Uint8Array) {
  if (left.length !== right.length) {
    return false;
  }

  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left[index] ^ right[index];
  }

  return diff === 0;
}

export async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derivePassword(password, salt, ITERATIONS);
  return `${HASH_PREFIX}$${ITERATIONS}$${bytesToBase64(salt)}$${bytesToBase64(hash)}`;
}

export async function verifyPassword(password: string, storedHash: string | null | undefined) {
  if (!storedHash) {
    return false;
  }

  const [prefix, iterationsText, saltText, hashText] = storedHash.split("$");
  if (prefix !== HASH_PREFIX || !iterationsText || !saltText || !hashText) {
    return false;
  }

  const iterations = Number.parseInt(iterationsText, 10);
  if (!Number.isFinite(iterations) || iterations <= 0) {
    return false;
  }

  const derived = await derivePassword(password, base64ToBytes(saltText), iterations);
  return timingSafeEqual(derived, base64ToBytes(hashText));
}
