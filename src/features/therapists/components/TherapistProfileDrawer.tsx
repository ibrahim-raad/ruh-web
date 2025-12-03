import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User as UserIcon,
  Calendar,
  Settings,
  Award,
  Info,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Ban,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Therapist } from "../types/therapist.types";
import { useTherapistsCertificates } from "@/features/therapists-certificates/api/useTherapistsCertificates";
import { useTherapistSettings } from "@/features/therapists-settings/api/useTherapistsSettings";
import { useTherapistsAvailability } from "@/features/therapists-availability/api/useTherapistsAvailability";
import { useUpdateTherapist } from "@/features/therapists/api/useTherapists";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { FileViewer } from "@/shared/components/FileViewer";
import { Button } from "@/components/ui/button";
import { UserStatus } from "@/features/users/types/user.types";
import { toast } from "sonner";

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
  // Fetch additional data - Hooks must be called unconditionally
  const { data: certificatesData } = useTherapistsCertificates(
    { therapist_id: therapist?.id },
    { enabled: !!therapist }
  );

  const { data: settings } = useTherapistSettings(therapist?.id || "", {
    enabled: !!therapist,
  });

  const { data: availabilityData } = useTherapistsAvailability(
    { therapist_id: therapist?.id },
    { enabled: !!therapist }
  );

  const updateTherapist = useUpdateTherapist();

  if (!therapist) return null;

  const { user } = therapist;

  const handleStatusChange = async (newStatus: UserStatus) => {
    try {
      await updateTherapist.mutateAsync({
        id: therapist.id,
        data: {
          status: newStatus,
          version: therapist.user.version,
          therapist_version: therapist.version,
        },
      });
      toast.success(`Therapist status updated to ${newStatus}`);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Failed to update therapist status");
    }
  };

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
                variant={
                  user.status === UserStatus.ACTIVE
                    ? "default"
                    : user.status === UserStatus.BLOCKED
                      ? "destructive"
                      : "secondary"
                }
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

              <TabsContent value="certificates" className="mt-0 space-y-4">
                <h3 className="text-lg font-semibold">Certificates</h3>
                {certificatesData?.data && certificatesData.data.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {certificatesData.data.map((cert) => (
                      <Card
                        key={cert.id}
                        className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="flex flex-col gap-3">
                            <div>
                              <h4
                                className="font-semibold leading-none mb-1 line-clamp-1"
                                title={cert.title}
                              >
                                {cert.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                {cert.issuer}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <Badge
                                  variant="secondary"
                                  className="text-xs font-normal"
                                >
                                  Issued:{" "}
                                  {format(
                                    new Date(cert.issued_date),
                                    "MMM yyyy"
                                  )}
                                </Badge>
                                {/* Expiry date removed as it's not in the interface */}
                              </div>
                            </div>

                            {cert.file_url && (
                              <div className="pt-2 border-t mt-auto">
                                <FileViewer
                                  src={cert.file_url}
                                  title={cert.title}
                                  alt={`Certificate - ${cert.title}`}
                                  className="border-none p-0 hover:bg-transparent"
                                />
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                    <Award className="mx-auto h-12 w-12 mb-2 opacity-50" />
                    <p>No certificates found</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="schedule" className="mt-0 space-y-4">
                <h3 className="text-lg font-semibold">Weekly Schedule</h3>
                {availabilityData?.data && availabilityData.data.length > 0 ? (
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Day</TableHead>
                          <TableHead>Working Hours</TableHead>
                          <TableHead>Break Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {availabilityData.data.map((slot) => (
                          <TableRow key={slot.id}>
                            <TableCell className="font-medium capitalize">
                              {slot.day_of_week.toLowerCase()}
                            </TableCell>
                            <TableCell>
                              {slot.start_time.slice(0, 5)} -{" "}
                              {slot.end_time.slice(0, 5)}
                            </TableCell>
                            <TableCell>
                              {slot.break_start_time && slot.break_end_time ? (
                                <span className="text-muted-foreground">
                                  {slot.break_start_time.slice(0, 5)} -{" "}
                                  {slot.break_end_time.slice(0, 5)}
                                </span>
                              ) : (
                                <span className="text-muted-foreground text-sm italic">
                                  No break
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                    <Calendar className="mx-auto h-12 w-12 mb-2 opacity-50" />
                    <p>No availability schedule set</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings" className="mt-0 space-y-6">
                <h3 className="text-lg font-semibold">Booking Settings</h3>
                {settings ? (
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Anytime Booking</p>
                        <p className="text-sm text-muted-foreground">
                          Allow patients to book without immediate approval
                        </p>
                      </div>
                      {settings.is_open ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircle className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Session Duration
                        </p>
                        <p className="text-xl font-bold">
                          {settings.session_duration_minutes} min
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Max Sessions/Day
                        </p>
                        <p className="text-xl font-bold">
                          {settings.max_sessions_per_day}
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Minimum Notice
                        </p>
                        <p className="text-xl font-bold">
                          {settings.booking_threshold_hours} hours
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Advance Booking Limit
                        </p>
                        <p className="text-xl font-bold">
                          {settings.max_booking_days} days
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg space-y-1">
                      <p className="text-sm text-muted-foreground">Timezone</p>
                      <p className="font-medium">{settings.timezone}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                    <AlertCircle className="mx-auto h-12 w-12 mb-2 opacity-50" />
                    <p>Settings not configured</p>
                  </div>
                )}
              </TabsContent>
            </div>
          </ScrollArea>

          {/* Actions Footer */}
          <SheetFooter className="p-6 border-t bg-muted/10 sm:justify-between gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="font-medium mr-2">Account Actions:</span>
            </div>
            <div className="flex gap-2">
              {user.status === UserStatus.PENDING && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => handleStatusChange(UserStatus.BLOCKED)}
                    disabled={updateTherapist.isPending}
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleStatusChange(UserStatus.ACTIVE)}
                    disabled={updateTherapist.isPending}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </>
              )}

              {user.status === UserStatus.ACTIVE && (
                <Button
                  variant="destructive"
                  onClick={() => handleStatusChange(UserStatus.BLOCKED)}
                  disabled={updateTherapist.isPending}
                >
                  <Ban className="mr-2 h-4 w-4" />
                  Block Account
                </Button>
              )}

              {user.status === UserStatus.BLOCKED && (
                <Button
                  onClick={() => handleStatusChange(UserStatus.ACTIVE)}
                  disabled={updateTherapist.isPending}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Activate Account
                </Button>
              )}
            </div>
          </SheetFooter>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
