import { Card } from "@/components/ui/card";

const steps = [
  {
    step: "1",
    title: "Apply & Get Verified",
    desc: "Submit your credentials and certification. Our team reviews and approves qualified therapists.",
  },
  {
    step: "2",
    title: "Set Your Availability",
    desc: "Choose when you're available. Patients book sessions within your open time slots.",
  },
  {
    step: "3",
    title: "Host Sessions",
    desc: "Conduct secure video sessions directly from the web dashboard. Chat and notes included.",
  },
  {
    step: "4",
    title: "Track & Get Paid",
    desc: "Monitor earnings, view analytics, and receive payouts on a regular schedule.",
  },
];

export function HowItWorksTherapists() {
  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          Start your practice in four simple steps
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Join a platform designed to help you focus on care, not
          administration.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <Card key={s.step} className="p-6 space-y-3 relative overflow-hidden">
            <div className="relative space-y-2">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary font-bold text-lg">
                {s.step}
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
