import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload } from "lucide-react";
import { format } from "date-fns";
import { MOCK_DOCUMENTS } from "./data";

export function DocumentsWidget() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Documents</CardTitle>
            <CardDescription>Lab results and other documents.</CardDescription>
          </div>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_DOCUMENTS.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between border p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {doc.type} • {doc.size} •{" "}
                    {format(doc.uploaded_at, "MMM dd, yyyy")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Uploaded by: {doc.uploaded_by}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {MOCK_DOCUMENTS.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No documents uploaded yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
