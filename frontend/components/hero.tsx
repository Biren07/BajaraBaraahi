// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { ArrowRight, BookOpen, Sparkles } from "lucide-react"
// import { cn } from "@/lib/utils"

// const slides = [
//   {
//     title: "Discover Your Next",
//     highlight: "Great Read",
//     description: "Explore our curated collection of bestsellers, classics, and hidden gems from around the world.",
//     cta: "Shop Now",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
//   },
//   {
//     title: "New Arrivals",
//     highlight: "Just Landed",
//     description: "Be the first to discover the latest releases from your favorite authors and emerging voices.",
//     cta: "Explore New",
//     image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=60",
//   },
//   {
//     title: "Up to 40% Off",
//     highlight: "Summer Sale",
//     description: "Grab your favorite books at unbeatable prices. Limited time offer on bestsellers.",
//     cta: "Shop Sale",
//     image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=60",
//   },
// ]

// export function Hero() {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [isAnimating, setIsAnimating] = useState(false)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsAnimating(true)
//       setTimeout(() => {
//         setCurrentSlide((prev) => (prev + 1) % slides.length)
//         setIsAnimating(false)
//       }, 500)
//     }, 6000)

//     return () => clearInterval(interval)
//   }, [])

//   const slide = slides[currentSlide]

//   return (
//     <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/50">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-red/10 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-red/5 rounded-full blur-3xl animate-pulse delay-1000" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
//       </div>

//       {/* Floating Books Animation */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute animate-float opacity-20"
//             style={{
//               left: `${10 + i * 15}%`,
//               top: `${20 + (i % 3) * 20}%`,
//               animationDelay: `${i * 0.5}s`,
//               animationDuration: `${4 + i}s`,
//             }}
//           >
//             <BookOpen className="w-8 h-8 md:w-12 md:h-12 text-red" />
//           </div>
//         ))}
//       </div>

//       <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Content */}
//           <div
//             className={cn(
//               "text-center lg:text-left transition-all duration-500",
//               isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
//             )}
//           >
//             <div className="inline-flex items-center gap-2 bg-red/10 text-red px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
//               <Sparkles className="w-4 h-4" />
//               Premium Book Collection
//             </div>

//             <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold leading-tight mb-6">
//               <span className="text-foreground">{slide.title}</span>
//               <br />
//               <span className="text-red relative">
//                 {slide.highlight}
//                 <svg
//                   className="absolute -bottom-2 left-0 w-full"
//                   viewBox="0 0 200 12"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M2 10C50 4 150 4 198 10"
//                     stroke="currentColor"
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     className="animate-draw"
//                   />
//                 </svg>
//               </span>
//             </h1>

//             <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
//               {slide.description}
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <Button
//                 size="lg"
//                 className="bg-red hover:bg-red-dark text-primary-foreground px-8 py-6 text-lg font-semibold group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red/25"
//               >
//                 {slide.cta}
//                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-2 border-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold transition-all duration-300"
//               >
//                 Browse Categories
//               </Button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border">
//               <div className="text-center lg:text-left">
//                 <p className="text-3xl md:text-4xl font-bold text-red">50K+</p>
//                 <p className="text-sm text-muted-foreground">Books Available</p>
//               </div>
//               <div className="text-center lg:text-left">
//                 <p className="text-3xl md:text-4xl font-bold text-red">100+</p>
//                 <p className="text-sm text-muted-foreground">Authors</p>
//               </div>
//               <div className="text-center lg:text-left">
//                 <p className="text-3xl md:text-4xl font-bold text-red">25K+</p>
//                 <p className="text-sm text-muted-foreground">Happy Readers</p>
//               </div>
//             </div>
//           </div>

//           {/* Image Section */}
//           <div className="relative hidden lg:block">
//             <div className="relative w-full aspect-square">
//               {/* Main Book Display */}
//               <div
//                 className={cn(
//                   "absolute inset-0 flex items-center justify-center transition-all duration-500",
//                   isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
//                 )}
//               >
//                 {/* Book Stack */}
//                 <div className="relative">
//                   {/* Back books */}
//                   <div className="absolute -left-8 -top-4 w-48 h-64 bg-primary rounded-lg shadow-2xl transform -rotate-12 animate-float" style={{ animationDelay: "0.5s" }} />
//                   <div className="absolute -right-8 -top-4 w-48 h-64 bg-red/80 rounded-lg shadow-2xl transform rotate-12 animate-float" style={{ animationDelay: "1s" }} />
                  
//                   {/* Main book */}
//                   <div className="relative w-56 h-72 bg-gradient-to-br from-red via-red-light to-red-dark rounded-lg shadow-2xl flex items-center justify-center animate-float">
//                     <div className="absolute inset-2 border-2 border-primary/20 rounded" />
//                     <BookOpen className="w-20 h-20 text-primary/80" />
//                   </div>
//                 </div>
//               </div>

//               {/* Decorative elements */}
//               <div className="absolute top-10 right-10 w-20 h-20 border-4 border-red/30 rounded-full animate-spin-slow" />
//               <div className="absolute bottom-20 left-10 w-16 h-16 bg-red/20 rounded-lg rotate-45 animate-bounce-slow" />
//             </div>
//           </div>
//         </div>

//         {/* Slide Indicators */}
//         <div className="flex justify-center gap-3 mt-12">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={cn(
//                 "w-3 h-3 rounded-full transition-all duration-300",
//                 currentSlide === index
//                   ? "bg-red w-8"
//                   : "bg-red/30 hover:bg-red/50"
//               )}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
//         <span className="text-sm text-muted-foreground">Scroll to explore</span>
//         <div className="w-6 h-10 border-2 border-red/50 rounded-full flex justify-center pt-2">
//           <div className="w-1.5 h-3 bg-red rounded-full animate-scroll" />
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         @keyframes draw {
//           0% { stroke-dasharray: 0 200; }
//           100% { stroke-dasharray: 200 0; }
//         }
//         @keyframes scroll {
//           0% { transform: translateY(0); opacity: 1; }
//           100% { transform: translateY(8px); opacity: 0; }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         .animate-draw {
//           animation: draw 1s ease-in-out forwards;
//         }
//         .animate-scroll {
//           animation: scroll 1.5s ease-in-out infinite;
//         }
//         .animate-spin-slow {
//           animation: spin 8s linear infinite;
//         }
//         .animate-bounce-slow {
//           animation: bounce 3s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const slides = [
  {
    title: "Discover Your Next",
    highlight: "Great Read",
    description:
      "Explore our curated collection of bestsellers, classics, and hidden gems from around the world.",
    cta: "Shop Now",
  },
  {
    title: "New Arrivals",
    highlight: "Just Landed",
    description:
      "Be the first to discover the latest releases from your favorite authors and emerging voices.",
    cta: "Explore New",
  },
  {
    title: "Up to 40% Off",
    highlight: "Summer Sale",
    description:
      "Grab your favorite books at unbeatable prices. Limited time offer on bestsellers.",
    cta: "Shop Sale",
  },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const slide = slides[currentSlide]

  return (
    <section
      className="relative min-h-[100vh] flex items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('../images/cover.webp')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="max-w-3xl text-center lg:text-left text-white">

          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Premium Book Collection
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {slide.title}
            <br />
            <span className="text-red-400">{slide.highlight}</span>
          </h1>

          <p className="text-lg md:text-xl mb-8 max-w-lg">
            {slide.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600 px-8 py-6 text-lg font-semibold"
            >
              {slide.cta}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold"
            >
              Browse Categories
            </Button>
          </div>

        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              currentSlide === index
                ? "bg-red-500 w-8"
                : "bg-white/50"
            )}
          />
        ))}
      </div>
    </section>
  )
}