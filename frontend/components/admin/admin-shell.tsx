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
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/order", label: "Orders", icon: ShoppingCart },
  { href: "/admin/product", label: "Products", icon: Package },
  { href: "/admin/user", label: "Users", icon: Users },
  { href: "/admin/ledger", label: "Ledger", icon: BookText },
  { href: "/admin/circle", label: "Circle", icon: Circle },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // LOGOUT
  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/login");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-[#800000] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-white/20"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Logo className="text-white" disableLink />
          </div>

          {/* RIGHT PROFILE */}
          <div className="relative" ref={dropdownRef}>

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 hover:bg-white/10 px-3 py-1.5 rounded-full transition"
            >
              <div className="w-8 h-8 rounded-full bg-white text-[#800000] flex items-center justify-center font-bold text-sm">
                A
              </div>

              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-sm font-medium">Admin</span>
                <span className="text-xs opacity-80">Super Admin</span>
              </div>
            </button>

            {/* DROPDOWN */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-xl shadow-lg border overflow-hidden z-50">

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    router.push("/admin/profile");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* MOBILE OVERLAY */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={cn(
            "fixed lg:static top-0 left-0 h-screen w-64 bg-white border shadow-lg p-4 overflow-y-auto transition-transform z-50",
            open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <Logo disableLink />
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition",
                    active
                      ? "bg-[#800000] text-white"
                      : "text-gray-600 hover:bg-[#800000]/10 hover:text-[#800000]"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white border rounded-2xl shadow-sm p-6 min-h-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}