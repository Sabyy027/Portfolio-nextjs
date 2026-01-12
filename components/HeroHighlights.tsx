'use client';

import React from 'react';
import { ShieldCheck, GraduationCap, MapPin } from 'lucide-react';

export const HeroHighlights = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-12 border-t border-b border-white/5 py-8 bg-zinc-950/30 backdrop-blur-sm rounded-3xl">
      
      {/* Certification */}
      <div className="flex flex-col items-center justify-center text-center gap-3 p-4 group cursor-default relative">
         <div className="absolute inset-0 bg-green-500/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <div className="relative h-14 w-14 bg-green-900/20 text-green-400 rounded-2xl flex items-center justify-center border border-green-500/20 group-hover:border-green-500/50 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
            <ShieldCheck size={28} />
         </div>
         <div className="relative">
            <h3 className="text-zinc-200 font-bold text-sm md:text-base">Certified Fullstack Dev</h3>
            <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-wider font-mono mt-1.5 font-medium">GUVI (IIT-M Pravartak Incubated)</p>
         </div>
      </div>

      {/* Degree */}
      <div className="flex flex-col items-center justify-center text-center gap-3 p-4 border-t md:border-t-0 md:border-l border-white/5 group cursor-default relative">
         <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <div className="relative h-14 w-14 bg-blue-900/20 text-blue-400 rounded-2xl flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <GraduationCap size={28} />
         </div>
         <div className="relative">
            <h3 className="text-zinc-200 font-bold text-sm md:text-base">B.Tech CSE</h3>
            <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-wider font-mono mt-1.5 font-medium">Graduate 2025</p>
         </div>
      </div>

      {/* Location */}
      <div className="flex flex-col items-center justify-center text-center gap-3 p-4 border-t md:border-t-0 md:border-l border-white/5 group cursor-default relative">
         <div className="absolute inset-0 bg-purple-500/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <div className="relative h-14 w-14 bg-purple-900/20 text-purple-400 rounded-2xl flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/50 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
            <MapPin size={28} />
         </div>
         <div className="relative">
            <h3 className="text-zinc-200 font-bold text-sm md:text-base">Chennai, India</h3>
            <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-wider font-mono mt-1.5 font-medium">Open to Relocate</p>
         </div>
      </div>

    </div>
  );
};
