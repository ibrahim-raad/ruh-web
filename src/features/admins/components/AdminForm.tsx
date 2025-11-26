import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AdminRole,
  type Admin,
  type CreateAdminDto,
} from "../types/admin.types";
import { UserGender, UserRole } from "@/features/users/types/user.types";
import { useCountries } from "@/features/countries/api/useCountries";
import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { SearchableSelect } from "@/shared/components/SearchableSelect";

const createAdminSchema = z.object({
  full_name: z
    .string()
    .min(1, "Full name is required")
    .max(255, "Full name must be less than 255 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
    ),
  admin_role: z.enum(AdminRole, {
    error: "Role is required",
  }),
  gender: z.enum(UserGender, {
    error: "Gender is required",
  }),
  country_id: z.uuid("Please select a valid country"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
});

const updateAdminSchema = createAdminSchema.extend({
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
    )
    .optional()
    .or(z.literal("")),
});

type AdminFormValues =
  | z.infer<typeof createAdminSchema>
  | z.infer<typeof updateAdminSchema>;

interface AdminFormProps {
  admin?: Admin;
  onSubmit: (data: CreateAdminDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function AdminForm({
  admin,
  onSubmit,
  onCancel,
  isLoading,
}: AdminFormProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: countries } = useCountries({
    limit: 100,
    name: debouncedSearch,
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<AdminFormValues>({
    resolver: zodResolver(admin ? updateAdminSchema : createAdminSchema),
    defaultValues: admin
      ? {
          full_name: admin.user.full_name,
          email: admin.user.email,
          password: "",
          admin_role: admin.admin_role,
          gender: admin.user.gender,
          country_id: admin.user.country?.id,
          date_of_birth: admin.user.date_of_birth
            ? new Date(admin.user.date_of_birth).toISOString().split("T")[0]
            : "",
        }
      : {
          full_name: "",
          email: "",
          password: "",
          admin_role: AdminRole.REVIEWER,
          gender: UserGender.UNKNOWN,
          country_id: "",
          date_of_birth: "",
        },
  });

  const handleFormSubmit = (data: AdminFormValues) => {
    const submitData = {
      ...data,
      role: UserRole.ADMIN,
      date_of_birth: new Date(data.date_of_birth).toISOString(),
    };

    if (admin && !data.password) {
      delete submitData.password;
    }

    onSubmit(submitData as unknown as CreateAdminDto);
  };

  const selectedCountryId = useWatch({
    control,
    name: "country_id",
  });

  const selectedAdminRole = useWatch({
    control,
    name: "admin_role",
  });

  const selectedGender = useWatch({
    control,
    name: "gender",
  });

  const selectedCountry =
    countries?.data.find((country) => country.id === selectedCountryId) ||
    (admin?.user.country?.id === selectedCountryId
      ? admin?.user.country
      : null);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="full_name">
          Full Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="full_name"
          placeholder="John Doe"
          {...register("full_name")}
          disabled={isLoading}
        />
        {errors.full_name && (
          <p className="text-sm text-destructive">{errors.full_name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          disabled={isLoading || !!admin}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          disabled={isLoading || !!admin}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="admin_role">
            Role <span className="text-destructive">*</span>
          </Label>
          <Select
            disabled={isLoading}
            onValueChange={(value) =>
              setValue("admin_role", value as AdminRole)
            }
            value={selectedAdminRole}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(AdminRole).map((role) => (
                <SelectItem key={role} value={role}>
                  {role.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.admin_role && (
            <p className="text-sm text-destructive">
              {errors.admin_role.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">
            Gender <span className="text-destructive">*</span>
          </Label>
          <Select
            disabled={isLoading}
            onValueChange={(value) => setValue("gender", value as UserGender)}
            value={selectedGender}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(UserGender).map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-sm text-destructive">{errors.gender.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date_of_birth">
            Date of Birth <span className="text-destructive">*</span>
          </Label>
          <Input
            id="date_of_birth"
            type="date"
            {...register("date_of_birth")}
            disabled={isLoading}
          />
          {errors.date_of_birth && (
            <p className="text-sm text-destructive">
              {errors.date_of_birth.message}
            </p>
          )}
        </div>

        <div className="space-y-2 flex flex-col">
          <Label htmlFor="country_id">
            Country <span className="text-destructive">*</span>
          </Label>
          <SearchableSelect
            value={selectedCountryId}
            onChange={(val) => setValue("country_id", val)}
            options={
              countries?.data.map((country) => ({
                label: country.name,
                value: country.id,
              })) || []
            }
            onSearch={setSearch}
            placeholder="Select country"
            searchPlaceholder="Search country..."
            disabled={isLoading}
            selectedLabel={selectedCountry?.name}
          />
          {errors.country_id && (
            <p className="text-sm text-destructive">
              {errors.country_id.message}
            </p>
          )}
        </div>
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
          {isLoading ? "Saving..." : admin ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
