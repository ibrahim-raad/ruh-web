import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";

export function TherapistsHero() {
  return (
    <section className="grid items-center gap-10 md:grid-cols-2">
      <div className="order-2 md:order-1 space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-primary">
            For Therapists
          </h1>
          <p className="text-lg md:text-xl text-foreground/90">
            Manage sessions, video calls, and earnings from a calm, web-based
            dashboard designed to keep you focused on care.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to={ROUTES.THERAPIST.APPLY}>Join as Therapist</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to={ROUTES.AUTH.LOGIN}>Sign In</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="order-1 md:order-2">
        <div className="relative rounded-xl border shadow-2xl overflow-hidden bg-muted/20">
          <div className="aspect-video w-full bg-linear-to-br from-[#294C7A]/60 to-[#A9C7E8]/60 flex items-center justify-center">
            <img
              src="/therapist_preview.png"
              alt="Therapist Dashboard Preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
