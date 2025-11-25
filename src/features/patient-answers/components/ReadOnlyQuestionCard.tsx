import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  QuestionType,
  type Question,
} from "@/features/questions/types/question.types";
import type { PatientAnswer } from "../types/patient-answer.types";

interface ReadOnlyQuestionCardProps {
  question: Question;
  index: number;
  answers: PatientAnswer[];
}

export function ReadOnlyQuestionCard({
  question,
  index,
  answers,
}: ReadOnlyQuestionCardProps) {
  const renderAnswer = () => {
    if (!answers?.length && question.type !== QuestionType.TEXT) {
      return (
        <p className="text-sm text-muted-foreground italic">
          No answer provided
        </p>
      );
    }

    switch (question.type) {
      case QuestionType.TEXT:
        return (
          <div className="space-y-2">
            <Label>Answer</Label>
            <div className="p-3 rounded-md bg-muted/50 text-sm border">
              {answers[0]?.answer || "No answer provided"}
            </div>
          </div>
        );

      case QuestionType.SCALE:
        return (
          <div className="space-y-2">
            <Label>Scale Value</Label>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                {answers[0]?.answer}
              </div>
            </div>
          </div>
        );

      case QuestionType.SINGLE_SELECT:
        return (
          <div className="space-y-2">
            <Label>Selected Option</Label>
            <div className="p-3 rounded-md bg-primary/5 text-sm border border-primary/20 font-medium text-primary">
              {answers[0]?.possible_answer?.answer}
            </div>
          </div>
        );

      case QuestionType.MULTIPLE_SELECT:
        return (
          <div className="space-y-2">
            <Label>Selected Options</Label>
            <div className="space-y-2">
              {answers.map((ans) => (
                <div
                  key={ans.id}
                  className="p-3 rounded-md bg-primary/5 text-sm border border-primary/20 font-medium text-primary flex items-center gap-2"
                >
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  {ans.possible_answer?.answer}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-medium">
              {index + 1}.
            </span>
            <CardTitle className="text-base font-medium">
              {question.question}
            </CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs">
            {question.type.replace("_", " ")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="mt-4">{renderAnswer()}</CardContent>
    </Card>
  );
}
