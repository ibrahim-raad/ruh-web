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
      { path: ROUTES.FOR_PATIENTS, element: <ForPatientsPage /> },
      { path: ROUTES.FOR_THERAPISTS, element: <ForTherapistsPage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
    ],
  },
  {
    path: ROUTES.ADMIN.ROOT,
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminOverviewPage /> },
      { path: ROUTES.ADMIN.OVERVIEW, element: <AdminOverviewPage /> },
      { path: ROUTES.ADMIN.USERS, element: <AdminUsersPage /> },
      { path: ROUTES.ADMIN.THERAPISTS, element: <AdminTherapistsPage /> },
      { path: ROUTES.ADMIN.APPOINTMENTS, element: <AdminAppointmentsPage /> },
      { path: ROUTES.ADMIN.PAYMENTS, element: <AdminPaymentsPage /> },
      { path: ROUTES.ADMIN.PATIENTS, element: <AdminPatientsPage /> },
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
