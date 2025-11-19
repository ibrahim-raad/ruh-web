import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Therapy, simplified",
    desc: "Find a therapist that suits your needs and schedule secure sessions—designed to feel effortless and human.",
  },
  {
    title: "Journaling that supports you",
    desc: "Daily reflections help you track emotions and notice patterns over time, fostering calm and clarity.",
  },
];

export function WhyRuh() {
  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Why Ruh Therapy?
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          We're different because we focus on what truly matters: your journey.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="p-8 space-y-3 bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              {feature.title}
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              {feature.desc}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
