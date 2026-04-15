"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  const handleNext = () => setStep(2)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex bg-background">

      {/* ================= LEFT SIDE (ANIMATED) ================= */}
      <div
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&auto=format&fit=crop&q=60')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">

          {/* LOGO */}
          <Link
            href="/"
            className="flex flex-col leading-none animate-[fadeDown_0.8s_ease-out]"
          >
            <span className="font-serif font-bold text-3xl tracking-wide">
              BAJRABARAHI
            </span>

            <div className="flex items-center gap-2 my-2">
              <span className="w-10 h-[2px] bg-white"></span>
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span className="w-10 h-[2px] bg-white"></span>
            </div>

            <span className="text-[11px] tracking-[0.35em] text-white/80">
              BOOK SUPPLIERS
            </span>
          </Link>

          {/* TEXT */}
          <div className="max-w-md space-y-4">
            <h1 className="text-4xl font-bold font-serif leading-tight opacity-0 animate-[fadeUp_0.9s_ease-out_0.2s_forwards]">
              Join the <span className="text-red-400">Reading World</span>
            </h1>

            <p className="text-white/80 text-lg opacity-0 animate-[fadeUp_0.9s_ease-out_0.5s_forwards]">
              Create your account and explore thousands of books and authors.
            </p>
          </div>

          <p className="text-white/50 text-sm opacity-0 animate-[fadeUp_0.9s_ease-out_0.8s_forwards]">
            © {new Date().getFullYear()} Bajrabarahi Book
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="w-full bg-red-200 lg:w-1/2 flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-gray-200 backdrop-blur-2xl border border-border shadow-2xl rounded-3xl p-8">

          {/* LOGO */}
          <div className="text-center mb-6">
            <Link href="/" className="flex flex-col items-center">
              <span className="font-serif font-bold text-xl tracking-wide">
                BAJRABARAHI
              </span>

              <div className="flex items-center gap-2 my-1">
                <span className="w-8 h-[2px] bg-red-500"></span>
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                <span className="w-8 h-[2px] bg-red-500"></span>
              </div>

              <span className="text-[10px] tracking-[0.3em] text-muted-foreground">
                BOOK SUPPLIERS
              </span>
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleNext()
              }}
              className="space-y-4"
            >
              <Input
                placeholder="First Name"
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />

              <Input
                placeholder="Last Name"
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />

              <Input
                placeholder="Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <Button className="w-full bg-red hover:bg-red-dark text-white h-11 rounded-xl">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* PASSWORD */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-3 text-muted-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* TERMS */}
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={formData.agreeTerms}
                  onCheckedChange={(v) =>
                    setFormData({ ...formData, agreeTerms: Boolean(v) })
                  }
                />
                <span className="text-sm text-muted-foreground">
                  I agree to Terms & Privacy Policy
                </span>
              </div>

              {/* FIXED BUTTON LAYOUT */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="h-11 rounded-xl"
                >
                  Back
                </Button>

                <Button className="h-11 bg-red hover:bg-red-dark text-white rounded-xl">
                  Create
                </Button>
              </div>
            </form>
          )}

          {/* LOGIN LINK */}
          <p className="text-center text-sm mt-6 text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-red font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}