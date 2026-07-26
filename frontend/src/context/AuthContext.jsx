import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    age: 32,
    weight: 70,
    height: 172,
    medicalConditions: ["Hypertension", "Type 2 Diabetes"],
    allergies: ["Peanuts", "Gluten"],
    dietaryPreferences: ["Low Sodium"],
    fitnessGoals: "Blood Sugar Stability & Heart Health"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      if (res.data) {
        setProfile(res.data);
      }
    } catch (err) {
      console.log("Using default demo user profile");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    if (res.data.token) {
      localStorage.setItem("nutrilens_token", res.data.token);
      setUser(res.data.user);
      if (res.data.profile) setProfile(res.data.profile);
    }
    return res.data;
  };

  const register = async (email, password, initialProfile) => {
    const res = await API.post("/auth/register", { email, password, profile: initialProfile });
    if (res.data.token) {
      localStorage.setItem("nutrilens_token", res.data.token);
      setUser(res.data.user);
      if (res.data.profile) setProfile(res.data.profile);
    }
    return res.data;
  };

  const updateProfile = async (updatedFields) => {
    const newProfile = { ...profile, ...updatedFields };
    setProfile(newProfile);
    try {
      await API.put("/auth/profile", newProfile);
    } catch (err) {
      console.warn("Failed to persist profile to server:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("nutrilens_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login,
        register,
        updateProfile,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
