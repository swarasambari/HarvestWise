"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Sprout, Droplet, Leaf, Thermometer, AlertCircle } from "lucide-react";

// Crop autocomplete options (provided list)
const cropOptions = [
  "Almond Nut",
  "Aniseed",
  "Apple",
  "Apricot",
  "Arecanut",
  "Asafoetida",
  "Ash Gourd",
  "Banana",
  "Barley(JAV)",
  "Bay Leaf",
  "Beetroot",
  "Bitter Gourd",
  "Black Gram",
  "Black Pepper",
  "Black eyed beans( chawli)",
  "Bottle Gourd",
  "Brinjal",
  "Cabbage",
  "Capsicum",
  "Cardamom",
  "Carrot",
  "Cashewnuts",
  "Cauliflower",
  "Chickoo",
  "Chickpeas(Channa)",
  "Chili",
  "Cinnamon",
  "Cloves",
  "Cluster Beans(Gavar)",
  "Coconut",
  "Coffee",
  "Coriander leaves",
  "Coriander seeds",
  "Cotton",
  "Cucumber",
  "Cumin seeds",
  "Curry leaves",
  "Custard apple",
  "Dates",
  "Drumstick – moringa",
  "Fava beans (Papdi - Val)",
  "Fenugreek Leaf(methi)",
  "Figs",
  "French Beans(Farasbi)",
  "Garcinia indica(kokam)",
  "Garlic",
  "Ginger",
  "Gooseberry(Amla)",
  "Grapes",
  "Green Peas",
  "Guava",
  "Horse Gram(kulthi)",
  "Jackfruit",
  "Jaiphal(Nutmeg)",
  "Jambun(Syzygium cumini)",
  "Jowar(Sorghum)",
  "Jute",
  "Kidney beans",
  "Lady Finger",
  "Lemon",
  "Lemon Grass",
  "Lentils(Masoor Dal)",
  "Lima beans(Pavta)",
  "Maize",
  "Mango",
  "Moth bean(Matki)",
  "Mung beans",
  "Mushroom",
  "Musk Melon",
  "Mustard seeds",
  "Olive",
  "Onion",
  "Orange",
  "Papaya",
  "Pineapple",
  "Pistachio Nut",
  "Pomegranate",
  "Potato",
  "Pumpkin",
  "Radish",
  "Ragi( naachnnii)",
  "Raisins",
  "Rapeseed (Mohri)",
  "Rice",
  "Ridgegourd",
  "Soyabean",
  "Spinach",
  "Sunflower",
  "Sweet Potato",
  "Tamarind",
  "Tapioca(Suran)",
  "Tomato",
  "Turmeric",
  "Water Melon",
  "Ziziphus mauritiana(Bor)",
  "pigeon peas(Toor Dal)",
  "sesame seed",
];

interface FormData {
  cropName: string;
  nitrogenLevel: string;
  phosphorusLevel: string;
  potassiumLevel: string;
  pHLevel: string;
}

// Updated RecommendationData interface to match API response
interface RecommendationData {
  nitrogen_needed: number;
  phosphorus_needed: number;
  potassium_needed: number;
  ph_adjustment: string;
  recommended_crop_ph: number;
}

export default function FertilizerRecommendation() {
  const [isMounted, setIsMounted] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    cropName: "",
    nitrogenLevel: "",
    phosphorusLevel: "",
    potassiumLevel: "",
    pHLevel: "",
  });
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Updated handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRecommendation(null);

    // Validate all fields
    if (
      !formData.cropName ||
      !formData.nitrogenLevel ||
      !formData.phosphorusLevel ||
      !formData.potassiumLevel ||
      !formData.pHLevel
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/fertilizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop_name: formData.cropName,
          nitrogen: parseFloat(formData.nitrogenLevel),
          phosphorus: parseFloat(formData.phosphorusLevel),
          potassium: parseFloat(formData.potassiumLevel),
          ph: parseFloat(formData.pHLevel),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const data: RecommendationData = await response.json();
      
// Handle API errors
if (typeof data === 'object' && data !== null && 'error' in data) {
  throw new Error((data as { error: string }).error);
}


      setRecommendation(data);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get recommendation");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setShowForm(true);
    setRecommendation(null);
    setError(null);
  };

  if (!isMounted) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div
      className="min-h-screen bg-gray-50 overflow-hidden"
      style={{
        backgroundImage: "url('/images/bg3.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <main className="container mx-auto p-4">
        <motion.div
          className="max-w-md bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 mt-24 ml-8 border border-green-200"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {showForm ? (
            <>
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-2xl font-bold text-green-700 mb-2">Fertilizer Recommendation</h1>
                <p className="text-gray-600 text-sm">
                  Enter your crop and soil details for a recommendation
                </p>
              </motion.div>

              {error && (
                <motion.div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {/* Crop Name Input with autocomplete */}
                <motion.div variants={item}>
                  <label className="text-sm font-medium text-gray-800 block mb-1">Crop Name:</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Sprout className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      name="cropName"
                      type="text"
                      placeholder="Enter crop name"
                      value={formData.cropName}
                      onChange={handleChange}
                      list="crop-options"
                      className="pl-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-500 text-black hover:border-green-400 transition-colors duration-200"
                    />
                    <datalist id="crop-options">
                      {cropOptions.map((option) => (
                        <option key={option} value={option} />
                      ))}
                    </datalist>
                  </div>
                </motion.div>

                <motion.div variants={item}>
                  <label className="text-sm font-medium text-gray-800 block mb-1">
                    Soil Nitrogen (N) Level:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Droplet className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      name="nitrogenLevel"
                      type="number"
                      placeholder="Enter nitrogen level"
                      value={formData.nitrogenLevel}
                      onChange={handleChange}
                      className="pl-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-500 text-black hover:border-green-400 transition-colors duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div variants={item}>
                  <label className="text-sm font-medium text-gray-800 block mb-1">
                    Soil Phosphorus (P) Level:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Leaf className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      name="phosphorusLevel"
                      type="number"
                      placeholder="Enter phosphorus level"
                      value={formData.phosphorusLevel}
                      onChange={handleChange}
                      className="pl-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-500 text-black hover:border-green-400 transition-colors duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div variants={item}>
                  <label className="text-sm font-medium text-gray-800 block mb-1">
                    Soil Potassium (K) Level:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Leaf className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      name="potassiumLevel"
                      type="number"
                      placeholder="Enter potassium level"
                      value={formData.potassiumLevel}
                      onChange={handleChange}
                      className="pl-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-500 text-black hover:border-green-400 transition-colors duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div variants={item}>
                  <label className="text-sm font-medium text-gray-800 block mb-1">
                    Soil pH Level:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Thermometer className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      name="pHLevel"
                      type="number"
                      placeholder="Enter pH level"
                      value={formData.pHLevel}
                      onChange={handleChange}
                      className="pl-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-500 text-black hover:border-green-400 transition-colors duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div variants={item} className="pt-2">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Getting Recommendation...
                      </div>
                    ) : (
                      <>
                        <span>Get Recommendation</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </>
          ) : (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-xl font-semibold mb-2 text-green-800 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                Fertilizer Recommendation
              </motion.h2>
              {recommendation && (
                <motion.div
                  className="mt-6 p-4 bg-green-50 rounded-lg text-black border border-green-200 shadow-inner"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <motion.div className="space-y-2" initial="hidden" animate="visible" variants={stagger}>
                    <motion.p variants={item}>
                      <span className="font-semibold">Nitrogen (N):</span>{" "}
                      {recommendation.nitrogen_needed.toFixed(1)} units needed
                    </motion.p>
                    <motion.p variants={item}>
                      <span className="font-semibold">Phosphorus (P):</span>{" "}
                      {recommendation.phosphorus_needed.toFixed(1)} units needed
                    </motion.p>
                    <motion.p variants={item}>
                      <span className="font-semibold">Potassium (K):</span>{" "}
                      {recommendation.potassium_needed.toFixed(1)} units needed
                    </motion.p>
                    <motion.p variants={item}>
                      <span className="font-semibold">pH Recommendation:</span>{" "}
                      {recommendation.ph_adjustment}
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}

              <motion.div variants={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <Button
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                  onClick={resetForm}
                >
                  Back to Recommendation Form
                </Button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
