import { Card } from "@/components/ui/card";

const steps = [
  {
    step: "1",
    title: "Download & Sign Up",
    desc: "Get the app from the App Store or Google Play. Sign up in minutes with your email.",
  },
  {
    step: "2",
    title: "Find Your Therapist",
    desc: "Browse verified therapists, read profiles, and book your first session.",
  },
  {
    step: "3",
    title: "Attend Sessions",
    desc: "Join secure video calls directly in the app. No external tools needed.",
  },
  {
    step: "4",
    title: "Track Your Progress",
    desc: "Use guided journaling and reflections to monitor your emotional journey.",
  },
];

export function HowItWorksPatients() {
  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          The patient experience happens in the mobile app
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Use the app to manage sessions, messaging, and reflections. For
          privacy and ease, sign-up happens in-app.
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
