"use client";

import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [hoveredService, setHoveredService] = useState<null | string>(null)


  return (
    <div
      className="min-h-screen bg-[#E6F4F1] overflow-hidden relative bg-cover bg-fixed"
      style={{ backgroundImage: "url('/images/bga.png')" }}
    >
      <div className="h-14"></div>

      <main className="container mx-auto px-4 py-4 relative mt-10">
        {/* About Section with fade-in animation */}
        <section className="max-w-full mx-auto mb-8 opacity-0 animate-fadeIn">
          <h1 className="text-4xl font-bold mb-4 text-[#2C3E50] text-center hover:scale-105 transition-transform duration-300">
            About Us
          </h1>
          <p className="text-lg text-[#2C3E50] leading-relaxed text-left hover:text-[#34495E] transition-colors duration-300">
            At HarvestWise, we are redefining the future of agriculture by merging the
            power of technology with the wisdom of experience. Our mission is to empower
            farmers with reliable, data-driven insights that transform how they approach
            farming—from crop selection to planting schedules and resource management. By
            providing clear, actionable information, we help farmers make informed decisions
            that increase productivity, reduce risk, and ultimately drive higher yields.
          </p>
        </section>

        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#2C3E50] hover:text-[#34495E] transition-colors duration-300">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Enter Details Card */}
            <div 
              className={`bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all duration-500 
                hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-b hover:from-white hover:to-[#E6F4F1]
                ${hoveredService === 'enter' ? 'ring-2 ring-[#2C3E50]' : ''}
                animate-slideIn`}
              onMouseEnter={() => setHoveredService('enter')}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="mb-4 group">
                <div className="w-20 h-20 mx-auto bg-[#E6F4F1] rounded-full flex items-center justify-center group-hover:animate-bounce">
                  <Image
                    src="/images/enter.png"
                    alt="Enter Details Icon"
                    width={80}
                    height={80}
                    className="mx-auto transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#2C3E50] group-hover:text-[#34495E]">
                Fertilizer Recommender
              </h3>
              <p className="text-[#5D6D7E] group-hover:text-[#34495E]">
              The Fertilizer Recommender suggests optimal nutrient adjustments based on soil composition and crop requirements.
              </p>
            </div>

            {/* Crop Recommendation Card */}
            <div 
              className={`bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all duration-500 
                hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-b hover:from-white hover:to-[#E6F4F1]
                ${hoveredService === 'crop' ? 'ring-2 ring-[#2C3E50]' : ''}
                animate-slideIn`}
              style={{ animationDelay: '0.2s' }}
              onMouseEnter={() => setHoveredService('crop')}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="mb-4 group">
                <div className="w-20 h-20 mx-auto bg-[#E6F4F1] rounded-full flex items-center justify-center group-hover:animate-bounce">
                  <Image
                    src="/images/rcmd.png"
                    alt="Crop Recommendation Icon"
                    width={80}
                    height={80}
                    className="mx-auto transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#2C3E50] group-hover:text-[#34495E]">
                Crop Recommendation
              </h3>
              <p className="text-[#5D6D7E] group-hover:text-[#34495E]">
                The Crop Recommender suggests the best crops to plant based on your location
                and seasonal factors.
              </p>
            </div>

            {/* Rainfall Fetch Card */}
            <div 
              className={`bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all duration-500 
                hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-b hover:from-white hover:to-[#E6F4F1]
                ${hoveredService === 'rainfall' ? 'ring-2 ring-[#2C3E50]' : ''}
                animate-slideIn`}
              style={{ animationDelay: '0.4s' }}
              onMouseEnter={() => setHoveredService('rainfall')}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="mb-4 group">
                <div className="w-20 h-20 mx-auto bg-[#E6F4F1] rounded-full flex items-center justify-center group-hover:animate-bounce">
                  <Image
                    src="/images/rnfl.png"
                    alt="Rainfall Fetch Icon"
                    width={80}
                    height={80}
                    className="mx-auto transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#2C3E50] group-hover:text-[#34495E]">
                Rainfall Fetch
              </h3>
              <p className="text-[#5D6D7E] group-hover:text-[#34495E]">
                Rainfall details of your area are fetched automatically by the ML model based on
                past data for accurate predictions.
              </p>
            </div>

            {/* Prediction Card */}
            <div 
              className={`bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all duration-500 
                hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-b hover:from-white hover:to-[#E6F4F1]
                ${hoveredService === 'prediction' ? 'ring-2 ring-[#2C3E50]' : ''}
                animate-slideIn`}
              style={{ animationDelay: '0.6s' }}
              onMouseEnter={() => setHoveredService('prediction')}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="mb-4 group">
                <div className="w-20 h-20 mx-auto bg-[#E6F4F1] rounded-full flex items-center justify-center group-hover:animate-bounce">
                  <Image
                    src="/images/prdn.png"
                    alt="Prediction Icon"
                    width={80}
                    height={80}
                    className="mx-auto transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#2C3E50] group-hover:text-[#34495E]">
                Prediction
              </h3>
              <p className="text-[#5D6D7E] group-hover:text-[#34495E]">
                A Random Forest ML model, trained on past 20 years of data, is used to predict
                the approximate crop yield.
              </p>
            </div>
          </div>
        </section>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[url('/images/grass.png')] bg-repeat-x bg-bottom"></div>
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-slideIn {
          opacity: 0;
          animation: slideIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}