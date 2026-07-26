import React, { useState, useEffect } from "react";
import { BookOpen, Search, ShieldAlert, AlertTriangle, CheckCircle2, Sparkles, HelpCircle, Info } from "lucide-react";
import API from "../utils/api";

export default function AwarenessPage() {
  const [additives, setAdditives] = useState([]);
  const [awarenessInfo, setAwarenessInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [addRes, tipRes] = await Promise.all([
        API.get("/tips/additives"),
        API.get("/tips/awareness")
      ]);
      setAdditives(addRes.data || []);
      setAwarenessInfo(tipRes.data || null);
    } catch (err) {
      console.warn("Tips fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAdditives = additives.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.healthRisks.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6">
      
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <BookOpen className="w-3.5 h-3.5" />
          Public Nutrition Literacy & Safety Initiative
        </div>
        <h1 className="text-3xl font-extrabold text-white">Food Additive Directory & Education</h1>
        <p className="text-xs text-slate-400">
          Learn how to read food labels, spot deceptive marketing claims, and understand the health impacts of chemical preservatives and synthetic colors.
        </p>
      </div>

      {/* WHO Intake Limits Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
            <AlertTriangle className="w-4 h-4" />
            WHO Sugar Intake Limit
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Max <strong className="text-white">25g (6 teaspoons)</strong> of free added sugars per day for adults to prevent obesity & fatty liver.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
            <AlertTriangle className="w-4 h-4" />
            WHO Sodium Intake Limit
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Under <strong className="text-white">2,000mg sodium</strong> per day (~1 tsp salt) to protect against hypertension and arterial stiffness.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <ShieldAlert className="w-4 h-4" />
            Industrial Trans Fats
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">Zero tolerance.</strong> WHO calls for complete elimination of partially hydrogenated oils worldwide.
          </p>
        </div>
      </div>

      {/* Deceptive Label Marketing Tricks */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          Decoding Common Front-of-Package Marketing Claims
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {awarenessInfo?.commonLabelTricks?.map((trick, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                Claim: "{trick.claim}"
              </span>
              <p className="text-xs font-semibold text-slate-200">The Hidden Reality:</p>
              <p className="text-xs text-slate-400 leading-relaxed">{trick.reality}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additive Searchable Directory */}
      <div className="space-y-5 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-teal-400" />
              Searchable Additives & E-Numbers Directory ({filteredAdditives.length})
            </h2>
            <p className="text-xs text-slate-400">Search by chemical name, E-number, or risk profile</p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search E129, Red 40, MSG..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">Loading additive directory...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAdditives.map((add) => {
              const isHigh = add.severity === "High";
              const isMed = add.severity === "Medium";
              return (
                <div
                  key={add.id}
                  className={`glass-panel p-5 rounded-2xl border ${
                    isHigh ? "border-rose-500/30 bg-rose-950/10" : isMed ? "border-amber-500/30" : "border-slate-800"
                  } space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isHigh
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                        : isMed
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : "bg-slate-800 text-slate-300 border-slate-700"
                    }`}>
                      {add.severity} Risk
                    </span>
                    <span className="text-[11px] text-slate-400">{add.category}</span>
                  </div>

                  <h3 className="font-bold text-sm text-white">{add.name}</h3>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Plain-Language Meaning
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{add.plainLanguage}</p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">Known Risks:</strong> {add.healthRisks}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
