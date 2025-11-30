import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { User as UserIcon } from "lucide-react";
import type { Patient } from "@/features/patients/types/patient.types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface PatientProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: Patient | null;
  children?: React.ReactNode;
}

export function PatientProfileDrawer({
  open,
  onOpenChange,
  patient,
  children,
}: PatientProfileDrawerProps) {
  if (!patient) return null;

  const { user } = patient;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className="mb-6">
          <SheetTitle>Patient Profile</SheetTitle>
          <SheetDescription>
            View patient details and preferences
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-100px)] pr-4">
          <div className="flex flex-col items-center mb-8">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 border-2 border-primary/20 overflow-hidden">
              {user.profile_url ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}${user.profile_url}`}
                  alt={user.full_name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserIcon className="h-12 w-12 text-primary" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-center">{user.full_name}</h2>
            <p className="text-muted-foreground text-center mb-2">
              {user.email}
            </p>
            <div className="flex gap-2 flex-wrap justify-center">
              <Badge
                variant={user.status === "ACTIVE" ? "default" : "secondary"}
              >
                {user.status}
              </Badge>
              <Badge variant="outline">{user.gender}</Badge>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block">
                    Date of Birth
                  </span>
                  <span className="font-medium">
                    {user.date_of_birth
                      ? format(new Date(user.date_of_birth), "MMM dd, yyyy")
                      : "Not specified"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Country</span>
                  <span className="font-medium">
                    {user.country?.name || "Not specified"}
                  </span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                Therapy Preferences
              </h3>
              <div className="grid gap-4 text-sm border rounded-lg p-4 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Preferred Therapist Gender
                  </span>
                  <Badge variant="outline">
                    {!patient.preferred_therapist_gender
                      ? "No Preference"
                      : patient.preferred_therapist_gender}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Preferred Therapy Mode
                  </span>
                  <Badge variant="outline">
                    {patient.preferred_therapy_mode.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            </section>

            {children && (
              <section className="pt-4 border-t">{children}</section>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
