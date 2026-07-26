import express from "express";
import { queryAll, queryOne } from "../config/database.js";
import { DEMO_PRESETS } from "../services/aiVisionService.js";
import { analyzeProduct } from "../services/riskAnalyzer.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Compare multiple product scan IDs or presets
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { scanIds = [], presetIds = [] } = req.body;
    const userId = req.user.id;

    // Get user profile
    const profileRow = await queryOne("SELECT * FROM profiles WHERE user_id = ?", [userId]);
    const userProfile = profileRow ? {
      medicalConditions: profileRow.medical_conditions ? JSON.parse(profileRow.medical_conditions) : [],
      allergies: profileRow.allergies ? JSON.parse(profileRow.allergies) : []
    } : {};

    const comparisonList = [];

    // Fetch past scans if requested
    if (scanIds.length > 0) {
      const placeholders = scanIds.map(() => "?").join(",");
      const scans = await queryAll(`SELECT * FROM scans WHERE id IN (${placeholders})`, scanIds);
      scans.forEach(s => {
        if (s.analysis_json) {
          comparisonList.push(JSON.parse(s.analysis_json));
        }
      });
    }

    // Fetch presets if requested
    if (presetIds.length > 0) {
      presetIds.forEach(pId => {
        const preset = DEMO_PRESETS.find(dp => dp.id === pId);
        if (preset) {
          comparisonList.push(analyzeProduct(preset, userProfile));
        }
      });
    }

    // If less than 2 items provided, auto-fill with standard demo presets
    if (comparisonList.length < 2) {
      DEMO_PRESETS.slice(0, 2 - comparisonList.length).forEach(dp => {
        comparisonList.push(analyzeProduct(dp, userProfile));
      });
    }

    // Generate winner recommendation
    let bestProduct = comparisonList[0];
    comparisonList.forEach(item => {
      if (item.healthScore > bestProduct.healthScore) {
        bestProduct = item;
      }
    });

    res.json({
      products: comparisonList,
      recommendation: {
        winnerName: bestProduct.productName,
        winnerScore: bestProduct.healthScore,
        summary: `${bestProduct.productName} is the healthier choice with higher nutritional value and lower risk flags.`
      }
    });
  } catch (err) {
    console.error("Comparison error:", err);
    res.status(500).json({ error: "Failed to compare products" });
  }
});

export default router;
