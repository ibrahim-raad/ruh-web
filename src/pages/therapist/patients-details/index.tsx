import { useParams, useNavigate } from "react-router-dom";
import { useTherapyCase } from "@/features/therapy-cases/api/useTherapyCases";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Video } from "lucide-react";
import { ROUTES } from "@/shared/config/routes";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { SessionsWidget } from "./components/SessionsWidget";
import { ChatWidget } from "./components/ChatWidget";
import { ExercisesWidget } from "./components/ExercisesWidget";
import { ReflectionsWidget } from "./components/ReflectionsWidget";
import { DocumentsWidget } from "./components/DocumentsWidget";

export default function PatientDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: therapyCase, isLoading } = useTherapyCase(id!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!therapyCase) {
    return (
      <EmptyState
        title="Patient not found"
        description="The requested patient case could not be found."
      />
    );
  }

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(ROUTES.THERAPIST.PATIENTS)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {therapyCase.patient.user.full_name}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-sm">
                Case #{therapyCase.id.slice(0, 8)}
              </span>
              <Badge
                variant={
                  therapyCase.status === "ACTIVE" ? "default" : "secondary"
                }
              >
                {therapyCase.status}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button>
            <Video className="mr-2 h-4 w-4" />
            Start Session
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sessions" className="flex-1 flex flex-col space-y-6">
        <TabsList>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="reflections">Reflections</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Sessions Tab */}
        <TabsContent value="sessions" className="space-y-6">
          <SessionsWidget />
        </TabsContent>

        {/* Chat Tab */}
        <TabsContent
          value="chat"
          className="flex-1 flex flex-col h-full min-h-[500px] data-[state=active]:flex"
        >
          <ChatWidget therapyCase={therapyCase} />
        </TabsContent>

        {/* Exercises Tab */}
        <TabsContent value="exercises" className="space-y-6">
          <ExercisesWidget />
        </TabsContent>

        {/* Reflections Tab */}
        <TabsContent value="reflections" className="space-y-6">
          <ReflectionsWidget />
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <DocumentsWidget />
        </TabsContent>
      </Tabs>
    </div>
  );
}
