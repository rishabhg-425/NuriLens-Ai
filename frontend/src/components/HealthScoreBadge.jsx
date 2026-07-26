import React from "react";
import { ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";

export default function HealthScoreBadge({ score = 85, grade = "Good", color = "green", size = "md" }) {
  const getColors = () => {
    if (color === "green" || score >= 75) {
      return {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        text: "text-emerald-400",
        ring: "stroke-emerald-400",
        glow: "shadow-emerald-500/20",
        icon: ShieldCheck
      };
    }
    if (color === "yellow" || score >= 50) {
      return {
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        text: "text-amber-400",
        ring: "stroke-amber-400",
        glow: "shadow-amber-500/20",
        icon: AlertTriangle
      };
    }
    return {
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
      text: "text-rose-400",
      ring: "stroke-rose-400",
      glow: "shadow-rose-500/20",
      icon: ShieldAlert
    };
  };

  const style = getColors();
  const Icon = style.icon;

  const strokeDashoffset = 283 - (283 * score) / 100;

  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${style.bg} ${style.border} ${style.glow} shadow-xl relative overflow-hidden group`}>
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* SVG Progress Ring */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-slate-800"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            className={`${style.ring} transition-all duration-1000 ease-out`}
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-extrabold text-3xl tracking-tight ${style.text}`}>
            {score}
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-400">/ 100</span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-semibold">
        <Icon className={`w-3.5 h-3.5 ${style.text}`} />
        <span className={style.text}>{grade}</span>
      </div>
    </div>
  );
}
