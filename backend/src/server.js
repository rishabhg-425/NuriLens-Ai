import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";
import compareRoutes from "./routes/compareRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import tipsRoutes from "./routes/tipsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/scan", scanRoutes);
app.use("/api/compare", compareRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/tips", tipsRoutes);

// Healthcheck endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "NutriLens AI API",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(` NutriLens Backend running on http://localhost:${PORT}`);
});
