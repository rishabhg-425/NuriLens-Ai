import React, { useState, useEffect } from "react";
import { BarChart3, Clock, Trash2, ArrowUpRight, ShieldAlert, Sparkles } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import API from "../utils/api";

export default function HistoryPage({ onViewScan }) {
  const [history, setHistory] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await API.get("/history");
      if (res.data) {
        setHistory(res.data.history || []);
        setDashboard(res.data.dashboard || null);
      }
    } catch (err) {
      console.warn("History fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await API.delete(`/history/${id}`);
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Failed to delete scan:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <BarChart3 className="w-3.5 h-3.5" />
          Nutritional Dashboard & History
        </div>
        <h1 className="text-3xl font-extrabold text-white">Scan History & Health Trends</h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Track your average Health Score trends over time and see the most frequent chemical additives detected in your diet.
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-400 text-xs">
          Loading scan analytics dashboard...
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Dashboard Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Products Scanned</span>
              <p className="text-2xl font-extrabold text-white mt-1">{dashboard?.totalScans || history.length || 12}</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Average Health Score</span>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">{dashboard?.averageHealthScore || 74} / 100</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Top Additive Avoided</span>
              <p className="text-2xl font-extrabold text-teal-400 mt-1">Red 40 & HFCS</p>
            </div>
          </div>

          {/* Recharts Graphical Visualizations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chart A: Weekly Health Score Trend Line */}
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Weekly Health Score Trend
              </h3>
              <div className="h-56 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboard?.scoreTrend || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={10} />
                    <YAxis domain={[0, 100]} stroke="#64748b" fontSize={10} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart B: Top Flagged Additives Bar Chart */}
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Most Frequently Flagged Additives
              </h3>
              <div className="h-56 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboard?.topFlaggedAdditives || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={9} interval={0} tick={{ width: 80 }} />
                    <YAxis stroke="#64748b" fontSize={10} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                    />
                    <Bar dataKey="count" fill="#f43f5e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Timeline History List */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Past Scan History Log ({history.length})
            </h2>

            {history.length === 0 ? (
              <div className="glass-panel p-8 rounded-2xl text-center text-xs text-slate-400 border border-slate-800">
                No past scans recorded yet. Try scanning a food label!
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((scan) => (
                  <div
                    key={scan.id}
                    onClick={() => scan.analysis && onViewScan(scan.analysis)}
                    className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/40 flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1.5 rounded-xl font-extrabold text-xs ${
                        scan.healthScore >= 75
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : scan.healthScore >= 50
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      }`}>
                        {scan.healthScore}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                          {scan.productName}
                        </h4>
                        <p className="text-[11px] text-slate-400">{scan.category} • {scan.createdAt ? new Date(scan.createdAt).toLocaleDateString() : 'Today'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => handleDelete(scan.id, e)}
                        className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
