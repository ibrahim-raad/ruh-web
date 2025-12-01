import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import AdminLayout from "@/app/layouts/AdminLayout";
import PublicLayout from "@/app/layouts/PublicLayout";
import { ROUTES } from "@/shared/config/routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { UserRole } from "@/features/users/types/user.types";
import TherapistLayout from "../layouts/TherapistLayout";

// Public pages
const LandingPage = lazy(() => import("@/pages/landing"));
const ForPatientsPage = lazy(() => import("@/pages/for-patients"));
const ForTherapistsPage = lazy(() => import("@/pages/for-therapists"));
const AboutPage = lazy(() => import("@/pages/about"));
const ContactPage = lazy(() => import("@/pages/contact"));
const DownloadAppPage = lazy(() => import("@/pages/misc/DownloadApp"));

// Auth pages
const LoginPage = lazy(() => import("@/pages/auth/login"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/forgot-password"));
const ResetPasswordPage = lazy(() => import("@/pages/auth/reset-password"));
const VerifyEmailPage = lazy(() => import("@/pages/auth/verify-email"));

// Admin pages
const AdminOverviewPage = lazy(() => import("@/pages/admin/overview"));
const AdminSettingsPage = lazy(() => import("@/pages/admin/settings"));
const AdminTherapistsPage = lazy(() => import("@/pages/admin/therapists"));
const AdminSessionsPage = lazy(() => import("@/pages/admin/sessions"));
const AdminPaymentsPage = lazy(() => import("@/pages/admin/payments"));
const AdminPatientsPage = lazy(() => import("@/pages/admin/patients"));
const AdminCurrenciesPage = lazy(() => import("@/pages/admin/currencies"));
const AdminCountriesPage = lazy(() => import("@/pages/admin/countries"));
const AdminLanguagesPage = lazy(() => import("@/pages/admin/languages"));
const AdminSpecializationsPage = lazy(
  () => import("@/pages/admin/specializations")
);
const AdminAdminsPage = lazy(() => import("@/pages/admin/admins"));
const AdminQuestionnairesPage = lazy(
  () => import("@/pages/admin/questionnaires")
);
const QuestionnaireBuilderPage = lazy(
  () => import("@/pages/admin/questionnaires/builder")
);
const ResponseDetailPage = lazy(
  () => import("@/pages/admin/questionnaires/responses/detail")
);
const QuestionnaireResponsesPage = lazy(
  () => import("@/pages/admin/questionnaires/responses/index")
);

// Error pages
const NotFoundPage = lazy(() => import("@/pages/errors/NotFound"));
const ForbiddenPage = lazy(() => import("@/pages/errors/Forbidden"));
const ServerErrorPage = lazy(() => import("@/pages/errors/ServerError"));

// Therapist pages
const TherapistOnboardingLayout = lazy(
  () => import("@/app/layouts/TherapistOnboardingLayout")
);
const OnboardingRoot = lazy(
  () => import("@/pages/therapist/onboarding/OnboardingRoot")
);
const WelcomeStep = lazy(
  () => import("@/pages/therapist/onboarding/WelcomeStep")
);
const PersonalDetailsStep = lazy(
  () => import("@/pages/therapist/onboarding/PersonalDetailsStep")
);
const ProfessionalInfoStep = lazy(
  () => import("@/pages/therapist/onboarding/ProfessionalInfoStep")
);
const SettingsStep = lazy(
  () => import("@/pages/therapist/onboarding/SettingsStep")
);
const AvailabilityStep = lazy(
  () => import("@/pages/therapist/onboarding/AvailabilityStep")
);
const IdentityStep = lazy(
  () => import("@/pages/therapist/onboarding/IdentityStep")
);

// Therapist Dashboard Pages
const TherapistDashboardPage = lazy(
  () => import("@/pages/therapist/dashboard/index")
);
const TherapistSettingsPage = lazy(
  () => import("@/pages/therapist/dashboard/SettingsPage")
);
const TherapistAvailabilityPage = lazy(
  () => import("@/pages/therapist/dashboard/AvailabilityPage")
);

// Global error
const GlobalError = lazy(() => import("@/pages/errors/GlobalError"));

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <PublicLayout />,
    errorElement: <GlobalError />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: ROUTES.FOR_PATIENTS, element: <ForPatientsPage /> },
      { path: ROUTES.FOR_THERAPISTS, element: <ForTherapistsPage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
      { path: ROUTES.DOWNLOAD_APP, element: <DownloadAppPage /> },
    ],
  },

  {
    path: ROUTES.AUTH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.AUTH.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: ROUTES.AUTH.RESET_PASSWORD,
    element: <ResetPasswordPage />,
  },
  {
    path: ROUTES.AUTH.VERIFY_EMAIL,
    element: <VerifyEmailPage />,
  },

  // Admin Routes - Protected
  {
    path: ROUTES.ADMIN.ROOT,
    element: <ProtectedRoute allowedRoles={[UserRole.ADMIN]} />,
    errorElement: <GlobalError />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminOverviewPage /> },
          { path: ROUTES.ADMIN.OVERVIEW, element: <AdminOverviewPage /> },
          { path: ROUTES.ADMIN.SETTINGS, element: <AdminSettingsPage /> },
          { path: ROUTES.ADMIN.THERAPISTS, element: <AdminTherapistsPage /> },
          { path: ROUTES.ADMIN.SESSIONS, element: <AdminSessionsPage /> },
          { path: ROUTES.ADMIN.PAYMENTS, element: <AdminPaymentsPage /> },
          { path: ROUTES.ADMIN.PATIENTS, element: <AdminPatientsPage /> },
          { path: ROUTES.ADMIN.CURRENCIES, element: <AdminCurrenciesPage /> },
          { path: ROUTES.ADMIN.COUNTRIES, element: <AdminCountriesPage /> },
          { path: ROUTES.ADMIN.LANGUAGES, element: <AdminLanguagesPage /> },
          {
            path: ROUTES.ADMIN.SPECIALIZATIONS,
            element: <AdminSpecializationsPage />,
          },
          {
            path: ROUTES.ADMIN.ADMINS,
            element: <AdminAdminsPage />,
          },
          {
            path: ROUTES.ADMIN.QUESTIONNAIRES,
            element: <AdminQuestionnairesPage />,
          },
          {
            path: ROUTES.ADMIN.QUESTIONNAIRE_BUILDER,
            element: <QuestionnaireBuilderPage />,
          },
          {
            path: ROUTES.ADMIN.QUESTIONNAIRE_RESPONSES,
            element: <QuestionnaireResponsesPage />,
          },
          {
            path: ROUTES.ADMIN.QUESTIONNAIRE_RESPONSE_DETAIL,
            element: <ResponseDetailPage />,
          },
        ],
      },
    ],
  },

  // Therapist Onboarding
  {
    element: <TherapistOnboardingLayout />,
    errorElement: <GlobalError />,
    children: [
      {
        index: true,
        element: <OnboardingRoot />,
      },
      {
        path: ROUTES.THERAPIST.ONBOARDING.ROOT,
        element: <OnboardingRoot />,
      },
      {
        path: ROUTES.THERAPIST.ONBOARDING.WELCOME,
        element: <WelcomeStep />,
      },
      {
        element: <ProtectedRoute allowedRoles={[UserRole.THERAPIST]} />,
        children: [
          {
            path: ROUTES.THERAPIST.ONBOARDING.PERSONAL_DETAILS,
            element: <PersonalDetailsStep />,
          },
          {
            path: ROUTES.THERAPIST.ONBOARDING.PROFESSIONAL_INFO,
            element: <ProfessionalInfoStep />,
          },
          {
            path: ROUTES.THERAPIST.ONBOARDING.SETTINGS,
            element: <SettingsStep />,
          },
          {
            path: ROUTES.THERAPIST.ONBOARDING.AVAILABILITY,
            element: <AvailabilityStep />,
          },
          {
            path: ROUTES.THERAPIST.ONBOARDING.IDENTITY,
            element: <IdentityStep />,
          },
        ],
      },
    ],
  },

  // Therapist Routes - Protected
  {
    path: ROUTES.THERAPIST.ROOT,
    element: <ProtectedRoute allowedRoles={[UserRole.THERAPIST]} />,
    errorElement: <GlobalError />,
    children: [
      {
        element: <TherapistLayout />,
        children: [
          { index: true, element: <TherapistDashboardPage /> },
          {
            path: ROUTES.THERAPIST.DASHBOARD,
            element: <TherapistDashboardPage />,
          },
          {
            path: ROUTES.THERAPIST.AVAILABILITY,
            element: <TherapistAvailabilityPage />,
          },
          {
            path: ROUTES.THERAPIST.SETTINGS,
            element: <TherapistSettingsPage />,
          },
        ],
      },
    ],
  },

  {
    path: ROUTES.ERROR.FORBIDDEN,
    element: <ForbiddenPage />,
  },
  {
    path: ROUTES.ERROR.SERVER_ERROR,
    element: <ServerErrorPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export function AppRouter() {
  return (
    <>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
