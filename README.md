# 🥗 NutriLens AI - Decode Food Labels & Health Risks

> **AI-Powered Public Health Nutrition Intelligence & Food Label Decoder**

NutriLens is a mobile-responsive, full-stack web application designed to empower everyday consumers, elderly users, and individuals with chronic medical conditions (e.g., Hypertension, Type 2 Diabetes, PCOS, Celiac) to make safer, healthier food choices by scanning packaged food labels.

---

## 🌟 Core Features

- **📸 Dual Image Capture & Preprocessor**: Capture via live camera or upload photo labels. Real-time HTML5 Canvas filters adjust brightness, contrast, and apply grayscale OCR enhancement before scanning.
- **👁️ AI Vision & OCR Parser**: Powered by Gemini 1.5 Flash Vision API (with built-in offline heuristic fallback presets) to extract calories, macros, micronutrients, serving sizes, and full ingredient lists into structured JSON.
- **🧬 Clinical Risk Engine**: Scans 25+ high-risk additives (Red 40, HFCS, Sodium Benzoate, MSG, BHT, Trans Fats) and 8 allergen categories (Milk, Peanuts, Tree Nuts, Gluten, Soy, Shellfish, Eggs).
- **🎯 Personalized Health Scoring**: Computes a 0–100 Health Score and generates custom warnings based on user health profiles (Hypertension, Diabetes, PCOS).
- **💬 Jargon Breaker**: Translates complex chemical additive names into simple, plain language with WHO/FDA guidance.
- **⚖️ Side-by-Side Product Comparison**: Compare 2–3 products simultaneously across macros, health scores, and risk flags with automated winner detection.
- **🌿 Healthier Alternatives Engine**: Recommends cleaner whole-food options based on the scanned product's category.
- **📊 History Dashboard**: Tracks average health score over time, category breakdowns, and top flagged additives using Recharts.
- **📚 Public Health Literacy Hub**: Educational content on ultra-processed foods, hidden sugar names, and reading nutrition facts labels.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS (Dark Glassmorphic UI), Lucide Icons, Recharts, Axios
- **Backend**: Node.js, Express.js, CORS, Multer
- **Database**: SQLite (`nutriscan.db`) with native async wrapper
- **AI/Vision**: `@google/generative-ai` (Gemini 1.5 Flash) + HTML5 Canvas Preprocessor

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- Git (optional, for version control)

### 1. Clone or Download Repository
```bash
git clone https://github.com/YOUR_USERNAME/nutrilens.bin.git
cd nutrilens
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 3. Environment Setup (Optional for Gemini API)
Create a `.env` file in `backend/`:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=nutrilens_secret_key_2026
```
*(Note: If no API key is set, NutriLens automatically operates using the offline fallback engine and pre-configured product presets).*

### 4. Run Locally

**Start Backend Server:**
```bash
cd backend
npm run start
# Server running at http://localhost:5000
```

**Start Frontend App:**
```bash
cd frontend
npm run dev
# Vite server running at http://localhost:3000
```

Open your browser and navigate to **http://localhost:3000**.

---

## ⚖️ Disclaimer

*NutriLens provides automated informational nutrition analysis for educational and public health awareness purposes. It is not intended as a substitute for professional medical advice, clinical diagnosis, or prescriptive dietary treatment.*
