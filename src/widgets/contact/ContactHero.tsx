import { Linkedin, Instagram } from "lucide-react";

export function ContactHero() {
  return (
    <div className="space-y-6 sticky top-24">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Contact</h1>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Support email:</p>
          <a
            href="mailto:support@ruhtherapy.com"
            className="text-base text-primary hover:underline font-medium"
          >
            support@ruhtherapy.com
          </a>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <a
          href="https://linkedin.com" // TODO: Add LinkedIn link
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-10 w-10 rounded-md border hover:bg-accent transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="https://instagram.com" // TODO: Add Instagram link
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-10 w-10 rounded-md border hover:bg-accent transition-colors"
          aria-label="Instagram"
        >
          <Instagram className="h-5 w-5" />
        </a>
      </div>

      <div className="pt-4 border-t">
        <p className="text-sm text-muted-foreground leading-relaxed">
          We respect your privacy. Your information is handled with care and
          never shared without consent.
        </p>
      </div>
    </div>
  );
}
