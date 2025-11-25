import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User as UserIcon,
  Calendar,
  Settings,
  Award,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Therapist } from "../types/therapist.types";

interface TherapistProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  therapist: Therapist | null;
}

export function TherapistProfileDrawer({
  open,
  onOpenChange,
  therapist,
}: TherapistProfileDrawerProps) {
  if (!therapist) return null;

  const { user } = therapist;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[800px] sm:max-w-[800px] p-0 flex flex-col">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle>Therapist Profile</SheetTitle>
          <SheetDescription>
            View therapist details, credentials, and settings
          </SheetDescription>
        </SheetHeader>

        <div className="p-6 pt-4 flex items-center gap-4 border-b">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden">
            {user.profile_url ? (
              <img
                src={`${import.meta.env.VITE_API_URL}${user.profile_url}`}
                alt={user.full_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserIcon className="h-8 w-8 text-primary" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.full_name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="flex gap-2 mt-1">
              <Badge
                variant={user.status === "ACTIVE" ? "default" : "secondary"}
                className="text-xs"
              >
                {user.status}
              </Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="flex-1 flex flex-col">
          <div className="px-6 border-b">
            <TabsList className="w-full justify-start rounded-none h-12 p-0 bg-transparent">
              <TabsTrigger
                value="overview"
                className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                <Info className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="certificates"
                className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                <Award className="mr-2 h-4 w-4" />
                Certificates
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6">
              <TabsContent value="overview" className="mt-0 space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-3">Basic Info</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground block">Bio</span>
                      <p className="font-medium mt-1">
                        {therapist.bio || "No bio provided"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                    <div>
                      <span className="text-muted-foreground block">
                        Hourly Rate
                      </span>
                      <span className="font-medium">
                        {therapist.rate_per_hour
                          ? `${therapist.currency?.symbol}${therapist.rate_per_hour}`
                          : "Not set"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">
                        Experience
                      </span>
                      <span className="font-medium">
                        {therapist.years_of_experience
                          ? `${therapist.years_of_experience} years`
                          : "Not set"}
                      </span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Location</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground block">
                        Country
                      </span>
                      <span className="font-medium">
                        {user.country?.name || "Not specified"}
                      </span>
                    </div>
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="certificates" className="mt-0">
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                  <Award className="mx-auto h-12 w-12 mb-2 opacity-50" />
                  <p>Certificates View Implementation</p>
                  <p className="text-sm mt-2">
                    Will display list of certificates with verification status
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="mt-0">
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                  <Calendar className="mx-auto h-12 w-12 mb-2 opacity-50" />
                  <p>Schedule View Implementation</p>
                  <p className="text-sm mt-2">
                    Will display weekly availability and exceptions
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                  <Settings className="mx-auto h-12 w-12 mb-2 opacity-50" />
                  <p>Settings View Implementation</p>
                  <p className="text-sm mt-2">
                    Will display booking preferences and rules
                  </p>
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
