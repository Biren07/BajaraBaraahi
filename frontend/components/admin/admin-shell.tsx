"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BookText,
  Circle,
  Tag,
  Ticket,
  Menu,
  X,
  Bell,
  LogOut,
  ChevronRight,
  User as UserIcon,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/order", label: "Orders", icon: ShoppingCart },
  { href: "/admin/product", label: "Products", icon: Package },
  { href: "/admin/user", label: "Users", icon: Users },
  { href: "/admin/offers", label: "Offers", icon: Tag },
  { href: "/admin/coupon", label: "Coupons", icon: Ticket },
  { href: "/admin/ledger", label: "Ledger", icon: BookText },
  { href: "/admin/circle", label: "Circle", icon: Circle },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    router.push("/login");
  };

  return (
    <div className="h-screen flex flex-col bg-[#F4F4F4] overflow-hidden font-sans">
      
      {/* --- MAIN TOP HEADER --- */}
      <header className="h-16 sticky top-0 z-[60] bg-[#800000] text-white flex items-center shadow-lg px-4 md:px-8">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <Logo className="text-white" disableLink />
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button className="hidden sm:flex p-2 rounded-full hover:bg-white/10 relative transition-colors">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full border-2 border-[#800000]"></span>
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-white text-[#800000] flex items-center justify-center font-bold text-sm">
                  A
                </div>
                <div className="hidden md:flex flex-col text-left leading-none pr-2">
                  <span className="text-xs font-bold text-white">Admin</span>
                  <span className="text-[10px] text-white/70 mt-1">Super Admin</span>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white border rounded-2xl shadow-2xl overflow-hidden z-[70] animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-4 bg-gray-50 border-b">
                    <p className="text-sm font-bold text-gray-900 leading-none">Administrator</p>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-tighter">Manage Account</p>
                  </div>
                  <div className="p-2 text-gray-700">
                    <button
                      onClick={() => { setProfileOpen(false); router.push("/admin/profile"); }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 rounded-xl transition"
                    >
                      <UserIcon className="w-4 h-4 text-gray-400" /> My Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* --- WRAPPER --- */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <aside
          className={cn(
            "fixed lg:static top-0 left-0 h-full w-64 bg-white border-r shadow-xl lg:shadow-none p-5 transition-all duration-300 z-[80] flex flex-col",
            open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="flex justify-between items-center mb-8 lg:hidden">
            <Logo className="text-[#800000]" />
            <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200",
                    active
                      ? "bg-[#800000] text-white shadow-md shadow-[#800000]/20"
                      : "text-gray-600 hover:bg-[#800000]/5 hover:text-[#800000]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-4 h-4", active ? "text-white" : "text-gray-400 group-hover:text-[#800000]")} />
                    {item.label}
                  </div>
                  {active && <ChevronRight className="w-3 h-3 opacity-60" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto p-4 bg-[#800000]/5 rounded-2xl border border-[#800000]/10">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[10px] font-bold text-[#800000] uppercase tracking-tighter italic">BajraBarahi Live</p>
             </div>
          </div>
        </aside>

        {/* MOBILE OVERLAY */}
        {open && (
          <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[70] lg:hidden" />
        )}

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 overflow-y-auto bg-[#F8F9FA] p-4 md:p-6 lg:p-8">
          {/* यहाँबाट टाइटल हटाइएको छ, अब सिधै children मात्र देखिनेछ।
              यो बक्सभित्र तपाइँको पेजको कन्टेन्ट सुरु हुनेछ। 
          */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm min-h-full transition-all duration-300">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}