"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Package, 
  CreditCard, 
  TrendingUp,
  Calendar,
  Star,
  Download,
  Eye,
  RotateCcw
} from "lucide-react"

const orderHistory = [
  {
    id: "ORD-2024-001",
    date: "March 15, 2024",
    status: "Delivered",
    total: 89.97,
    items: [
      { title: "The Midnight Library", author: "Matt Haig", price: 24.99, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=80&h=120&fit=crop" },
      { title: "Atomic Habits", author: "James Clear", price: 32.99, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=80&h=120&fit=crop" },
      { title: "Project Hail Mary", author: "Andy Weir", price: 31.99, image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=80&h=120&fit=crop" },
    ]
  },
  {
    id: "ORD-2024-002",
    date: "February 28, 2024",
    status: "Delivered",
    total: 54.98,
    items: [
      { title: "The Psychology of Money", author: "Morgan Housel", price: 27.99, image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=80&h=120&fit=crop" },
      { title: "Deep Work", author: "Cal Newport", price: 26.99, image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=80&h=120&fit=crop" },
    ]
  },
  {
    id: "ORD-2024-003",
    date: "January 10, 2024",
    status: "Delivered",
    total: 42.99,
    items: [
      { title: "Dune", author: "Frank Herbert", price: 42.99, image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=80&h=120&fit=crop" },
    ]
  },
]

const readingLog = [
  { title: "The Midnight Library", author: "Matt Haig", status: "completed", progress: 100, rating: 5, dateCompleted: "March 20, 2024" },
  { title: "Atomic Habits", author: "James Clear", status: "reading", progress: 65, rating: null, dateCompleted: null },
  { title: "Project Hail Mary", author: "Andy Weir", status: "reading", progress: 30, rating: null, dateCompleted: null },
  { title: "The Psychology of Money", author: "Morgan Housel", status: "completed", progress: 100, rating: 4, dateCompleted: "March 5, 2024" },
  { title: "Deep Work", author: "Cal Newport", status: "to-read", progress: 0, rating: null, dateCompleted: null },
  { title: "Dune", author: "Frank Herbert", status: "completed", progress: 100, rating: 5, dateCompleted: "Feb 15, 2024" },
]

const transactions = [
  { id: "TXN001", date: "March 15, 2024", type: "Purchase", amount: -89.97, method: "Credit Card", orderId: "ORD-2024-001" },
  { id: "TXN002", date: "March 10, 2024", type: "Refund", amount: 15.99, method: "Original Payment", orderId: "ORD-2024-001" },
  { id: "TXN003", date: "February 28, 2024", type: "Purchase", amount: -54.98, method: "PayPal", orderId: "ORD-2024-002" },
  { id: "TXN004", date: "January 10, 2024", type: "Purchase", amount: -42.99, method: "Credit Card", orderId: "ORD-2024-003" },
  { id: "TXN005", date: "January 5, 2024", type: "Gift Card", amount: 50.00, method: "Gift Card Redemption", orderId: null },
]

export default function LedgerPage() {
  const [activeTab, setActiveTab] = useState("orders")

  const stats = {
    totalOrders: orderHistory.length,
    totalSpent: orderHistory.reduce((sum, order) => sum + order.total, 0),
    booksRead: readingLog.filter(b => b.status === "completed").length,
    currentlyReading: readingLog.filter(b => b.status === "reading").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold">My Ledger</h1>
                <p className="text-muted-foreground">Track your orders, reading progress, and transactions</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-gold/20 hover:border-gold/40 transition-colors">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gold/20 hover:border-gold/40 transition-colors">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gold/20 hover:border-gold/40 transition-colors">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.booksRead}</p>
                  <p className="text-sm text-muted-foreground">Books Read</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gold/20 hover:border-gold/40 transition-colors">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.currentlyReading}</p>
                  <p className="text-sm text-muted-foreground">Reading Now</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="orders" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-muted/50 p-1 mb-6 flex-wrap h-auto gap-1">
              <TabsTrigger value="orders" className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground">
                <Package className="w-4 h-4 mr-2" />
                Order History
              </TabsTrigger>
              <TabsTrigger value="reading" className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground">
                <BookOpen className="w-4 h-4 mr-2" />
                Reading Log
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground">
                <CreditCard className="w-4 h-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground">
                <TrendingUp className="w-4 h-4 mr-2" />
                Statistics
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4">
              {orderHistory.map((order) => (
                <Card key={order.id} className="border-gold/20 overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-muted/30 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div className="flex items-center gap-4">
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {order.date}
                        </span>
                        <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 bg-muted/20 rounded-lg">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-12 h-16 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.author}</p>
                          </div>
                          <p className="font-semibold">${item.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="border-gold/30 hover:bg-gold/10 hover:text-gold">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="border-gold/30 hover:bg-gold/10 hover:text-gold">
                        <Download className="w-4 h-4 mr-2" />
                        Invoice
                      </Button>
                      <Button variant="outline" size="sm" className="border-gold/30 hover:bg-gold/10 hover:text-gold">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Reading Log Tab */}
            <TabsContent value="reading" className="space-y-4">
              <div className="grid gap-4">
                {readingLog.map((book, idx) => (
                  <Card key={idx} className="border-gold/20 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-24 bg-gradient-to-br from-gold/20 to-gold/5 rounded flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-gold/50" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-lg">{book.title}</h3>
                              <p className="text-muted-foreground">{book.author}</p>
                            </div>
                            <Badge 
                              className={
                                book.status === "completed" 
                                  ? "bg-green-500/10 text-green-600 border-green-500/20" 
                                  : book.status === "reading"
                                  ? "bg-gold/10 text-gold border-gold/20"
                                  : "bg-muted text-muted-foreground"
                              }
                            >
                              {book.status === "completed" ? "Completed" : book.status === "reading" ? "Reading" : "To Read"}
                            </Badge>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{book.progress}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gold rounded-full transition-all duration-500"
                                style={{ width: `${book.progress}%` }}
                              />
                            </div>
                          </div>

                          {/* Rating & Date */}
                          <div className="flex items-center justify-between mt-3">
                            {book.rating && (
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < book.rating ? "fill-gold text-gold" : "text-muted-foreground"}`}
                                  />
                                ))}
                              </div>
                            )}
                            {book.dateCompleted && (
                              <span className="text-sm text-muted-foreground">
                                Completed: {book.dateCompleted}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions">
              <Card className="border-gold/20">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="text-left p-4 font-medium">Transaction ID</th>
                          <th className="text-left p-4 font-medium">Date</th>
                          <th className="text-left p-4 font-medium">Type</th>
                          <th className="text-left p-4 font-medium">Method</th>
                          <th className="text-right p-4 font-medium">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((txn, idx) => (
                          <tr key={txn.id} className={`border-t border-border ${idx % 2 === 0 ? "bg-muted/10" : ""}`}>
                            <td className="p-4">
                              <span className="font-mono text-sm">{txn.id}</span>
                              {txn.orderId && (
                                <span className="block text-xs text-muted-foreground">{txn.orderId}</span>
                              )}
                            </td>
                            <td className="p-4 text-muted-foreground">{txn.date}</td>
                            <td className="p-4">
                              <Badge variant="outline" className={
                                txn.type === "Purchase" 
                                  ? "border-gold/30 text-foreground" 
                                  : txn.type === "Refund"
                                  ? "border-green-500/30 text-green-600"
                                  : "border-blue-500/30 text-blue-600"
                              }>
                                {txn.type}
                              </Badge>
                            </td>
                            <td className="p-4 text-muted-foreground">{txn.method}</td>
                            <td className={`p-4 text-right font-semibold ${txn.amount >= 0 ? "text-green-600" : "text-foreground"}`}>
                              {txn.amount >= 0 ? "+" : ""}{txn.amount < 0 ? "-" : ""}${Math.abs(txn.amount).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Statistics Tab */}
            <TabsContent value="stats">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Reading Stats */}
                <Card className="border-gold/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-gold" />
                      Reading Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Books Completed</span>
                      <span className="text-2xl font-bold text-gold">{stats.booksRead}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Currently Reading</span>
                      <span className="text-2xl font-bold text-gold">{stats.currentlyReading}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">To Read</span>
                      <span className="text-2xl font-bold text-gold">{readingLog.filter(b => b.status === "to-read").length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Average Rating</span>
                      <span className="text-2xl font-bold text-gold flex items-center gap-1">
                        4.7 <Star className="w-5 h-5 fill-gold text-gold" />
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Spending Stats */}
                <Card className="border-gold/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-gold" />
                      Spending Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Total Orders</span>
                      <span className="text-2xl font-bold text-gold">{stats.totalOrders}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Total Spent</span>
                      <span className="text-2xl font-bold text-gold">${stats.totalSpent.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Average Order</span>
                      <span className="text-2xl font-bold text-gold">${(stats.totalSpent / stats.totalOrders).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Books Purchased</span>
                      <span className="text-2xl font-bold text-gold">{orderHistory.reduce((sum, o) => sum + o.items.length, 0)}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Activity */}
                <Card className="border-gold/20 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gold" />
                      Monthly Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, idx) => (
                        <div key={month} className="text-center">
                          <div 
                            className={`h-20 rounded-lg mb-1 flex items-end justify-center ${
                              idx < 3 ? "bg-gold" : "bg-muted"
                            }`}
                            style={{ 
                              opacity: idx < 3 ? 0.3 + (idx * 0.2) : 0.2,
                            }}
                          >
                            <span className="text-xs font-semibold text-foreground pb-1">
                              {idx === 0 ? 1 : idx === 1 ? 2 : idx === 2 ? 3 : 0}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">{month}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
