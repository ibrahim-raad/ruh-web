import { useMemo } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuestionnaire } from "@/features/questionnaires/api/useQuestionnaires";
import { useQuestions } from "@/features/questions/api/useQuestions";
import { usePatientAnswers } from "../api/usePatientAnswers";
import { ReadOnlyQuestionCard } from "./ReadOnlyQuestionCard";
import { ROUTES } from "@/shared/config/routes";
import type { Question } from "@/features/questions/types/question.types";
import type { PatientAnswer } from "../types/patient-answer.types";

interface PatientQuestionnaireViewProps {
  questionnaireId: string;
  patientId: string;
}

export function PatientQuestionnaireView({
  questionnaireId,
  patientId,
}: PatientQuestionnaireViewProps) {
  const navigate = useNavigate();

  const { data: questionnaire, isLoading: isLoadingQuestionnaire } =
    useQuestionnaire(questionnaireId);

  const { data: questionsData, isLoading: isLoadingQuestions } = useQuestions({
    questionnaire_id: questionnaireId,
    sort: "order asc",
  });

  const { data: answersData, isLoading: isLoadingAnswers } = usePatientAnswers({
    patient_id: patientId,
  });

  const answersByQuestionId = useMemo(() => {
    const map = new Map<string, PatientAnswer[]>();
    answersData?.data?.forEach((ans: PatientAnswer) => {
      const qId = ans.question_id || ans.question?.id;
      if (qId) {
        const existing = map.get(qId) || [];
        existing.push(ans);
        map.set(qId, existing);
      }
    });
    return map;
  }, [answersData]);

  const isLoading =
    isLoadingQuestionnaire || isLoadingQuestions || isLoadingAnswers;

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

  const questions = questionsData?.data || [];
  const patientName = answersData?.data?.[0]?.patient?.full_name || "Patient";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            const path = ROUTES.ADMIN.QUESTIONNAIRE_RESPONSES.replace(
              ":id",
              questionnaireId
            );
            navigate(path);
          }}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {questionnaire.title} - Responses
          </h1>
          <p className="text-muted-foreground">
            Viewing answers for {patientName}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {questions.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No questions in this questionnaire.
            </div>
          ) : (
            questions.map((question: Question, index: number) => (
              <ReadOnlyQuestionCard
                key={question.id}
                question={question}
                index={index}
                answers={answersByQuestionId.get(question.id) || []}
              />
            ))
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium">Patient</div>
                <div className="text-sm text-muted-foreground">
                  {patientName}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Questionnaire Type</div>
                <div className="text-sm text-muted-foreground">
                  {questionnaire.type.replace("_", " ")}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Total Questions</div>
                <div className="text-sm text-muted-foreground">
                  {questions.length}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
