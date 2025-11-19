import { LoginForm } from "@/widgets/auth/LoginForm";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-[1.2fr_1fr]">
      {/* Left Side - Visual Art */}
      <div className="hidden lg:block relative overflow-hidden bg-linear-to-br from-primary via-chart-4 to-secondary">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0">
          {/* Large circles */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#EADFCB]/20 rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center px-16 py-20">
          <div className="space-y-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Ruh Therapy"
                  className="h-16 brightness-0 invert"
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Empowering your practice
                </h2>
                <p className="text-xl text-white/80 max-w-lg">
                  A professional dashboard designed for therapists and
                  administrators to focus on care, not administration.
                </p>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              <div className="group flex items-start gap-4 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    Streamlined Management
                  </h3>
                  <p className="text-white/70 text-sm">
                    Manage appointments, sessions, and patient records all in
                    one place
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    AI Session Summaries
                  </h3>
                  <p className="text-white/70 text-sm">
                    Automatic session notes and insights to save you time
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    Payment Tracking
                  </h3>
                  <p className="text-white/70 text-sm">
                    Track earnings, invoices, and get paid securely per session
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center px-8 py-12 lg:px-16 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo (mobile only) */}
          <Link to={ROUTES.HOME} className="inline-block lg:hidden">
            <img src="/logo.png" alt="Ruh Therapy" className="h-16" />
          </Link>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Welcome back
            </h1>
            <p className="text-lg text-muted-foreground">
              Sign in to continue your journey
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Back to Home Link */}
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
