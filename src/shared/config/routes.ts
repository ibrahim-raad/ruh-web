export const ROUTES = {
  // Public routes
  HOME: "/",
  FOR_PATIENTS: "/for-patients",
  FOR_THERAPISTS: "/for-therapists",
  ABOUT: "/about",
  CONTACT: "/contact",
  DOWNLOAD_APP: "/download-app",

  // Auth routes
  AUTH: {
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
  },

  // Admin routes
  ADMIN: {
    ROOT: "/admin",
    OVERVIEW: "/admin/overview",
    SETTINGS: "/admin/settings",
    THERAPISTS: "/admin/therapists",
    SESSIONS: "/admin/sessions",
    PAYMENTS: "/admin/payments",
    PATIENTS: "/admin/patients",
    CURRENCIES: "/admin/currencies",
    COUNTRIES: "/admin/countries",
    LANGUAGES: "/admin/languages",
    SPECIALIZATIONS: "/admin/specializations",
    ADMINS: "/admin/admins",
    QUESTIONNAIRES: "/admin/questionnaires",
    QUESTIONNAIRE_BUILDER: "/admin/questionnaires/:id/builder",
    QUESTIONNAIRE_RESPONSES: "/admin/questionnaires/:id/responses",
    QUESTIONNAIRE_RESPONSE_DETAIL:
      "/admin/questionnaires/:questionnaireId/responses/:patientId",
  },

  // Therapist routes
  THERAPIST: {
    ROOT: "/therapist",
    DASHBOARD: "/therapist/dashboard",
    SESSIONS: "/therapist/sessions",
    AVAILABILITY: "/therapist/availability",
    EARNINGS: "/therapist/earnings",
    ONBOARDING: {
      ROOT: "/therapist/onboarding",
      WELCOME: "/therapist/onboarding/welcome",
      PERSONAL_DETAILS: "/therapist/onboarding/personal-details",
      PROFESSIONAL_INFO: "/therapist/onboarding/professional-info",
      SETTINGS: "/therapist/onboarding/settings",
      AVAILABILITY: "/therapist/onboarding/availability",
      IDENTITY: "/therapist/onboarding/identity",
      REVIEW: "/therapist/onboarding/review",
    },
  },

  // Error pages
  ERROR: {
    NOT_FOUND: "/404",
    FORBIDDEN: "/403",
    SERVER_ERROR: "/500",
  },
} as const;

export function isAdminRoute(path: string): boolean {
  return path.startsWith(ROUTES.ADMIN.ROOT);
}

export function isTherapistRoute(path: string): boolean {
  return path.startsWith(ROUTES.THERAPIST.ROOT);
}

export function isAuthRoute(path: string): boolean {
  return path.startsWith("/auth");
}
