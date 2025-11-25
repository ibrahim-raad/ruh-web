import { useParams } from "react-router-dom";
import { PatientQuestionnaireView } from "@/features/patient-answers/components/PatientQuestionnaireView";

export default function ResponseDetailPage() {
  const { questionnaireId, patientId } = useParams<{
    questionnaireId: string;
    patientId: string;
  }>();

  if (!questionnaireId || !patientId) {
    return <div>Missing parameters</div>;
  }

  return (
    <PatientQuestionnaireView
      questionnaireId={questionnaireId}
      patientId={patientId}
    />
  );
}
