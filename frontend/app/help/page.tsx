"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronRight,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Package,
  CreditCard,
  RefreshCw,
  Truck,
  BookOpen,
  Search,
} from "lucide-react";

const faqs = [
  {
    category: "Orders & Shipping",
    icon: Package,
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days delivery. International shipping typically takes 10-15 business days depending on the destination.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! We offer free standard shipping on all orders over $50. For orders under $50, a flat rate of $4.99 applies.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely! Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order anytime by visiting our Track Order page.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to over 100 countries worldwide. International shipping rates and delivery times vary by destination.",
      },
    ],
  },
  {
    category: "Payments",
    icon: CreditCard,
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes, all transactions are encrypted using SSL technology. We never store your complete credit card information on our servers.",
      },
      {
        q: "Can I use multiple discount codes?",
        a: "Only one discount code can be applied per order. However, some promotional offers may be combined with our ongoing sales.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    icon: RefreshCw,
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy for all unused items in their original condition. Books must be returned in the same condition as received.",
      },
      {
        q: "How do I initiate a return?",
        a: "Contact our customer service team through the contact form or email. We'll provide you with a prepaid return label and instructions.",
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 5-7 business days after we receive the returned item. The credit may take an additional 3-5 days to appear on your statement.",
      },
    ],
  },
  {
    category: "Products & Availability",
    icon: BookOpen,
    questions: [
      {
        q: "Do you sell ebooks?",
        a: "Currently, we specialize in physical books. We're working on expanding to digital formats in the future.",
      },
      {
        q: "Can I pre-order upcoming releases?",
        a: "Yes! Check our New Arrivals section for pre-order availability. You won't be charged until the book ships.",
      },
      {
        q: "What if a book I want is out of stock?",
        a: "You can sign up for stock notifications on any product page. We'll email you as soon as it's back in stock.",
      },
    ],
  },
];

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    detail: "+1 (800) 123-4567",
    description: "Mon-Fri, 9AM-6PM EST",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "support@bajarbook.com",
    description: "We respond within 24 hours",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    detail: "Start a Chat",
    description: "Available 24/7",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "123 Book Street, NY 10001",
    description: "Open Mon-Sat, 10AM-8PM",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-gold rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-gold rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">Help & Support</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-gold" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground">
              Help <span className="text-gold">Center</span>
            </h1>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Find answers to your questions or get in touch with our friendly
            support team.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 bg-background text-foreground border-gold/30 focus:border-gold rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Track Order", href: "/track-order" },
              { icon: RefreshCw, label: "Returns", href: "#returns" },
              { icon: CreditCard, label: "Payment", href: "#payments" },
              { icon: MessageCircle, label: "Contact Us", href: "#contact" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex flex-col items-center gap-2 p-6 bg-card rounded-xl border border-border hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon className="w-8 h-8 text-gold" />
                <span className="font-medium text-center">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Frequently Asked <span className="text-gold">Questions</span>
          </h2>

          <div className="max-w-3xl mx-auto space-y-8">
            {(searchQuery ? filteredFaqs : faqs).map((category, catIndex) => {
              const Icon = category.icon;
              return (
                <div
                  key={catIndex}
                  id={category.category
                    .toLowerCase()
                    .replace(/ & /g, "-")
                    .replace(/ /g, "-")}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${catIndex * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      {category.category}
                    </h3>
                  </div>
                  <Accordion
                    type="single"
                    collapsible
                    className="bg-card rounded-xl border border-border overflow-hidden"
                  >
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${catIndex}-${index}`}
                        className="border-border"
                      >
                        <AccordionTrigger className="px-6 hover:no-underline hover:bg-muted/50 text-left">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-4">
            Still Need <span className="text-gold">Help?</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Our customer support team is here to assist you. Choose your
            preferred way to reach us.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-card rounded-xl border border-border hover:border-gold/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <method.icon className="w-6 h-6 text-gold" />
                </div>
                <h4 className="font-semibold mb-1">{method.title}</h4>
                <p className="text-gold font-medium mb-1">{method.detail}</p>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl border border-border p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-gold" />
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Name
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your name"
                      required
                      className="border-gold/30 focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      required
                      className="border-gold/30 focus:border-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Subject
                  </label>
                  <Input
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="How can we help?"
                    required
                    className="border-gold/30 focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                    className="border-gold/30 focus:border-gold"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gold hover:bg-gold-dark text-primary-foreground"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-gold" />
              <h3 className="text-xl font-semibold">Business Hours</h3>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Monday - Friday</p>
                  <p className="text-muted-foreground">9:00 AM - 6:00 PM EST</p>
                </div>
                <div>
                  <p className="font-medium">Saturday</p>
                  <p className="text-muted-foreground">
                    10:00 AM - 4:00 PM EST
                  </p>
                </div>
                <div>
                  <p className="font-medium">Sunday</p>
                  <p className="text-muted-foreground">Closed</p>
                </div>
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-gold">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
