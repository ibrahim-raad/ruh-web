import { AppleIcon, GooglePlayIcon } from "@/shared/icons/StoreIcons";

export function PatientsHero() {
  return (
    <section className="grid items-center gap-10 md:grid-cols-2">
      <div className="order-2 md:order-1 space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-primary">
            For Patients
          </h1>
          <p className="text-lg md:text-xl text-foreground/90">
            Use the Ruh Therapy mobile app to book sessions, join secure video
            calls, and track your emotions with guided journaling.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Ruh Therapy for patients is available on the App Store and Google
            Play.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
            >
              <AppleIcon className="h-6 w-6" />
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
            >
              <GooglePlayIcon className="h-6 w-6" />
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="order-1 md:order-2 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 rounded-[3rem] blur-3xl" />

          <div className="relative">
            <div className="relative aspect-9/16 w-64 rounded-[3rem] bg-linear-to-b from-gray-800 to-gray-900 p-3 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl" />
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden bg-background">
                <img
                  src="/app_sessions_preview.png"
                  alt="Ruh Therapy App"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
