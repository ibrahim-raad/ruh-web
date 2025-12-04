import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { MOCK_REFLECTIONS } from "./data";

export function ReflectionsWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Reflections</CardTitle>
        <CardDescription>
          Journal entries and mood logs shared by the patient.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {MOCK_REFLECTIONS.map((reflection) => (
            <div
              key={reflection.id}
              className="border-l-2 border-primary/20 pl-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">
                  {format(reflection.created_at, "EEEE, MMMM dd")}
                </span>
                <Badge variant="outline">{reflection.mood}</Badge>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "{reflection.content}"
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
