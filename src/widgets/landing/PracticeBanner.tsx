import { Button } from "@/components/ui/button";
import { ROUTES } from "@/shared/config/routes";
import { Link } from "react-router-dom";

export function PracticeBanner() {
  return (
    <section className="rounded-xl border shadow-sm p-8 md:p-12 bg-linear-to-r from-secondary/60 to-accent/60 dark:from-secondary/40 dark:to-accent/40">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-xl space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-primary leading-tight">
            Empower your practice through connection.
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Join a platform designed to help you focus on care, not
            administration.
          </p>
        </div>
        <Button asChild variant="secondary" size="lg" className="shrink-0">
          <Link to={ROUTES.THERAPIST.ONBOARDING.ROOT}>Join as Therapist</Link>
        </Button>
      </div>
    </section>
  );
}
