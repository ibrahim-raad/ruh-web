import { Hero } from "@/widgets/landing/Hero";
import { HowItWorks } from "@/widgets/landing/HowItWorks";
import { PracticeBanner } from "@/widgets/landing/PracticeBanner";
import { ProductPreview } from "@/widgets/landing/ProductPreview";
import { Testimonials } from "@/widgets/landing/Testimonials";
import { FinalCTA } from "@/widgets/landing/FinalCTA";

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-7xl px-16 py-10 space-y-24">
      <Hero />
      <section id="how">
        <HowItWorks />
      </section>
      <section id="practice">
        <PracticeBanner />
      </section>
      <section id="product">
        <ProductPreview />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <FinalCTA />
    </div>
  );
}
