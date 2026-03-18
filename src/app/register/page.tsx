"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Building, IdCard, CheckCircle2 } from "lucide-react";

export default function Register() {
  const [complete, setComplete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setComplete(true);
  };

  if (complete) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-sm text-center border border-slate-100 flex flex-col items-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Registration Submitted!</h2>
        <p className="text-slate-600 mb-8">
          Your details have been received. An administrator will review your application shortly.
        </p>
        <button onClick={() => setComplete(false)} className="text-blue-600 font-medium hover:text-blue-700 underline underline-offset-4">Submit another profile</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full mt-10 p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Member Registration</h1>
        <p className="text-slate-600 mt-3 leading-relaxed">Join the DDA Portal to access the directory, participate in elections, and generate your ID card.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
             <label className="text-sm font-semibold text-slate-700">Full Name</label>
             <div className="relative group">
                <User className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input required type="text" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="John Doe" />
             </div>
          </div>
          <div className="space-y-2">
             <label className="text-sm font-semibold text-slate-700">Email Address</label>
             <div className="relative group">
                <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input required type="email" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="john@example.com" />
             </div>
          </div>
          <div className="space-y-2">
             <label className="text-sm font-semibold text-slate-700">Phone Number</label>
             <div className="relative group">
                <Phone className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input required type="tel" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="+1 (555) 000-0000" />
             </div>
          </div>
          <div className="space-y-2">
             <label className="text-sm font-semibold text-slate-700">Organization / Company</label>
             <div className="relative group">
                <Building className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input type="text" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="Acme Corp" />
             </div>
          </div>
        </div>

        <div className="space-y-2">
           <label className="text-sm font-semibold text-slate-700">Registration Number / ID (if known)</label>
           <div className="relative group">
              <IdCard className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input type="text" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="DDA-2024-XXXX" />
           </div>
        </div>

        <div className="space-y-2">
           <label className="text-sm font-semibold text-slate-700">Residential Address</label>
           <div className="relative group">
              <MapPin className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <textarea required rows={3} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none" placeholder="123 Portal Ave..." />
           </div>
        </div>

        <div className="space-y-2 pt-2">
           <label className="text-sm font-semibold text-slate-700">Profile Picture / ID Scan</label>
           <div className="relative group">
              <input type="file" accept="image/*,.pdf" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:transition-colors file:cursor-pointer" />
           </div>
           <p className="text-xs text-slate-500 mt-1">Upload a clear photo for your digital ID card.</p>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all focus:ring-4 focus:ring-blue-100 shadow mt-8">
          Submit Registration Application
        </button>
      </form>
    </div>
  );
}
