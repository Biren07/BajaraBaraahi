"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

import {
  ChevronRight,
  Heart,
  Truck,
  ShieldCheck,
  Headphones,
  ArrowRight,
} from "lucide-react";

/* ---------------- ANIMATIONS ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/* ---------------- DATA ---------------- */

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "15K+", label: "Books Available" },
  { value: "100+", label: "Countries Served" },
  { value: "10+", label: "Years Experience" },
];

const values = [
  {
    icon: Heart,
    title: "Passion for Books",
    description: "We connect readers with meaningful books worldwide.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Every book is carefully curated for best experience.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Reliable shipping with trusted logistics partners.",
  },
  {
    icon: Headphones,
    title: "Customer First",
    description: "Dedicated support for every reader.",
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  },
  {
    name: "Michael Chen",
    role: "Head of Curation",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
  {
    name: "Emily Davis",
    role: "Customer Experience",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  },
  {
    name: "David Park",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  },
];

/* ---------------- PAGE ---------------- */

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative pt-32 pb-16 bg-primary overflow-hidden">
        {/* Glow Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gold/20 blur-3xl rounded-full" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-gold/10 blur-3xl rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.nav
            initial="hidden"
            animate="show"
            variants={stagger}
            className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-6"
          >
            <motion.div variants={fadeUp}>
              <Link href="/" className="hover:text-gold">
                Home
              </Link>
            </motion.div>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">About</span>
          </motion.nav>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-4xl md:text-6xl font-serif font-bold text-primary-foreground mb-4"
          >
            About <span className="text-gold">BajarBook</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="text-lg text-primary-foreground/80 max-w-2xl"
          >
            Discover, explore, and own the world’s finest literature.
          </motion.p>
        </div>
      </section>

      {/* STORY */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp}>
            <span className="text-gold text-sm font-medium">Our Story</span>

            <h2 className="text-3xl font-serif font-bold mt-2 mb-4">
              A Journey Through Words
            </h2>

            <p className="text-muted-foreground mb-3">
              Founded in 2014, we aim to make literature accessible globally.
            </p>
            <p className="text-muted-foreground">
              A digital bazaar for book lovers around the world.
            </p>

            <Button className="mt-6 bg-gold hover:bg-gold/80 text-white hover:scale-105 transition">
              Explore Collection <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.03 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800"
              alt="library"
              width={600}
              height={600}
              className="object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* STATS */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-gold">{s.value}</div>
              <p className="text-white/70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="p-6 bg-card border rounded-xl hover:shadow-lg transition"
            >
              <v.icon className="w-10 h-10 text-gold mb-3" />
              <h3 className="font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* TEAM */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-transparent group-hover:border-gold transition">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={160}
                  height={160}
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <h3 className="mt-3 font-semibold">{t.name}</h3>
              <p className="text-gold text-sm">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-3">
          Join Our <span className="text-gold">Reading Community</span>
        </h2>

        <p className="text-muted-foreground mb-6">
          Explore thousands of books and connect with readers worldwide.
        </p>

        <Button className="bg-gold hover:scale-105 transition">
          Start Exploring <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </motion.section>

      <Footer />
    </div>
  );
}
