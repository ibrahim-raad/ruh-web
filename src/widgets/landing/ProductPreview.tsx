import { Card } from "@/components/ui/card";

export function ProductPreview() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          Product Preview
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl">
          Experience a platform designed with care. Simple interfaces for
          patients and therapists, built to keep the focus on what matters —
          healing and connection.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card className="p-6 flex items-center justify-center overflow-hidden bg-muted/20">
          <img
            src="/therapist_preview.png"
            alt="Therapist dashboard preview"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </Card>

        <Card className="p-6 flex items-center justify-center overflow-hidden bg-muted/20">
          <img
            src="/app_preview.png"
            alt="Patient mobile app preview"
            className="h-full max-h-96 w-auto rounded-2xl shadow-lg"
          />
        </Card>
      </div>
    </section>
  );
}
