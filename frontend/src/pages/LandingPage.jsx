import React from "react";
import { Sparkles, Scan, ShieldAlert, Award, ArrowRight, CheckCircle2, HeartPulse, Zap, BookOpen, Layers } from "lucide-react";

export default function LandingPage({ onStartScan, onSelectPreset, setActiveTab }) {
  return (
    <div className="space-y-20 py-6">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 rounded-3xl glass-panel-glow px-6 sm:px-12">
        {/* Glow backdrop decorative spheres */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Public Health Nutrition Intelligence
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Decode Packaged Food Labels <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              In Plain, Simple Language
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Snap a photo of any food product label. NutriLens extracts nutrition facts, translates chemical additives, flags health risks matched to your personal medical profile, and suggests healthier food alternatives.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onStartScan}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
            >
              <Scan className="w-5 h-5" />
              Scan a Label Now
            </button>

            <button
              onClick={() => setActiveTab("awareness")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 glass-panel border border-slate-700 hover:border-slate-500 text-white font-semibold text-sm rounded-2xl transition-all hover:bg-slate-800/60"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Explore Additive Directory
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-slate-800/80 text-left">
            <div>
              <p className="text-2xl font-bold text-emerald-400">50+</p>
              <p className="text-xs text-slate-400">Harmful Additives Flagged</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-teal-400">100%</p>
              <p className="text-xs text-slate-400">Plain English Translation</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cyan-400">Instant</p>
              <p className="text-xs text-slate-400">Allergen Safety Match</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-400">0-100</p>
              <p className="text-xs text-slate-400">Personalized Health Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Try Demo Presets Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Try Instant Sample Scans</h2>
          <p className="text-xs text-slate-400">Test NutriScan instantly without uploading a photo</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              id: "preset_soda",
              title: "Fruit Punch Soda",
              desc: "High Fructose Corn Syrup + Red 40 Dye",
              score: 28,
              badge: "Red 40 & HFCS",
              color: "border-rose-500/40 text-rose-400 bg-rose-500/10"
            },
            {
              id: "preset_cereal",
              title: "Crispy Choco Cereal",
              desc: "16g Added Sugar + BHT Preservative",
              score: 42,
              badge: "High Sugar & BHT",
              color: "border-amber-500/40 text-amber-400 bg-amber-500/10"
            },
            {
              id: "preset_chips",
              title: "Spicy Nacho Chips",
              desc: "420mg Sodium + MSG + Artificial Dyes",
              score: 35,
              badge: "MSG & High Sodium",
              color: "border-rose-500/40 text-rose-400 bg-rose-500/10"
            },
            {
              id: "preset_granola",
              title: "Honey Almond Granola",
              desc: "Whole oats, natural honey, high fiber",
              score: 88,
              badge: "Clean Whole Food",
              color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
            }
          ].map((preset) => (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 cursor-pointer group transition-all hover:-translate-y-1 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${preset.color}`}>
                  {preset.badge}
                </span>
                <span className="font-extrabold text-sm text-slate-300">Score: {preset.score}</span>
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                {preset.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{preset.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Run Health Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works feature grid */}
      <section className="space-y-8 pt-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white">How NutriScan Protects Your Health</h2>
          <p className="text-xs text-slate-400">Four intelligent layers working together on every scan</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-sm text-white">AI Vision & OCR</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extracts raw text from ingredient panels and nutrition facts tables automatically.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-sm text-white">Jargon Translator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Converts complex terms like "BHA", "Red 40", or "Sodium Nitrite" into plain, easy explanations.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-sm text-white">Medical Profile Match</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Checks every ingredient against your registered medical conditions (Hypertension, Diabetes, PCOS, Celiac).
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="font-bold text-sm text-white">Healthier Alternatives</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Recommends cleaner, less processed whole-food substitutes with higher health scores.
            </p>
          </div>
        </div>
      </section>

      {/* Social Impact & Public Health Literacy Mission Banner */}
      <section className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 space-y-6">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
          <Award className="w-4 h-4" />
          Public Health Literacy & Social Impact Mission
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-2xl font-bold text-white">
              Democratizing Food Transparency for Everyone
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Over 70% of packaged foods in supermarkets contain ultra-processed additives, artificial colors, and hidden sugars disguised under technical chemical names. NutriScan empowers general consumers, elderly individuals, and parents to shop with complete clarity.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Aligned with WHO Nutrition Guidelines</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Advertising / Unbiased Scoring</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Protects Sensitive Allergy & Medical Profiles</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
