import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, FileText, X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useWatch,
  type UseFormSetValue,
  type PathValue,
} from "react-hook-form";

interface FileUploadProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  label?: string;
  error?: string;
  accept?: string;
}

export const FileUpload = <T extends FieldValues>({
  control,
  name,
  setValue,
  label = "File",
  error,
  accept = "image/*,.pdf",
}: FileUploadProps<T>) => {
  const file = useWatch({
    control,
    name,
  });
  const [preview, setPreview] = useState<string | null>(null);

  const isFile = (value: unknown): value is File => {
    return value instanceof File;
  };

  useEffect(() => {
    let isMounted = true;
    if (isFile(file) && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isMounted && typeof reader.result === "string") {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      Promise.resolve().then(() => {
        if (isMounted) setPreview(null);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [file]);

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    setValue(name, undefined as unknown as PathValue<T, Path<T>>, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg border-muted-foreground/25 hover:bg-muted/50 transition-colors">
        {isFile(file) ? (
          <div className="flex items-center gap-2 text-sm z-10">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-10 w-10 object-cover rounded bg-muted"
              />
            ) : (
              <FileText className="w-4 h-4 text-primary" />
            )}
            <span className="font-medium truncate max-w-[200px]">
              {file.name}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full hover:bg-destructive/20 hover:text-destructive ml-2"
              onClick={handleRemove}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 text-center pointer-events-none">
            <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-muted-foreground">
              <span className="text-primary">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-muted-foreground/75">
              {accept.replace(/\./g, "").toUpperCase().replace(/,/g, ", ")}{" "}
              (max. 10MB)
            </p>
          </div>
        )}

        {!isFile(file) && (
          <Input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept={accept}
            onChange={(e) => {
              const newFile = e.target.files?.[0];
              if (newFile) {
                setValue(name, newFile as PathValue<T, Path<T>>, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }
            }}
          />
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
