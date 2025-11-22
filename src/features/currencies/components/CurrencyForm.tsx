import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Currency, CreateCurrencyDto } from "../types/currency.types";

const currencySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
  code: z
    .string()
    .min(3, "Code must be exactly 3 characters")
    .max(3, "Code must be exactly 3 characters")
    .toUpperCase(),
  symbol: z.string().max(1, "Symbol must be a single character").optional(),
});

type CurrencyFormValues = z.infer<typeof currencySchema>;

interface CurrencyFormProps {
  currency?: Currency;
  onSubmit: (data: CreateCurrencyDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CurrencyForm({
  currency,
  onSubmit,
  onCancel,
  isLoading,
}: CurrencyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CurrencyFormValues>({
    resolver: zodResolver(currencySchema),
    defaultValues: currency
      ? {
          name: currency.name,
          code: currency.code,
          symbol: currency.symbol || "",
        }
      : {
          name: "",
          code: "",
          symbol: "",
        },
  });

  const handleFormSubmit = (data: CurrencyFormValues) => {
    onSubmit({
      name: data.name,
      code: data.code.toUpperCase(),
      symbol: data.symbol || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="code">
          Currency Code <span className="text-destructive">*</span>
        </Label>
        <Input
          id="code"
          placeholder="USD"
          maxLength={3}
          {...register("code")}
          disabled={isLoading}
          className="font-mono uppercase"
        />
        {errors.code && (
          <p className="text-sm text-destructive">{errors.code.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          3-character ISO currency code (e.g., USD, EUR, GBP)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="US Dollar"
          {...register("name")}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="symbol">Symbol</Label>
        <Input
          id="symbol"
          placeholder="$"
          maxLength={1}
          {...register("symbol")}
          disabled={isLoading}
        />
        {errors.symbol && (
          <p className="text-sm text-destructive">{errors.symbol.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Optional currency symbol (e.g., $, €, £)
        </p>
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
          {isLoading ? "Saving..." : currency ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
