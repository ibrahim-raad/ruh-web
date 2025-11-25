import { useState } from "react";
import { Loader2, Trash2, Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useDeletePossibleAnswer,
  useUpdatePossibleAnswer,
} from "@/features/possible-answers/api/usePossibleAnswers";
import type { PossibleAnswer } from "@/features/possible-answers/types/possible-answer.types";

interface AnswerItemProps {
  answer: PossibleAnswer;
}

export function AnswerItem({ answer }: AnswerItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(answer.answer);

  const deleteMutation = useDeletePossibleAnswer();
  const updateMutation = useUpdatePossibleAnswer({
    onSuccess: () => setIsEditing(false),
  });

  const handleDelete = () => {
    deleteMutation.mutate(answer.id);
  };

  const handleSave = () => {
    if (!editedAnswer.trim()) return;
    updateMutation.mutate({
      id: answer.id,
      data: {
        answer: editedAnswer,
        version: answer.version,
      },
    });
  };

  const handleCancel = () => {
    setEditedAnswer(answer.answer);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          value={editedAnswer}
          onChange={(e) => setEditedAnswer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
            if (e.key === " ") e.stopPropagation();
          }}
          autoFocus
          className="flex-1"
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={handleSave}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4 text-green-600" />
          )}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleCancel}
          disabled={updateMutation.isPending}
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 group">
      <div className="flex-1 rounded-md border px-3 py-2 text-sm flex items-center justify-between">
        <span>{answer.answer}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="h-3 w-3" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        disabled={deleteMutation.isPending}
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}
