import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionList } from "@/features/questions/components/QuestionList";
import { useQuestionnaire } from "../api/useQuestionnaires";
import { ROUTES } from "@/shared/config/routes";

interface QuestionnaireBuilderProps {
  questionnaireId: string;
}

export function QuestionnaireBuilder({
  questionnaireId,
}: QuestionnaireBuilderProps) {
  const navigate = useNavigate();
  const { data: questionnaire, isLoading } = useQuestionnaire(questionnaireId);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!questionnaire) {
    return <div>Questionnaire not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(ROUTES.ADMIN.QUESTIONNAIRES)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {questionnaire.title}
          </h1>
          <p className="text-muted-foreground">
            {questionnaire.description || "Manage questions and answers"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <QuestionList questionnaireId={questionnaireId} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium">Type</div>
                <div className="text-sm text-muted-foreground">
                  {questionnaire.type.replace("_", " ")}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Status</div>
                <div className="text-sm text-muted-foreground">
                  {questionnaire.is_active ? "Active" : "Inactive"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
