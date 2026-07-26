import React, { useState } from "react";
import { User, HeartPulse, ShieldAlert, CheckCircle2, Save, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { profile, updateProfile } = useAuth();
  
  const [age, setAge] = useState(profile.age || 32);
  const [weight, setWeight] = useState(profile.weight || 70);
  const [height, setHeight] = useState(profile.height || 172);
  const [medicalConditions, setMedicalConditions] = useState(profile.medicalConditions || ["Hypertension", "Type 2 Diabetes"]);
  const [allergies, setAllergies] = useState(profile.allergies || ["Peanuts", "Gluten"]);
  const [dietaryPreferences, setDietaryPreferences] = useState(profile.dietaryPreferences || ["Low Sodium"]);
  const [fitnessGoals, setFitnessGoals] = useState(profile.fitnessGoals || "Blood Sugar Control & Heart Health");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const availableConditions = [
    "Hypertension",
    "Type 2 Diabetes",
    "PCOS",
    "Heart Disease",
    "GERD / Acid Reflux",
    "Kidney Disease",
    "Celiac Disease",
    "High Cholesterol"
  ];

  const availableAllergies = [
    "Peanuts",
    "Tree Nuts (Almond, Walnut)",
    "Milk / Dairy",
    "Gluten / Wheat",
    "Soy",
    "Eggs",
    "Shellfish / Fish"
  ];

  const availableDiets = [
    "Vegan",
    "Vegetarian",
    "Keto / Low Carb",
    "Low Sodium",
    "Gluten-Free",
    "Paleo"
  ];

  const toggleCondition = (cond) => {
    setMedicalConditions(prev => 
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
  };

  const toggleAllergy = (all) => {
    setAllergies(prev => 
      prev.includes(all) ? prev.filter(a => a !== all) : [...prev, all]
    );
  };

  const toggleDiet = (diet) => {
    setDietaryPreferences(prev => 
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      medicalConditions,
      allergies,
      dietaryPreferences,
      fitnessGoals
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <User className="w-3.5 h-3.5" />
          Personal Health Profile
        </div>
        <h1 className="text-3xl font-extrabold text-white">Customize Your Health Profile</h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          NutriScan uses your medical profile to personalize every food scan's Health Score and flag specific risk factors.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8">
        
        {savedSuccess && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Health profile updated successfully! All future food scans will use these rules.
          </div>
        )}

        {/* Basic Biometrics */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-emerald-400" />
            Biometrics & Fitness Target
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Medical Conditions */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Medical Conditions (Flags High-Risk Additives & Sodium/Sugar Limits)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {availableConditions.map((cond) => {
              const selected = medicalConditions.includes(cond);
              return (
                <button
                  key={cond}
                  type="button"
                  onClick={() => toggleCondition(cond)}
                  className={`p-3 rounded-xl text-xs text-left font-medium border transition-all ${
                    selected
                      ? "bg-rose-500/10 border-rose-500/40 text-rose-300 font-bold"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  {selected ? "✓ " : "+ "}{cond}
                </button>
              );
            })}
          </div>
        </div>

        {/* Known Allergies */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Known Allergies (Triggers Immediate Safety Warnings)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {availableAllergies.map((all) => {
              const selected = allergies.includes(all);
              return (
                <button
                  key={all}
                  type="button"
                  onClick={() => toggleAllergy(all)}
                  className={`p-3 rounded-xl text-xs text-left font-medium border transition-all ${
                    selected
                      ? "bg-amber-500/10 border-amber-500/40 text-amber-300 font-bold"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  {selected ? "✓ " : "+ "}{all}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Dietary Lifestyle Preferences</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {availableDiets.map((diet) => {
              const selected = dietaryPreferences.includes(diet);
              return (
                <button
                  key={diet}
                  type="button"
                  onClick={() => toggleDiet(diet)}
                  className={`p-3 rounded-xl text-xs text-left font-medium border transition-all ${
                    selected
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  {selected ? "✓ " : "+ "}{diet}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            Save Health Profile
          </button>
        </div>
      </form>
    </div>
  );
}
