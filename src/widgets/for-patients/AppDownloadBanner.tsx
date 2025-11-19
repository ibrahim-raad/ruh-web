import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppleIcon, GooglePlayIcon } from "@/shared/icons/StoreIcons";

export function AppDownloadBanner() {
  return (
    <Card className="p-8 md:p-12 bg-linear-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Ready to begin your journey?
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl">
            Download Ruh Therapy today and connect with a trusted therapist who
            understands your needs.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            <a href="#" className="inline-flex items-center gap-2">
              <AppleIcon className="h-5 w-5" />
              Download on App Store
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            <a href="#" className="inline-flex items-center gap-2">
              <GooglePlayIcon className="h-5 w-5" />
              Get it on Google Play
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
