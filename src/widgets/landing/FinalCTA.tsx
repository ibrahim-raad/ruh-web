import { Button } from "@/components/ui/button";
import { ROUTES } from "@/shared/config/routes";
import { Link } from "react-router-dom";

export function FinalCTA() {
  return (
    <section className="text-center space-y-4">
      <h2 className="text-xl md:text-2xl font-bold text-primary">
        Begin your journey toward clarity and peace.
      </h2>
      <div className="flex items-center justify-center gap-3">
        <Button asChild variant="secondary">
          <Link
            to={ROUTES.FOR_PATIENTS}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Join as Patient
          </Link>
        </Button>
        <Button asChild>
          <Link to={ROUTES.THERAPIST.ONBOARDING.ROOT}>Join as Therapist</Link>
        </Button>
      </div>
    </section>
  );
}
