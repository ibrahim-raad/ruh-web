import { Card } from "@/components/ui/card";
import {
  Calendar,
  Video,
  DollarSign,
  Users,
  Clock,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    desc: "Set your own availability and manage appointments with ease. Patients book within your open slots.",
  },
  {
    icon: Video,
    title: "Integrated Video Sessions",
    desc: "Host secure, high-quality video sessions directly from the dashboard. No extra tools needed.",
  },
  {
    icon: DollarSign,
    title: "Transparent Earnings",
    desc: "Track income per session and view payouts. Simple, predictable pricing for your services.",
  },
  {
    icon: Users,
    title: "Patient Management",
    desc: "View patient profiles, session history, and notes in one organized place.",
  },
  {
    icon: Clock,
    title: "Session Summaries",
    desc: "AI-powered summaries help you review key points and maintain continuity of care.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    desc: "Monitor your practice with session counts, patient retention, and engagement metrics.",
  },
];

export function TherapistsFeatures() {
  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          Everything you need to focus on care
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Our web dashboard streamlines admin tasks so you can spend more time
          with patients.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group p-6 space-y-3 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <feature.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
