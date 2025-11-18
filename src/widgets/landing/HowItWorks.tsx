import { Card } from "@/components/ui/card";
import { LucideSearch, NotebookText, Sprout } from "lucide-react";

const steps = [
  {
    icon: LucideSearch,
    title: "Connect",
    desc: "Find the right therapist through thoughtful matching.",
  },
  {
    icon: NotebookText,
    title: "Reflect",
    desc: "Track emotions and journal privately, every day.",
  },
  {
    icon: Sprout,
    title: "Grow",
    desc: "Continue your journey with gentle guidance.",
  },
];

export function HowItWorks() {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold text-primary">How it works</h2>
      <p className="text-muted-foreground">
        Simple steps designed for clarity and care.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <Card key={s.title} className="p-4">
            <div className="bg-secondary/80 rounded-xl p-3 w-fit mb-4">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-start gap-3">
              <div>
                <div className="font-large font-bold mb-2">{s.title}</div>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
