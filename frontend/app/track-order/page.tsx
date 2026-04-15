"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  ChevronRight, 
  Package, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin,
  Calendar,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"

interface OrderStatus {
  id: string
  date: string
  estimatedDelivery: string
  status: "processing" | "shipped" | "in-transit" | "delivered"
  items: {
    title: string
    author: string
    quantity: number
  }[]
  timeline: {
    status: string
    date: string
    location?: string
    completed: boolean
    current?: boolean
  }[]
}

const mockOrder: OrderStatus = {
  id: "BJ-2024-78542",
  date: "April 10, 2026",
  estimatedDelivery: "April 15-17, 2026",
  status: "in-transit",
  items: [
    { title: "The Midnight Library", author: "Matt Haig", quantity: 1 },
    { title: "Atomic Habits", author: "James Clear", quantity: 2 },
  ],
  timeline: [
    { status: "Order Placed", date: "Apr 10, 2026 - 2:30 PM", completed: true },
    { status: "Order Confirmed", date: "Apr 10, 2026 - 2:35 PM", completed: true },
    { status: "Shipped", date: "Apr 11, 2026 - 10:15 AM", location: "New York, NY", completed: true },
    { status: "In Transit", date: "Apr 12, 2026 - 8:00 AM", location: "Philadelphia, PA", completed: true, current: true },
    { status: "Out for Delivery", date: "Estimated Apr 15, 2026", completed: false },
    { status: "Delivered", date: "Estimated Apr 15-17, 2026", completed: false },
  ],
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [order, setOrder] = useState<OrderStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    // Simulate API call
    setTimeout(() => {
      if (orderNumber.toUpperCase() === "BJ-2024-78542" || orderNumber === "demo") {
        setOrder(mockOrder)
      } else {
        setError("Order not found. Please check your order number and try again.")
        setOrder(null)
      }
      setLoading(false)
    }, 1500)
  }

  const getStatusColor = (status: OrderStatus["status"]) => {
    switch (status) {
      case "processing":
        return "text-yellow-600 bg-yellow-100"
      case "shipped":
        return "text-blue-600 bg-blue-100"
      case "in-transit":
        return "text-purple-600 bg-purple-100"
      case "delivered":
        return "text-green-600 bg-green-100"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

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
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">Track Order</span>
          </nav>
          
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-8 h-8 text-gold" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground">
              Track <span className="text-gold">Order</span>
            </h1>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Enter your order details to see the current status and delivery updates.
          </p>
        </div>
      </section>

      {/* Track Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl border border-border p-8 animate-fade-in-up">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Search className="w-5 h-5 text-gold" />
                Find Your Order
              </h2>
              
              <form onSubmit={handleTrack} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Order Number</label>
                  <Input
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g., BJ-2024-78542"
                    required
                    className="border-gold/30 focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email used for order"
                    required
                    className="border-gold/30 focus:border-gold"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gold hover:bg-gold-dark text-primary-foreground"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Tracking...
                    </span>
                  ) : (
                    <>
                      Track Order
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                  {error}
                </div>
              )}

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Try order number: <code className="bg-muted px-2 py-1 rounded">BJ-2024-78542</code> or <code className="bg-muted px-2 py-1 rounded">demo</code>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Details */}
      {order && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Order Summary */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 animate-fade-in-up">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Number</p>
                    <p className="text-xl font-bold font-mono">{order.id}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-medium">{order.date}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={cn("px-4 py-2 rounded-full text-sm font-semibold capitalize", getStatusColor(order.status))}>
                      {order.status.replace("-", " ")}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gold" />
                    <span className="text-muted-foreground">Estimated Delivery:</span>
                    <span className="font-semibold">{order.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-gold" />
                  Shipment Progress
                </h3>

                <div className="relative">
                  {order.timeline.map((step, index) => (
                    <div key={index} className="flex gap-4 pb-8 last:pb-0">
                      {/* Line */}
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all",
                            step.completed
                              ? step.current
                                ? "bg-gold text-primary-foreground ring-4 ring-gold/20"
                                : "bg-gold/20 text-gold"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {step.completed ? (
                            step.current ? (
                              <Truck className="w-5 h-5" />
                            ) : (
                              <CheckCircle2 className="w-5 h-5" />
                            )
                          ) : (
                            <Clock className="w-5 h-5" />
                          )}
                        </div>
                        {index < order.timeline.length - 1 && (
                          <div
                            className={cn(
                              "w-0.5 flex-1 mt-2",
                              step.completed ? "bg-gold/50" : "bg-border"
                            )}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-2">
                        <p className={cn(
                          "font-medium",
                          step.current && "text-gold"
                        )}>
                          {step.status}
                        </p>
                        <p className="text-sm text-muted-foreground">{step.date}</p>
                        {step.location && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {step.location}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <h3 className="text-lg font-semibold mb-6">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                    >
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">by {item.author}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="border-gold/30 hover:bg-gold/10">
                  Download Invoice
                </Button>
                <Link href="/help">
                  <Button variant="outline" className="w-full sm:w-auto border-gold/30 hover:bg-gold/10">
                    Need Help?
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    setOrder(null)
                    setOrderNumber("")
                    setEmail("")
                  }}
                  className="bg-gold hover:bg-gold-dark text-primary-foreground"
                >
                  Track Another Order
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Help Section */}
      {!order && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-xl font-semibold mb-4">Can&apos;t find your order?</h3>
              <p className="text-muted-foreground mb-6">
                If you&apos;re having trouble tracking your order, our customer support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/help">
                  <Button variant="outline" className="w-full sm:w-auto border-gold/30 hover:bg-gold/10">
                    Contact Support
                  </Button>
                </Link>
                <Link href="/help#orders-shipping">
                  <Button variant="outline" className="w-full sm:w-auto border-gold/30 hover:bg-gold/10">
                    Shipping FAQ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
