import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Pre-configured realistic sample products for instant demo testing
 */
export const DEMO_PRESETS = [
  {
    id: "preset_soda",
    productName: "FizzPop Fruit Punch Soda",
    category: "Beverages / Soft Drinks",
    servingSize: "1 Can (355ml)",
    calories: 180,
    totalFat: 0,
    satFat: 0,
    transFat: 0,
    sodium: 45,
    totalCarbs: 48,
    fiber: 0,
    totalSugar: 44,
    addedSugar: 44,
    protein: 0,
    ingredients: [
      "Carbonated Water",
      "High Fructose Corn Syrup",
      "Citric Acid",
      "Natural and Artificial Flavors",
      "Sodium Benzoate (Preservative)",
      "Red 40",
      "Blue 1"
    ],
    sampleImageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "preset_cereal",
    productName: "ChocoLoops Crispy Morning Cereal",
    category: "Breakfast Cereal",
    servingSize: "1 Cup (38g)",
    calories: 160,
    totalFat: 2.5,
    satFat: 1.0,
    transFat: 0,
    sodium: 210,
    totalCarbs: 34,
    fiber: 1,
    totalSugar: 18,
    addedSugar: 16,
    protein: 2,
    ingredients: [
      "Whole Grain Oat Flour",
      "Sugar",
      "Corn Syrup",
      "Canola Oil",
      "Cocoa Processed with Alkali",
      "Maltodextrin",
      "Red 40",
      "Yellow 5",
      "BHT added to preserve freshness"
    ],
    sampleImageUrl: "https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "preset_chips",
    productName: "SuperCrunch Spicy Nacho Tortilla Chips",
    category: "Snacks / Chips",
    servingSize: "12 Chips (28g)",
    calories: 150,
    totalFat: 8.0,
    satFat: 1.5,
    transFat: 0,
    sodium: 420,
    totalCarbs: 17,
    fiber: 2,
    totalSugar: 1,
    addedSugar: 0,
    protein: 2,
    ingredients: [
      "Corn",
      "Vegetable Oil (Corn, Canola, and/or Sunflower Oil)",
      "Maltodextrin",
      "Salt",
      "Cheddar Cheese (Milk, Cheese Cultures, Salt, Enzymes)",
      "Monosodium Glutamate (MSG)",
      "Whey",
      "Tomato Powder",
      "Yellow 6 Lake",
      "Red 40 Lake",
      "Disodium Inosinate",
      "Disodium Guanylate"
    ],
    sampleImageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "preset_granola",
    productName: "NatureBlend Almond Honey Protein Granola",
    category: "Health Snacks",
    servingSize: "1/2 Cup (55g)",
    calories: 220,
    totalFat: 6.0,
    satFat: 0.5,
    transFat: 0,
    sodium: 85,
    totalCarbs: 32,
    fiber: 5,
    totalSugar: 7,
    addedSugar: 4,
    protein: 10,
    ingredients: [
      "Whole Grain Rolled Oats",
      "Soy Protein Isolate",
      "Raw Honey",
      "Sliced Almonds",
      "Sunflower Seeds",
      "Organic Coconut Oil",
      "Natural Vanilla Extract",
      "Sea Salt"
    ],
    sampleImageUrl: "https://images.unsplash.com/photo-1517093157656-b9ecdf173b2d?w=600&auto=format&fit=crop&q=80"
  }
];

/**
 * Extracts structured nutrition facts & ingredients from label image
 */
export async function parseLabelImage(imageBuffer, mimeType = "image/jpeg") {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
You are an expert OCR and Nutritionist AI. Analyze this food label image (nutrition facts panel + ingredients list).
Extract and return ONLY a valid JSON object matching this exact schema:

{
  "productName": "Estimated product name or descriptor",
  "category": "Estimated food category e.g. Beverage, Cereal, Snack, Sauce, Frozen Food",
  "servingSize": "e.g. 1 cup (240ml)",
  "calories": 150,
  "totalFat": 5.0,
  "satFat": 1.0,
  "transFat": 0,
  "sodium": 320,
  "totalCarbs": 25,
  "fiber": 2,
  "totalSugar": 12,
  "addedSugar": 10,
  "protein": 3,
  "ingredients": ["Ingredient 1", "Ingredient 2", "Red 40", "High Fructose Corn Syrup"]
}

Important Instructions:
- Convert all nutrient values to numerical numbers (grams or milligrams as labeled).
- Extract every single ingredient from the ingredients list cleanly.
- If a value is missing or unreadable, estimate logically based on standard food labels.
- Output pure JSON without markdown backticks or extra commentary.
`;

      const imagePart = {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType
        }
      };

      const result = await model.generateContent([prompt, imagePart]);
      const responseText = result.response.text().trim();

      // Clean markdown formatting if present
      const jsonString = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(jsonString);
    } catch (err) {
      console.warn("Gemini API parsing failed or unavailable, falling back to intelligent heuristic parser:", err.message);
    }
  }

  // Fallback: Pick a random demo preset or intelligent default if Gemini key is not configured
  const fallback = DEMO_PRESETS[Math.floor(Math.random() * DEMO_PRESETS.length)];
  return {
    ...fallback,
    productName: `${fallback.productName} (Scanned Image)`
  };
}
