import React from "react";
import Link from "next/link";
import { Home, Layers } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center py-24 px-4 text-center bg-white">
      <div className="max-w-md mx-auto space-y-6">
        <p className="text-4xl font-bold font-mono text-[#0057FF]">404</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#050505] tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The requested route or resource does not exist or may have been relocated during our platform modernization.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-105 rounded-xl transition-all inline-flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#0057FF] rounded-xl transition-colors inline-flex items-center justify-center gap-2"
          >
            <Layers className="w-3.5 h-3.5 text-[#0057FF]" />
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
