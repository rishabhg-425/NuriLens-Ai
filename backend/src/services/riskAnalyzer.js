import { ADDITIVE_DATABASE, COMMON_ALLERGENS } from "./additiveDb.js";

/**
 * Analyzes parsed nutrition and ingredients against user profile
 * returns structured analysis with Health Score (0-100), risk flags, user advisories, and alternatives.
 */
export function analyzeProduct(productData, userProfile = {}) {
  let score = 85; // Base score
  const flagged = [];
  const advisories = [];
  const positiveNotes = [];

  const {
    productName = "Scanned Food Item",
    category = "General Snack",
    calories = 0,
    servingSize = "1 serving",
    totalFat = 0,
    satFat = 0,
    transFat = 0,
    sodium = 0,
    totalCarbs = 0,
    fiber = 0,
    totalSugar = 0,
    addedSugar = 0,
    protein = 0,
    ingredients = []
  } = productData;

  const {
    medicalConditions = [],
    allergies = [],
    dietaryPreferences = [],
    fitnessGoals = ""
  } = userProfile;

  const ingredientsText = (Array.isArray(ingredients) ? ingredients.join(", ") : ingredients || "").toLowerCase();

  // --- 1. Macro Threshold Penalties ---
  // Added Sugar Check (>10g high, >20g extreme)
  if (addedSugar > 20 || totalSugar > 25) {
    score -= 22;
    flagged.push({
      id: "high_sugar",
      name: `High Added Sugar (${addedSugar || totalSugar}g)`,
      category: "Macro Excess",
      severity: "High",
      reason: "Contains over 50% of recommended daily added sugar in a single serving.",
      jargonExplanation: "High sugar intake causes rapid blood glucose spikes and insulin surges.",
      userTrigger: medicalConditions.some(c => ["Type 2 Diabetes", "PCOS", "Insulin Resistance", "Weight Loss"].includes(c))
        ? "CRITICAL FOR YOUR HEALTH PROFILE: Strongly impacts Diabetes/PCOS management."
        : null
    });
  } else if (addedSugar > 10 || totalSugar > 15) {
    score -= 10;
    flagged.push({
      id: "mod_sugar",
      name: `Moderate Sugar (${addedSugar || totalSugar}g)`,
      category: "Macro Excess",
      severity: "Medium",
      reason: "Considerable amount of added sugar per serving.",
      jargonExplanation: "Consuming multiple sugary foods daily contributes to fatigue and weight gain."
    });
  }

  // Sodium Check (>400mg high, >700mg extreme)
  if (sodium > 700) {
    score -= 20;
    flagged.push({
      id: "high_sodium",
      name: `High Sodium (${sodium}mg)`,
      category: "Macro Excess",
      severity: "High",
      reason: "Exceeds 30% of daily recommended sodium intake limit (2300mg/day).",
      jargonExplanation: "Excess sodium causes body water retention and strains artery walls.",
      userTrigger: medicalConditions.includes("Hypertension") || medicalConditions.includes("Heart Disease") || medicalConditions.includes("Kidney Disease")
        ? "CRITICAL FOR YOUR PROFILE: Elevated sodium poses immediate risk to blood pressure & kidney stress."
        : null
    });
  } else if (sodium > 400) {
    score -= 8;
    flagged.push({
      id: "mod_sodium",
      name: `Moderate Sodium (${sodium}mg)`,
      category: "Macro Excess",
      severity: "Medium",
      reason: "Moderate sodium content; keep an eye on total daily sodium intake."
    });
  }

  // Trans Fat Check
  if (transFat > 0 || ingredientsText.includes("partially hydrogenated")) {
    score -= 25;
    flagged.push({
      id: "trans_fat_flag",
      name: "Trans Fat Present",
      category: "Industrial Fat",
      severity: "High",
      reason: "Contains artificial trans fats which have no safe intake level.",
      jargonExplanation: "Trans fats increase LDL (bad) cholesterol and damage vascular lining."
    });
  }

  // Saturated Fat Check
  if (satFat > 5) {
    score -= 8;
    flagged.push({
      id: "high_sat_fat",
      name: `High Saturated Fat (${satFat}g)`,
      category: "Fat Quality",
      severity: "Medium",
      reason: "High saturated fat content can elevate LDL cholesterol when eaten routinely."
    });
  }

  // --- 2. Additive & Contaminant Scanning ---
  ADDITIVE_DATABASE.forEach(add => {
    const matched = add.aliases.some(alias => ingredientsText.includes(alias));
    if (matched) {
      const isTriggered = add.medicalTriggers.some(med => medicalConditions.includes(med));
      const penalty = add.severity === "High" ? 15 : add.severity === "Medium" ? 8 : 4;
      
      score -= isTriggered ? penalty * 1.5 : penalty;

      flagged.push({
        id: add.id,
        name: add.name,
        category: add.category,
        severity: add.severity,
        reason: add.healthRisks,
        jargonExplanation: add.plainLanguage,
        whoAdvice: add.whoAdvice,
        userTrigger: isTriggered 
          ? `WARNING: This ingredient specifically conflicts with your condition: ${add.medicalTriggers.filter(m => medicalConditions.includes(m)).join(", ")}`
          : null
      });
    }
  });

  // --- 3. Allergen Scanning ---
  COMMON_ALLERGENS.forEach(allergen => {
    const userHasAllergy = allergies.some(a => a.toLowerCase().includes(allergen.name.toLowerCase()) || allergen.keywords.some(k => a.toLowerCase().includes(k)));
    const ingredientContainsAllergen = allergen.keywords.some(kw => ingredientsText.includes(kw));

    if (ingredientContainsAllergen) {
      if (userHasAllergy) {
        score -= 40; // Major health safety penalty
        advisories.push({
          type: "ALLERGEN_DANGER",
          title: `ALLERGEN CONFLICT DETECTED: ${allergen.name}`,
          description: `This product contains ${allergen.name}, which matches your registered allergy list! Do not consume.`
        });
      }
      flagged.push({
        id: `allergen_${allergen.id}`,
        name: `Contains Allergen: ${allergen.name}`,
        category: "Allergen",
        severity: userHasAllergy ? "High" : "Medium",
        reason: allergen.description,
        jargonExplanation: `Contains proteins derived from ${allergen.name}.`
      });
    }
  });

  // --- 4. Positive Nutrition Boosts ---
  if (fiber >= 4) {
    score += 8;
    positiveNotes.push(`High Fiber (${fiber}g): Supports healthy gut microbiome and slows sugar absorption.`);
  }
  if (protein >= 10) {
    score += 6;
    positiveNotes.push(`Good Protein Source (${protein}g): Helps maintain muscle mass and promotes satiety.`);
  }
  if (addedSugar === 0 && totalSugar < 4) {
    score += 6;
    positiveNotes.push("Low Sugar / No Added Sugars: Excellent for metabolic stability.");
  }
  if (sodium < 140) {
    score += 5;
    positiveNotes.push("Low Sodium: Heart-friendly choice.");
  }

  // Bound score between 0 and 100
  score = Math.max(5, Math.min(100, Math.round(score)));

  // --- 5. Health Score Rating & Color Badge ---
  let scoreGrade = "Moderate";
  let scoreColor = "yellow"; // green, yellow, red
  let verdict = "Moderate quality product. Consume in moderation.";

  if (score >= 80) {
    scoreGrade = "Excellent Choice";
    scoreColor = "green";
    verdict = "Nutritious, whole-food profile with minimal processed additives. Great option!";
  } else if (score >= 60) {
    scoreGrade = "Good / Acceptable";
    scoreColor = "green";
    verdict = "Acceptable overall balance. Watch out for minor additives or portion sizes.";
  } else if (score >= 40) {
    scoreGrade = "Caution / Processed";
    scoreColor = "yellow";
    verdict = "Contains elevated sodium, added sugars, or synthetic additives. Not recommended for daily consumption.";
  } else {
    scoreGrade = "High Risk / Ultra-Processed";
    scoreColor = "red";
    verdict = "Highly processed product with notable health flags and chemical additives. Consider healthier alternatives.";
  }

  // --- 6. Generate Targeted User Advisories ---
  if (medicalConditions.includes("Hypertension") && sodium > 350) {
    advisories.push({
      type: "CONDITION_WARNING",
      title: "Hypertension Caution",
      description: `This product has ${sodium}mg sodium. Your profile indicates Hypertension; aim for snacks with under 200mg sodium per serving.`
    });
  }

  if ((medicalConditions.includes("Type 2 Diabetes") || medicalConditions.includes("PCOS")) && (totalSugar > 12 || addedSugar > 8)) {
    advisories.push({
      type: "CONDITION_WARNING",
      title: "Blood Sugar Spike Risk",
      description: `Contains ${addedSugar || totalSugar}g sugar. Given your profile (${medicalConditions.join(", ")}), this may cause a rapid glycemic spike.`
    });
  }

  if (medicalConditions.includes("Celiac") && ingredientsText.includes("wheat")) {
    advisories.push({
      type: "CONDITION_WARNING",
      title: "Celiac / Gluten Danger",
      description: "Wheat/Gluten detected in ingredients list. Avoid if you have Celiac disease."
    });
  }

  // --- 7. Generate Healthier Alternatives ---
  const alternatives = generateAlternatives(category, score, productData);

  return {
    productName,
    category,
    servingSize,
    healthScore: score,
    scoreGrade,
    scoreColor,
    verdict,
    macros: {
      calories,
      totalFat,
      satFat,
      transFat,
      sodium,
      totalCarbs,
      fiber,
      totalSugar,
      addedSugar,
      protein
    },
    flaggedIngredients: flagged,
    positiveNotes,
    userAdvisories: advisories,
    healthierAlternatives: alternatives
  };
}

/**
 * Curated alternative suggestion engine based on product category & nutrition flaws
 */
function generateAlternatives(category = "", currentScore = 50, originalProduct) {
  const cat = category.toLowerCase();
  
  if (cat.includes("soda") || cat.includes("beverage") || cat.includes("drink")) {
    return [
      {
        name: "Sparkling Water with Fresh Lime",
        healthScore: 98,
        reason: "Zero added sugars, zero artificial dyes, 100% natural hydration.",
        badge: "Cleanest Choice"
      },
      {
        name: "Unsweetened Hibiscus Iced Tea",
        healthScore: 92,
        reason: "Rich in antioxidants with natural tart flavor and zero calorie impact.",
        badge: "Antioxidant Boost"
      },
      {
        name: "Probiotic Kombucha (Low Sugar)",
        healthScore: 85,
        reason: "Contains live probiotics for gut health with under 4g natural sugar.",
        badge: "Gut Friendly"
      }
    ];
  }

  if (cat.includes("cereal") || cat.includes("breakfast")) {
    return [
      {
        name: "Steel-Cut Oatmeal with Berries & Cinnamon",
        healthScore: 96,
        reason: "High in beta-glucan soluble fiber, slows digestion, zero synthetic colors.",
        badge: "Heart Healthy"
      },
      {
        name: "Sprouted Whole Grain Flakes",
        healthScore: 88,
        reason: "High dietary fiber (6g), zero added sugars, non-GMO grains.",
        badge: "High Fiber"
      }
    ];
  }

  if (cat.includes("chip") || cat.includes("snack") || cat.includes("crisp")) {
    return [
      {
        name: "Air-Popped Organic Popcorn with Sea Salt",
        healthScore: 90,
        reason: "100% whole grain, 70% less fat than fried potato chips.",
        badge: "Whole Grain"
      },
      {
        name: "Roasted Lightly-Salted Edamame",
        healthScore: 94,
        reason: "Provides 12g plant protein & 6g fiber per serving with low sodium.",
        badge: "Protein Rich"
      }
    ];
  }

  // Default fallback alternatives
  return [
    {
      name: "Organic Whole Food Alternative",
      healthScore: 92,
      reason: "Made from unrefined whole ingredients without synthetic preservatives or artificial colors.",
      badge: "Organic Choice"
    },
    {
      name: "Low-Sodium / Zero Added Sugar Variant",
      healthScore: 88,
      reason: "Provides similar flavor profile with 60% lower sodium and no high fructose corn syrup.",
      badge: "Heart Smart"
    }
  ];
}
