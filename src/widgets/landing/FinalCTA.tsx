import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function FinalCTA() {
  return (
    <section className="text-center space-y-4">
      <h2 className="text-xl md:text-2xl font-bold text-primary">
        Begin your journey toward clarity and peace.
      </h2>
      <div className="flex items-center justify-center gap-3">
        <Button asChild variant="secondary">
          <Link to="/auth/register?role=patient">Join as Patient</Link>
        </Button>
        <Button asChild>
          <Link to="/therapist/apply">Join as Therapist</Link>
        </Button>
      </div>
    </section>
  );
}
