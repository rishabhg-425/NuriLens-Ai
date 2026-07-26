import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { queryOne, runSql } from "../config/database.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "nutrilens_secret_key_2026";

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, profile } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await queryOne("SELECT id FROM users WHERE email = ?", [email]);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    const userId = "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6);
    const passwordHash = await bcrypt.hash(password, 10);

    await runSql("INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)", [
      userId,
      email,
      passwordHash
    ]);

    // Create default profile
    const medicalConditions = profile?.medicalConditions ? JSON.stringify(profile.medicalConditions) : JSON.stringify(["Hypertension"]);
    const allergies = profile?.allergies ? JSON.stringify(profile.allergies) : JSON.stringify(["Peanuts"]);
    const dietaryPreferences = profile?.dietaryPreferences ? JSON.stringify(profile.dietaryPreferences) : JSON.stringify([]);
    const fitnessGoals = profile?.fitnessGoals || "General Wellness";

    await runSql(
      `INSERT INTO profiles (user_id, age, weight, height, medical_conditions, allergies, dietary_preferences, fitness_goals) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        profile?.age || 30,
        profile?.weight || 70,
        profile?.height || 170,
        medicalConditions,
        allergies,
        dietaryPreferences,
        fitnessGoals
      ]
    );

    const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: "30d" });

    res.json({
      token,
      user: { id: userId, email },
      profile: {
        age: profile?.age || 30,
        weight: profile?.weight || 70,
        height: profile?.height || 170,
        medicalConditions: JSON.parse(medicalConditions),
        allergies: JSON.parse(allergies),
        dietaryPreferences: JSON.parse(dietaryPreferences),
        fitnessGoals
      }
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await queryOne("SELECT * FROM users WHERE email = ?", [email]);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "30d" });

    const profileRow = await queryOne("SELECT * FROM profiles WHERE user_id = ?", [user.id]);
    const profile = profileRow ? {
      age: profileRow.age,
      weight: profileRow.weight,
      height: profileRow.height,
      medicalConditions: profileRow.medical_conditions ? JSON.parse(profileRow.medical_conditions) : [],
      allergies: profileRow.allergies ? JSON.parse(profileRow.allergies) : [],
      dietaryPreferences: profileRow.dietary_preferences ? JSON.parse(profileRow.dietary_preferences) : [],
      fitnessGoals: profileRow.fitness_goals
    } : {};

    res.json({
      token,
      user: { id: user.id, email: user.email },
      profile
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Failed to log in" });
  }
});

// Get User Profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const profileRow = await queryOne("SELECT * FROM profiles WHERE user_id = ?", [userId]);

    if (!profileRow) {
      // Default demo profile
      return res.json({
        age: 32,
        weight: 72,
        height: 175,
        medicalConditions: ["Hypertension", "Type 2 Diabetes"],
        allergies: ["Peanuts", "Gluten"],
        dietaryPreferences: ["Low Sodium"],
        fitnessGoals: "Blood Sugar Control & Heart Health"
      });
    }

    res.json({
      age: profileRow.age,
      weight: profileRow.weight,
      height: profileRow.height,
      medicalConditions: profileRow.medical_conditions ? JSON.parse(profileRow.medical_conditions) : [],
      allergies: profileRow.allergies ? JSON.parse(profileRow.allergies) : [],
      dietaryPreferences: profileRow.dietary_preferences ? JSON.parse(profileRow.dietary_preferences) : [],
      fitnessGoals: profileRow.fitness_goals
    });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Update Profile
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { age, weight, height, medicalConditions, allergies, dietaryPreferences, fitnessGoals } = req.body;

    const medStr = JSON.stringify(medicalConditions || []);
    const allStr = JSON.stringify(allergies || []);
    const dietStr = JSON.stringify(dietaryPreferences || []);

    const existing = await queryOne("SELECT user_id FROM profiles WHERE user_id = ?", [userId]);

    if (existing) {
      await runSql(
        `UPDATE profiles SET age = ?, weight = ?, height = ?, medical_conditions = ?, allergies = ?, dietary_preferences = ?, fitness_goals = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?`,
        [age, weight, height, medStr, allStr, dietStr, fitnessGoals, userId]
      );
    } else {
      await runSql(
        `INSERT INTO profiles (user_id, age, weight, height, medical_conditions, allergies, dietary_preferences, fitness_goals) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, age, weight, height, medStr, allStr, dietStr, fitnessGoals]
      );
    }

    res.json({
      message: "Profile updated successfully",
      profile: { age, weight, height, medicalConditions, allergies, dietaryPreferences, fitnessGoals }
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;
