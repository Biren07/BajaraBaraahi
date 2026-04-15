"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard, Truck, ShieldCheck, Headphones } from "lucide-react"

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
    { name: "Privacy Policy", href: "/help" },
    { name: "Terms of Service", href: "/help" },
  ],
}

const features = [
  { icon: Truck, title: "Free Shipping", description: "On orders over $50" },
  { icon: ShieldCheck, title: "Secure Payment", description: "100% secure checkout" },
  { icon: Headphones, title: "24/7 Support", description: "Dedicated support team" },
  { icon: CreditCard, title: "Easy Returns", description: "30-day return policy" },
]

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Features Bar */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                    <Icon className="w-6 h-6 text-gold group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-foreground">{feature.title}</p>
                    <p className="text-sm text-primary-foreground/60">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
                <span className="text-primary-foreground">Bajar</span>
                <span className="text-gold">Book</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 leading-relaxed mb-6">
              Your premium destination for books. Discover bestsellers, new releases, 
              and timeless classics from around the world.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold" />
                <a href="mailto:hello@bajarbook.com" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  hello@bajarbook.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold" />
                <a href="tel:+1234567890" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-primary-foreground/70">
                  123 Book Street, Reading City, RC 12345
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-gold transition-colors duration-300 group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-primary-foreground group-hover:text-primary transition-colors" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gold">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gold">Categories</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gold">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gold">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60 text-center md:text-left">
              © {new Date().getFullYear()} BajarBook. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
