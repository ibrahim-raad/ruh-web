import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileViewerProps {
  src: string | File;
  alt?: string;
  className?: string;
  title?: string;
}

export function FileViewer({
  src,
  alt = "File preview",
  className,
  title = "File Preview",
}: FileViewerProps) {
  const [state, setState] = useState<{
    previewUrl: string;
    fileName: string;
    fileType: "image" | "pdf" | "other";
  }>(() => {
    let initialPreviewUrl = "";
    let initialFileName = "";
    let initialFileType: "image" | "pdf" | "other" = "other";

    if (typeof src === "string") {
      initialPreviewUrl = src;
      initialFileName = src.split("/").pop() || "File";
      const lowerSrc = src.toLowerCase();
      if (
        lowerSrc.endsWith(".jpg") ||
        lowerSrc.endsWith(".jpeg") ||
        lowerSrc.endsWith(".png") ||
        lowerSrc.endsWith(".webp") ||
        lowerSrc.endsWith(".gif")
      ) {
        initialFileType = "image";
      } else if (lowerSrc.endsWith(".pdf")) {
        initialFileType = "pdf";
      }
    } else if (src instanceof File) {
      initialFileName = src.name;
      if (src.type.startsWith("image/")) {
        initialFileType = "image";
      } else if (src.type === "application/pdf") {
        initialFileType = "pdf";
      }
    }

    return {
      previewUrl: initialPreviewUrl,
      fileName: initialFileName,
      fileType: initialFileType,
    };
  });

  useEffect(() => {
    let objectUrl: string | null = null;

    if (src instanceof File) {
      objectUrl = URL.createObjectURL(src);

      Promise.resolve().then(() => {
        setState((prev) => ({
          ...prev,
          previewUrl: objectUrl!,
          fileName: src.name,
          fileType: src.type.startsWith("image/")
            ? "image"
            : src.type === "application/pdf"
              ? "pdf"
              : "other",
        }));
      });
    } else {
      const fileName = src.split("/").pop() || "File";
      const lowerSrc = src.toLowerCase();
      let fileType: "image" | "pdf" | "other" = "other";

      if (
        lowerSrc.endsWith(".jpg") ||
        lowerSrc.endsWith(".jpeg") ||
        lowerSrc.endsWith(".png") ||
        lowerSrc.endsWith(".webp") ||
        lowerSrc.endsWith(".gif")
      ) {
        fileType = "image";
      } else if (lowerSrc.endsWith(".pdf")) {
        fileType = "pdf";
      }

      Promise.resolve().then(() => {
        setState({
          previewUrl: src,
          fileName,
          fileType,
        });
      });
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  const isImage = state.fileType === "image";
  const isPdf = state.fileType === "pdf";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "group relative flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors",
            className
          )}
        >
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-muted flex items-center justify-center">
            {isImage ? (
              <img
                src={`${import.meta.env.VITE_API_URL}${state.previewUrl}`}
                alt={alt}
                className="h-full w-full object-cover"
              />
            ) : (
              <FileText className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{state.fileName}</p>
            <p className="text-xs text-muted-foreground">Click to view</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between mr-8">
            <span>{title}</span>
            <Button variant="outline" size="sm" asChild>
              <a
                href={`${import.meta.env.VITE_API_URL}${state.previewUrl}`}
                download={state.fileName}
                target="_blank"
                rel="noreferrer"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </a>
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto bg-muted/10 rounded-md flex items-center justify-center p-4">
          {isImage ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${state.previewUrl}`}
              alt={alt}
              className="max-w-full max-h-full object-contain shadow-sm rounded"
            />
          ) : isPdf ? (
            <iframe
              src={`${import.meta.env.VITE_API_URL}${state.previewUrl}`}
              className="w-full h-full rounded border bg-white"
              title={title}
            />
          ) : (
            <div className="text-center">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="mb-4">
                This file type cannot be previewed directly.
              </p>
              <Button asChild>
                <a
                  href={`${import.meta.env.VITE_API_URL}${state.previewUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in New Tab
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
