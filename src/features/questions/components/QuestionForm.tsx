import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuestionType, type CreateQuestionDto } from "../types/question.types";

interface QuestionFormProps {
  onSubmit: (data: CreateQuestionDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
  questionnaireId: string;
  nextIndex: number;
}

export function QuestionForm({
  onSubmit,
  onCancel,
  isLoading,
  questionnaireId,
  nextIndex,
}: QuestionFormProps) {
  const [question, setQuestion] = useState("");
  const [type, setType] = useState<QuestionType>(QuestionType.MULTIPLE_SELECT);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      questionnaire_id: questionnaireId,
      question,
      type,
      order: nextIndex,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="question">Question Text</Label>
          <Input
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question..."
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="type">Answer Type</Label>
          <Select
            value={type}
            onValueChange={(value) => setType(value as QuestionType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(QuestionType).map((type) => (
                <SelectItem key={type} value={type}>
                  {type.replace("_", " ").toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Question
        </Button>
      </div>
    </form>
  );
}
