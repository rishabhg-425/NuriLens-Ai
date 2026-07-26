import express from "express";
import { ADDITIVE_DATABASE, COMMON_ALLERGENS } from "../services/additiveDb.js";

const router = express.Router();

// Search additives & E-numbers
router.get("/additives", (req, res) => {
  const query = (req.query.q || "").toLowerCase().trim();
  if (!query) {
    return res.json(ADDITIVE_DATABASE);
  }

  const filtered = ADDITIVE_DATABASE.filter(item => 
    item.name.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query) ||
    item.aliases.some(a => a.toLowerCase().includes(query)) ||
    item.healthRisks.toLowerCase().includes(query)
  );

  res.json(filtered);
});

// Get Public Health Tips & Label Education Guide
router.get("/awareness", (req, res) => {
  res.json({
    whoLimits: {
      sugar: "Maximum 25g (6 teaspoons) of added free sugars per day for adults.",
      sodium: "Under 2,000mg of sodium per day (approx. 1 teaspoon of table salt).",
      transFat: "Zero industrial trans fats. Less than 1% of total daily energy intake."
    },
    commonLabelTricks: [
      {
        claim: "No Sugar Added",
        reality: "May still contain high concentrated fruit juices or artificial sweeteners that spike blood sugar or disrupt gut flora."
      },
      {
        claim: "Made with Whole Grains",
        reality: "Can contain as little as 5% whole grains, while the first primary ingredient is refined white flour."
      },
      {
        claim: "All Natural",
        reality: "Not regulated by the FDA. Can legally contain high fructose corn syrup, natural flavors, and heavily processed extracts."
      },
      {
        claim: "Light / Lite",
        reality: "Often reduced in fat but compensated with higher added sugar and sodium to maintain flavor."
      }
    ],
    educationalFacts: [
      {
        title: "Order of Ingredients Matters",
        body: "Ingredients are listed in descending order by weight. If sugar or high fructose corn syrup is in the top 3, the product is primarily sugar!"
      },
      {
        title: "Serving Size Illusion",
        body: "Manufacturers often use small serving sizes (e.g., 4 chips or half a cookie) to make calories and sugar numbers look deceivingly low."
      },
      {
        title: "The E-Number System",
        body: "E-numbers are code numbers for food additives tested in Europe. E100-199 are colors, E200-299 preservatives, E300-399 antioxidants, E400-499 thickeners."
      }
    ],
    allergensCatalog: COMMON_ALLERGENS
  });
});

export default router;
