// Reference database of food additives, preservatives, artificial colors, sweeteners, and allergens

export const ADDITIVE_DATABASE = [
  {
    id: "red_40",
    name: "Red 40 (Allura Red AC)",
    aliases: ["red 40", "allura red", "fd&c red no. 40", "e129"],
    category: "Artificial Color",
    severity: "High",
    plainLanguage: "A synthetic petroleum-derived food dye used to make foods brightly colored.",
    healthRisks: "Linked to hyperactivity in children, allergic reactions, and potential DNA damage with high chronic exposure.",
    medicalTriggers: ["ADHD", "Asthma", "Allergies"],
    allergens: [],
    whoAdvice: "Banned or carries warning labels in Europe. Avoid unnecessary synthetic dyes."
  },
  {
    id: "yellow_5",
    name: "Yellow 5 (Tartrazine)",
    aliases: ["yellow 5", "tartrazine", "fd&c yellow no. 5", "e102"],
    category: "Artificial Color",
    severity: "High",
    plainLanguage: "A artificial yellow dye that enhances food appearance.",
    healthRisks: "Known trigger for severe asthmatic reactions, hives, and hyperactivity in sensitive individuals.",
    medicalTriggers: ["Asthma", "Allergies", "ADHD"],
    allergens: [],
    whoAdvice: "Requires warning label in EU: 'May have an adverse effect on activity and attention in children'."
  },
  {
    id: "sodium_nitrite",
    name: "Sodium Nitrite / Sodium Nitrate",
    aliases: ["sodium nitrite", "sodium nitrate", "e250", "e251"],
    category: "Preservative",
    severity: "High",
    plainLanguage: "A chemical preservative used in processed meats (bacon, hot dogs, deli meats) to prevent bacteria growth and maintain pink color.",
    healthRisks: "Forms carcinogenic nitrosamines in the stomach. Strongly associated with increased risk of colorectal cancer and heart disease.",
    medicalTriggers: ["Hypertension", "Heart Disease", "Colon Health Concerns"],
    allergens: [],
    whoAdvice: "WHO classifies processed meats preserved with nitrites as Group 1 Carcinogens."
  },
  {
    id: "hfcs",
    name: "High Fructose Corn Syrup (HFCS)",
    aliases: ["high fructose corn syrup", "hfcs", "corn syrup solids", "isoglucose"],
    category: "Sweetener",
    severity: "High",
    plainLanguage: "An ultra-processed corn starch sweetener with high fructose content that bypasses normal satiety signals.",
    healthRisks: "Drives rapid liver fat accumulation, insulin resistance, visceral obesity, and elevated triglycerides.",
    medicalTriggers: ["Type 2 Diabetes", "Hypertension", "PCOS", "Fatty Liver Disease", "Heart Disease"],
    allergens: [],
    whoAdvice: "Limit total added sugars to under 25g per day."
  },
  {
    id: "trans_fats",
    name: "Partially Hydrogenated Oil (Trans Fat)",
    aliases: ["partially hydrogenated", "trans fat", "hydrogenated vegetable oil", "shortening"],
    category: "Industrial Fat",
    severity: "High",
    plainLanguage: "Chemically modified plant oil designed to extend shelf life.",
    healthRisks: "Raises bad cholesterol (LDL) while lowering good cholesterol (HDL). Major cause of clogged arteries and sudden cardiac events.",
    medicalTriggers: ["Heart Disease", "Hypertension", "High Cholesterol", "Type 2 Diabetes"],
    allergens: [],
    whoAdvice: "WHO recommends complete elimination of industrial trans fats worldwide."
  },
  {
    id: "bha_bht",
    name: "BHA & BHT (Butylated Hydroxyanisole / Hydroxytoluene)",
    aliases: ["bha", "bht", "e320", "e321", "butylated hydroxyanisole", "butylated hydroxytoluene"],
    category: "Synthetic Antioxidant / Preservative",
    severity: "High",
    plainLanguage: "Chemical preservatives used to prevent oils in snacks and cereals from going rancid.",
    healthRisks: "Classified as potential human carcinogens and endocrine disruptors that mimic estrogen.",
    medicalTriggers: ["PCOS", "Hormonal Imbalance", "Thyroid Issues"],
    allergens: [],
    whoAdvice: "Restricted in many countries; seek natural vitamin E (tocopherols) instead."
  },
  {
    id: "monosodium_glutamate",
    name: "Monosodium Glutamate (MSG)",
    aliases: ["msg", "monosodium glutamate", "e621", "yeast extract", "hydrolyzed vegetable protein", "autolyzed yeast"],
    category: "Flavor Enhancer",
    severity: "Medium",
    plainLanguage: "A salt derivative of glutamic acid that triggers savory 'umami' taste buds and encourages overeating.",
    healthRisks: "May cause headaches, flushing, numbness, or rapid heartbeat in MSG-sensitive individuals ('Chinese Restaurant Syndrome').",
    medicalTriggers: ["Migraines", "Hypertension"],
    allergens: [],
    whoAdvice: "Generally safe for most people, but can trigger neurological or vascular symptoms in sensitive populations."
  },
  {
    id: "aspartame",
    name: "Aspartame",
    aliases: ["aspartame", "e951", "nutrasweet", "equal"],
    category: "Artificial Sweetener",
    severity: "Medium",
    plainLanguage: "An intense zero-calorie synthetic sweetener 200x sweeter than sugar.",
    healthRisks: "Classified by IARC as 'possibly carcinogenic to humans' (Group 2B). May alter gut microbiome and trigger migraines.",
    medicalTriggers: ["PKU (Phenylketonuria)", "Migraines", "Gut Dysbiosis"],
    allergens: [],
    whoAdvice: "WHO warns non-sugar sweeteners should not be used as a healthy weight loss strategy."
  },
  {
    id: "sucralose",
    name: "Sucralose",
    aliases: ["sucralose", "e955", "splenda"],
    category: "Artificial Sweetener",
    severity: "Medium",
    plainLanguage: "Chlorinated sugar derivative that passes through the body unabsorbed.",
    healthRisks: "May impair glucose tolerance, reduce beneficial gut bacteria (Bifidobacteria), and break down into toxic chloropropanols when baked.",
    medicalTriggers: ["GERD", "IBS", "Type 2 Diabetes"],
    allergens: [],
    whoAdvice: "Use sparingly; prioritize plain water and natural unrefined fruits."
  },
  {
    id: "titanium_dioxide",
    name: "Titanium Dioxide",
    aliases: ["titanium dioxide", "e171", "ci 77891"],
    category: "Color Whitener",
    severity: "High",
    plainLanguage: "Inorganic nanoparticle pigment used to make candies, frostings, and sauces look bright white.",
    healthRisks: "Banned in the European Union in 2022 due to concerns over genotoxicity (DNA damage) and intestinal inflammation.",
    medicalTriggers: ["IBS", "Autoimmune Conditions", "Colon Health Concerns"],
    allergens: [],
    whoAdvice: "Avoid ingestion of products containing E171."
  },
  {
    id: "potassium_bromate",
    name: "Potassium Bromate",
    aliases: ["potassium bromate", "e924", "bromated flour"],
    category: "Dough Conditioner",
    severity: "High",
    plainLanguage: "A chemical flour improver used to make commercial bread dough rise higher and hold shape.",
    healthRisks: "Recognized kidney and thyroid carcinogen. Banned in Europe, Canada, Brazil, China, and India.",
    medicalTriggers: ["Kidney Disease", "Thyroid Issues"],
    allergens: [],
    whoAdvice: "Look for 'unbromated flour' on bakery labels."
  },
  {
    id: "carrageenan",
    name: "Carrageenan",
    aliases: ["carrageenan", "e407", "irish moss extract"],
    category: "Thickener & Stabilizer",
    severity: "Medium",
    plainLanguage: "A seaweed-derived thickening agent used in plant milks, ice cream, and processed meats.",
    healthRisks: "Known to induce gastrointestinal inflammation, stomach ulcers, and colitis flare-ups in susceptible individuals.",
    medicalTriggers: ["IBS", "Crohn's Disease", "Ulcerative Colitis", "GERD"],
    allergens: [],
    whoAdvice: "Avoid if experiencing chronic stomach upset or inflammatory gut conditions."
  },
  {
    id: "sodium_benzoate",
    name: "Sodium Benzoate",
    aliases: ["sodium benzoate", "e211", "benzoate of soda"],
    category: "Preservative",
    severity: "Medium",
    plainLanguage: "A chemical preservative used in acidic foods like sodas, fruit juices, and salad dressings.",
    healthRisks: "When combined with Vitamin C (Ascorbic Acid), it can form Benzene — a known human carcinogen.",
    medicalTriggers: ["Asthma", "ADHD"],
    allergens: [],
    whoAdvice: "Check for co-presence with ascorbic acid on soft drink labels."
  },
  {
    id: "maltodextrin",
    name: "Maltodextrin",
    aliases: ["maltodextrin"],
    category: "Processed Carbohydrate / Thickener",
    severity: "Medium",
    plainLanguage: "An ultra-processed starch powder with a Glycemic Index (110-135) higher than pure table sugar.",
    healthRisks: "Causes immediate, steep spikes in blood glucose and insulin. Alters gut bacteria composition.",
    medicalTriggers: ["Type 2 Diabetes", "PCOS", "Insulin Resistance"],
    allergens: [],
    whoAdvice: "Diabetics should track maltodextrin as equal to or worse than white sugar."
  },
  {
    id: "palm_oil",
    name: "Palm Oil / Palm Kernel Oil",
    aliases: ["palm oil", "palm kernel oil", "palmitate", "palmitic acid"],
    category: "Saturated Fat",
    severity: "Low",
    plainLanguage: "A tropical plant oil high in saturated palmitic acid.",
    healthRisks: "High palmitic acid intake raises LDL cholesterol. Environmental concerns regarding deforestation.",
    medicalTriggers: ["High Cholesterol", "Heart Disease"],
    allergens: [],
    whoAdvice: "Replace with heart-healthy unsaturated oils like olive oil or avocado oil."
  }
];

export const COMMON_ALLERGENS = [
  {
    id: "peanuts",
    name: "Peanuts",
    keywords: ["peanut", "peanuts", "peanut oil", "groundnut", "arachis oil"],
    severity: "High",
    description: "Can trigger life-threatening anaphylaxis in allergic individuals."
  },
  {
    id: "tree_nuts",
    name: "Tree Nuts",
    keywords: ["almond", "walnut", "cashew", "pistachio", "pecan", "hazelnut", "macadamia", "brazil nut"],
    severity: "High",
    description: "Severe allergen group causing mild to severe systemic allergic reactions."
  },
  {
    id: "milk",
    name: "Milk / Dairy",
    keywords: ["milk", "whey", "casein", "lactose", "butter", "cream", "cheese", "milk powder", "skim milk"],
    severity: "Medium",
    description: "Triggers lactose intolerance or milk protein anaphylaxis."
  },
  {
    id: "gluten",
    name: "Gluten / Wheat",
    keywords: ["wheat", "gluten", "barley", "rye", "spelt", "malt", "wheat flour", "semolina", "durum"],
    severity: "High",
    description: "Causes intestinal destruction in Celiac Disease and severe discomfort in Non-Celiac Gluten Sensitivity."
  },
  {
    id: "soy",
    name: "Soy",
    keywords: ["soy", "soya", "soybean", "soy lecithin", "tofu", "edamame", "soy protein"],
    severity: "Medium",
    description: "Common food allergen; soy lecithin may be tolerated by some but triggers sensitive individuals."
  },
  {
    id: "eggs",
    name: "Eggs",
    keywords: ["egg", "eggs", "albumin", "egg white", "egg yolk", "lysozyme", "mayonnaise"],
    severity: "Medium",
    description: "Common allergen in children and adults; requires clear labeling."
  },
  {
    id: "shellfish",
    name: "Shellfish / Fish",
    keywords: ["shrimp", "prawn", "crab", "lobster", "clam", "oyster", "anchovy", "fish gelatin", "fish sauce"],
    severity: "High",
    description: "Major allergen capable of severe rapid-onset anaphylactic reactions."
  }
];
