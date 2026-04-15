"use client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { 
  ChevronRight, 
  BookOpen, 
  Users, 
  Globe, 
  Award,
  Heart,
  Truck,
  ShieldCheck,
  Headphones,
  ArrowRight
} from "lucide-react"

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "15K+", label: "Books Available" },
  { value: "100+", label: "Countries Served" },
  { value: "10+", label: "Years Experience" },
]

const values = [
  {
    icon: Heart,
    title: "Passion for Books",
    description: "We believe in the transformative power of reading and are dedicated to connecting readers with their perfect books."
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Every book in our collection is carefully curated and quality-checked to ensure the best reading experience."
  },
  {
    icon: Truck,
    title: "Fast & Reliable",
    description: "We partner with the best logistics providers to ensure your books arrive safely and on time."
  },
  {
    icon: Headphones,
    title: "Customer First",
    description: "Our dedicated support team is always ready to help you find the perfect book or resolve any concerns."
  },
]

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    name: "Michael Chen",
    role: "Head of Curation",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    name: "Emily Davis",
    role: "Customer Experience",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    name: "David Park",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-gold rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-gold rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-gold/50 rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">About Us</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-4 animate-fade-in-up">
            About <span className="text-gold">BajarBook</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Your trusted destination for discovering, exploring, and owning the world&apos;s finest literature.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="inline-block px-4 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                A Journey Through <span className="text-gold">Words</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2014, BajarBook began with a simple mission: to make quality literature accessible to everyone, everywhere. What started as a small online bookstore has grown into a beloved destination for book lovers across the globe.
                </p>
                <p>
                  Our name &quot;Bajar&quot; comes from the word &quot;bazaar&quot; - a marketplace where people gather to discover treasures. We envisioned creating a digital bazaar where readers could explore vast collections and find their next great read.
                </p>
                <p>
                  Today, we proudly serve over 50,000 customers in more than 100 countries, offering a carefully curated selection of over 15,000 titles across every genre imaginable.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/categories">
                  <Button className="bg-gold hover:bg-gold-dark text-primary-foreground">
                    Explore Our Collection
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop"
                  alt="Library"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gold/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl md:text-5xl font-serif font-bold text-gold mb-2">
                  {stat.value}
                </div>
                <p className="text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              What We <span className="text-gold">Stand For</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-xl border border-border hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-card rounded-2xl border border-border animate-fade-in-up">
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                <BookOpen className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To democratize access to quality literature by providing an extensive, carefully curated selection of books at competitive prices, delivered with exceptional service to readers worldwide.
              </p>
            </div>

            <div className="p-8 bg-card rounded-2xl border border-border animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                <Globe className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To become the world&apos;s most trusted and beloved online bookstore, fostering a global community of readers who share our passion for the written word and lifelong learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Meet the <span className="text-gold">Book Lovers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="group text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-transparent group-hover:border-gold transition-colors duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-gold text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium mb-4">
              Recognition
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Awards & <span className="text-gold">Achievements</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { year: "2024", award: "Best Online Bookstore" },
              { year: "2023", award: "Customer Service Excellence" },
              { year: "2022", award: "E-commerce Innovation Award" },
              { year: "2021", award: "Sustainability Champion" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-gold font-medium">{item.year}</p>
                  <p className="font-semibold text-sm">{item.award}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Join Our <span className="text-gold">Reading Community</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Become part of a global community of book lovers. Discover new reads, connect with fellow enthusiasts, and embark on countless literary adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/bestsellers">
                <Button size="lg" className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-primary-foreground">
                  Start Exploring
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/help">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-gold/30 hover:bg-gold/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
