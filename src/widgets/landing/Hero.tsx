import { Button } from "@/components/ui/button";
import { ROUTES } from "@/shared/config/routes";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="grid items-center gap-10 md:grid-cols-2">
      <div className="order-2 md:order-1">
        <div className="aspect-4/3 rounded-xl border shadow-sm bg-linear-to-br to-accent from-secondary">
          <img
            src="/logo.png"
            alt="Logo Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="order-1 md:order-2 space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-primary">
          Healing the soul through reflection and connection.
        </h1>
        <p className="text-muted-foreground">
          Ruh Therapy helps you connect with trusted therapists and find calm
          through guided reflection.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link
              to={ROUTES.FOR_PATIENTS}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Start Your Journey
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to={ROUTES.THERAPIST.ONBOARDING.ROOT}>Join as Therapist</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
