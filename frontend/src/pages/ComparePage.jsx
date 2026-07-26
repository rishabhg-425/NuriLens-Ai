import React, { useState, useEffect } from "react";
import { Columns, CheckCircle2, AlertTriangle, Trophy, Sparkles, ArrowRight } from "lucide-react";
import API from "../utils/api";

export default function ComparePage({ initialProduct }) {
  const [products, setProducts] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComparison();
  }, [initialProduct]);

  const fetchComparison = async () => {
    setLoading(true);
    try {
      // Default to comparing preset soda vs healthy granola
      const res = await API.post("/compare", {
        presetIds: ["preset_soda", "preset_granola"]
      });
      if (res.data) {
        setProducts(res.data.products || []);
        setRecommendation(res.data.recommendation);
      }
    } catch (err) {
      console.warn("Comparison fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <Columns className="w-3.5 h-3.5" />
          Side-by-Side Product Matrix
        </div>
        <h1 className="text-3xl font-extrabold text-white">Compare Food Products</h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Evaluate nutrition metrics, Health Scores, and flagged chemical additives between multiple food items.
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-400 text-xs">
          Loading product comparison matrix...
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Winner Recommendation Banner */}
          {recommendation && (
            <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-slate-900 to-teal-950/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Healthier Product Winner</span>
                  <h3 className="text-lg font-bold text-white">{recommendation.winnerName}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">{recommendation.summary}</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl shrink-0">
                Score: {recommendation.winnerScore}/100
              </div>
            </div>
          )}

          {/* Comparison Matrix Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((prod, idx) => {
              const isWinner = recommendation && prod.productName === recommendation.winnerName;
              return (
                <div
                  key={idx}
                  className={`glass-panel p-6 rounded-3xl border ${
                    isWinner ? "border-emerald-500/50 bg-emerald-950/10 shadow-xl shadow-emerald-500/10" : "border-slate-800"
                  } space-y-5`}
                >
                  <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold">{prod.category}</span>
                      <h3 className="text-lg font-bold text-white mt-1">{prod.productName}</h3>
                      <p className="text-xs text-slate-400">Serving: {prod.servingSize}</p>
                    </div>
                    <div className={`px-3 py-1.5 rounded-xl font-extrabold text-sm ${
                      prod.healthScore >= 75
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    }`}>
                      {prod.healthScore} / 100
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Calories</span>
                      <strong className="text-white text-sm">{prod.macros?.calories || 0}</strong>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Added Sugar</span>
                      <strong className={(prod.macros?.addedSugar || 0) > 10 ? "text-rose-400" : "text-emerald-400"}>
                        {prod.macros?.addedSugar || 0}g
                      </strong>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Sodium</span>
                      <strong className={(prod.macros?.sodium || 0) > 400 ? "text-rose-400" : "text-emerald-400"}>
                        {prod.macros?.sodium || 0}mg
                      </strong>
                    </div>
                  </div>

                  {/* Flagged Additives */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-300 block">
                      Flagged Additives ({prod.flaggedIngredients?.length || 0})
                    </span>
                    {prod.flaggedIngredients?.length === 0 ? (
                      <p className="text-xs text-emerald-400 font-medium">✓ Clean label without synthetic additives</p>
                    ) : (
                      <div className="space-y-1.5">
                        {prod.flaggedIngredients?.map((flag, fIdx) => (
                          <div key={fIdx} className="flex items-center justify-between text-xs p-2 bg-slate-900/60 rounded-lg border border-slate-800">
                            <span className="text-slate-300">{flag.name}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              flag.severity === "High" ? "bg-rose-500/20 text-rose-400" : "bg-amber-500/20 text-amber-400"
                            }`}>
                              {flag.severity}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
