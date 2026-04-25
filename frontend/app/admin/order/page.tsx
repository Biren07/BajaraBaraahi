"use client";

import { useState, useEffect } from "react";
import { Eye, Plus, Receipt, RotateCcw, Loader2 } from "lucide-react";
import AdminShell from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderService } from "@/services/orderService";
import toast from "react-hot-toast";

function statusBadgeClass(status: string) {
  switch (status) {
    case "delivered":
    case "Delivered":
      return "bg-[#800000]/10 text-[#800000] border-[#800000]/20";
    case "confirmed":
    case "Confirmed":
      return "bg-green-100 text-green-700 border-green-200";
    case "dispatched":
    case "Dispatched":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "processing":
    case "Processing":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "pending":
    case "Pending":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "cancelled":
    case "Cancelled":
      return "bg-red-100 text-red-600 border-red-200";
    default:
      return "bg-gray-100 text-gray-500";
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
      const response = await orderService.getAllOrders();
      setOrders(response.orders || response || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminShell>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#800000]/10 flex items-center justify-center shadow-sm">
            <Receipt className="w-5 h-5 text-[#800000]" />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Orders Management
            </h1>
            <p className="text-sm text-gray-500">
              Track, manage and monitor all customer orders
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,340px] gap-6">

          {/* TABLE CARD */}
          <Card className="shadow-sm border rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">
                Order List
              </CardTitle>
              <p className="text-sm text-gray-500">
                Total {orders.length} orders
              </p>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>

                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-gray-400" />
                          <p className="text-gray-500">Loading orders...</p>
                        </TableCell>
                      </TableRow>
                    ) : orders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No orders found
                        </TableCell>
                      </TableRow>
                    ) : (
                      orders.map((order) => (
                        <TableRow
                          key={order._id || order.id}
                          className="hover:bg-gray-50 transition"
                        >

                          <TableCell className="font-mono text-xs text-gray-500">
                            {order._id || order.id}
                          </TableCell>

                          <TableCell className="font-medium text-gray-900">
                            {order.user?.name || order.customer || "N/A"}
                          </TableCell>

                          <TableCell className="text-gray-500">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : order.date}
                          </TableCell>

                          <TableCell>
                            <Badge className={statusBadgeClass(order.status)}>
                              {order.status}
                            </Badge>
                          </TableCell>

                          <TableCell className="text-right font-semibold">
                            Rs. {(order.total || 0).toFixed(2)}
                          </TableCell>

                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-300 hover:border-[#800000] hover:text-[#800000]"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </TableCell>

                        </TableRow>
                      ))
                    )}
                  </TableBody>

                </Table>
              </div>
            </CardContent>
          </Card>

          {/* FORM
          <Card className="shadow-sm border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Create Order
              </CardTitle>
              <p className="text-sm text-gray-500">
                Add a new order manually (demo)
              </p>
            </CardHeader>

            <CardContent className="space-y-4">

              <Input placeholder="Customer name" />
              <Input placeholder="Order status" />
              <Input type="number" placeholder="Total amount" />
              <Input placeholder="Payment method" />

              <div className="flex gap-2 pt-2">

                <Button className="flex-1 bg-[#800000] hover:bg-[#660000] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Order
                </Button>

                <Button variant="outline" className="border-gray-300">
                  <RotateCcw className="w-4 h-4" />
                </Button>

              </div>

              <p className="text-xs text-gray-400">
                UI only — backend not connected
              </p>

            </CardContent>
          </Card> */}

        </div>
      </div>
    </AdminShell>
  );
}