import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCreatePossibleAnswer,
  usePossibleAnswers,
} from "@/features/possible-answers/api/usePossibleAnswers";
import type { PossibleAnswer } from "@/features/possible-answers/types/possible-answer.types";
import { AnswerItem } from "./AnswerItem";

interface AnswerListProps {
  questionId: string;
}

export function AnswerList({ questionId }: AnswerListProps) {
  const [newAnswer, setNewAnswer] = useState("");
  const { data: answers, isLoading } = usePossibleAnswers({
    question_id: questionId,
    sort: "created_at ASC",
  });

  const createMutation = useCreatePossibleAnswer({
    onSuccess: () => setNewAnswer(""),
  });

  const handleAdd = () => {
    if (!newAnswer.trim()) return;
    createMutation.mutate({
      question_id: questionId,
      answer: newAnswer,
      order: (answers?.data?.length || 0) + 1,
    });
  };

  if (isLoading) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">Possible Answers</div>
      <div className="space-y-2">
        {answers?.data?.map((answer: PossibleAnswer) => (
          <AnswerItem key={answer.id} answer={answer} />
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Add an answer option..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
            if (e.key === " ") e.stopPropagation();
          }}
        />
        <Button
          onClick={handleAdd}
          disabled={!newAnswer.trim() || createMutation.isPending}
        >
          {createMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
