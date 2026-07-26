import React, { useState, useRef, useEffect } from "react";
import { Sliders, Sun, Contrast, Eye, RefreshCw, CheckCircle2 } from "lucide-react";

export default function ImagePreprocessor({ imageSrc, onConfirmProcessed, onCancel }) {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(120);
  const [grayscale, setGrayscale] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      imageRef.current = img;
      renderCanvas();
    };
  }, [imageSrc, brightness, contrast, grayscale]);

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;

    // Apply CSS filters on canvas context
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) ${grayscale ? "grayscale(100%)" : ""}`;
    ctx.drawImage(img, 0, 0, img.width, img.height);
  };

  const handleReset = () => {
    setBrightness(100);
    setContrast(120);
    setGrayscale(false);
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsProcessing(true);
    canvas.toBlob((blob) => {
      setIsProcessing(false);
      onConfirmProcessed(blob, canvas.toDataURL("image/jpeg", 0.9));
    }, "image/jpeg", 0.9);
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-sm text-white">Image Preprocessing & Enhancement</h3>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Filters
        </button>
      </div>

      {/* Canvas Viewport */}
      <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 max-h-96 flex items-center justify-center p-2">
        <canvas ref={canvasRef} className="max-w-full max-h-80 object-contain rounded-lg shadow-xl" />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div>
          <label className="flex items-center justify-between text-xs text-slate-300 font-medium mb-1.5">
            <span className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-amber-400" /> Brightness</span>
            <span>{brightness}%</span>
          </label>
          <input
            type="range"
            min="50"
            max="180"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer h-1.5"
          />
        </div>

        <div>
          <label className="flex items-center justify-between text-xs text-slate-300 font-medium mb-1.5">
            <span className="flex items-center gap-1.5"><Contrast className="w-3.5 h-3.5 text-blue-400" /> Contrast</span>
            <span>{contrast}%</span>
          </label>
          <input
            type="range"
            min="80"
            max="250"
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer h-1.5"
          />
        </div>

        <div className="flex items-end pb-1">
          <button
            type="button"
            onClick={() => setGrayscale(!grayscale)}
            className={`w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
              grayscale
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {grayscale ? "Grayscale Active" : "Enable Grayscale OCR Boost"}
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60"
        >
          Cancel
        </button>
        <button
          onClick={handleExport}
          disabled={isProcessing}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
        >
          <CheckCircle2 className="w-4 h-4" />
          {isProcessing ? "Enhancing..." : "Proceed to AI Vision Scan"}
        </button>
      </div>
    </div>
  );
}
