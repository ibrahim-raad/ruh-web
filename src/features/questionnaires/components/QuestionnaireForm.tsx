import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type Questionnaire,
  type CreateQuestionnaireDto,
  QuestionnaireType,
} from "../types/questionnaire.types";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const questionnaireSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z.string().optional(),
  type: z.enum(QuestionnaireType),
  is_active: z.boolean(),
});

type QuestionnaireFormValues = z.infer<typeof questionnaireSchema>;

interface QuestionnaireFormProps {
  questionnaire?: Questionnaire;
  onSubmit: (data: CreateQuestionnaireDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function QuestionnaireForm({
  questionnaire,
  onSubmit,
  onCancel,
  isLoading,
}: QuestionnaireFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<QuestionnaireFormValues>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: questionnaire
      ? {
          title: questionnaire.title,
          description: questionnaire.description,
          type: questionnaire.type,
          is_active: questionnaire.is_active,
        }
      : {
          title: "",
          description: "",
          type: QuestionnaireType.POST_SESSION,
          is_active: true,
        },
  });

  const handleFormSubmit = (data: QuestionnaireFormValues) => {
    onSubmit(data);
  };

  const selectedType = useWatch({
    control,
    name: "type",
  });

  const isActive = useWatch({
    control,
    name: "is_active",
  });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          placeholder="Title"
          {...register("title")}
          disabled={isLoading}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Description"
          {...register("description")}
          disabled={isLoading}
          rows={3}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">
          Type <span className="text-destructive">*</span>
        </Label>
        <Select
          disabled={isLoading}
          onValueChange={(value) =>
            setValue("type", value as QuestionnaireType)
          }
          value={selectedType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(QuestionnaireType).map((type) => (
              <SelectItem key={type} value={type}>
                {type.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-sm text-destructive">{errors.type.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_active"
          checked={isActive}
          onCheckedChange={(checked) =>
            setValue("is_active", checked as boolean)
          }
          disabled={isLoading}
        />
        <Label htmlFor="is_active" className="font-normal">
          Active
        </Label>
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
          {isLoading ? "Saving..." : questionnaire ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
