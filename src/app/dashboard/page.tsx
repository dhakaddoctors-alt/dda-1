import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FileText, Download, LayoutDashboard, Shield, Activity, Share2 } from "lucide-react";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const user = session.user;

  return (
    <div className="max-w-6xl mx-auto w-full pt-6 pb-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
           <LayoutDashboard className="w-8 h-8 text-blue-600" /> My Dashboard
        </h1>
        <p className="text-slate-600 mt-2 text-lg">Welcome back, {user.name}. Manage your profile and access member benefits.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left column - ID Card */}
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <Shield className="w-5 h-5 text-blue-600" /> Digital ID Card
              </h2>
              
              {/* ID Card component */}
              <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-12 blur-2xl"></div>
                 <div className="flex justify-between items-start mb-8 relative z-10">
                    <div>
                       <div className="font-bold text-lg tracking-wider opacity-90">DDA PORTAL</div>
                       <div className="text-xs text-blue-200 mt-1 uppercase font-medium tracking-widest">Official Member</div>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-lg backdrop-blur-sm flex justify-center items-center">
                       <FileText className="w-6 h-6 text-white" />
                    </div>
                 </div>
                 <div className="relative z-10">
                    <p className="text-xs text-blue-200 uppercase tracking-widest mb-1">Name</p>
                    <p className="text-xl font-bold mb-4">{user.name}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <p className="text-xs text-blue-200 uppercase tracking-widest mb-1">Member ID</p>
                          <p className="font-mono text-sm tracking-widest">DDA-24-{user.id?.slice(0,4)?.toUpperCase() || "ADMIN"}</p>
                       </div>
                       <div>
                          <p className="text-xs text-blue-200 uppercase tracking-widest mb-1">Status</p>
                          <p className="text-sm font-semibold text-green-300 flex items-center gap-1.5">
                             <span className="w-2 h-2 rounded-full bg-green-400"></span> Active
                          </p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="mt-6 flex gap-3">
                 <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-xl font-medium transition-colors">
                    <Download className="w-4 h-4" /> Download
                 </button>
                 <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-xl font-medium transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                 </button>
              </div>
           </div>
        </div>

        {/* Right column - Activity */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <Activity className="w-5 h-5 text-blue-600" /> Recent Activity
              </h2>
              <div className="space-y-6">
                 <div className="flex gap-4 border-b border-slate-100 pb-6">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                       <Shield className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="font-medium text-slate-900">Account Verified</p>
                       <p className="text-sm text-slate-500 mt-1">Your member profile has been fully verified and approved by administrators.</p>
                       <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-wider">Oct 12, 2024</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                       <FileText className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="font-medium text-slate-900">Registration Application Submitted</p>
                       <p className="text-sm text-slate-500 mt-1">You submitted your initial application to join the DDA portal.</p>
                       <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-wider">Oct 10, 2024</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
