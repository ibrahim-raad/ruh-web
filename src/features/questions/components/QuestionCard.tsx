import { useState } from "react";
import { Loader2, Trash2, Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AnswerList } from "@/features/possible-answers/components/AnswerList";
import { QuestionType, type Question } from "../types/question.types";
import { useDeleteQuestion, useUpdateQuestion } from "../api/useQuestions";

interface QuestionCardProps {
  question: Question;
  index: number;
}

export function QuestionCard({ question, index }: QuestionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question.question);

  const deleteMutation = useDeleteQuestion();
  const updateMutation = useUpdateQuestion({
    onSuccess: () => setIsEditing(false),
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this question?")) {
      deleteMutation.mutate(question.id);
    }
  };

  const handleSave = () => {
    if (!editedQuestion.trim()) return;
    updateMutation.mutate({
      id: question.id,
      data: {
        question: editedQuestion,
        version: question.version,
      },
    });
  };

  const handleCancel = () => {
    setEditedQuestion(question.question);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-medium">
              {index + 1}.
            </span>
            {isEditing ? (
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <Input
                  value={editedQuestion}
                  onChange={(e) => setEditedQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave();
                    if (e.key === "Escape") handleCancel();
                    if (e.key === " ") e.stopPropagation();
                  }}
                  autoFocus
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
            ) : (
              <div className="flex items-center gap-2 group">
                <CardTitle className="text-base font-medium">
                  {question.question}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
          <Badge variant="secondary" className="text-xs">
            {question.type.replace("_", " ")}
          </Badge>
        </div>
        {!isEditing && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4 text-destructive" />
            )}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {(question.type === QuestionType.MULTIPLE_SELECT ||
          question.type === QuestionType.SINGLE_SELECT) && (
          <div className="mt-4">
            <AnswerList questionId={question.id} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
