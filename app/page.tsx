"use client";

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Leaf, Sprout, ArrowRight } from 'lucide-react';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };


  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div
  className="min-h-screen bg-gray-50 overflow-hidden relative bg-cover bg-fixed"
  style={{
    backgroundImage: "url('/images/bg3.png')",
  }}
>

      {/* Animated Background Elements
      <motion.div
        className="absolute top-40 right-40 opacity-60"
        {...floatingAnimation}
      >
        <LeafyGreen className="w-12 h-12 text-green-600" />
      </motion.div> */}

      <motion.div
        className="absolute bottom-40 left-40 opacity-60"
        animate={{
          rotate: [0, 10, 0],
          transition: { duration: 3, repeat: Infinity }
        }}
      >
        <Sprout className="w-12 h-12 text-green-600" />
      </motion.div>

      {/* Space for Navbar */}
      <div className="h-24"></div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 relative">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto pt-12 lg:pt-20">
          {/* Left Content */}
          <motion.div 
            className="lg:w-1/2 z-10 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Leaf className="w-8 h-8 text-green-600" />
              </motion.div>
              <motion.h1 
                className="text-4xl lg:text-5xl font-bold text-black"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                HarvestWise:
              </motion.h1>
            </div>

            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-black mb-4"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              Crop Yield Prediction
            </motion.h2>

            <motion.p 
              className="text-xl lg:text-2xl text-gray-700 mb-8 max-w-xl"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
            >
              Your AI-Powered Guide to Smarter Farming & Bigger Harvests
            </motion.p>

            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
            >
              <Link href="/prediction">
                <Button 
                  className="bg-black text-white px-8 py-6 text-lg rounded-md hover:bg-gray-900 transition-all duration-300 flex items-center gap-2 group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span>TRY FOR FREE</span>
                  <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
