"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  CircleDot, 
  Package, 
  Receipt, 
  Users, 
  Tag, 
  TicketPercent, 
  ArrowUpRight,
  LayoutDashboard,
  Activity
} from "lucide-react";

import AdminShell from "@/components/admin/admin-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { orderService } from "@/services/orderService";
import { bookService } from "@/services/bookService";
import { userService } from "@/services/userService";
import { couponService } from "@/services/couponService";
import { offerService } from "@/services/offerService";

const initialStats = [
  { id: "orders", href: "/admin/order", title: "Orders", value: "0", desc: "Total customer sales", icon: Receipt, color: "bg-blue-500" },
  { id: "products", href: "/admin/product", title: "Products", value: "0", desc: "Active inventory", icon: Package, color: "bg-orange-500" },
  { id: "users", href: "/admin/user", title: "Users", value: "0", desc: "Registered accounts", icon: Users, color: "bg-emerald-500" },
  { id: "offers", href: "/admin/offers", title: "Offers", value: "0", desc: "Live promotions", icon: Tag, color: "bg-purple-500" },
  { id: "coupons", href: "/admin/coupon", title: "Coupons", value: "0", desc: "Active discount codes", icon: TicketPercent, color: "bg-rose-500" },
];

export default function AdminOverviewPage() {
  const [statsData, setStatsData] = useState(initialStats);

  useEffect(() => {
    fetchStats();
  }, []);

const fetchStats = async () => {
  try {
    const [ordersRes, booksRes, usersRes, offersRes, couponsRes] =
      await Promise.all([
        orderService.getAllOrders().catch(() => ({ data: [] })),
        bookService.getBooks().catch(() => ({ books: [] })),
        userService.getAllUsers().catch(() => ({ allUsers: [] })),
        offerService.getAllOffers().catch(() => ({ offers: [] })),
        couponService.getAllCoupons().catch(() => ({ promos: [] })),
      ]);

    const ordersCount =
      ordersRes?.data?.data?.length ||
      ordersRes?.data?.length ||
      0;

    const books =
      booksRes?.data?.data ||
      booksRes?.data ||
      booksRes?.books ||
      [];

    const booksCount = books.length;

    const usersCount = usersRes?.allUsers?.length || 0;
    const offersCount = offersRes?.offers?.length || 0;
    const couponsCount = couponsRes?.promos?.length || 0;

    setStatsData((prev) =>
      prev.map((s) => {
        if (s.id === "orders") return { ...s, value: String(ordersCount) };
        if (s.id === "products") return { ...s, value: String(booksCount) };
        if (s.id === "users") return { ...s, value: String(usersCount) };
        if (s.id === "offers") return { ...s, value: String(offersCount) };
        if (s.id === "coupons") return { ...s, value: String(couponsCount) };
        return s;
      })
    );
  } catch (error) {
    console.error("Failed to fetch dashboard data", error);
  }
};

  return (
    <AdminShell>
      <div className="max-w-[1400px] mx-auto space-y-10 pb-12">
        
        {/* --- Welcome Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-8">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Overview Dashboard
            </h1>
            <p className="text-gray-500 font-medium">Welcome back, Admin. Here is your store's performance at a glance.</p>
          </div>
          <div className="flex items-center gap-3">
          </div>
        </div>

        {/* --- Main Stats Section --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {statsData.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.id} href={s.href} className="group">
                <Card className="relative overflow-hidden h-full border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-1 ring-gray-100 transition-all duration-300 hover:ring-2 hover:ring-[#800000] hover:shadow-xl rounded-[24px] bg-white">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className={cn("p-3 rounded-2xl text-white shadow-lg", s.color)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="bg-gray-50 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                         <ArrowUpRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="mt-5 space-y-1">
                      <h3 className="text-3xl font-bold text-gray-900 leading-none">{s.value}</h3>
                      <p className="text-sm font-bold text-gray-800 tracking-wide uppercase">{s.title}</p>
                      <p className="text-xs text-gray-400 font-medium">{s.desc}</p>
                    </div>
                  </CardContent>
                  {/* Subtle decorative background element */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />
                </Card>
              </Link>
            );
          })}
        </div>

        {/* --- Secondary Sections --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Activity Table Style */}
          <Card className="lg:col-span-8 rounded-[32px] border-none shadow-sm ring-1 ring-gray-100 bg-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 rounded-xl">
                    <Activity className="w-5 h-5 text-[#800000]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Live Insights</h3>
                </div>
                <Button variant="ghost" className="text-sm font-bold text-[#800000] hover:bg-red-50">View Full Logs</Button>
              </div>

              <div className="space-y-4">
                {[
                  { event: "New high-value order", user: "Ram Shrestha", time: "2m ago", label: "Order" },
                  { event: "Flash Sale coupon created", user: "Admin", time: "15m ago", label: "Promo" },
                  { event: "User profile verified", user: "Sita Thapa", time: "1h ago", label: "User" },
                  { event: "Inventory alert: Muna Madan", user: "System", time: "3h ago", label: "Stock" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#800000]" />
                      <div>
                        <p className="text-sm font-bold text-gray-800">{item.event}</p>
                        <p className="text-xs text-gray-400 font-medium">{item.user} • {item.time}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 px-2.5 py-1 rounded-lg group-hover:bg-[#800000]/10 group-hover:text-[#800000]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Shortcuts */}
          <Card className="lg:col-span-4 rounded-[32px] border-none shadow-sm ring-1 ring-gray-100 bg-gray-50/50">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                  <LayoutDashboard className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Direct Links</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  { name: "General Ledger", icon: BookOpen, href: "/admin/ledger" },
                  { name: "Member Circles", icon: CircleDot, href: "/admin/circle" },
                ].map((action) => (
                  <Link key={action.name} href={action.href}>
                    <Button variant="white" className="w-full h-14 justify-start rounded-2xl border border-gray-200 bg-white hover:border-[#800000] hover:text-[#800000] shadow-sm font-bold transition-all px-5">
                      <action.icon className="w-5 h-5 mr-3 opacity-60" />
                      {action.name}
                    </Button>
                  </Link>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-[#800000]/5 border border-[#800000]/10 mt-4">
                <p className="text-xs font-bold text-[#800000] uppercase tracking-wider mb-1">Support Info</p>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">Your system status is <strong>Operational</strong>. No issues found in last 24h.</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </AdminShell>
  );
}