"use client";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useState, useEffect } from "react";
import {
  Receipt,
  Loader2,
  ImageIcon,
  ArrowUpRight,
  RotateCw,
  Calendar,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { orderService } from "@/services/orderService";

// Helper functions for styling (keeping your logic)
function statusBadgeClass(status: string) {
  const s = status?.toLowerCase();
  switch (s) {
    case "delivered":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "dispatched":
      return "bg-blue-50 text-blue-600 border-blue-100";
    case "confirmed":
      return "bg-violet-50 text-violet-600 border-violet-100";
    case "pending":
      return "bg-amber-50 text-amber-600 border-amber-100";
    case "cancelled":
      return "bg-rose-50 text-rose-600 border-rose-100";
    default:
      return "bg-slate-50 text-slate-500 border-slate-200";
  }
}

const getPaymentStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    case "paid":
      return "bg-emerald-500 text-white";
    case "unpaid":
      return "bg-[#800000] text-white";
    case "rejected":
      return "bg-rose-600 text-white";
    default:
      return "bg-slate-500 text-white";
  }
};

export default function AdminOrderPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAllOrders();
      const data = response?.data || [];
      setOrders(Array.isArray(data) ? data : []);
      setCurrentPage(1); // Reset to page 1 on refresh
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const exportToExcel = (dataToExport: any[]) => {
    const data = dataToExport.map((o) => ({
      OrderID: o._id,
      User: `${o.personalDetails?.firstname || ""} ${o.personalDetails?.lastname || ""}`.trim(),
      Total: o.grandTotal,
      Status: o.status,
      Payment: o.payment?.status,
      Method: o.payment?.method,
      Date: o.createdAt,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "orders.xlsx");
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingId(orderId);
      const res = await orderService.updateOrder(orderId, {
        status: newStatus,
      });
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: newStatus } : o,
          ),
        );
        toast.success(`Order status: ${newStatus}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Status update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePaymentUpdate = async (
    orderId: string,
    newPaymentStatus: string,
  ) => {
    try {
      setUpdatingId(orderId);
      const res = await orderService.verifyPayment(orderId, {
        paymentStatus: newPaymentStatus,
      });
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId
              ? {
                  ...o,
                  payment: { ...o.payment, status: newPaymentStatus },
                  status: newPaymentStatus === "paid" ? "confirmed" : o.status,
                }
              : o,
          ),
        );
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Payment verification failed",
      );
    } finally {
      setUpdatingId(null);
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
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#800000] flex items-center justify-center shadow-lg shadow-[#800000]/20">
              <Receipt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                Orders
              </h1>
              <p className="text-xs font-medium text-slate-500">
                Manage sales and fulfillment
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchOrders}
              className="rounded-lg h-9 flex-1 sm:flex-none"
            >
              <RotateCw className="w-4 h-4 mr-2" /> Refresh
            </Button>
            <Button
              onClick={() => exportToExcel(orders)}
              className="bg-[#800000] hover:bg-[#600000] text-white rounded-lg h-9 flex-1 sm:flex-none"
            >
              Export Excel
            </Button>
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {currentOrders.map((order) => (
            <Card
              key={order._id}
              className="rounded-2xl border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Same Mobile Card Content as before... */}
              <div className="p-4 border-b border-slate-50 bg-slate-50/30 flex justify-between items-start">
                <div>
                  <p className="font-bold text-slate-900">
                    {order.personalDetails?.firstname}{" "}
                    {order.personalDetails?.lastname}
                  </p>
                  <div className="flex items-center text-[10px] text-slate-500 mt-0.5 font-medium uppercase tracking-wider">
                    <Calendar className="w-3 h-3 mr-1" />{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[9px] font-black uppercase ${statusBadgeClass(order.status)}`}
                >
                  {order.status}
                </Badge>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      Status
                    </p>
                    <Select
                      disabled={
                        updatingId === order._id ||
                        order.status === "delivered" ||
                        order.status === "cancelled"
                      }
                      onValueChange={(val) =>
                        handleStatusUpdate(order._id, val)
                      }
                      value={order.status}
                    >
                      <SelectTrigger className="h-8 text-[10px] font-bold rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dispatched">DISPATCHED</SelectItem>
                        <SelectItem value="delivered">DELIVERED</SelectItem>
                        <SelectItem value="cancelled">CANCELLED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      Payment
                    </p>
                    <Select
                      disabled={
                        updatingId === order._id ||
                        order.payment?.status !== "unpaid"
                      }
                      onValueChange={(val) =>
                        handlePaymentUpdate(order._id, val)
                      }
                      value={order.payment?.status}
                    >
                      <SelectTrigger
                        className={`h-8 text-[10px] font-bold rounded-lg border-none ${getPaymentStyles(order.payment?.status)}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unpaid" disabled>
                          UNPAID
                        </SelectItem>
                        <SelectItem value="paid">PAID</SelectItem>
                        <SelectItem value="rejected">REJECTED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <p className="font-black text-[#800000]">
                    Rs. {order.grandTotal?.toLocaleString()}
                  </p>
                  {order.payment?.screenshot?.url && (
                    <a
                      href={order.payment.screenshot.url}
                      target="_blank"
                      className="text-[10px] font-bold text-blue-600 uppercase"
                    >
                      Receipt
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* DESKTOP TABLE */}
        <Card className="hidden md:block rounded-[24px] border-slate-200 shadow-sm overflow-hidden bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="py-4 px-6 font-bold text-slate-600">
                    Customer
                  </TableHead>
                  <TableHead className="font-bold text-slate-600">
                    Order Status
                  </TableHead>
                  <TableHead className="font-bold text-slate-600">
                    Payment & Proof
                  </TableHead>
                  <TableHead className="text-right font-bold text-slate-600">
                    Total Amount
                  </TableHead>
                  <TableHead className="text-right px-6 font-bold text-slate-600">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentOrders.map((order) => (
                  <TableRow
                    key={order._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <TableCell className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">
                          {order.personalDetails?.firstname}{" "}
                          {order.personalDetails?.lastname}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {order.deliveryAddress?.city} •{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        disabled={
                          updatingId === order._id ||
                          order.status === "delivered" ||
                          order.status === "cancelled"
                        }
                        onValueChange={(val) =>
                          handleStatusUpdate(order._id, val)
                        }
                        value={order.status}
                      >
                        <SelectTrigger
                          className={`w-[135px] h-9 rounded-lg border font-bold uppercase text-[10px] shadow-sm ${statusBadgeClass(order.status)}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="font-bold text-[10px]">
                          {(order.status === "pending" ||
                            order.status === "confirmed") && (
                            <SelectItem value={order.status} disabled>
                              {order.status.toUpperCase()}
                            </SelectItem>
                          )}
                          <SelectItem value="dispatched">DISPATCHED</SelectItem>
                          <SelectItem value="delivered">DELIVERED</SelectItem>
                          <SelectItem value="cancelled">CANCELLED</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Select
                            disabled={
                              updatingId === order._id ||
                              order.payment?.status !== "unpaid"
                            }
                            onValueChange={(val) =>
                              handlePaymentUpdate(order._id, val)
                            }
                            value={order.payment?.status}
                          >
                            <SelectTrigger
                              className={`w-[95px] h-7 text-[9px] font-black rounded border-none ${getPaymentStyles(order.payment?.status)}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="font-bold">
                              <SelectItem value="unpaid" disabled>
                                UNPAID
                              </SelectItem>
                              <SelectItem value="paid">PAID</SelectItem>
                              <SelectItem value="rejected">REJECTED</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            {order.payment?.method}
                          </span>
                        </div>
                        {order.payment?.screenshot?.url && (
                          <a
                            href={order.payment.screenshot.url}
                            target="_blank"
                            className="flex items-center gap-1 text-[10px] font-bold text-blue-600"
                          >
                            <ImageIcon className="w-3.5 h-3.5" /> View Receipt
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-black text-slate-900">
                      Rs. {order.grandTotal?.toLocaleString()}
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
          </CardContent>
        </Card>

        {/* PAGINATION CONTROLS */}
        {orders.length > itemsPerPage && (
          <div className="flex items-center justify-between px-2 py-4 border-t border-slate-100">
            <p className="text-sm text-slate-500 font-medium">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {indexOfFirstItem + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-slate-900">
                {Math.min(indexOfLastItem, orders.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900">{orders.length}</span>{" "}
              entries
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-xl border-slate-200"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "ghost"}
                    className={`h-9 w-9 rounded-xl text-xs font-bold ${
                      currentPage === i + 1
                        ? "bg-[#800000] hover:bg-[#800000]"
                        : "text-slate-500"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-xl border-slate-200"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
