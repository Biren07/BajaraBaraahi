"use client";

import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  User,
  CheckCircle,
  Home,
  ShoppingBag,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { orderService } from "@/services/orderService";
import toast from "react-hot-toast";

export default function OrderPage() {
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    district: "",
    city: "",
    street: "",
    alternativePhone: "",
  });

  const handlePaymentSelect = (method: string) => {
    setPayment(method);
    setShowQR(true);
  };

  const generateOrderId = () =>
    "ORD-" + Math.floor(100000 + Math.random() * 900000);

  const qrImage = () => {
    switch (payment) {
      case "esewa":
        return "/images/payments/esewa-qr.png";
      case "khalti":
        return "/images/payments/khalti-qr.png";
      case "fonepay":
        return "/images/payments/fonepay-qr.png";
      default:
        return "";
    }
  };

  // ✅ SEND ORDER TO BACKEND
  const handleSubmitOrder = async () => {
    if (!receipt) {
      toast.error("Please upload payment receipt");
      return;
    }
    if (
      !formData.district ||
      !formData.city ||
      !formData.street ||
      !formData.alternativePhone
    ) {
      toast.error("Please fill all address fields");
      return;
    }

    setLoading(true);

    const orderData = {
      ...formData,
      paymentMethod: payment,
    };

    try {
      const response = await orderService.placeOrder(orderData, receipt);

      setOrderId(response.orderId || response._id);
      setShowQR(false);
      setShowSuccess(true);
      toast.success("Order placed successfully!");

      // ✅ WhatsApp message
      const message = `New Order\nOrder ID: ${response.orderId || response._id}\nPayment: ${payment}`;
      window.open(
        `https://wa.me/977XXXXXXXXX?text=${encodeURIComponent(message)}`,
        "_blank",
      );
    } catch (error: any) {
      console.error("Failed to place order:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* HERO */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary to-primary/90">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-yellow-400">Checkout</span>
          </nav>

          <h1 className="text-4xl font-bold text-white">
            Checkout <span className="text-yellow-400">Page</span>
          </h1>
        </div>
      </section>

      {/* MAIN */}
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6 bg-card p-6 rounded-2xl border shadow-sm">
            <h2 className="flex items-center gap-2 font-semibold">
              <User className="w-5 h-5 text-[#7a0f1e]" />
              Personal Info
            </h2>

            <Input
              placeholder="District"
              value={formData.district}
              onChange={(e) =>
                setFormData({ ...formData, district: e.target.value })
              }
            />
            <Input
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
            <Input
              placeholder="Street Address"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
            />
            <Input
              placeholder="Phone Number"
              value={formData.alternativePhone}
              onChange={(e) =>
                setFormData({ ...formData, alternativePhone: e.target.value })
              }
            />

            <Separator />

            {/* PAYMENT */}
            <h2 className="flex items-center gap-2 font-semibold">
              <CreditCard className="w-5 h-5 text-[#7a0f1e]" />
              Payment Methods
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {["esewa", "khalti", "fonepay"].map((method) => (
                <label
                  key={method}
                  onClick={() => handlePaymentSelect(method)}
                  className={`cursor-pointer border rounded-xl p-3 text-center ${
                    payment === method ? "border-green-500 bg-green-50" : ""
                  }`}
                >
                  <Image
                    src={`/images/payments/${method}.png`}
                    alt={method}
                    width={60}
                    height={30}
                  />
                  <p className="text-xs">{method}</p>
                </label>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* QR + UPLOAD */}
      {showQR && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl text-center relative w-[320px]">
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-2 right-2"
            >
              <X />
            </button>

            <h2 className="font-bold mb-3">Scan {payment} QR</h2>

            <Image src={qrImage()} alt="QR" width={250} height={250} />

            {/* Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setReceipt(e.target.files?.[0] || null)}
              className="mt-4"
            />

            {/* Preview */}
            {receipt && (
              <img
                src={URL.createObjectURL(receipt)}
                className="mt-3 w-32 mx-auto rounded"
              />
            )}

            <Button
              onClick={handleSubmitOrder}
              disabled={loading}
              className="mt-4 w-full bg-green-600"
            >
              {loading ? "Submitting..." : "Send to Admin"}
            </Button>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h2 className="text-xl font-bold">Order Successful 🎉</h2>

            <p className="text-sm mt-2 mb-4">
              Order ID: <b>{orderId}</b>
            </p>

            <Link href="/">
              <Button className="w-full mb-2 bg-[#7a0f1e]">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>

            <Link href="/order-view">
              <Button variant="outline" className="w-full">
                <ShoppingBag className="w-4 h-4 mr-2" />
                View Orders
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
