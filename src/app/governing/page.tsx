import { User, Gavel, Calendar, Archive, FileText } from "lucide-react";

const governingMembers = [
  { name: "Robert Patterson", role: "President", term: "2024 - 2026", contact: "pres@ddaportal.org" },
  { name: "Linda Evans", role: "Vice President", term: "2024 - 2026", contact: "vp@ddaportal.org" },
  { name: "James Carter", role: "Secretary", term: "2023 - 2025", contact: "sec@ddaportal.org" },
];

export default function GoverningBody() {
  return (
    <div className="max-w-6xl mx-auto w-full pt-6 pb-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Governing Body</h1>
        <p className="text-slate-600 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
          Meet the dedicated team elected to oversee the operations and strategic direction of the DDA.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {governingMembers.map((member, i) => (
          <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-10 group-hover:bg-blue-100 transition-colors"></div>
            <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 text-slate-300 flex items-center justify-center shadow-sm mb-6 z-10">
              <User className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h3>
            <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
            
            <div className="w-full pt-6 mt-2 border-t border-slate-100 flex flex-col gap-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-500"><Calendar className="w-4 h-4"/> Term</span>
                <span className="font-medium text-slate-900">{member.term}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-500"><FileText className="w-4 h-4"/> Contact</span>
                <span className="font-medium text-slate-900">{member.contact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-lg relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent"></div>
         <Gavel className="w-12 h-12 mx-auto mb-6 text-blue-200" />
         <h2 className="text-3xl font-bold mb-4">Upcoming Elections</h2>
         <p className="text-blue-100 max-w-xl mx-auto mb-8 text-lg">
           The next election cycle for the governing body will commence in October 2025. Registered members will be able to cast their votes directly through this portal.
         </p>
         <button className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl shadow-sm hover:scale-105 transition-transform focus:ring-4 focus:ring-blue-400">
           View Election Rules
         </button>
      </div>
    </div>
  );
}
