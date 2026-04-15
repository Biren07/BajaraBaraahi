"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Chrome
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validateForm = () => {
    const newErrors: any = {}
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsLoading(false)

    router.push("/")
  }

  return (
    <div className="min-h-screen flex bg-background overflow-hidden">

      {/* ================= LEFT SIDE ================= */}
      <div
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1600&auto=format&fit=crop&q=60')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col justify-between p-14 text-white">

          {/* LOGO */}
          <Link href="/" className="flex flex-col leading-none">
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

          {/* ANIMATED TEXT */}
          <div className="max-w-md space-y-4">
            <h1
              className={`text-4xl font-bold font-serif transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Welcome Back <span className="text-red-400">Book Lover</span>
            </h1>

            <p
              className={`text-white/80 text-lg transition-all duration-700 delay-150 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Sign in to continue your reading journey, manage your books, and
              explore curated recommendations.
            </p>

            <div
              className={`flex gap-6 transition-all duration-700 delay-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div>
                <p className="text-3xl font-bold text-red-400">50K+</p>
                <p className="text-sm text-white/70">Books</p>
              </div>

              <div className="h-12 w-px bg-white/20" />

              <div>
                <p className="text-3xl font-bold text-red-400">10K+</p>
                <p className="text-sm text-white/70">Authors</p>
              </div>

              <div className="h-12 w-px bg-white/20" />

              <div>
                <p className="text-3xl font-bold text-red-400">100K+</p>
                <p className="text-sm text-white/70">Readers</p>
              </div>
            </div>
          </div>

          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Bajrabarahi Book
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="w-full bg-red-200 lg:w-1/2 flex items-center justify-center p-6">

        {/* GLASS CARD */}
        <div className="w-full max-w-md bg-gray-200 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-8">

          {/* LOGO */}
          <Link href="/" className="flex flex-col items-center leading-none mb-6">
            <span className="font-serif font-bold text-xl md:text-2xl tracking-wider text-black">
              BAJRABARAHI
            </span>

            <div className="flex items-center gap-1 my-[2px]">
              <span className="w-8 h-[2px] bg-black"></span>
              <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
              <span className="w-8 h-[2px] bg-black"></span>
            </div>

            <span className="text-[10px] tracking-[0.25em] text-black/70">
              BOOK SUPPLIERS
            </span>
          </Link>

          <h2 className="text-3xl font-serif font-bold text-center mb-6">
            Sign In
          </h2>

          {/* GOOGLE */}
          <Button
            variant="outline"
            className="w-full h-11 flex items-center gap-2 hover:bg-red-200 hover:border-red"
          >
            <Chrome className="w-5 h-5" />
            Continue with Google
          </Button>

          {/* DIVIDER */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px bg-border flex-1" />
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  className="pl-9 h-11"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium">Password</label>

              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />

                <Input
                  type={showPassword ? "text" : "password"}
                  className="pl-9 pr-9 h-11"
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
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* REMEMBER */}
            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.rememberMe}
                onCheckedChange={(val) =>
                  setFormData({ ...formData, rememberMe: Boolean(val) })
                }
              />
              <span className="text-sm text-muted-foreground">
                Remember me
              </span>
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-red hover:bg-red-dark text-white font-semibold flex items-center justify-center gap-2"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          {/* SIGNUP */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-red font-semibold">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}