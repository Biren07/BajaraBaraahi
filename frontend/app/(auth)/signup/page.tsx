"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import authService from "@/services/authService"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to terms"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep2()) return

    setIsLoading(true)
    setErrors({})

    try {
      await authService.register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone,
        formData.password
      )
      router.push("/login")
    } catch (err: any) {
      setErrors({ general: err.response?.data?.message || 'Registration failed' })
    } finally {
      setIsLoading(false)
    }
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
              <div>
                <Input
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <Input
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <Input
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Input
                  placeholder="Phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>

              <Button className="w-full bg-red hover:bg-red-dark text-white h-11 rounded-xl">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">

              {errors.general && (
                <p className="text-xs text-red-500">{errors.general}</p>
              )}

              {/* PASSWORD */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
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
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
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
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                )}
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
                {errors.agreeTerms && (
                  <p className="text-xs text-red-500 mt-1">{errors.agreeTerms}</p>
                )}
              </div>

              {/* FIXED BUTTON LAYOUT */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="h-11 rounded-xl"
                  disabled={isLoading}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  className="h-11 bg-red hover:bg-red-dark text-white rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create"}
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

