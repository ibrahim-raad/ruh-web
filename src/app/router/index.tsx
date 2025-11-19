import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import AdminLayout from "@/app/layouts/AdminLayout";
import PublicLayout from "@/app/layouts/PublicLayout";
import { ROUTES } from "@/shared/config/routes";

// Public pages
const LandingPage = lazy(() => import("@/pages/landing"));
const ForPatientsPage = lazy(() => import("@/pages/for-patients"));
const ForTherapistsPage = lazy(() => import("@/pages/for-therapists"));
const AboutPage = lazy(() => import("@/pages/about"));
const ContactPage = lazy(() => import("@/pages/contact"));

// Admin pages
const AdminOverviewPage = lazy(() => import("@/pages/admin/overview"));
const AdminUsersPage = lazy(() => import("@/pages/admin/users"));
const AdminTherapistsPage = lazy(() => import("@/pages/admin/therapists"));
const AdminAppointmentsPage = lazy(() => import("@/pages/admin/appointments"));
const AdminPaymentsPage = lazy(() => import("@/pages/admin/payments"));
const AdminPatientsPage = lazy(() => import("@/pages/admin/patients"));

// Error pages
const NotFoundPage = lazy(() => import("@/pages/errors/NotFound"));
const ForbiddenPage = lazy(() => import("@/pages/errors/Forbidden"));
const ServerErrorPage = lazy(() => import("@/pages/errors/ServerError"));

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "for-patients", element: <ForPatientsPage /> },
      { path: "for-therapists", element: <ForTherapistsPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
  {
    path: ROUTES.ADMIN.ROOT,
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminOverviewPage /> },
      { path: "overview", element: <AdminOverviewPage /> },
      { path: "users", element: <AdminUsersPage /> },
      { path: "therapists", element: <AdminTherapistsPage /> },
      { path: "appointments", element: <AdminAppointmentsPage /> },
      { path: "payments", element: <AdminPaymentsPage /> },
      { path: "patients", element: <AdminPatientsPage /> },
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
  return <RouterProvider router={router} />;
}
