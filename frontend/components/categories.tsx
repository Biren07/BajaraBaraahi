"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen, Lightbulb, Rocket, Heart, GraduationCap, Baby, Briefcase, Feather, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import bookService from "@/services/bookService";
import { toast } from "sonner"; 

const MASTER_CATEGORIES = [
  { name: "Fiction", icon: BookOpen, color: "from-red-900/30 to-black", description: "Explore imaginative worlds" },
  { name: "Romance", icon: Heart, color: "from-red-700/30 to-black", description: "Stories of love" },
  { name: "Action", icon: Rocket, color: "from-red-900/20 to-black", description: "Fast-paced adventures" },
  { name: "Thriller", icon: Lightbulb, color: "from-red-800/30 to-black", description: "Suspense and mystery" },
  { name: "Horror", icon: BookOpen, color: "from-red-950/40 to-black", description: "Dark and chilling tales" },
  { name: "Fantasy", icon: Feather, color: "from-purple-900/30 to-black", description: "Magic and mythical worlds" },
  { name: "Biography", icon: Briefcase, color: "from-blue-900/30 to-black", description: "Real life inspiring stories" },
  { name: "Other", icon: Baby, color: "from-gray-800/30 to-black", description: "Discover more books" },
];

export function Categories() {
  const [categories, setCategories] = useState(
    MASTER_CATEGORIES.map(cat => ({ ...cat, count: 0, isComingSoon: true }))
  );
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await bookService.getBooks();
        const books = response.books || [];

        // Backend bata aayeko books ko count nikalne
        const availabilityMap: Record<string, number> = {};
        books.forEach((book: any) => {
          const genre = (book.genre || "Other").toLowerCase().trim();
          availabilityMap[genre] = (availabilityMap[genre] || 0) + 1;
        });

        // Master list lai availabilityMap sanga compare garne
        const finalData = MASTER_CATEGORIES.map((cat) => {
          const lowerName = cat.name.toLowerCase().trim();
          const count = availabilityMap[lowerName] || 0;
          return {
            ...cat,
            count,
            isComingSoon: count === 0,
          };
        });

        setCategories(finalData);
      } catch (error) {
        console.error("Fetch Error:", error);
        // Error aayo bhane pani default list dekhinchha (Coming Soon state ma)
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="relative py-16 md:py-24 bg-black text-white overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-red-500 font-bold text-xs uppercase tracking-[0.2em]">Browse Catalog</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3 text-white">
            Explore <span className="text-red-600">Genres</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isSoon = category.isComingSoon;

            return (
              <div key={category.name} className="relative">
                <Link
                  href={isSoon ? "#" : `/category/${category.name.toLowerCase()}`}
                  onClick={(e) => {
                    if (isSoon) {
                      e.preventDefault();
                      toast.info(`${category.name} collection is arriving soon!`);
                    }
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "group block relative rounded-2xl p-6 border transition-all duration-500 overflow-hidden",
                    isSoon 
                      ? "border-white/5 bg-white/[0.02] cursor-not-allowed opacity-70" 
                      : "border-white/10 bg-[#0A0A0A] hover:bg-[#111111] hover:scale-[1.02] border-red-900/20"
                  )}
                >
                  {/* Hover Gradient Overlay */}
                  {!isSoon && (
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      category.color
                    )} />
                  )}

                  <div className="relative z-10">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500",
                      isSoon ? "bg-white/5 text-gray-500" : "bg-red-950/30 text-red-500 group-hover:bg-red-600 group-hover:text-white"
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="font-bold text-xl mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                      {isSoon ? "Coming to our shelves soon" : category.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className={cn(
                        "text-xs font-semibold px-2.5 py-1 rounded-md",
                        isSoon ? "bg-white/5 text-gray-500" : "bg-red-500/10 text-red-500"
                      )}>
                        {isSoon ? "Coming Soon" : `${category.count} Books`}
                      </span>
                      
                      {!isSoon && (
                        <ChevronRight className="w-4 h-4 text-red-500 translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}