import { LoginForm } from "@/widgets/auth/LoginForm";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { ArrowLeft, Heart, Shield, Sparkles, Users } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center px-8 py-12 lg:px-16">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Welcome back
              </h1>
              <p className="text-base text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>
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

      {/* Right Side - Visual Elements */}
      <div className="hidden lg:flex items-center justify-center bg-linear-to-br from-[#294C7A] to-[#A9C7E8] p-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-lg space-y-12">
          {/* Hero Text */}
          <div className="space-y-4 text-white">
            <h2 className="text-4xl font-bold leading-tight">
              Healing through reflection and connection
            </h2>
            <p className="text-lg text-white/80">
              Connect with trusted therapists and track your journey in a calm,
              secure space.
            </p>
          </div>

          {/* Floating Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="group bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Shield className="h-8 w-8 text-white mb-3" />
              <h3 className="text-white font-semibold mb-1">
                Secure & Private
              </h3>
              <p className="text-white/70 text-sm">
                Your data is encrypted and protected
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Heart className="h-8 w-8 text-white mb-3" />
              <h3 className="text-white font-semibold mb-1">Human-Centered</h3>
              <p className="text-white/70 text-sm">
                Designed with care and empathy
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Sparkles className="h-8 w-8 text-white mb-3" />
              <h3 className="text-white font-semibold mb-1">Simple & Clear</h3>
              <p className="text-white/70 text-sm">
                No clutter, just what matters
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Users className="h-8 w-8 text-white mb-3" />
              <h3 className="text-white font-semibold mb-1">Trusted Care</h3>
              <p className="text-white/70 text-sm">
                Verified, licensed therapists
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
