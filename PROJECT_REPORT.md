# CSCI426: Advanced Web Programming - Project Phase 1 Report

**Project Title:** Ruh Therapy Web Platform
**Student Name:** Ibrahim Raad
**Date:** 23-Nov-2025

---

## 1. Abstract

Ruh Therapy is a web-based management system tailored for the mental health industry. It addresses the need for a streamlined administrative interface for therapy clinics. The project separates concerns by providing a web-based dashboard for administrators and therapists to manage operations, finances, and patient data, while patients interact via a separate mobile interface. This Phase 1 deliverable focuses on the frontend architecture, implementing a responsive UI with React, secure authentication flows (including password reset and email verification), and the foundational structure for the admin dashboard.

## 2. System Design

The application is built using a Single Page Application (SPA) architecture.

- **Frontend:** Developed with **React** and **TypeScript** using **Vite** as the build tool for optimal performance.
- **Routing:** **React Router v6** manages client-side navigation, utilizing nested routes for layouts (Public vs. Admin) and protected routes for authentication guards.
- **State Management:**
  - **Zustand:** Used for global client-side state (e.g., authentication tokens, user profile).
  - **TanStack Query (React Query):** Handles server-state management, caching, and synchronization with the backend API.
- **Styling:** **Tailwind CSS** provides a utility-first styling approach, combined with **Radix UI** primitives for accessible, unstyled component logic.
- **Form Handling:** **React Hook Form** coupled with **Zod** for schema validation ensures robust data entry and error handling.
- **Backend Integration:** The frontend communicates with a **NestJS** backend via a configured Axios instance with interceptors for token management (JWT).

## 3. Technologies Used

- **Core:** React 19, TypeScript, Vite
- **State & Data Fetching:** Zustand, TanStack Query
- **Routing:** React Router DOM
- **Styling & UI:** Tailwind CSS, Radix UI, Lucide React (Icons), Sonner (Toasts)
- **Forms & Validation:** React Hook Form, Zod
- **HTTP Client:** Axios
- **Linting & Formatting:** ESLint, Prettier

## 4. Live Demo & Credentials

**URL:** [https://ruhtherapy.online](https://ruhtherapy.online)

To access the restricted Admin Dashboard features, please use the following test credentials:

- **Email:** `admin@example.com`
- **Password:** `string12`

## 5. Code Snippets (Key Parts)

### Authentication Service (`src/features/auth/api/auth.service.ts`)

_Manages API calls for login, token refresh, and password management._

```typescript
export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      "/api/v1/auth/login",
      credentials
    );
    return response.data;
  },
  // ... other methods
};
```

### Protected Route Component (`src/features/auth/components/ProtectedRoute.tsx`)

_Higher-order component to secure routes based on user roles._

```typescript
export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.ERROR.FORBIDDEN} replace />;
  }

  return <Outlet />;
};
```

### Admin Layout (`src/app/layouts/AdminLayout.tsx`)

_Provides the common structure (Sidebar, Header) for all admin pages._

```typescript
export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r fixed inset-y-0 z-50 hidden lg:block">
        {/* ... sidebar content ... */}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64 transition-all duration-300 ease-in-out">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
```
