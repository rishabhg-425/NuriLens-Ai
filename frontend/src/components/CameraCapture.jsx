import React, { useRef, useState, useEffect } from "react";
import { Camera, X, RefreshCw, CheckCircle2 } from "lucide-react";

export default function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.warn("Camera access failed:", err);
      setCameraError("Camera permission denied or camera un-available. Please upload an image file instead.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const takeSnapshot = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedPhoto(dataUrl);
    stopCamera();
  };

  const retake = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  const confirmPhoto = () => {
    if (capturedPhoto) {
      onCapture(capturedPhoto);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel max-w-lg w-full rounded-2xl border border-slate-800 p-5 space-y-4 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Live Food Label Scanner Camera</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {cameraError ? (
          <div className="p-6 text-center text-rose-400 text-xs bg-rose-500/10 rounded-xl border border-rose-500/20 space-y-3">
            <p>{cameraError}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-700"
            >
              Close and Upload File
            </button>
          </div>
        ) : capturedPhoto ? (
          <div className="space-y-3">
            <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 max-h-80 flex items-center justify-center">
              <img src={capturedPhoto} alt="Captured Label" className="max-h-72 object-contain" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={retake}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retake Photo
              </button>
              <button
                onClick={confirmPhoto}
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold bg-emerald-500 text-slate-950 rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
              >
                <CheckCircle2 className="w-4 h-4" />
                Use Photo
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 h-72 flex items-center justify-center">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              {/* Overlay Guidance Box */}
              <div className="absolute inset-8 border-2 border-dashed border-emerald-400/60 rounded-xl pointer-events-none flex items-start justify-center p-2">
                <span className="bg-slate-950/80 px-2 py-1 rounded text-[10px] text-emerald-400 font-medium">
                  Align Nutrition Facts Label Here
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center pt-2">
              <button
                onClick={takeSnapshot}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold bg-emerald-500 text-slate-950 rounded-full shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 active:scale-95 transition-all"
              >
                <Camera className="w-4 h-4" />
                Capture Label Snapshot
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
