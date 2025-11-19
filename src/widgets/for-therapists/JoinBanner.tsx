import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Verified, secure platform",
  "Flexible scheduling",
  "Transparent pricing",
  "Admin-free workflow",
];

export function JoinBanner() {
  return (
    <Card className="p-8 md:p-12 bg-linear-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Empower your practice through connection.
          </h2>
          <p className="text-base text-muted-foreground">
            Join a platform designed to help you focus on care, not
            administration.
          </p>
          <ul className="space-y-2">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-2 text-sm text-foreground"
              >
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="shrink-0">
          <Button asChild size="lg">
            <Link to={ROUTES.THERAPIST.APPLY}>Join as Therapist</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
