"use client";

import { useState, useEffect } from "react";
import { Eye, Receipt, Loader2, Search, Filter, ArrowUpRight } from "lucide-react";
import AdminShell from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";

// Professional Status Styling
function statusBadgeClass(status: string) {
  const s = status?.toLowerCase();
  switch (s) {
    case "delivered":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "processing":
      return "bg-amber-50 text-amber-600 border-amber-100";
    case "pending":
      return "bg-blue-50 text-blue-600 border-blue-100";
    case "cancelled":
      return "bg-rose-50 text-rose-600 border-rose-100";
    default:
      return "bg-slate-50 text-slate-500 border-slate-200";
  }
}

export default function AdminOrderPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Premium Dummy Data
      const dummyOrders = [
        { name: "Aavash Shrestha", date: "2026-04-28", status: "Delivered", total: 4500, items: 3, method: "E-Sewa" },
        { name: "Sita Kumari", date: "2026-04-27", status: "Processing", total: 1200, items: 1, method: "Cash on Delivery" },
        { name: "Rohan Devkota", date: "2026-04-27", status: "Pending", total: 8900, items: 5, method: "Khalti" },
        { name: "Maya Sharma", date: "2026-04-26", status: "Cancelled", total: 2100, items: 2, method: "Bank Transfer" },
        { name: "Bibek Thapa", date: "2026-04-25", status: "Delivered", total: 3200, items: 2, method: "E-Sewa" },
      ];
      
      await new Promise((resolve) => setTimeout(resolve, 800));
      setOrders(dummyOrders);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-[#800000]" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="space-y-8 max-w-7xl mx-auto px-2 sm:px-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#800000] flex items-center justify-center shadow-xl shadow-[#800000]/20">
              <Receipt className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                Orders
              </h1>
              <p className="text-sm font-medium text-slate-500">
                Oversee and fulfill customer requests
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl border-slate-200 h-11 px-4">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
            <Button className="bg-[#800000] hover:bg-[#600000] text-white rounded-xl h-11 px-6 shadow-md shadow-[#800000]/10">
              Export CSV
            </Button>
          </div>
        </div>

        {/* ORDER LIST CONTAINER */}
        <Card className="rounded-[24px] md:rounded-[32px] border-slate-200 shadow-sm overflow-hidden bg-white">
          <CardHeader className="border-b border-slate-50 px-6 py-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-slate-800">
                Recent Transactions
              </CardTitle>
              <Badge variant="secondary" className="rounded-full px-3 py-0.5 bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-wider">
                {orders.length} Total
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Desktop Table: Hidden on Mobile */}
            <div className="hidden md:block">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="py-4 px-6 font-bold text-slate-600">Customer</TableHead>
                    <TableHead className="font-bold text-slate-600">Purchase Date</TableHead>
                    <TableHead className="font-bold text-slate-600">Method</TableHead>
                    <TableHead className="font-bold text-slate-600">Status</TableHead>
                    <TableHead className="text-right font-bold text-slate-600">Total Amount</TableHead>
                    <TableHead className="text-right px-6 font-bold text-slate-600">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order, idx) => (
                    <TableRow key={idx} className="hover:bg-slate-50/50 transition-colors group">
                      <TableCell className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{order.name}</span>
                          <span className="text-xs text-slate-400 font-medium">{order.items} items ordered</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-500 font-medium">
                        {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </TableCell>
                      <TableCell className="text-slate-500 text-xs font-semibold">
                        {order.method}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusBadgeClass(order.status)} px-3 py-1 rounded-lg border font-bold uppercase text-[10px] tracking-tight`}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-black text-slate-900">Rs. {order.total.toLocaleString()}</span>
                      </TableCell>
                      <TableCell className="text-right px-6">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-xl hover:bg-[#800000]/10 hover:text-[#800000] font-bold"
                        >
                          Details <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile View: Hidden on Desktop */}
            <div className="md:hidden divide-y divide-slate-100">
              {orders.map((order, idx) => (
                <div key={idx} className="p-5 space-y-4 active:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-900">{order.name}</h3>
                      <p className="text-[11px] text-slate-400 font-medium">{order.date} • {order.method}</p>
                    </div>
                    <Badge className={`${statusBadgeClass(order.status)} text-[10px] px-2 py-0.5 rounded-md font-bold uppercase`}>
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Total Amount</p>
                      <p className="text-lg font-black text-[#800000]">Rs. {order.total.toLocaleString()}</p>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600 h-9">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}