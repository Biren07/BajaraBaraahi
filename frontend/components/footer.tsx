"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import Logo from "./ui/logo";

// Type definitions
interface FooterLink {
  name: string;
  href: string;
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

interface FooterLinks {
  shop: FooterLink[];
  categories: FooterLink[];
  support: FooterLink[];
  company: FooterLink[];
}

const footerLinks: FooterLinks = {
  shop: [
    { name: "All Categories", href: "/categories" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Best Sellers", href: "/bestsellers" },
    { name: "Offers & Deals", href: "/offers" },
    { name: "My Ledger", href: "/ledger" },
    { name: "BajarBook Circle", href: "/circle" },
  ],
  categories: [
    { name: "Fiction", href: "/category/fiction" },
    { name: "Non-Fiction", href: "/category/non-fiction" },
    { name: "Children", href: "/category/children" },
    { name: "Academic", href: "/category/academic" },
    { name: "Self-Help", href: "/category/self-help" },
    { name: "Business", href: "/category/business" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "FAQs", href: "/help" },
    { name: "Contact Us", href: "/help#contact" },
    { name: "Returns", href: "/help#returns-refunds" },
    { name: "Track Order", href: "/track-order" },
    { name: "Shipping Info", href: "/help#orders-shipping" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/about" },
    { name: "Careers", href: "/about" },
    { name: "Press", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks: SocialLink[] = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300">
      
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand Section - Takes more space */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <div className="inline-block">
              <Logo className="text-white" />
            </div>

            {/* Tagline */}
            <p className="text-base text-gray-400 leading-relaxed max-w-sm">
              Your premium destination for discovering timeless stories and modern bestsellers. 
              Where every page turns into an adventure.
            </p>

            {/* Newsletter Signup */}
            <div className="pt-2">
              <h4 className="text-white font-semibold mb-3 text-sm">
                Stay Updated
              </h4>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg 
                           text-sm text-gray-300 placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                           transition"
                />
                <button className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg 
                                 transition flex items-center justify-center group">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <h4 className="text-white font-semibold mb-3 text-sm">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700
                               flex items-center justify-center
                               hover:bg-red-500 hover:border-red-500 hover:scale-110
                               transition-all duration-200 group"
                    >
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Links Grid - Takes remaining space */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
              
              {/* Shop Links */}
              <div>
                <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wide">
                  Shop
                </h3>
                <ul className="space-y-3">
                  {footerLinks.shop.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors
                                 inline-flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform inline-block">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wide">
                  Categories
                </h3>
                <ul className="space-y-3">
                  {footerLinks.categories.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors
                                 inline-flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform inline-block">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wide">
                  Support
                </h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors
                                 inline-flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform inline-block">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company & Contact */}
              <div>
                <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wide">
                  Company
                </h3>
                <ul className="space-y-3 mb-6">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors
                                 inline-flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform inline-block">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Contact Info */}
                <div className="space-y-3 text-sm">
                  <a 
                    href="mailto:hello@bajarbook.com"
                    className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center
                                  group-hover:bg-red-500/10 transition">
                      <Mail className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-xs">hello@bajarbook.com</span>
                  </a>
                  
                  <a 
                    href="tel:+1234567890"
                    className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center
                                  group-hover:bg-red-500/10 transition">
                      <Phone className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-xs">+1 (234) 567-890</span>
                  </a>
                  
                  <div className="flex items-start gap-2 text-gray-400">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center mt-0.5">
                      <MapPin className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-xs leading-relaxed">
                      123 Book Street,<br />Reading City
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} BajarBook. All rights reserved.
            </p>

            {/* Bottom Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <Link 
                href="/privacy" 
                className="hover:text-red-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="hover:text-red-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/cookies" 
                className="hover:text-red-400 transition-colors"
              >
                Cookie Policy
              </Link>
              <span className="hidden md:inline text-gray-700">|</span>
              <p className="text-gray-500">
                Developed by{" "}
                <a
                  href="https://javtechinfosys.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-400 transition-colors font-medium"
                >
                  Javtechinfosys
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}