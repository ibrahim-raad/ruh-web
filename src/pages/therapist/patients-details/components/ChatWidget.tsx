import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { format } from "date-fns";
import { MOCK_MESSAGES } from "./data";
import type { TherapyCase } from "@/features/therapy-cases/types/therapy-case.types";

interface ChatWidgetProps {
  therapyCase: TherapyCase;
}

export function ChatWidget({ therapyCase }: ChatWidgetProps) {
  const [messageInput, setMessageInput] = useState("");

  return (
    <Card className="flex-1 flex flex-col h-full min-h-[500px]">
      <CardHeader className="border-b py-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-bold">
              {therapyCase.patient.user.full_name.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-sm">
              {therapyCase.patient.user.full_name}
            </p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {MOCK_MESSAGES.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "therapist"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "therapist"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-[10px] opacity-70 block mt-1">
                    {format(message.timestamp, "h:mm a")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t flex gap-2">
          <Input
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1"
          />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
