import { useParams } from "react-router-dom";
import { QuestionnaireBuilder } from "@/features/questionnaires/components/QuestionnaireBuilder";

export default function QuestionnaireBuilderPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return <QuestionnaireBuilder questionnaireId={id} />;
}
