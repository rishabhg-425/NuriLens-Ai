import React from "react";
import { AlertTriangle, X, ShieldCheck, HeartPulse } from "lucide-react";

export default function DisclaimerModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel max-w-md w-full rounded-2xl border border-amber-500/30 p-6 space-y-4 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            NutriLens Public Health & Medical Advisory
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong className="text-white">Informational & Educational Use Only:</strong> NutriLens is an AI-powered public health platform designed to increase nutrition literacy and raise awareness of harmful chemical additives in packaged foods.
          </p>
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-1.5 text-amber-200">
            <div className="flex items-center gap-1.5 font-semibold">
              <HeartPulse className="w-4 h-4 text-amber-400" />
              Not a Medical Device or Treatment
            </div>
            <p className="text-[11px] text-amber-200/80">
              Analysis provided by this system does not constitute medical advice, clinical diagnosis, or prescriptive dietary treatment for allergies or chronic conditions.
            </p>
          </div>
          <p>
            Users with severe food allergies (e.g. anaphylactic peanut or shellfish sensitivity) or chronic conditions should always double-check physical label packaging and consult a registered dietitian or licensed physician.
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
}
