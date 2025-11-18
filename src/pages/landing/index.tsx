import { Hero } from "@/widgets/landing/Hero";
import { HowItWorks } from "@/widgets/landing/HowItWorks";

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-7xl px-16 py-10 space-y-24">
      <Hero />
      <section id="how">
        <HowItWorks />
      </section>
    </div>
  );
}
