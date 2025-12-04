import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import { MOCK_SESSIONS } from "./data";

export function SessionsWidget() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Sessions History</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {MOCK_SESSIONS.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Video className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{session.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(session.date, "PPP p")} • {session.duration}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    session.status === "COMPLETED" ? "secondary" : "default"
                  }
                >
                  {session.status}
                </Badge>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
