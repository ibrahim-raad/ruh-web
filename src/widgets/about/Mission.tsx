import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export function Mission() {
  return (
    <section className="grid items-center gap-10 md:grid-cols-2">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Our mission
        </h2>
        <div className="space-y-3 text-base md:text-lg text-foreground/90 leading-relaxed">
          <p>
            Ruh Therapy connects therapists and patients to promote healing
            through reflection and continuous care.
          </p>
          <p>
            We believe in calm, trusted spaces where progress grows through
            connection.
          </p>
        </div>
      </div>

      <div className="relative">
        <Card className="p-8 bg-linear-to-br from-[#A9C7E8]/20 to-[#EADFCB]/20 border-none">
          <div className="flex items-center justify-center h-64">
            <MessageCircle
              className="h-32 w-32 text-primary/40"
              strokeWidth={1.5}
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
