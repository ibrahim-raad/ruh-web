import { Hero } from "@/widgets/landing/Hero";
import { HowItWorks } from "@/widgets/landing/HowItWorks";
import { PracticeBanner } from "@/widgets/landing/PracticeBanner";
import { ProductPreview } from "@/widgets/landing/ProductPreview";
import { Testimonials } from "@/widgets/landing/Testimonials";
import { FinalCTA } from "@/widgets/landing/FinalCTA";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { UserRole } from "@/features/users/types/user.types";

export default function LandingPage() {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user) {
    switch (user.role) {
      case UserRole.ADMIN:
        return <Navigate to={ROUTES.ADMIN.ADMINS} replace />;
      case UserRole.THERAPIST:
        return <Navigate to={ROUTES.THERAPIST.DASHBOARD} replace />;
      case UserRole.PATIENT:
        return <Navigate to={ROUTES.DOWNLOAD_APP} replace />;
      default:
        return <Navigate to={ROUTES.HOME} replace />;
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-16 py-10 space-y-24">
      <Hero />
      <section id="how">
        <HowItWorks />
      </section>
      <section id="practice">
        <PracticeBanner />
      </section>
      <section id="product">
        <ProductPreview />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <FinalCTA />
    </div>
  );
}
