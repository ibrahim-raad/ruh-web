import { Card } from "@/components/ui/card";
import {
  Video,
  MessageCircle,
  BookOpen,
  Calendar,
  Shield,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Book Sessions",
    desc: "Find and book sessions with verified therapists based on your needs and schedule.",
  },
  {
    icon: Video,
    title: "Secure Video Calls",
    desc: "Join private, encrypted video sessions from anywhere with high-quality audio and video.",
  },
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    desc: "Message your therapist securely between sessions for continued support.",
  },
  {
    icon: BookOpen,
    title: "Guided Journaling",
    desc: "Track your emotions and reflections with private, structured journaling tools.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    desc: "Your data is encrypted and protected. We never share your personal information.",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    desc: "Get gentle reminders for upcoming sessions, journal entries, and exercises.",
  },
];

export function PatientsFeatures() {
  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          Everything you need for your journey
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Our mobile app provides a complete, private space for your mental
          health care.
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
