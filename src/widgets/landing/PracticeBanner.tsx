import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PracticeBanner() {
  return (
    <section className="rounded-xl border shadow-sm p-12 bg-linear-to-r from-[#A9C7E8] to-[#EADFCB]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-3xl font-bold text-primary">
            Empower your practice through connection.
          </div>
          <p className="text-muted-foreground">
            Join a platform designed to help you focus on care, not
            administration.
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link to="/therapist/apply">Join as Therapist</Link>
        </Button>
      </div>
    </section>
  );
}
