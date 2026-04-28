"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { userService } from "@/services/userService";
import authService from "@/services/authService";
import { orderService } from "@/services/orderService";
import toast from "react-hot-toast";
import {
  User,
  Package,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  CheckCircle2,
  CreditCard,
  Camera,
  Truck,
  Tag,
  Clock,
  CheckCheck,
  XCircle,
  Send,
} from "lucide-react";

// ─── Status helpers ───────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending",
    color: "bg-amber-50 text-amber-600 border-amber-200",
    icon: <Clock size={12} />,
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-blue-50 text-blue-600 border-blue-200",
    icon: <CheckCircle2 size={12} />,
  },
  dispatched: {
    label: "Dispatched",
    color: "bg-purple-50 text-purple-600 border-purple-200",
    icon: <Send size={12} />,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-50 text-green-600 border-green-200",
    icon: <CheckCheck size={12} />,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-50 text-red-600 border-red-200",
    icon: <XCircle size={12} />,
  },
};

const PAYMENT_STATUS: Record<string, { label: string; color: string }> = {
  unpaid: { label: "Unpaid", color: "text-amber-600" },
  paid: { label: "Paid", color: "text-green-600" },
  rejected: { label: "Rejected", color: "text-red-600" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user: authUser, setUser: setAuthUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    profileImage: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const objectUrlRef = useRef<string | null>(null);

  // ── Sync from auth context ──
  useEffect(() => {
    if (authUser) {
      setUser({
        firstName: authUser.firstname || "",
        lastName: authUser.lastname || "",
        email: authUser.email || "",
        phone: authUser.phone || "",
        address: authUser.address || "",
        profileImage: authUser.profileImage?.url || "",
      });
      setPreviewUrl(authUser.profileImage?.url || "");
    }
  }, [authUser]);

  useEffect(
    () => () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    },
    [],
  );

  // ── Fetch orders — API returns { success, total, data: Order[] } ──
  useEffect(() => {
    if (!authUser) return;
    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);
        const response = await orderService.getMyOrders();
        // getMyOrders returns { success, total, data: [] }
        const ordersData: any[] = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
            ? response
            : [];
        setOrders(ordersData);
        if (ordersData.length > 0) setSelectedOrder(ordersData[0]);
      } catch (error) {
        toast.error("Failed to load orders");
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [authUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setImageFile(file);
    setPreviewUrl(url);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("firstname", user.firstName);
      formData.append("lastname", user.lastName);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      if (user.address) formData.append("address", user.address);
      if (imageFile) formData.append("profileImage", imageFile);

      await userService.updateProfile(formData);
      const res = await authService.getLoggedUser();
      const updatedUser = res?.user ?? res;
      setAuthUser(updatedUser);

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      setPreviewUrl(updatedUser?.profileImage?.url || "");
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setImageFile(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow pt-32 pb-16 bg-[#F8FAFC] px-4 md:px-12 font-sans">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-end pb-4">
            <div className="relative group">
              <div className="w-28 h-28 rounded-3xl bg-white flex items-center justify-center border border-slate-200 shadow-xl overflow-hidden transform -rotate-3 group-hover:rotate-0 transition-all duration-500">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#7a0f1e]/10 to-slate-50 flex items-center justify-center text-[#7a0f1e]/40">
                    <User size={48} />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-[#F8FAFC]" />
            </div>
            <div className="text-center md:text-left space-y-1">
              <Badge className="bg-[#7a0f1e]/10 text-[#7a0f1e] hover:bg-[#7a0f1e]/20 border-none mb-2 px-3 py-1">
                Verified Member
              </Badge>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-tight">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-slate-500 font-medium">{user.email}</p>
            </div>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="bg-white/50 backdrop-blur-md sticky top-24 z-10 border border-slate-200/60 w-full justify-start rounded-2xl h-auto p-1.5 mb-8">
              <TabsTrigger
                value="profile"
                className="rounded-xl px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#7a0f1e] font-bold transition-all"
              >
                Profile Settings
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="rounded-xl px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#7a0f1e] font-bold transition-all"
              >
                Orders & Receipts
                {orders.length > 0 && (
                  <span className="ml-2 bg-[#7a0f1e] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {orders.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            {/* ── TAB: PROFILE ── */}
            <TabsContent value="profile" className="focus-visible:outline-none">
              <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[40px] overflow-hidden bg-white">
                <CardHeader className="px-10 pt-10 pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl font-black text-slate-800">
                        Account Details
                      </CardTitle>
                      <p className="text-sm text-slate-400 mt-1 font-medium">
                        Update your profile and shipping information
                      </p>
                    </div>
                    <Button
                      variant={isEditing ? "destructive" : "outline"}
                      onClick={() => setIsEditing(!isEditing)}
                      className="rounded-full px-8 h-12 font-bold shadow-sm"
                    >
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-10 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {[
                      { name: "firstName", label: "First Name" },
                      { name: "lastName", label: "Last Name" },
                    ].map(({ name, label }) => (
                      <div key={name} className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                          {label}
                        </label>
                        <Input
                          name={name}
                          value={(user as any)[name]}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`rounded-2xl border-slate-100 h-14 text-md font-medium transition-all ${isEditing ? "bg-white ring-4 ring-[#7a0f1e]/5 border-[#7a0f1e]/20" : "bg-slate-50/50 cursor-not-allowed"}`}
                        />
                      </div>
                    ))}

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                          size={18}
                        />
                        <Input
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`pl-12 rounded-2xl border-slate-100 h-14 text-md font-medium transition-all ${isEditing ? "bg-white ring-4 ring-[#7a0f1e]/5 border-[#7a0f1e]/20" : "bg-slate-50/50 cursor-not-allowed"}`}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                          size={18}
                        />
                        <Input
                          name="phone"
                          value={user.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`pl-12 rounded-2xl border-slate-100 h-14 text-md font-medium transition-all ${isEditing ? "bg-white ring-4 ring-[#7a0f1e]/5 border-[#7a0f1e]/20" : "bg-slate-50/50 cursor-not-allowed"}`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                        Shipping Address
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                          size={18}
                        />
                        <Input
                          name="address"
                          value={user.address}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`pl-12 rounded-2xl border-slate-100 h-14 text-md font-medium transition-all ${isEditing ? "bg-white ring-4 ring-[#7a0f1e]/5" : "bg-slate-50/50 cursor-not-allowed"}`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                        Profile Photo
                      </label>
                      <div
                        className={`p-6 rounded-[28px] border-2 border-dashed transition-all ${isEditing ? "border-[#7a0f1e]/30 bg-[#7a0f1e]/5" : "border-slate-100 bg-slate-50/30"}`}
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center overflow-hidden">
                            {previewUrl ? (
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="text-slate-200" size={32} />
                            )}
                          </div>
                          <div className="flex-1">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              disabled={!isEditing}
                              className="hidden"
                              id="profile-upload"
                            />
                            <label
                              htmlFor="profile-upload"
                              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${isEditing ? "bg-white text-[#7a0f1e] cursor-pointer hover:bg-slate-50 ring-1 ring-slate-200" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                            >
                              <Camera size={18} /> Choose New Photo
                            </label>
                            <p className="text-xs text-slate-400 mt-3 font-medium">
                              PNG, JPG or WebP. Recommended size: 800x800px.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-12 flex justify-end gap-4">
                      <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-[#7a0f1e] hover:bg-[#5c0c17] disabled:opacity-50 text-white px-12 py-7 rounded-[24px] text-lg font-black shadow-2xl shadow-[#7a0f1e]/30 transition-all hover:scale-[1.03]"
                      >
                        {saving ? "Updating Account..." : "Save Changes"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── TAB: ORDERS ── */}
            <TabsContent value="orders" className="focus-visible:outline-none">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Order list */}
                <div className="lg:col-span-2 space-y-4">
                  {ordersLoading ? (
                    <div className="text-center py-16">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7a0f1e] mx-auto mb-4" />
                      <p className="text-slate-400 font-medium">
                        Loading orders…
                      </p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-16">
                      <Package className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-500 text-lg font-bold">
                        No orders yet
                      </p>
                      <p className="text-slate-400 text-sm mt-1">
                        Your order history will appear here
                      </p>
                    </div>
                  ) : (
                    orders.map((order) => {
                      const isSelected = selectedOrder?._id === order._id;
                      const statusCfg =
                        STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                      // API field: grandTotal (not total)
                      const amount = order.grandTotal ?? order.totalPrice ?? 0;

                      return (
                        <div
                          key={order._id}
                          onClick={() => setSelectedOrder(order)}
                          className={`p-5 rounded-[24px] border-2 transition-all cursor-pointer
                            ${
                              isSelected
                                ? "bg-white border-[#7a0f1e] shadow-lg shadow-[#7a0f1e]/10"
                                : "bg-white/70 border-slate-100 hover:border-slate-200 hover:bg-white"
                            }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isSelected ? "bg-[#7a0f1e] text-white" : "bg-slate-100 text-slate-400"}`}
                              >
                                <Package size={20} />
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 text-sm">
                                  #{order._id.slice(-8).toUpperCase()}
                                </p>
                                <p className="text-xs text-slate-400 mt-0.5">
                                  {new Date(order.createdAt).toLocaleDateString(
                                    "en-NP",
                                    {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    },
                                  )}
                                </p>
                                {/* Books summary */}
                                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                  {order.books
                                    ?.map((b: any) => b.title)
                                    .join(", ")}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                              <span
                                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusCfg.color}`}
                              >
                                {statusCfg.icon} {statusCfg.label}
                              </span>
                              <p className="font-black text-slate-900 text-base">
                                Rs. {amount.toFixed(2)}
                              </p>
                              {/* Payment status */}
                              <span
                                className={`text-[11px] font-semibold ${PAYMENT_STATUS[order.payment?.status]?.color || "text-slate-400"}`}
                              >
                                {PAYMENT_STATUS[order.payment?.status]?.label ||
                                  "—"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* ── Receipt panel ── */}
                {selectedOrder && (
                  <div className="lg:col-span-1">
                    <div className="sticky top-32">
                      <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden">
                        {/* Header */}
                        <div className="bg-[#7a0f1e] p-6 text-white text-center">
                          <CheckCircle2 size={36} className="mx-auto mb-2" />
                          <h3 className="text-lg font-black uppercase tracking-widest">
                            Receipt
                          </h3>
                          <p className="text-white/60 text-[11px] mt-1 font-mono">
                            #{selectedOrder._id.slice(-8).toUpperCase()}
                          </p>
                          <p className="text-white/50 text-[10px] mt-0.5">
                            {new Date(
                              selectedOrder.createdAt,
                            ).toLocaleDateString("en-NP", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>

                        <div className="p-6 space-y-5">
                          {/* Delivery address */}
                          <div className="flex items-start gap-2 text-xs text-slate-500">
                            <MapPin
                              size={13}
                              className="shrink-0 mt-0.5 text-slate-400"
                            />
                            <span>
                              {[
                                selectedOrder.deliveryAddress?.tole,
                                selectedOrder.deliveryAddress?.city,
                                selectedOrder.deliveryAddress?.district,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </span>
                          </div>

                          {/* Payment method */}
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <CreditCard size={13} className="text-slate-400" />
                            <span className="capitalize">
                              {selectedOrder.payment?.method}
                            </span>
                            <span
                              className={`ml-auto font-semibold ${PAYMENT_STATUS[selectedOrder.payment?.status]?.color}`}
                            >
                              {
                                PAYMENT_STATUS[selectedOrder.payment?.status]
                                  ?.label
                              }
                            </span>
                          </div>

                          <Separator />

                          {/* Books — API field is "books" not "items" */}
                          <div className="space-y-3">
                            {selectedOrder.books?.map(
                              (book: any, i: number) => (
                                <div
                                  key={i}
                                  className="flex justify-between items-start gap-2"
                                >
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-800 line-clamp-1">
                                      {book.title}
                                    </p>
                                    <p className="text-[11px] text-slate-400">
                                      by {book.author} · qty {book.quantity}
                                    </p>
                                  </div>
                                  <p className="text-sm font-bold text-slate-800 shrink-0">
                                    Rs. {book.subtotal?.toFixed(2)}
                                  </p>
                                </div>
                              ),
                            )}
                          </div>

                          <Separator className="border-dashed" />

                          {/* Price breakdown */}
                          <div className="space-y-1.5 text-xs text-slate-500">
                            <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span>
                                Rs. {selectedOrder.totalPrice?.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="flex items-center gap-1">
                                <Truck size={11} /> Delivery (
                                {selectedOrder.delivery?.zone})
                              </span>
                              <span>
                                Rs. {selectedOrder.delivery?.charge?.toFixed(2)}
                              </span>
                            </div>
                            {selectedOrder.promo?.code && (
                              <div className="flex justify-between text-green-600">
                                <span className="flex items-center gap-1">
                                  <Tag size={11} /> Promo (
                                  {selectedOrder.promo.code} · -
                                  {selectedOrder.promo.discount}%)
                                </span>
                                <span>
                                  − Rs.{" "}
                                  {selectedOrder.promo.savings?.toFixed(2)}
                                </span>
                              </div>
                            )}
                          </div>

                          <Separator />

                          {/* Grand total */}
                          <div className="flex justify-between items-center">
                            <span className="font-black text-slate-800">
                              Total Paid
                            </span>
                            <span className="text-[#7a0f1e] font-black text-lg">
                              Rs.{" "}
                              {(
                                selectedOrder.grandTotal ??
                                selectedOrder.totalPrice ??
                                0
                              ).toFixed(2)}
                            </span>
                          </div>

                          {/* Status badge */}
                          <div
                            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border ${STATUS_CONFIG[selectedOrder.status]?.color || ""}`}
                          >
                            {STATUS_CONFIG[selectedOrder.status]?.icon}
                            Order {STATUS_CONFIG[selectedOrder.status]?.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
