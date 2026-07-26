import React from "react";
import { AlertTriangle, Heart, Shield, Award } from "lucide-react";

export default function Footer({ onOpenDisclaimer }) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 text-slate-400 py-10 px-4 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand & Purpose */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              🥗
            </div>
            <span className="font-bold text-lg text-white">NutriLens AI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-md">
            An open public health initiative designed to promote global nutrition literacy. NutriLens uses AI vision and medical knowledge bases to empower consumers to read food labels, avoid harmful ultra-processed additives, and prevent chronic lifestyle diseases.
          </p>
          <div className="flex items-center gap-4 pt-2 text-[11px] text-slate-500">
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-emerald-400" /> Non-commercial Public Health Project</span>
            <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-emerald-400" /> Academic & Social Impact Submission</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Public Literacy</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#who" className="hover:text-emerald-400 transition-colors">WHO Daily Sugar & Sodium Limits</a></li>
            <li><a href="#additives" className="hover:text-emerald-400 transition-colors">Additives & E-Numbers Directory</a></li>
            <li><a href="#tricks" className="hover:text-emerald-400 transition-colors">Decoding Marketing Claims</a></li>
            <li><button onClick={onOpenDisclaimer} className="text-amber-400 hover:underline">Medical Disclaimer</button></li>
          </ul>
        </div>

        {/* Disclaimer Box */}
        <div className="p-4 rounded-xl glass-panel border-amber-500/20 bg-amber-500/5">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            Medical Disclaimer
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            NutriLens provides automated informational nutrition analysis. It is not intended as a substitute for professional medical advice, clinical diagnosis, or dietary treatment.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <p>© 2026 NutriLens Public Health Project. Built with AI & Public Nutrition Intelligence.</p>
        <div className="flex items-center gap-1 text-slate-400">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          <span>for healthier communities</span>
        </div>
      </div>
    </footer>
  );
}
