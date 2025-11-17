import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-3xl py-10 px-4 text-center">
      <h1 className="text-3xl font-bold">Ruh Therapy</h1>
      <p className="text-muted-foreground mt-2">
        Intelligent Tele-Therapy Platform
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button asChild>
          <Link to="/admin/overview">Go to Admin</Link>
        </Button>
      </div>
    </div>
  );
}
