import { ContactHero } from "@/widgets/contact/ContactHero";
import { ContactForm } from "@/widgets/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-[1fr_2fr] items-start">
        <ContactHero />
        <ContactForm />
      </div>
    </div>
  );
}
