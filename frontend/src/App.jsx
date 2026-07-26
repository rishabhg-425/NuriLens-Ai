import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DisclaimerModal from "./components/DisclaimerModal";
import LandingPage from "./pages/LandingPage";
import ScanPage from "./pages/ScanPage";
import ResultsPage from "./pages/ResultsPage";
import ComparePage from "./pages/ComparePage";
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";
import AwarenessPage from "./pages/AwarenessPage";
import API from "./utils/api";

export default function App() {
  const [activeTab, setActiveTab] = useState("landing");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [compareInitialProduct, setCompareInitialProduct] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // Handle Preset Selection from Landing or Scan Page
  const handleSelectPreset = async (presetId) => {
    try {
      setActiveTab("scan");
      const res = await API.post("/scan/analyze", { presetId });
      if (res.data && res.data.analysis) {
        setAnalysisResult(res.data.analysis);
        setActiveTab("results");
      }
    } catch (err) {
      console.error("Preset scan failed:", err);
    }
  };

  // Handle Scan Success from ScanPage
  const handleScanSuccess = (analysis) => {
    setAnalysisResult(analysis);
    setActiveTab("results");
  };

  // Handle Compare Action from ResultsPage
  const handleCompareProduct = (productName) => {
    setCompareInitialProduct(productName);
    setActiveTab("compare");
  };

  // Handle Viewing a Past Scan from HistoryPage
  const handleViewPastScan = (analysis) => {
    setAnalysisResult(analysis);
    setActiveTab("results");
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
        
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenAuthModal={() => setActiveTab("profile")}
        />

        {/* Main Content Router */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === "landing" && (
            <LandingPage
              onStartScan={() => setActiveTab("scan")}
              onSelectPreset={handleSelectPreset}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "scan" && (
            <ScanPage
              onScanSuccess={handleScanSuccess}
              onSelectPreset={handleSelectPreset}
            />
          )}

          {activeTab === "results" && (
            <ResultsPage
              analysisResult={analysisResult}
              onScanAgain={() => setActiveTab("scan")}
              onCompareProduct={handleCompareProduct}
            />
          )}

          {activeTab === "compare" && (
            <ComparePage initialProduct={compareInitialProduct} />
          )}

          {activeTab === "profile" && <ProfilePage />}

          {activeTab === "history" && (
            <HistoryPage onViewScan={handleViewPastScan} />
          )}

          {activeTab === "awareness" && <AwarenessPage />}
        </main>

        {/* Footer */}
        <Footer onOpenDisclaimer={() => setShowDisclaimer(true)} />

        {/* Medical Disclaimer Popup */}
        {showDisclaimer && (
          <DisclaimerModal onClose={() => setShowDisclaimer(false)} />
        )}
      </div>
    </AuthProvider>
  );
}
