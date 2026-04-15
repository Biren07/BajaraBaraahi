"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const COLORS = {
  deepMaroon: "#661511",
}

type Book = {
  id: string
  title: string
  image: string
}

export function PromoBanner() {
  // 📚 20 Dummy Books
  const [books] = useState<Book[]>([
    { id: "1001", title: "Rich Dad Poor Dad", image: "https://picsum.photos/200/300?1" },
    { id: "1002", title: "Palpasa Cafe", image: "https://picsum.photos/200/300?2" },
    { id: "1003", title: "Crime & Punishment", image: "https://picsum.photos/200/300?3" },
    { id: "1004", title: "Atomic Habits", image: "https://picsum.photos/200/300?4" },
    { id: "1005", title: "The Alchemist", image: "https://picsum.photos/200/300?5" },
    { id: "1006", title: "1984", image: "https://picsum.photos/200/300?6" },
    { id: "1007", title: "Sapiens", image: "https://picsum.photos/200/300?7" },
    { id: "1008", title: "Deep Work", image: "https://picsum.photos/200/300?8" },
    { id: "1009", title: "Psychology of Money", image: "https://picsum.photos/200/300?9" },
    { id: "1010", title: "Ikigai", image: "https://picsum.photos/200/300?10" },
    { id: "1011", title: "Clean Code", image: "https://picsum.photos/200/300?11" },
    { id: "1012", title: "Pragmatic Programmer", image: "https://picsum.photos/200/300?12" },
    { id: "1013", title: "Zero to One", image: "https://picsum.photos/200/300?13" },
    { id: "1014", title: "Hooked", image: "https://picsum.photos/200/300?14" },
    { id: "1015", title: "Start With Why", image: "https://picsum.photos/200/300?15" },
    { id: "1016", title: "Lean Startup", image: "https://picsum.photos/200/300?16" },
    { id: "1017", title: "Thinking Fast & Slow", image: "https://picsum.photos/200/300?17" },
    { id: "1018", title: "Educated", image: "https://picsum.photos/200/300?18" },
    { id: "1019", title: "Subtle Art", image: "https://picsum.photos/200/300?19" },
    { id: "1020", title: "Man’s Search for Meaning", image: "https://picsum.photos/200/300?20" },
  ])

  const [hoveredBook, setHoveredBook] = useState<Book | null>(null)

  return (
    <section className="py-20 relative bg-[#0a0a0a] text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,#000_100%)]" />

      {/* FLOATING HOVER CARD (TOP) */}
      {hoveredBook && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute top-10 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-2xl w-[180px]">
            <img
              src={hoveredBook.image}
              className="w-full h-[200px] object-cover rounded mb-2"
              alt=""
            />
            <h4 className="text-sm font-bold">{hoveredBook.title}</h4>
            <p className="text-[10px] text-white/40 font-mono">
              ID: {hoveredBook.id}
            </p>
          </div>
        </motion.div>
      )}

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-16 items-center">

        {/* TEXT */}
        <div>
          <h2 className="text-7xl font-bold mb-6">
            Living{" "}
            <span style={{ color: COLORS.deepMaroon }}>Archives</span> 
          </h2>

       <p className="text-gray-400 mb-8">
  A perpetual motion repository of cultural logic. <br />
  Interrogate the physical spines of our most prized assets in real-time.
</p>

          <Link href="/used-books">
            <Button className="bg-[#661511] hover:bg-[#4a0f0c] px-8 py-6 rounded-none">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* BOOK SHELF */}
        <div className="relative">

          {/* LEFT FADE */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-20 pointer-events-none bg-gradient-to-r from-[#0a0a0a] to-transparent" />

          {/* RIGHT FADE */}
          <div className="absolute right-0 top-0 bottom-0 w-20 z-20 pointer-events-none bg-gradient-to-l from-[#0a0a0a] to-transparent" />

          {/* SCROLL ROW */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth px-10 pb-10">

            {books.map((book) => (
              <div
                key={book.id}
                onMouseEnter={() => setHoveredBook(book)}
                onMouseLeave={() => setHoveredBook(null)}
                className="relative w-16 h-[300px] flex-shrink-0 cursor-pointer bg-zinc-900 border-l border-white/10 flex items-center justify-center shadow-[inset_-10px_0_20px_rgba(0,0,0,0.6)] hover:-translate-y-3 transition"
              >
                {/* spine */}
                <p className="rotate-90 text-[11px] font-bold uppercase opacity-70">
                  {book.title}
                </p>

                {/* id */}
                <span className="absolute bottom-3 text-[8px] font-mono opacity-40">
                  {book.id}
                </span>
              </div>
            ))}

          </div>

          {/* SHELF BASE */}
          <div className="h-[6px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full blur-[1px]" />
        </div>
      </div>

      {/* SCROLLBAR HIDE */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}