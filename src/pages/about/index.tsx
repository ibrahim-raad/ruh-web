import { AboutHero } from "@/widgets/about/AboutHero";
import { Mission } from "@/widgets/about/Mission";
import { Values } from "@/widgets/about/Values";
import { WhyRuh } from "@/widgets/about/WhyRuh";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-24">
      <AboutHero />
      <section id="mission">
        <Mission />
      </section>
      <section id="values">
        <Values />
      </section>
      <section id="why-ruh">
        <WhyRuh />
      </section>
    </div>
  );
}
