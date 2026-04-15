"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Lightbulb,
  Rocket,
  Heart,
  GraduationCap,
  Baby,
  Briefcase,
  Feather,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Fiction",
    icon: BookOpen,
    count: 12500,
    color: "from-red-900/30 to-black",
    description: "Explore imaginative worlds",
  },
  {
    name: "Non-Fiction",
    icon: Lightbulb,
    count: 8900,
    color: "from-red-800/30 to-black",
    description: "Learn from real stories",
  },
  {
    name: "Science & Tech",
    icon: Rocket,
    count: 4500,
    color: "from-red-900/20 to-black",
    description: "Discover innovations",
  },
  {
    name: "Romance",
    icon: Heart,
    count: 6200,
    color: "from-red-700/30 to-black",
    description: "Stories of love",
  },
  {
    name: "Academic",
    icon: GraduationCap,
    count: 3800,
    color: "from-red-900/25 to-black",
    description: "Educational resources",
  },
  {
    name: "Children",
    icon: Baby,
    count: 5100,
    color: "from-red-800/20 to-black",
    description: "Books for young minds",
  },
  {
    name: "Business",
    icon: Briefcase,
    count: 4200,
    color: "from-red-900/30 to-black",
    description: "Grow your career",
  },
  {
    name: "Literature",
    icon: Feather,
    count: 7800,
    color: "from-red-800/25 to-black",
    description: "Classic masterpieces",
  },
];

export function Categories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-16 md:py-24 bg-black text-white overflow-hidden">

      {/* ===== MAROON GLOW BACKGROUND ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-900/20 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-800/10 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* ===== HEADER ===== */}
        <div className="text-center mb-12">
          <span className="text-red-400 font-medium text-sm uppercase tracking-wider">
            Browse by Genre
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2">
            <span className="text-white">Explore</span>{" "}
            <span className="text-red-500">Categories</span>
          </h2>

          <p className="text-gray-400 mt-3 max-w-lg mx-auto">
            Discover books across all genres in our curated collection.
          </p>
        </div>

        {/* ===== GRID ===== */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/category/${category.name.toLowerCase().replace(/ & /g, "-")}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "group relative rounded-2xl p-6 border border-white/10",
                  "bg-[#141414] hover:bg-[#1a1a1a]",
                  "transition-all duration-500 overflow-hidden hover:scale-[1.03]"
                )}
              >

                {/* Hover Maroon Gradient */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    category.color
                  )}
                />

                <div className="relative z-10">

                  {/* ICON */}
                  <div
                    className={cn(
                      "w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-500",
                      hoveredIndex === index
                        ? "bg-red-900 scale-110"
                        : "bg-red-900/20"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-7 h-7 transition-colors duration-500",
                        hoveredIndex === index
                          ? "text-white"
                          : "text-red-400"
                      )}
                    />
                  </div>

                  {/* TEXT */}
                  <h3 className="font-semibold text-lg text-white group-hover:text-red-400 transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    {category.description}
                  </p>

                  <p className="text-xs text-red-400 mt-2 font-medium">
                    {category.count.toLocaleString()} Books
                  </p>
                </div>

                {/* ARROW */}
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-red-900/0 group-hover:bg-red-900 flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}