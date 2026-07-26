import React, { useState } from "react";
import { Upload, Camera, Sparkles, Sliders, AlertCircle, RefreshCw, CheckCircle2, ArrowRight } from "lucide-react";
import CameraCapture from "../components/CameraCapture";
import ImagePreprocessor from "../components/ImagePreprocessor";
import API from "../utils/api";

export default function ScanPage({ onScanSuccess, onSelectPreset }) {
  const [selectedImageSrc, setSelectedImageSrc] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [showPreprocessor, setShowPreprocessor] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // File Upload Handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (JPG, PNG, WEBP).");
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImageSrc(reader.result);
      setShowPreprocessor(true);
    };
    reader.readAsDataURL(file);
  };

  // Camera Snapshot Handler
  const handleCameraCapture = (dataUrl) => {
    setSelectedImageSrc(dataUrl);
    setShowPreprocessor(true);
  };

  // Confirmed Canvas Preprocessed Image
  const handleConfirmProcessed = (blob, dataUrl) => {
    setImageBlob(blob);
    setSelectedImageSrc(dataUrl);
    setShowPreprocessor(false);
    executeAnalysis(blob);
  };

  // Execute Backend AI Vision & Risk Analysis
  const executeAnalysis = async (blob) => {
    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      setProcessingStep("Reading food label text with AI Vision OCR...");
      await new Promise(r => setTimeout(r, 600));

      setProcessingStep("Scanning 50+ chemical additives & allergen databases...");
      await new Promise(r => setTimeout(r, 600));

      setProcessingStep("Evaluating against your personal medical profile...");

      const formData = new FormData();
      if (blob) {
        formData.append("labelImage", blob, "label.jpg");
      }

      const res = await API.post("/scan/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data && res.data.analysis) {
        onScanSuccess(res.data.analysis);
      } else {
        throw new Error("Invalid response from nutrition analysis server.");
      }
    } catch (err) {
      console.error("Scan error:", err);
      setErrorMessage("Could not read image clearly. Please ensure good lighting and clear label text, or select one of our demo sample labels below.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Scan Food Label</h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Upload or photograph the nutrition facts panel and ingredients list for instant AI health analysis.
        </p>
      </div>

      {/* Main Scanner Container */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        
        {/* Error Advisory */}
        {errorMessage && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-start gap-3 text-rose-300 text-xs">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">{errorMessage}</p>
              <p className="text-[11px] text-slate-400">
                Tip: Hold camera steady or try our pre-loaded instant sample scans below.
              </p>
            </div>
          </div>
        )}

        {/* Processing State Indicator */}
        {isAnalyzing ? (
          <div className="py-16 text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
              <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Analyzing Label...</h3>
              <p className="text-xs text-emerald-400 font-medium animate-pulse">{processingStep}</p>
            </div>
          </div>
        ) : showPreprocessor && selectedImageSrc ? (
          /* Step 2: Canvas Image Preprocessor */
          <ImagePreprocessor
            imageSrc={selectedImageSrc}
            onConfirmProcessed={handleConfirmProcessed}
            onCancel={() => setShowPreprocessor(false)}
          />
        ) : (
          /* Step 1: Upload or Camera Options */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Option A: Upload Image File */}
            <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 bg-slate-900/50 hover:bg-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                Upload Label Photo
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Drag & drop or browse JPG, PNG, WEBP
              </p>
              <span className="mt-4 px-3 py-1 text-[11px] font-semibold bg-slate-800 text-slate-300 rounded-lg group-hover:bg-emerald-500/20 group-hover:text-emerald-400 border border-slate-700">
                Browse Files
              </span>
            </label>

            {/* Option B: Live Camera Capture */}
            <div
              onClick={() => setShowCameraModal(true)}
              className="border-2 border-dashed border-slate-700 hover:border-teal-500/60 bg-slate-900/50 hover:bg-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Camera className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-teal-400 transition-colors">
                Use Device Camera
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Take live snapshot of product packaging
              </p>
              <span className="mt-4 px-3 py-1 text-[11px] font-semibold bg-slate-800 text-slate-300 rounded-lg group-hover:bg-teal-500/20 group-hover:text-teal-400 border border-slate-700">
                Open Camera
              </span>
            </div>

          </div>
        )}
      </div>

      {/* Preset Fast Testing Bar */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Instant Demo Labels (No Upload Needed)
          </h3>
          <span className="text-[10px] text-emerald-400 font-semibold">1-Click Test</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: "preset_soda", name: "Fruit Punch Soda", type: "High Sugar" },
            { id: "preset_cereal", name: "Choco Cereal", type: "Additives" },
            { id: "preset_chips", name: "Spicy Chips", type: "High Sodium" },
            { id: "preset_granola", name: "Healthy Granola", type: "Clean" }
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-left transition-all group"
            >
              <p className="text-xs font-bold text-white group-hover:text-emerald-400">
                {preset.name}
              </p>
              <span className="text-[10px] text-slate-400">{preset.type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Camera Capture Modal */}
      {showCameraModal && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCameraModal(false)}
        />
      )}
    </div>
  );
}
