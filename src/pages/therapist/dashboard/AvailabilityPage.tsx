import { useState, useMemo, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Clock, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { useAuthStore } from "@/features/auth/store/auth.store";
import {
  useTherapistsExceptions,
  useCreateTherapistException,
  useUpdateTherapistException,
  useDeleteTherapistException,
} from "@/features/therapists-exceptions/api/useTherapistsExceptions";
import type { TherapistException } from "@/features/therapists-exceptions/types/therapist-exception.types";
import { WeeklyAvailabilityForm } from "@/features/therapists-availability/components/WeeklyAvailabilityForm";

const exceptionSchema = z.object({
  date: z.date(),
  start_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time"),
  end_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time"),
  is_available: z.boolean(),
  reason: z.string().optional(),
});

type ExceptionFormValues = z.infer<typeof exceptionSchema>;

export default function AvailabilityPage() {
  const { therapist } = useAuthStore();
  const therapistId = therapist!.id;

  const { data: exceptionsResponse } = useTherapistsExceptions({
    limit: 100,
  });

  const exceptions = useMemo(
    () => exceptionsResponse?.data || [],
    [exceptionsResponse?.data]
  );

  const createException = useCreateTherapistException();
  const updateException = useUpdateTherapistException();
  const deleteException = useDeleteTherapistException();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isExceptionDialogOpen, setIsExceptionDialogOpen] = useState(false);
  const [editingException, setEditingException] =
    useState<TherapistException | null>(null);

  const {
    register: registerException,
    handleSubmit: handleSubmitException,
    reset: resetException,
    setValue: setExceptionValue,
    control: controlException,
    formState: { errors: exceptionErrors, isSubmitting: isExceptionSubmitting },
  } = useForm<ExceptionFormValues>({
    resolver: zodResolver(exceptionSchema),
    defaultValues: {
      is_available: false,
      start_time: "09:00",
      end_time: "17:00",
    },
  });

  const selectedDateException = useMemo(() => {
    if (!selectedDate) return null;
    return exceptions.find((ex) => {
      const exDate = new Date(ex.date);
      return (
        exDate.getDate() === selectedDate.getDate() &&
        exDate.getMonth() === selectedDate.getMonth() &&
        exDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [exceptions, selectedDate]);

  useEffect(() => {
    if (isExceptionDialogOpen && selectedDate) {
      const timer = setTimeout(() => {
        if (selectedDateException) {
          setEditingException(selectedDateException);
          resetException({
            date: new Date(selectedDateException.date),
            start_time: selectedDateException.start_time.slice(0, 5),
            end_time: selectedDateException.end_time.slice(0, 5),
            is_available: selectedDateException.is_available,
            reason: selectedDateException.reason || "",
          });
        } else {
          setEditingException(null);
          resetException({
            date: selectedDate,
            start_time: "09:00",
            end_time: "17:00",
            is_available: false,
            reason: "",
          });
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [
    isExceptionDialogOpen,
    selectedDate,
    selectedDateException,
    resetException,
  ]);

  const onExceptionSubmit = async (data: ExceptionFormValues) => {
    try {
      if (editingException) {
        await updateException.mutateAsync({
          id: editingException.id,
          data: {
            date: data.date,
            start_time: data.start_time,
            end_time: data.end_time,
            is_available: data.is_available,
            reason: data.reason,
            version: editingException.version,
          },
        });
        toast.success("Exception updated");
      } else {
        await createException.mutateAsync({
          therapist_id: therapistId,
          date: data.date,
          start_time: data.start_time,
          end_time: data.end_time,
          is_available: data.is_available,
          reason: data.reason,
        });
        toast.success("Exception created");
      }
      setIsExceptionDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save exception");
    }
  };

  const handleDeleteException = async () => {
    if (!editingException) return;
    try {
      await deleteException.mutateAsync(editingException.id);
      toast.success("Exception deleted");
      setIsExceptionDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete exception");
    }
  };

  const isExceptionAvailable = useWatch({
    control: controlException,
    name: "is_available",
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Availability & Exceptions</h2>
        <p className="text-muted-foreground">
          Manage your weekly schedule and set specific exceptions for dates.
        </p>
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="mt-6">
          <WeeklyAvailabilityForm therapistId={therapistId} />
        </TabsContent>

        <TabsContent value="exceptions" className="mt-6">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
            <Card className="w-fit border-none shadow-none sm:border sm:shadow-sm">
              <CardContent className="p-0 sm:p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    exception: (date) =>
                      exceptions.some((ex) => {
                        const d = new Date(ex.date);
                        return (
                          d.getDate() === date.getDate() &&
                          d.getMonth() === date.getMonth() &&
                          d.getFullYear() === date.getFullYear()
                        );
                      }),
                  }}
                  modifiersStyles={{
                    exception: {
                      fontWeight: "bold",
                      textDecoration: "underline",
                      color: "var(--primary)",
                    },
                  }}
                />
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  {selectedDate
                    ? format(selectedDate, "MMMM d, yyyy")
                    : "Select a date"}
                </h3>
                {selectedDate && (
                  <Button onClick={() => setIsExceptionDialogOpen(true)}>
                    {selectedDateException ? "Edit Exception" : "Add Exception"}
                  </Button>
                )}
              </div>

              {selectedDate && selectedDateException ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      {selectedDateException.is_available ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <Clock className="h-4 w-4" /> Available (Exception)
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4" /> Unavailable
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {selectedDateException.is_available && (
                      <div>
                        <span className="font-medium">Time:</span>{" "}
                        {selectedDateException.start_time} -{" "}
                        {selectedDateException.end_time}
                      </div>
                    )}
                    {selectedDateException.reason && (
                      <div>
                        <span className="font-medium">Reason:</span>{" "}
                        {selectedDateException.reason}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : selectedDate ? (
                <div className="text-muted-foreground text-sm border-2 border-dashed rounded-lg p-8 text-center">
                  No exception set for this date. Standard weekly schedule
                  applies.
                </div>
              ) : null}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog
        open={isExceptionDialogOpen}
        onOpenChange={setIsExceptionDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingException ? "Edit Exception" : "Add Exception"}
            </DialogTitle>
            <DialogDescription>
              Set availability for{" "}
              {selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""}.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmitException(onExceptionSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label>Availability Status</Label>
              <Select
                onValueChange={(val) =>
                  setExceptionValue("is_available", val === "true")
                }
                defaultValue={isExceptionAvailable ? "true" : "false"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">
                    Unavailable (Day Off/Holiday)
                  </SelectItem>
                  <SelectItem value="true">
                    Available (Extra Work Day)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isExceptionAvailable && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input type="time" {...registerException("start_time")} />
                  {exceptionErrors.start_time && (
                    <p className="text-destructive text-xs">
                      {exceptionErrors.start_time.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input type="time" {...registerException("end_time")} />
                  {exceptionErrors.end_time && (
                    <p className="text-destructive text-xs">
                      {exceptionErrors.end_time.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Reason (Optional)</Label>
              <Textarea
                {...registerException("reason")}
                placeholder="e.g. Public Holiday, Personal Leave, Extra Shift"
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              {editingException && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDeleteException}
                >
                  Delete Exception
                </Button>
              )}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsExceptionDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isExceptionSubmitting}>
                  Save
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
