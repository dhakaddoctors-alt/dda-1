import Link from "next/link";
import { ShieldAlert, LayoutDashboard, Users } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-blue-600" />
            <Link href="/" className="font-bold text-xl tracking-tight text-slate-800">
              DDA<span className="text-blue-600">Portal</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/directory" className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              <Users className="w-4 h-4" /> Directory
            </Link>
            <Link href="/governing" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Governing Body
            </Link>
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200">
              <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-3 py-1.5 rounded-md">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link href="/api/auth/signin" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Sign In</Link>
              <Link href="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all font-semibold">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
