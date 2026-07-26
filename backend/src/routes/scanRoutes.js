import express from "express";
import multer from "multer";
import { DEMO_PRESETS, parseLabelImage } from "../services/aiVisionService.js";
import { analyzeProduct } from "../services/riskAnalyzer.js";
import { authenticateToken } from "../middleware/auth.js";
import { queryOne, runSql } from "../config/database.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Get demo presets for instant UI testing
router.get("/presets", (req, res) => {
  res.json(DEMO_PRESETS);
});

// Analyze image or pre-parsed data payload
router.post("/analyze", authenticateToken, upload.single("labelImage"), async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user health profile
    const profileRow = await queryOne("SELECT * FROM profiles WHERE user_id = ?", [userId]);
    const userProfile = profileRow ? {
      age: profileRow.age,
      weight: profileRow.weight,
      height: profileRow.height,
      medicalConditions: profileRow.medical_conditions ? JSON.parse(profileRow.medical_conditions) : ["Hypertension"],
      allergies: profileRow.allergies ? JSON.parse(profileRow.allergies) : ["Peanuts"],
      dietaryPreferences: profileRow.dietary_preferences ? JSON.parse(profileRow.dietary_preferences) : [],
      fitnessGoals: profileRow.fitness_goals
    } : {
      medicalConditions: ["Hypertension", "Type 2 Diabetes"],
      allergies: ["Peanuts", "Gluten"]
    };

    let extractedData;

    // Check if image file was uploaded
    if (req.file) {
      extractedData = await parseLabelImage(req.file.buffer, req.file.mimetype);
    } else if (req.body.presetId) {
      // User picked a preset
      const preset = DEMO_PRESETS.find(p => p.id === req.body.presetId) || DEMO_PRESETS[0];
      extractedData = preset;
    } else if (req.body.productData) {
      // Pre-parsed JSON payload
      extractedData = typeof req.body.productData === "string" ? JSON.parse(req.body.productData) : req.body.productData;
    } else {
      extractedData = DEMO_PRESETS[0];
    }

    // Run Health Risk Engine & Score Algorithm
    const analysis = analyzeProduct(extractedData, userProfile);

    // Save scan to database
    const scanId = "scan_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6);
    await runSql(
      `INSERT INTO scans (id, user_id, product_name, category, health_score, score_grade, score_color, raw_data_json, analysis_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        scanId,
        userId,
        analysis.productName,
        analysis.category,
        analysis.healthScore,
        analysis.scoreGrade,
        analysis.scoreColor,
        JSON.stringify(extractedData),
        JSON.stringify(analysis)
      ]
    );

    res.json({
      scanId,
      extractedData,
      analysis
    });
  } catch (err) {
    console.error("Scan analysis error:", err);
    res.status(500).json({ error: "Failed to analyze food label" });
  }
});

export default router;
