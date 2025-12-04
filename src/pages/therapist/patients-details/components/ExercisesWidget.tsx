import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, CheckCircle2, Circle } from "lucide-react";
import { format } from "date-fns";
import { MOCK_EXERCISES } from "./data";

export function ExercisesWidget() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Assigned Exercises</CardTitle>
          <Button>
            <Dumbbell className="mr-2 h-4 w-4" />
            Assign Exercise
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_EXERCISES.map((exercise) => (
            <div
              key={exercise.id}
              className="flex items-start justify-between border p-4 rounded-lg"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{exercise.title}</h4>
                  <Badge
                    variant={
                      exercise.status === "COMPLETED" ? "secondary" : "outline"
                    }
                  >
                    {exercise.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {exercise.description}
                </p>
                <p className="text-xs text-muted-foreground pt-2">
                  Assigned: {format(exercise.assigned_at, "MMM dd, yyyy")}
                </p>
              </div>
              {exercise.status === "COMPLETED" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
