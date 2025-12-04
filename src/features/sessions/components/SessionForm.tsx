import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Session, CreateSessionDto } from "../types/session.types";

const sessionSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
});

type SessionFormValues = z.infer<typeof sessionSchema>;

interface SessionFormProps {
  session?: Session;
  onSubmit: (data: CreateSessionDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function SessionForm({
  session,
  onSubmit,
  onCancel,
  isLoading,
}: SessionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: session
      ? {
          name: session.name,
        }
      : {
          name: "",
        },
  });

  const handleFormSubmit = (data: SessionFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Name"
          {...register("name")}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : session ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
