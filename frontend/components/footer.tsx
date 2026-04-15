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
} from "lucide-react";
import Logo from "./ui/logo";

const footerLinks = {
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

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-primary to-black text-primary-foreground overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,white,transparent_60%)]" />

      {/* MAIN SECTION */}
      <div className="container mx-auto px-6 py-14 relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">

          {/* LEFT SIDE - BRAND */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Logo />

            <p className="mt-4 text-white/60 leading-relaxed text-sm">
              Your premium destination for books. Discover, read, and explore
              timeless stories and modern bestsellers.
            </p>

            {/* CONTACT */}
            <div className="mt-6 space-y-3 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red" />
                hello@bajarbook.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red" />
                +1 (234) 567-890
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red mt-1" />
                123 Book Street, Reading City
              </div>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-red hover:text-black transition"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE - LINKS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:col-span-4">
            {[
              footerLinks.shop,
              footerLinks.categories,
              footerLinks.support,
              footerLinks.company,
            ].map((group, i) => (
              <div key={i}>
                <h3 className="text-red font-semibold mb-3 text-sm uppercase tracking-wide">
                  Menu
                </h3>

                <ul className="space-y-2">
                  {group.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/60 hover:text-red text-sm transition"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">

          <p className="text-white/50 text-xs sm:text-sm">
            © {new Date().getFullYear()} BajarBook. All rights reserved.
          </p>

          <div className="flex gap-5 text-xs sm:text-sm items-center">
            <Link href="/privacy" className="text-white/50 hover:text-red">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/50 hover:text-red">
              Terms
            </Link>
            <Link href="/cookies" className="text-white/50 hover:text-red">
              Cookies
            </Link>

            <p className="text-white/50">
              Developed by{" "}
              <a
                href="https://javtechinfosys.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red transition"
              >
                Javtechinfosys
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}