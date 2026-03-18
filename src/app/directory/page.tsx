import { Search, MapPin, Filter, CheckCircle, Mail } from "lucide-react";
import { listApprovedMembers } from "@/lib/members";

export const runtime = "edge";

export default async function Directory() {
  const members = await listApprovedMembers();

  return (
    <div className="max-w-6xl mx-auto w-full pt-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Member Directory</h1>
          <p className="text-slate-600 mt-3 text-lg">Search and connect with approved DDA members.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-3.5 top-3 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input type="text" className="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm min-w-[280px] transition-all" placeholder="Search by name, role..." />
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all font-medium">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No approved members yet.
          </div>
        ) : members.map((member) => (
          <div key={member.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between">
            <div>
               <div className="flex justify-between items-start mb-5">
               <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold text-2xl uppercase shadow-inner">
                  {member.fullName.slice(0, 2)}
               </div>
               {member.isApproved && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-100">
                     <CheckCircle className="w-3.5 h-3.5" /> Verified
                  </span>
               )}
               </div>
               <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">{member.fullName}</h3>
               <p className="text-blue-600 font-semibold text-sm mb-5">{member.organization || member.role || "Member"}</p>
            </div>
            <div className="flex flex-col gap-3 pt-5 mt-auto border-t border-slate-100">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center"><MapPin className="w-4 h-4 text-slate-500" /></div>
                <span className="font-medium">{member.address || "Address not shared"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center"><Mail className="w-4 h-4 text-slate-500" /></div>
                <span className="font-medium">{member.email || member.phone || "Contact unavailable"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
