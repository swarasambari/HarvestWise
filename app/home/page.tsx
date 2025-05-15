"use client";

import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Leaf,  Sun, CloudRain, LeafyGreenIcon } from 'lucide-react';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 0, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const iconStyle = "w-6 h-6 text-green-600";

  return (
    <div
      className="min-h-screen bg-gray-50 overflow-hidden relative"
      style={{
        backgroundImage: "url('/images/bg3.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 right-20"
        {...floatingAnimation}
      >
        <Sun className="w-12 h-12 text-yellow-400" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-20"
        animate={{
          rotate: [0, 10, 0],
          transition: { duration: 3, repeat: Infinity }
        }}
      >
        <LeafyGreenIcon className="w-16 h-16 text-green-500 opacity-60" />
      </motion.div>

      {/* Space for Navbar */}
      
      <div className="h-14"></div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 relative">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto pt-12 lg:pt-20">
          {/* Left Content */}
          <motion.div 
            className="lg:w-1/2 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Leaf className={iconStyle} />
              </motion.div>
              <h1 className="text-4xl lg:text-5xl font-bold text-green-700">
                HarvestWise: 
              </h1>
            </div>
            
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-green-700 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Crop Yield Prediction
            </motion.h2>

            <motion.p 
              className="text-xl lg:text-2xl text-gray-800 mb-8 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Your AI-Powered Guide to Smarter Farming & Bigger Harvests
            </motion.p>

            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
            >
              <Button 
                className="bg-green-600 text-white px-8 py-6 text-lg rounded-md hover:bg-green-700 transition-all duration-300 flex items-center gap-2 group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span>TRY FOR FREE</span>
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CloudRain className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}