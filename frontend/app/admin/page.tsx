import Link from "next/link";
import { BookOpen, CircleDot, Package, Receipt, Users } from "lucide-react";

import AdminShell from "@/components/admin/admin-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  {
    href: "/admin/order",
    title: "Orders",
    value: "12",
    description: "Manage customer orders",
    icon: Receipt,
  },
  {
    href: "/admin/product",
    title: "Products",
    value: "38",
    description: "Books, pricing & stock",
    icon: Package,
  },
  {
    href: "/admin/user",
    title: "Users",
    value: "142",
    description: "Roles, profiles & access",
    icon: Users,
  },
  {
    href: "/admin/ledger",
    title: "Ledger",
    value: "58",
    description: "Transactions & activity",
    icon: BookOpen,
  },
  {
    href: "/admin/circle",
    title: "Circle",
    value: "7",
    description: "Clubs & memberships",
    icon: CircleDot,
  },
];

export default function AdminOverviewPage() {
  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Admin Dashboard
          </h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-2xl">
            Monitor operations, manage data, and control your system from a
            single place.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {stats.map((s) => {
            const Icon = s.icon;

            return (
              <Link key={s.href} href={s.href} className="group">
                <Card className="h-full border border-gray-200 hover:border-[#800000] transition-all duration-200 hover:shadow-lg rounded-2xl">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start justify-between">
                      {/* Icon */}
                      <div className="w-11 h-11 rounded-xl bg-[#800000]/10 text-[#800000] flex items-center justify-center group-hover:bg-[#800000] group-hover:text-white transition">
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Value */}
                      <div className="text-right">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                          {s.value}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-1">
                      <div className="text-sm font-semibold text-gray-800">
                        {s.title}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 leading-snug">
                        {s.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Navigation */}
        <Card className="rounded-2xl border-gray-200">
          <CardContent className="p-5 sm:p-6 space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Quick Actions
              </h2>
              <p className="text-sm text-gray-500">
                Jump directly to any admin module
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {stats.map((s) => (
                <Link key={s.href} href={s.href}>
                  <Button
                    variant="outline"
                    className="rounded-xl border-gray-300 hover:border-[#800000] hover:text-[#800000] text-sm"
                  >
                    {s.title}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Activity */}
          <Card className="rounded-2xl border-gray-200">
            <CardContent className="p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>

              <div className="space-y-3">
                {[
                  ["New order placed", "2 min ago"],
                  ["User registered", "15 min ago"],
                  ["Product updated", "1 hour ago"],
                  ["Circle meeting scheduled", "3 hours ago"],
                ].map(([title, time]) => (
                  <div
                    key={title}
                    className="flex items-center justify-between py-3 border-b last:border-none"
                  >
                    <span className="text-sm text-gray-700">{title}</span>
                    <span className="text-xs text-gray-400">{time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="rounded-2xl border-gray-200">
            <CardContent className="p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                System Status
              </h3>

              <div className="space-y-3">
                {[
                  "API Services",
                  "Database",
                  "Payment Gateway",
                  "Email Service",
                ].map((service) => (
                  <div
                    key={service}
                    className="flex items-center justify-between py-3 border-b last:border-none"
                  >
                    <span className="text-sm text-gray-700">{service}</span>

                    <span className="px-2 py-1 text-xs rounded-full bg-green-50 text-green-600 border border-green-200">
                      Operational
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
