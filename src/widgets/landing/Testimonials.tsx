import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    author: "Amira",
    role: "Patient",
    quote: "The guided reflection helped me slow down and find clarity.",
  },
  {
    author: "Yusuf",
    role: "Patient",
    quote: "Connecting with a therapist felt effortless and supportive.",
  },
  {
    author: "Dr. Khan",
    role: "Therapist",
    quote: "The platform lets me focus on care — not admin.",
  },
];

export function Testimonials() {
  return (
    <div className="rounded-none md:rounded-xl bg-accent/40 dark:bg-accent/20 py-16 px-4">
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            What people say
          </h2>
          <p className="text-base text-muted-foreground">
            Stories of calm and connection.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t.author}
              className="group relative p-6 space-y-4 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-background/95 backdrop-blur"
            >
              <Quote className="h-8 w-8 text-primary/40 group-hover:text-primary/60 transition-colors" />
              <p className="text-sm leading-relaxed italic text-foreground/90">
                "{t.quote}"
              </p>
              <div className="pt-2 border-t">
                <div className="text-base font-semibold text-foreground">
                  {t.author}
                </div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
