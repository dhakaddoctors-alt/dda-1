import { auth } from "@/auth";

export default function middleware(req: any) {
  // Authentication disabled temporarily for Edge debugging
  return;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
