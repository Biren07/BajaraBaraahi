"use client";


import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Clock, Rocket, Sparkles, Globe } from "lucide-react";
import AdminShell from "@/components/admin/admin-shell";

export default function Deployment() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">

   <AdminShell>

      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7a0f1e]/10 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7a0f1e]/10 blur-3xl rounded-full" />
      </div>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center px-4 relative">

        <div className="text-center max-w-2xl">

          {/* ICON */}
          <div className="relative mx-auto w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full bg-[#7a0f1e]/10 animate-ping" />
            <div className="relative w-24 h-24 rounded-full bg-[#7a0f1e]/10 flex items-center justify-center">
              <Rocket className="w-10 h-10 text-[#7a0f1e] animate-bounce" />
            </div>
          </div>

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#7a0f1e]/10 text-[#7a0f1e] text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Deployment Phase
          </div>

          {/* TITLE */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            We’re Going <span className="text-[#7a0f1e]">Live Soon</span>
          </h1>

          {/* SUBTEXT */}
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Our bookstore platform is currently being deployed to production.
            We are optimizing performance, security, and user experience to
            deliver something exceptional.
          </p>

          {/* STATUS BOX */}
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground mb-10">
            <Clock className="w-4 h-4 text-[#7a0f1e]" />
            <span>Deployment in progress...</span>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">

            <div className="p-4 rounded-xl border bg-card text-left">
              <Rocket className="w-5 h-5 text-[#7a0f1e] mb-2" />
              <h3 className="font-semibold">Optimized Build</h3>
              <p className="text-sm text-muted-foreground">
                Fast and production-ready deployment setup.
              </p>
            </div>

            <div className="p-4 rounded-xl border bg-card text-left">
              <Globe className="w-5 h-5 text-[#7a0f1e] mb-2" />
              <h3 className="font-semibold">Global Access</h3>
              <p className="text-sm text-muted-foreground">
                Available worldwide once deployment is complete.
              </p>
            </div>
          </div>
          {/* FOOTNOTE */}
          <p className="text-xs text-muted-foreground mt-6">
            Thank you for your patience — we’re building something amazing.
          </p>

        </div>
      </main>
       </AdminShell>
    </div>
   
  );
}