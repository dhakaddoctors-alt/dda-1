import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 text-center animate-in fade-in duration-500">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-8 shadow-sm">
        <ShieldCheck className="w-4 h-4" />
        Official DDA Member Portal
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
        Connect, Engage, & <br/> <span className="text-blue-600">Empower Our Community</span>
      </h1>
      
      <p className="max-w-2xl text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
        The unified platform for dynamically registering members, accessing the directory, and participating in governing body elections.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Link href="/register" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all focus:ring-4 focus:ring-blue-100">
          Join the Network <ArrowRight className="w-5 h-5" />
        </Link>
        <Link href="/directory" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all">
          <Users className="w-5 h-5" /> Browse Directory
        </Link>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl mt-8 text-left">
        {[
          { icon: Users, title: "Member Directory", desc: "Search and connect with registered members seamlessly." },
          { icon: ShieldCheck, title: "Secure Governance", desc: "Participate in transparent elections for the governing body." },
          { icon: FileText, title: "Digital ID Cards", desc: "Generate and access your official digital ID card instantly." }
        ].map((feat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 mb-6">
              <feat.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h3>
            <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
