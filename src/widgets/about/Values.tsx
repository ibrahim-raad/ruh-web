import { Card } from "@/components/ui/card";
import { Shield, Heart, Sparkles, Users } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Privacy First",
    desc: "Your data is encrypted and protected. We never share personal information without explicit consent.",
  },
  {
    icon: Heart,
    title: "Human-Centered",
    desc: "Every feature is designed with care, empathy, and respect for the therapeutic relationship.",
  },
  {
    icon: Sparkles,
    title: "Simple & Clear",
    desc: "No complexity, no clutter. Just the tools you need to focus on healing and growth.",
  },
  {
    icon: Users,
    title: "Connection Matters",
    desc: "We believe progress happens through consistent, trusted relationships between patients and therapists.",
  },
];

export function Values() {
  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Our values
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          The principles that guide everything we build.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {values.map((value) => (
          <Card
            key={value.title}
            className="p-6 space-y-3 hover:shadow-lg transition-shadow"
          >
            <value.icon className="h-10 w-10 text-primary" />
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.desc}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
