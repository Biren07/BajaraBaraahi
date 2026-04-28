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
  MapPin,
  Phone,
  Mail,
  Tag,
  Truck,
  Package,
  Gift,
  Loader2,
  BadgeCheck,
  Info,
} from "lucide-react";
import { useState, useMemo } from "react";
import { orderService } from "@/services/orderService";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

// ─── Delivery Utility (mirrors Utils/DeliveryCharge.js exactly) ───────────────

const ZONES: Record<string, string[]> = {
  kathmandu: ["kathmandu", "lalitpur", "bhaktapur"],
  outside_valley: [
    "pokhara",
    "chitwan",
    "butwal",
    "hetauda",
    "birgunj",
    "biratnagar",
    "dharan",
    "itahari",
    "janakpur",
    "nepalgunj",
    "dhangadhi",
    "tulsipur",
    "ghorahi",
  ],
  remote: [],
};

const DELIVERY_RATES: Record<
  string,
  { min: number; max: number; price: number }[]
> = {
  kathmandu: [
    { min: 0, max: 1000, price: 80 },
    { min: 1000, max: 1500, price: 120 },
    { min: 1500, max: 2000, price: 160 },
    { min: 2000, max: 2500, price: 240 },
    { min: 2500, max: 3000, price: 280 },
    { min: 3000, max: 3500, price: 320 },
    { min: 3500, max: 4000, price: 360 },
    { min: 4000, max: 5000, price: 420 },
    { min: 5000, max: 6000, price: 460 },
    { min: 6000, max: 7000, price: 480 },
    { min: 7000, max: 8000, price: 540 },
    { min: 8000, max: 9000, price: 600 },
    { min: 9000, max: 10000, price: 660 },
    { min: 10000, max: 11000, price: 720 },
    { min: 11000, max: 12000, price: 780 },
    { min: 12000, max: 13000, price: 840 },
    { min: 13000, max: Infinity, price: 900 },
  ],
  outside_valley: [
    { min: 0, max: 1000, price: 150 },
    { min: 1000, max: 2000, price: 200 },
    { min: 2000, max: 3000, price: 280 },
    { min: 3000, max: 4000, price: 360 },
    { min: 4000, max: 5000, price: 440 },
    { min: 5000, max: 6000, price: 520 },
    { min: 6000, max: 7000, price: 600 },
    { min: 7000, max: 8000, price: 680 },
    { min: 8000, max: 9000, price: 760 },
    { min: 9000, max: 10000, price: 840 },
    { min: 10000, max: Infinity, price: 920 },
  ],
  remote: [
    { min: 0, max: 1000, price: 250 },
    { min: 1000, max: 2000, price: 350 },
    { min: 2000, max: 3000, price: 450 },
    { min: 3000, max: 4000, price: 550 },
    { min: 4000, max: 5000, price: 650 },
    { min: 5000, max: Infinity, price: 750 },
  ],
};

function getZone(district: string): string {
  const n = district.toLowerCase().trim();
  if (ZONES.kathmandu.includes(n)) return "kathmandu";
  if (ZONES.outside_valley.includes(n)) return "outside_valley";
  return "remote";
}

function calcDelivery(district: string, weightInGrams: number) {
  const zone = getZone(district);
  const rate = DELIVERY_RATES[zone].find(
    (r) => weightInGrams >= r.min && weightInGrams < r.max,
  );
  return { zone, weightInGrams, deliveryCharge: rate ? rate.price : 0 };
}

const ZONE_LABEL: Record<string, string> = {
  kathmandu: "Kathmandu Valley",
  outside_valley: "Outside Valley",
  remote: "Remote Area",
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface CouponInfo {
  code: string;
  discount: number; // percentage from server
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function OrderPage() {
  const { cartItems, totalPrice } = useCart();
  const { user: authUser } = useAuth();

  const profile = {
    firstname: authUser?.firstname || "",
    lastname: authUser?.lastname || "",
    email: authUser?.email || "",
    phone: authUser?.phone || "",
  };

  // ── Form ──
  const [formData, setFormData] = useState({
    district: "",
    city: "",
    tole: "",
    landmark: "",
    houseNo: "",
    alternativePhone: "",
  });

  // ── Coupon — validated against server before payment ──
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<CouponInfo | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  // ── Payment ──
  const [payment, setPayment] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  // ─── Live delivery from client-side zone logic ────────────────────────────

  const totalWeightInGrams = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + (item.weight || 0) * item.quantity,
        0,
      ),
    [cartItems],
  );

  const delivery = useMemo(() => {
    if (!formData.district.trim()) return null;
    return calcDelivery(formData.district, totalWeightInGrams);
  }, [formData.district, totalWeightInGrams]);

  // ─── Totals — all calculated correctly before payment ────────────────────
  //
  //   subtotal    = cart total (from API)
  //   delivery    = zone-based charge (client mirrors backend logic)
  //   beforePromo = subtotal + delivery  ← base for promo %
  //   savings     = beforePromo × discount / 100
  //   grandTotal  = beforePromo − savings
  //
  // This matches exactly what the backend does in placeOrder:
  //   grandTotal = totalPrice + deliveryCharge
  //   savings    = grandTotal * promoDiscount / 100
  //   grandTotal = grandTotal - savings

  const subtotal = totalPrice;
  const deliveryCharge = delivery?.deliveryCharge ?? 0;
  const beforePromo = parseFloat((subtotal + deliveryCharge).toFixed(2));
  const savings = coupon
    ? parseFloat(((beforePromo * coupon.discount) / 100).toFixed(2))
    : 0;
  const grandTotal = parseFloat((beforePromo - savings).toFixed(2));

  // ─── Validate coupon against server ──────────────────────────────────────
  // Calls POST /order/validate-coupon — reads Promo collection, returns discount %.
  // Does NOT increment usedCount (that only happens on order submit).

  const handleApplyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    setCouponLoading(true);
    try {
      const data = await orderService.applyCoupon(code);
      setCoupon({ code: data.code, discount: data.discount });
      toast.success(`"${data.code}" applied — ${data.discount}% off!`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid coupon code");
      setCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponInput("");
  };

  // ─── Receipt ─────────────────────────────────────────────────────────────

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setReceipt(file);
    setReceiptPreview(file ? URL.createObjectURL(file) : null);
  };

  // ─── Payment select ───────────────────────────────────────────────────────

  const handlePaymentSelect = (method: string) => {
    setPayment(method);
    setShowQR(true);
  };

  const qrImage = () =>
    ({
      esewa: "/images/payments/esewa-qr.png",
      khalti: "/images/payments/khalti-qr.png",
      fonepay: "/images/payments/fonepay-qr.png",
    })[payment] || "";

  // ─── Submit ───────────────────────────────────────────────────────────────

  const handleSubmitOrder = async () => {
    if (!receipt) {
      toast.error("Please upload payment receipt");
      return;
    }
    if (!formData.district || !formData.city || !formData.tole) {
      toast.error("District, city and tole are required");
      return;
    }
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        paymentMethod: payment,
        ...(coupon ? { couponCode: coupon.code } : {}),
      };
      const response = await orderService.placeOrder(orderData, receipt);
      setOrderId(response.order?._id || response.orderId || "");
      setShowQR(false);
      setShowSuccess(true);
      toast.success("Order placed successfully!");
      const msg = `New Order\nOrder ID: ${response.order?._id}\nPayment: ${payment}`;
      window.open(
        `https://wa.me/977XXXXXXXXX?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-8 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/cart" className="hover:text-gold transition-colors">
              Cart
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">Checkout</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground">
            Checkout <span className="text-gold">Page</span>
          </h1>
        </div>
      </section>

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ── LEFT ── */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Personal Info */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-border bg-muted/40">
                <User className="w-4 h-4 text-[#7a0f1e]" />
                <h2 className="font-semibold text-sm tracking-wide">
                  Personal Information
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoRow
                  icon={<User className="w-4 h-4" />}
                  label="Full Name"
                  value={
                    profile.firstname
                      ? `${profile.firstname} ${profile.lastname}`
                      : ""
                  }
                  placeholder="Not provided"
                />
                <InfoRow
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                  value={profile.email}
                  placeholder="Not provided"
                />
                <InfoRow
                  icon={<Phone className="w-4 h-4" />}
                  label="Phone"
                  value={profile.phone}
                  placeholder="Not provided"
                />
                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-4 h-4" /> Alternative Phone
                  </label>
                  <Input
                    placeholder="Alternative phone (optional)"
                    value={formData.alternativePhone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        alternativePhone: e.target.value,
                      })
                    }
                    className="h-9 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/40">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#7a0f1e]" />
                  <h2 className="font-semibold text-sm tracking-wide">
                    Delivery Address
                  </h2>
                </div>
                {delivery && (
                  <span
                    className={cn(
                      "text-[11px] font-semibold px-2.5 py-1 rounded-full",
                      delivery.zone === "kathmandu" &&
                        "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400",
                      delivery.zone === "outside_valley" &&
                        "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
                      delivery.zone === "remote" &&
                        "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
                    )}
                  >
                    {ZONE_LABEL[delivery.zone]}
                  </span>
                )}
              </div>

              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* District — delivery recalculates on every keystroke */}
                <div className="sm:col-span-2">
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block">
                    District <span className="text-[#7a0f1e]">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Kathmandu, Pokhara, Chitwan…"
                    value={formData.district}
                    onChange={(e) =>
                      setFormData({ ...formData, district: e.target.value })
                    }
                    className="h-9 text-sm"
                  />
                  {formData.district.trim() && delivery && (
                    <p className="mt-2 text-xs flex items-center gap-1.5 text-muted-foreground">
                      <Truck className="w-3.5 h-3.5" />
                      Delivery charge:
                      <span className="font-semibold text-foreground">
                        Rs. {delivery.deliveryCharge}
                      </span>
                      <span>·</span>
                      <span>{delivery.weightInGrams}g total weight</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block">
                    City / Area <span className="text-[#7a0f1e]">*</span>
                  </label>
                  <Input
                    placeholder="City / Area"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="h-9 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block">
                    Tole / Street <span className="text-[#7a0f1e]">*</span>
                  </label>
                  <Input
                    placeholder="Tole / Street"
                    value={formData.tole}
                    onChange={(e) =>
                      setFormData({ ...formData, tole: e.target.value })
                    }
                    className="h-9 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block">
                    Landmark
                  </label>
                  <Input
                    placeholder="Landmark (optional)"
                    value={formData.landmark}
                    onChange={(e) =>
                      setFormData({ ...formData, landmark: e.target.value })
                    }
                    className="h-9 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block">
                    House No.
                  </label>
                  <Input
                    placeholder="House No. (optional)"
                    value={formData.houseNo}
                    onChange={(e) =>
                      setFormData({ ...formData, houseNo: e.target.value })
                    }
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              {!formData.district && (
                <div className="mx-6 mb-5 flex items-start gap-2 px-3 py-2.5 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-900">
                  <Info className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Delivery is zone-based and calculated from your district +
                    order weight ({totalWeightInGrams}g). Enter your district to
                    see the charge instantly.
                  </p>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-border bg-muted/40">
                <CreditCard className="w-4 h-4 text-[#7a0f1e]" />
                <h2 className="font-semibold text-sm tracking-wide">
                  Payment Method
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3">
                  {["esewa", "khalti", "fonepay"].map((method) => (
                    <button
                      key={method}
                      onClick={() => handlePaymentSelect(method)}
                      className={cn(
                        "relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-150",
                        payment === method
                          ? "border-green-500 bg-green-50 dark:bg-green-950/20 shadow-md"
                          : "border-border hover:border-gold/50 hover:bg-muted/40",
                      )}
                    >
                      {payment === method && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </span>
                      )}
                      <div className="w-14 h-8 relative">
                        <Image
                          src={`/images/payments/${method}.png`}
                          alt={method}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs font-semibold capitalize tracking-wide">
                        {method}
                      </span>
                    </button>
                  ))}
                </div>
                {!payment && (
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Select a payment method to continue
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="lg:w-96 w-full">
            <div className="sticky top-32 space-y-5">
              {/* Cart Items */}
              <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-6 py-4 border-b border-border bg-muted/40">
                  <Package className="w-4 h-4 text-[#7a0f1e]" />
                  <h2 className="font-semibold text-sm tracking-wide">
                    Order Items ({totalItems})
                  </h2>
                </div>
                <div className="divide-y divide-border/60 max-h-52 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="flex items-center gap-3 px-5 py-3"
                    >
                      <div className="relative w-10 h-14 rounded-md overflow-hidden bg-muted shrink-0 shadow-sm ring-1 ring-black/5">
                        <Image
                          src={item.cover_Img?.url || "/placeholder.jpg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          by {item.author} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-semibold shrink-0">
                        Rs. {item.subtotal.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Code — validates against server, shows real discount */}
              <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gold" /> Promo Code
                </h3>
                {coupon ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-3 py-2.5 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-green-600" />
                        <span className="font-mono text-sm font-semibold text-green-700 dark:text-green-400">
                          {coupon.code}
                        </span>
                        <span className="text-xs font-bold text-white bg-green-500 px-1.5 py-0.5 rounded-full">
                          -{coupon.discount}%
                        </span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-xs text-green-600 font-medium">
                      You save Rs. {savings.toFixed(2)} with this coupon!
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={couponInput}
                      onChange={(e) =>
                        setCouponInput(e.target.value.toUpperCase())
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleApplyCoupon()
                      }
                      className="h-9 text-sm font-mono tracking-wider border-border focus:border-gold"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !couponInput.trim()}
                      variant="outline"
                      className="h-9 px-4 border-gold/40 hover:bg-gold hover:text-primary-foreground shrink-0 text-sm"
                    >
                      {couponLoading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        "Apply"
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="bg-card rounded-2xl border border-border shadow-sm p-5 space-y-3">
                <h3 className="font-semibold text-sm mb-1">Price Details</h3>

                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({totalItems} items)
                  </span>
                  <span>Rs. {subtotal.toFixed(2)}</span>
                </div>

                {/* Delivery */}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    Delivery
                    {delivery && (
                      <span className="text-[10px] text-muted-foreground/60">
                        ({ZONE_LABEL[delivery.zone]})
                      </span>
                    )}
                  </span>
                  {delivery ? (
                    <span
                      className={
                        delivery.deliveryCharge === 0
                          ? "text-green-600 font-medium"
                          : ""
                      }
                    >
                      {delivery.deliveryCharge === 0
                        ? "FREE"
                        : `Rs. ${delivery.deliveryCharge}`}
                    </span>
                  ) : (
                    <span className="text-xs italic text-muted-foreground">
                      enter district ↑
                    </span>
                  )}
                </div>

                {/* Promo savings */}
                {coupon && savings > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Promo ({coupon.discount}% off)
                    </span>
                    <span>− Rs. {savings.toFixed(2)}</span>
                  </div>
                )}

                <Separator />

                {/* Grand Total */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-base">Grand Total</p>
                    {!delivery && (
                      <p className="text-[11px] text-muted-foreground">
                        + delivery (enter district)
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gold">
                      Rs. {grandTotal.toFixed(2)}
                    </span>
                    {coupon && (
                      <p className="text-[11px] text-muted-foreground line-through">
                        Rs. {beforePromo.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  size="lg"
                  disabled={!payment || loading}
                  onClick={() => setShowQR(true)}
                  className="w-full mt-1 bg-[#7a0f1e] hover:bg-[#5c0c17] text-white font-semibold py-6 rounded-xl shadow-md transition-all disabled:opacity-50"
                >
                  {!payment ? "Select Payment Method" : "Place Order →"}
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-1">
                  <span>Secure Checkout</span>
                  <span>·</span>
                  <span>SSL Encrypted</span>
                </div>
              </div>

              {/* Perks */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: Truck,
                    title: "Zone-based Delivery",
                    sub: "Calculated by weight",
                  },
                  {
                    icon: Gift,
                    title: "Gift Wrapping",
                    sub: "Available on request",
                  },
                ].map(({ icon: Icon, title, sub }) => (
                  <div
                    key={title}
                    className="flex items-center gap-2 p-3 bg-card rounded-xl border border-border"
                  >
                    <Icon className="w-4 h-4 text-gold shrink-0" />
                    <div>
                      <p className="text-xs font-medium">{title}</p>
                      <p className="text-xs text-muted-foreground">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* ── QR & Upload Modal — shows EXACT amount user must pay ── */}
      {showQR && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-card w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/40">
              <div>
                <h2 className="font-semibold capitalize">{payment} Payment</h2>
                <p className="text-xs text-muted-foreground">
                  Scan QR and upload receipt
                </p>
              </div>
              <button
                onClick={() => setShowQR(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* QR */}
              <div className="flex justify-center">
                <div className="relative w-52 h-52 rounded-xl overflow-hidden border border-border shadow-sm bg-muted">
                  <Image
                    src={qrImage()}
                    alt="QR Code"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>

              {/* Breakdown — so user pays the exact correct amount */}
              <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    Delivery {delivery ? `(${ZONE_LABEL[delivery.zone]})` : ""}
                  </span>
                  <span>
                    {delivery
                      ? delivery.deliveryCharge === 0
                        ? "FREE"
                        : `Rs. ${delivery.deliveryCharge}`
                      : "—"}
                  </span>
                </div>
                {coupon && savings > 0 && (
                  <div className="flex justify-between text-xs text-green-600">
                    <span>
                      Promo ({coupon.code} · -{coupon.discount}%)
                    </span>
                    <span>− Rs. {savings.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">Pay Exactly</span>
                  <span className="text-xl font-bold text-gold">
                    Rs. {grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Upload */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  Upload Payment Receipt{" "}
                  <span className="text-[#7a0f1e]">*</span>
                </label>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-gold/50 hover:bg-muted/30 transition-all">
                  {receiptPreview ? (
                    <img
                      src={receiptPreview}
                      className="h-full w-full object-cover rounded-xl"
                      alt="Receipt"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        Click to upload screenshot
                      </p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleReceiptChange}
                    className="hidden"
                  />
                </label>
              </div>

              <Button
                onClick={handleSubmitOrder}
                disabled={loading || !receipt}
                className="w-full bg-[#7a0f1e] hover:bg-[#5c0c17] text-white font-semibold py-5 rounded-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Placing
                    Order...
                  </>
                ) : (
                  "Confirm & Place Order"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Success Modal ── */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-card w-full max-w-md rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-serif font-bold mb-2">
              Order Placed! 🎉
            </h2>
            <p className="text-sm text-muted-foreground mb-1">
              Your order has been received
            </p>
            <div className="inline-block mt-2 mb-6 px-4 py-2 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">Order ID</p>
              <p className="font-mono font-bold text-sm">{orderId}</p>
            </div>
            <div className="space-y-2">
              <Link href="/">
                <Button className="w-full bg-[#7a0f1e] hover:bg-[#5c0c17] text-white">
                  <Home className="w-4 h-4 mr-2" /> Go Home
                </Button>
              </Link>
              <Link href="/order-view">
                <Button
                  variant="outline"
                  className="w-full border-gold/30 hover:bg-gold/10"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" /> View My Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function InfoRow({
  icon,
  label,
  value,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-xs text-muted-foreground font-medium mb-1.5 flex items-center gap-1.5">
        {icon} {label}
      </label>
      <div
        className={cn(
          "h-9 px-3 flex items-center rounded-lg border text-sm",
          value
            ? "border-border bg-muted/50 text-foreground"
            : "border-dashed border-border/60 text-muted-foreground/50 italic",
        )}
      >
        {value || placeholder}
      </div>
    </div>
  );
}
