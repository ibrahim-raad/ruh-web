import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Language, CreateLanguageDto } from "../types/language.types";

const languageSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
  code: z
    .string()
    .min(2, "Code must be exactly 2 characters")
    .max(2, "Code must be exactly 2 characters")
    .toUpperCase(),
});

type LanguageFormValues = z.infer<typeof languageSchema>;

interface LanguageFormProps {
  language?: Language;
  onSubmit: (data: CreateLanguageDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function LanguageForm({
  language,
  onSubmit,
  onCancel,
  isLoading,
}: LanguageFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LanguageFormValues>({
    resolver: zodResolver(languageSchema),
    defaultValues: language
      ? {
          name: language.name,
          code: language.code,
        }
      : {
          name: "",
          code: "",
        },
  });

  const handleFormSubmit = (data: LanguageFormValues) => {
    onSubmit({
      name: data.name,
      code: data.code.toUpperCase(),
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="English"
          {...register("name")}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="code">
          Code <span className="text-destructive">*</span>
        </Label>
        <Input
          id="code"
          placeholder="EN"
          {...register("code")}
          disabled={isLoading}
        />
        {errors.code && (
          <p className="text-sm text-destructive">{errors.code.message}</p>
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
          {isLoading ? "Saving..." : language ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
