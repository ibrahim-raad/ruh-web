import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import AdminLayout from "@/app/layouts/AdminLayout";
import PublicLayout from "@/app/layouts/PublicLayout";

const LandingPage = lazy(() => import("@/pages/landing"));
const AdminOverviewPage = lazy(() => import("@/pages/admin/overview"));
const AdminUsersPage = lazy(() => import("@/pages/admin/users"));
const AdminTherapistsPage = lazy(() => import("@/pages/admin/therapists"));
const AdminAppointmentsPage = lazy(() => import("@/pages/admin/appointments"));
const AdminPaymentsPage = lazy(() => import("@/pages/admin/payments"));
const AdminPatientsPage = lazy(() => import("@/pages/admin/patients"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [{ index: true, element: <LandingPage /> }],
  },
  {
    path: "/admin",
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
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
