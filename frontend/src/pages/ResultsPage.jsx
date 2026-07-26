import React from "react";
import { ShieldAlert, AlertTriangle, CheckCircle2, Sparkles, Columns, RefreshCw, BookmarkCheck, ArrowRight, HeartPulse, HelpCircle } from "lucide-react";
import HealthScoreBadge from "../components/HealthScoreBadge";

export default function ResultsPage({ analysisResult, onScanAgain, onCompareProduct }) {
  if (!analysisResult) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-slate-400 text-sm">No analysis result found.</p>
        <button
          onClick={onScanAgain}
          className="px-6 py-2.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl"
        >
          Go to Scanner
        </button>
      </div>
    );
  }

  const {
    productName,
    category,
    servingSize,
    healthScore,
    scoreGrade,
    scoreColor,
    verdict,
    macros = {},
    flaggedIngredients = [],
    positiveNotes = [],
    userAdvisories = [],
    healthierAlternatives = []
  } = analysisResult;

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            {category}
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-2">{productName}</h1>
          <p className="text-xs text-slate-400 mt-1">Serving Size: {servingSize}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onCompareProduct(productName)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-all"
          >
            <Columns className="w-4 h-4 text-emerald-400" />
            Compare Product
          </button>
          <button
            onClick={onScanAgain}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/20"
          >
            <RefreshCw className="w-4 h-4" />
            Scan New Label
          </button>
        </div>
      </div>

      {/* Main Score & Personal Advisory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Score Badge */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col items-center justify-center text-center">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Overall Health Score</h3>
          <HealthScoreBadge
            score={healthScore}
            grade={scoreGrade}
            color={scoreColor}
          />
          <p className="text-xs text-slate-300 mt-4 leading-relaxed font-medium">
            {verdict}
          </p>
        </div>

        {/* User Targeted Advisories & Positives */}
        <div className="md:col-span-2 space-y-4">
          
          {/* Targeted Profile Advisories */}
          {userAdvisories.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Personal Profile Health Conflicts
              </h3>
              {userAdvisories.map((adv, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-1 text-amber-200 text-xs shadow-lg"
                >
                  <div className="font-bold flex items-center gap-2 text-amber-300">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                    {adv.title}
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{adv.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Positive Highlights */}
          {positiveNotes.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Nutritional Highlights
              </h3>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-1.5">
                {positiveNotes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-emerald-200">
                    <span className="text-emerald-400">✓</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Macros Breakdown Table Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Nutrition Panel Breakdown</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="glass-panel p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase text-slate-400 font-semibold">Calories</span>
            <p className="text-xl font-extrabold text-white mt-1">{macros.calories || 0} kcal</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase text-slate-400 font-semibold">Added Sugars</span>
            <p className={`text-xl font-extrabold mt-1 ${(macros.addedSugar || 0) > 10 ? "text-rose-400" : "text-emerald-400"}`}>
              {macros.addedSugar || macros.totalSugar || 0}g
            </p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase text-slate-400 font-semibold">Sodium</span>
            <p className={`text-xl font-extrabold mt-1 ${(macros.sodium || 0) > 400 ? "text-rose-400" : "text-emerald-400"}`}>
              {macros.sodium || 0} mg
            </p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase text-slate-400 font-semibold">Dietary Fiber</span>
            <p className="text-xl font-extrabold text-teal-400 mt-1">{macros.fiber || 0}g</p>
          </div>
        </div>
      </div>

      {/* Flagged Ingredients & Jargon Translation List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Flagged Ingredients & Additives ({flaggedIngredients.length})
          </h2>
          <span className="text-[11px] text-slate-400">Plain English Translation</span>
        </div>

        {flaggedIngredients.length === 0 ? (
          <div className="glass-panel p-6 rounded-2xl text-center text-xs text-emerald-400 border-emerald-500/20">
            🎉 No harmful synthetic additives, artificial dyes, or excessive sugars detected!
          </div>
        ) : (
          <div className="space-y-3">
            {flaggedIngredients.map((item, idx) => {
              const isHigh = item.severity === "High";
              const isMed = item.severity === "Medium";
              return (
                <div
                  key={idx}
                  className={`glass-panel p-5 rounded-2xl border ${
                    isHigh
                      ? "border-rose-500/30 bg-rose-950/20"
                      : isMed
                      ? "border-amber-500/30 bg-amber-950/20"
                      : "border-slate-800"
                  } space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                        isHigh
                          ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                          : isMed
                          ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                          : "bg-slate-800 border-slate-700 text-slate-300"
                      }`}>
                        {item.severity} Risk
                      </span>
                      <h3 className="font-bold text-sm text-white">{item.name}</h3>
                    </div>
                    {item.category && (
                      <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Jargon Plain Language Translation */}
                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                    <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      What is it? (Simple Language)
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.jargonExplanation}</p>
                  </div>

                  <p className="text-xs text-slate-400">
                    <strong className="text-slate-300">Health Impact:</strong> {item.reason}
                  </p>

                  {item.userTrigger && (
                    <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300 text-[11px] font-semibold">
                      {item.userTrigger}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Healthier Alternatives Recommendations */}
      {healthierAlternatives.length > 0 && (
        <div className="space-y-4 pt-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Healthier Food Alternatives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {healthierAlternatives.map((alt, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {alt.badge}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400">Score: {alt.healthScore}</span>
                </div>
                <h3 className="font-bold text-sm text-white">{alt.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{alt.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
