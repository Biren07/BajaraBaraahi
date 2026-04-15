"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, MapPin, Calendar, ShieldCheck } from "lucide-react"

const PhysicalSanctuary = () => {
  return (
    <div className="relative min-h-screen bg-[#0b0a09] text-white flex flex-col md:flex-row overflow-hidden font-serif">

      {/* LEFT SECTION */}
      <div className="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center relative z-10">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >

          {/* Label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-[1px] bg-[#661511]" />
            <span className="text-[#a33a2f] text-[10px] tracking-[0.3em] uppercase font-bold">
              Flagship Location
            </span>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-8xl leading-[0.9] mb-6">
            The Physical <br />
            <span className="text-[#661511] italic">Sanctuary.</span>
          </h1>

          {/* Description */}
          <p className="max-w-md text-white/60 text-lg md:text-xl leading-relaxed mb-10 italic">
            Experience the tactile beauty of books in the historic heart of Kathmandu.
            Our flagship store has been a haven for scholars since 1994.
          </p>

          {/* Button */}
          <button className="flex items-center gap-5 group">
            <div className="bg-[#661511] p-4 rounded-full transition-transform group-hover:scale-110">
              <ArrowRight size={20} />
            </div>

            <span className="text-white text-xs tracking-widest uppercase border-b border-transparent group-hover:border-[#661511] transition">
              Locate Sanctuary
            </span>
          </button>
        </motion.div>

        {/* META */}
        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 gap-8">

          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">
              Archive Access
            </p>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin size={14} className="text-[#661511]" />
              <span className="font-mono text-xs">27.7172° N, 85.3240° E</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">
              Established
            </p>
            <div className="flex items-center gap-2 text-white/80">
              <Calendar size={14} className="text-[#661511]" />
              <span className="text-xs font-semibold">Circa 1994</span>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full md:w-1/2 h-64 md:h-screen"
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#0b0a09] via-[#0b0a09]/40 to-transparent z-10" />

        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000"
          alt="Library"
          className="h-full w-full object-cover"
        />

        {/* BADGE */}
        <div className="absolute bottom-10 right-10 z-20 bg-black/60 backdrop-blur-md p-4 border border-white/10 flex items-center gap-4">

          <div className="bg-[#661511] p-2 rounded">
            <ShieldCheck className="text-white" size={22} />
          </div>

          <div>
            <p className="text-[10px] text-white/40 uppercase">Heritage Status</p>
            <p className="text-xs font-bold text-white uppercase">
              Verified Archive
            </p>
          </div>

        </div>
      </motion.div>

    </div>
  )
}

export default PhysicalSanctuary