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
    <footer className="bg-gray-900 text-gray-300">

      {/* TOP SECTION */}
      <div className="container mx-auto px-6 py-14">

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 flex flex-col items-start">

            {/* LOGO (FIXED LEFT ALIGN) */}
            <div className="flex flex-col items-start">
              <Logo className="text-white" />
            </div>

            {/* DESCRIPTION */}
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Your premium destination for books. Discover, read, and explore
              timeless stories and modern bestsellers.
            </p>

            {/* CONTACT */}
            <div className="mt-6 space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500" />
                hello@bajarbook.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500" />
                +1 (234) 567-890
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 mt-1" />
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
                    className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center
                               hover:bg-red-500 hover:text-white transition"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:col-span-4">

            {[footerLinks.shop, footerLinks.categories, footerLinks.support, footerLinks.company].map(
              (group, i) => (
                <div key={i}>
                  <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                    Menu
                  </h3>

                  <ul className="space-y-2">
                    {group.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-red-400 text-sm transition"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}

          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} BajarBook. All rights reserved.
          </p>

          <div className="flex gap-5 text-xs text-gray-500 items-center">
            <Link href="/privacy" className="hover:text-red-400">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-red-400">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-red-400">
              Cookies
            </Link>

            <p>
              Developed by{" "}
              <a
                href="https://javtechinfosys.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-400 transition"
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