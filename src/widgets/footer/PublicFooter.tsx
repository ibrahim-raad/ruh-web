import { Link } from "react-router-dom";

export function PublicFooter() {
  return (
    <footer id="contact" className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-3">
        <div className="space-y-2">
          <img src="/logo.png" alt="ruh therapy" className="h-6" />
          <p className="text-sm text-muted-foreground">
            Healing the soul through reflection and connection.
          </p>
        </div>
        <div className="text-sm space-y-2">
          <div className="font-medium">Quick Links</div>
          <div className="grid gap-1">
            <Link
              to="/#how"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              to="/#how"
              className="text-muted-foreground hover:text-foreground"
            >
              For Patients
            </Link>
            <Link
              to="/#practice"
              className="text-muted-foreground hover:text-foreground"
            >
              For Therapists
            </Link>
            <Link
              to="/#contact"
              className="text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ruh Therapy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
