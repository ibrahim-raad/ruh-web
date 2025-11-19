import { TherapistsHero } from "@/widgets/for-therapists/TherapistsHero";
import { TherapistsFeatures } from "@/widgets/for-therapists/TherapistsFeatures";
import { HowItWorksTherapists } from "@/widgets/for-therapists/HowItWorksTherapists";
import { JoinBanner } from "@/widgets/for-therapists/JoinBanner";

export default function ForTherapistsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-24">
      <TherapistsHero />
      <section id="features">
        <TherapistsFeatures />
      </section>
      <section id="how-it-works">
        <HowItWorksTherapists />
      </section>
      <section id="join">
        <JoinBanner />
      </section>
    </div>
  );
}
