import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/shared/config/routes";
import { Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function DownloadAppPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-xl text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Smartphone className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Download the Patient App</CardTitle>
          <CardDescription className="text-base mt-2">
            The web dashboard is for administrators and therapists only. To
            access your patient account, please use our mobile application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Track your progress, manage appointments, and connect with your
            therapist on the go.
          </p>
          <div className="grid grid-cols-1 gap-3">
            <Button variant="outline" className="h-12" disabled>
              App Store (Coming Soon)
            </Button>
            <Button variant="outline" className="h-12" disabled>
              Google Play (Coming Soon)
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild variant="link">
            <Link to={ROUTES.HOME}>Back to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
