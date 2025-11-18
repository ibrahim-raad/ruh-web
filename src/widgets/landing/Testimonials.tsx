import { Card } from "@/components/ui/card";

const testimonials = [
  {
    author: "Amira",
    role: "Patient",
    quote: "The guided reflection helped me slow down and find clarity.",
  },
  {
    author: "Yusuf",
    role: "Patient",
    quote: "Connecting with a therapist felt effortless and supportive.",
  },
  {
    author: "Dr. Khan",
    role: "Therapist",
    quote: "The platform lets me focus on care — not admin.",
  },
];

export function Testimonials() {
  return (
    <div className="rounded-none md:rounded-xl bg-[#EADFCB]/40 py-10 px-4">
      <section className="mx-auto max-w-7xl space-y-4">
        <h2 className="text-xl font-semibold">What people say</h2>
        <p className="text-sm text-muted-foreground">
          Stories of calm and connection.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.author} className="p-4 space-y-1">
              <div className="text-sm font-medium">{t.author}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
              <p className="text-sm">{t.quote}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
