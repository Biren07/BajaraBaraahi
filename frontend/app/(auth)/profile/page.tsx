"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Download,
  Printer,
  ChevronRight,
  CheckCircle2,
  Clock,
  CreditCard,
  Camera,
} from "lucide-react";

// Removed MOCK_ORDERS, using real data from orderService

export default function ProfilePage() {
  const { user: authUser, setUser: setAuthUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    profileImage: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Ref to track object URL for cleanup
  const objectUrlRef = useRef(null);

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

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  // Fetch orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);
        const response = await orderService.getMyOrders();
        console.log("Orders response:", response); // Debug log
        let ordersData = [];
        if (Array.isArray(response)) {
          ordersData = response;
        } else if (response && Array.isArray(response.orders)) {
          ordersData = response.orders;
        } else {
          ordersData = [];
        }
        setOrders(ordersData);
        if (ordersData.length > 0) {
          setSelectedOrder(ordersData[0]);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to load orders");
        setOrders([]); // Ensure orders is array
      } finally {
        setOrdersLoading(false);
      }
    };

    if (authUser) {
      fetchOrders();
    }
  }, [authUser]);

  // FIXED: Improved change handler to ensure state updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // NEW: Handle Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke previous object URL
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }

      const newObjectUrl = URL.createObjectURL(file);
      objectUrlRef.current = newObjectUrl;

      setImageFile(file);
      setPreviewUrl(newObjectUrl); // Show the user the image immediately
    }
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

      // Refresh user data from server to get updated image URL
      const res = await authService.getLoggedUser();
      const updatedUser = res?.user ?? res;
      setAuthUser(updatedUser);

      // Update preview to server URL and revoke object URL
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      setPreviewUrl(updatedUser?.profileImage?.url || "");

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setImageFile(null); // Clear the file after save
    } catch (error) {
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
          {/* USER HERO SECTION */}
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
              </TabsTrigger>
            </TabsList>

            {/* TAB: PROFILE */}
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
                    {/* INPUTS: FirstName & LastName */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                        First Name
                      </label>
                      <Input
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`rounded-2xl border-slate-100 h-14 text-md font-medium transition-all ${isEditing ? "bg-white ring-4 ring-[#7a0f1e]/5 border-[#7a0f1e]/20" : "bg-slate-50/50 cursor-not-allowed"}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                        Last Name
                      </label>
                      <Input
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`rounded-2xl border-slate-100 h-14 text-md font-medium transition-all ${isEditing ? "bg-white ring-4 ring-[#7a0f1e]/5 border-[#7a0f1e]/20" : "bg-slate-50/50 cursor-not-allowed"}`}
                      />
                    </div>

                    {/* INPUTS: Email & Phone */}
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

                    {/* ADDRESS */}
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

                    {/* PROFILE IMAGE UPLOAD */}
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
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              disabled={!isEditing}
                              className="hidden"
                              id="profile-upload"
                            />
                            <label
                              htmlFor="profile-upload"
                              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm
                                ${isEditing ? "bg-white text-[#7a0f1e] cursor-pointer hover:bg-slate-50 ring-1 ring-slate-200" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
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

            {/* TAB: ORDERS */}
            <TabsContent value="orders" className="focus-visible:outline-none">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Order list */}
                <div className="lg:col-span-2 space-y-4">
                  {ordersLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7a0f1e] mx-auto mb-4"></div>
                      <p className="text-gray-500">Loading orders...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg font-medium">
                        No orders found
                      </p>
                      <p className="text-gray-400 text-sm">
                        Your order history will appear here
                      </p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div
                        key={order._id || order.id}
                        onClick={() => setSelectedOrder(order)}
                        className={`p-6 rounded-[24px] border transition-all cursor-pointer flex items-center justify-between
                          ${
                            selectedOrder &&
                            (selectedOrder._id || selectedOrder.id) ===
                              (order._id || order.id)
                              ? "bg-white border-[#7a0f1e] shadow-lg"
                              : "bg-white/60 border-slate-100 hover:border-slate-300"
                          }`}
                      >
                        <div className="flex gap-5 items-center">
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center
                              ${
                                selectedOrder &&
                                (selectedOrder._id || selectedOrder.id) ===
                                  (order._id || order.id)
                                  ? "bg-[#7a0f1e] text-white"
                                  : "bg-slate-100 text-slate-400"
                              }`}
                          >
                            <Package size={24} />
                          </div>
                          <div>
                            <p className="font-bold text-lg text-slate-900">
                              Order #{order._id || order.id}
                            </p>
                            <p className="text-sm text-slate-400">
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleDateString()
                                : order.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right hidden sm:block">
                            <Badge
                              className={
                                order.status === "Delivered" ||
                                order.status === "delivered"
                                  ? "bg-green-50 text-green-600"
                                  : order.status === "Processing" ||
                                      order.status === "processing"
                                    ? "bg-amber-50 text-amber-600"
                                    : "bg-blue-50 text-blue-600"
                              }
                            >
                              {order.status}
                            </Badge>
                            <p className="text-lg font-black text-slate-900 mt-1">
                              Rs. {(order.total || 0).toFixed(2)}
                            </p>
                          </div>
                          <ChevronRight size={20} className="text-slate-300" />
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Receipt panel */}
                {selectedOrder && (
                  <div className="lg:col-span-1">
                    <div className="sticky top-32">
                      <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden">
                        <div className="bg-[#7a0f1e] p-8 text-white text-center">
                          <CheckCircle2 size={40} className="mx-auto mb-3" />
                          <h3 className="text-xl font-black uppercase tracking-widest">
                            Receipt
                          </h3>
                          <p className="text-white/60 text-xs">
                            ID: {selectedOrder._id || selectedOrder.id}X99
                          </p>
                        </div>
                        <div className="p-8 space-y-6">
                          {selectedOrder.items &&
                          selectedOrder.items.length > 0 ? (
                            selectedOrder.items.map((item, i) => (
                              <div key={i} className="flex justify-between">
                                <div>
                                  <p className="text-sm font-bold">
                                    {item.name}
                                  </p>
                                  <p className="text-[11px] text-slate-400">
                                    QTY: {item.qty}
                                  </p>
                                </div>
                                <p className="font-bold text-sm">
                                  Rs. {item.price.toFixed(2)}
                                </p>
                              </div>
                            ))
                          ) : (
                            <div className="text-center text-gray-500">
                              <p>No item details available</p>
                            </div>
                          )}
                          <div className="pt-6 border-t border-dashed border-slate-200 flex justify-between">
                            <span className="font-bold">Total Paid</span>
                            <span className="text-[#7a0f1e] font-black">
                              Rs. {(selectedOrder.total || 0).toFixed(2)}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              variant="outline"
                              className="rounded-2xl h-12"
                            >
                              <Printer size={16} />
                            </Button>
                            <Button className="bg-slate-900 rounded-2xl h-12">
                              <Download size={16} />
                            </Button>
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
