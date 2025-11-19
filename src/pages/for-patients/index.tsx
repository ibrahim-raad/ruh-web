import { PatientsHero } from "@/widgets/for-patients/PatientsHero";
import { PatientsFeatures } from "@/widgets/for-patients/PatientsFeatures";
import { HowItWorksPatients } from "@/widgets/for-patients/HowItWorksPatients";
import { AppDownloadBanner } from "@/widgets/for-patients/AppDownloadBanner";

export default function ForPatientsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-24">
      <PatientsHero />
      <section id="features">
        <PatientsFeatures />
      </section>
      <section id="how-it-works">
        <HowItWorksPatients />
      </section>
      <section id="download">
        <AppDownloadBanner />
      </section>
    </div>
  );
}
