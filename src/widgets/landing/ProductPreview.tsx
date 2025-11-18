import { Card } from "@/components/ui/card";

export function ProductPreview() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Product Preview</h2>
      <p className="text-sm text-muted-foreground">Simple. Private. Human.</p>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card className="p-4 space-y-3">
          <div className="h-4 w-28 bg-muted rounded" />
          <div className="h-32 rounded bg-muted" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-16 rounded bg-linear-to-r from-[#EADFCB] to-[#A9C7E8]" />
            <div className="h-16 rounded bg-muted" />
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-center">
          <div className="h-64 w-36 rounded-xl border shadow-sm bg-linear-to-b from-[#A9C7E8] to-[#EADFCB]" />
        </Card>
      </div>
    </section>
  );
}
