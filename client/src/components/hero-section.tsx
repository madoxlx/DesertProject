import { useState } from "react";
import { FilterTabs } from "@/components/filter-tabs";

export function HeroSection() {
  return (
    <section className="relative bg-gray-900 text-white">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
          alt="Scenic view of pyramids" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      
      <div className="container mx-auto px-4 py-10 md:py-16 lg:py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Discover the Beauty of the Middle East
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Experience authentic culture, breathtaking landscapes, and unforgettable adventures.
          </p>
        </div>
        
        {/* Search and Filter Container */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 text-gray-800">
          <FilterTabs />
        </div>
      </div>
    </section>
  );
}
