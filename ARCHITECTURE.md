# Architecture Documentation

## 1. Overview

Ruh Therapy is a multi-role web platform designed to facilitate mental health services. It connects administrators, therapists, and patients through distinct interfaces. The architecture is designed to be modular, scalable, and secure, leveraging modern web technologies.

## 2. High-Level Architecture

The application follows a client-server architecture:

- **Frontend (Client):** A Single Page Application (SPA) built with React, serving as the user interface for web browsers.
- **Backend (Server):** A RESTful API built with NestJS (located in a separate repository), handling business logic, data persistence, and authentication.
- **Database:** PostgreSQL (managed by the backend) for storing user data, sessions, and configurations.
- **Mobile App:** A separate client for patients (outside the scope of this repository) that interacts with the same backend API.

## 3. Frontend Architecture (This Repository)

The frontend is structured using a **Feature-Based Architecture**, grouping related code (components, API services, types, state) by business domain rather than technical type.

### 3.1 Directory Structure

```text
src/
├── app/                 # App-wide configuration (router, providers, layouts)
├── assets/              # Static assets (images, svgs)
├── components/          # Shared UI components (Button, Input, etc.) - Atomic design
├── features/            # Feature-specific modules (Business Logic)
│   ├── auth/            # Authentication (login, register, guards)
│   ├── currencies/      # Currency management
│   └── ...
├── pages/               # Page components (Route targets)
│   ├── admin/           # Admin-specific pages
│   ├── auth/            # Auth-related pages
│   └── ...
├── shared/              # Shared utilities, hooks, and configs
│   ├── api/             # Axios client setup
│   ├── config/          # Constants (Routes)
│   └── hooks/           # Custom hooks (useDebounce, usePagination)
└── widgets/             # Complex UI blocks used across pages (Hero, Navbar)
```

### 3.2 Key Architectural Decisions

#### State Management

We use a hybrid approach to state management:

- **Server State (TanStack Query):** Handles data fetching, caching, and synchronization with the API. This reduces the need for global client state for data that belongs to the server.
- **Client State (Zustand):** Manages global UI state that doesn't persist on the server, such as:
  - User Session (Auth Token, User Profile)
  - UI Toggles (Theme preferences)

#### Authentication & Security

- **JWT (JSON Web Tokens):** Used for stateless authentication.
- **Axios Interceptors:** Automatically attach the Access Token to every request and handle 401 Unauthorized responses (e.g., by attempting a token refresh or redirecting to login).
- **Protected Routes:** Higher-Order Components (HOCs) wrap protected routes to check for authentication status and user roles before rendering the content.

#### Styling System

- **Tailwind CSS:** Provides a utility-first approach for rapid styling.
- **Radix UI:** Used for complex interactive components (Dialogs, Dropdowns, Tabs) to ensure accessibility (a11y) compliance without enforcing a specific visual style.
- **Shadcn UI:** A collection of re-usable components built on top of Radix UI and Tailwind CSS, providing a consistent design system.

#### Component Design

- **UI Components (`src/components/ui`):** dumb, presentational components that receive props and emit events.
- **Feature Components (`src/features/**/components`):\*\* Smart components that may connect to the store or API hooks.
- **Widgets (`src/widgets`):** Compositional components that combine multiple UI or Feature components to form a major section of a page (e.g., `LoginForm`, `AdminSidebar`).

## 4. Data Flow

1.  **User Action:** User interacts with the UI (e.g., clicks "Login").
2.  **Event Handler:** Component calls a function from a custom hook or service.
3.  **Service Layer:** `auth.service.ts` makes an HTTP request using the configured Axios client.
4.  **API Call:** The request is sent to the NestJS backend.
5.  **Response Handling:**
    - **Success:** Data is returned, React Query cache is updated, and the UI re-renders.
    - **Error:** Axios interceptor catches the error, global error handling (Toast notification) is triggered.

## 5. Development Workflow

- **Linting:** ESLint with strict TypeScript rules to ensure code quality.
- **Formatting:** Prettier for consistent code style.
- **Type Safety:** TypeScript is used extensively to prevent runtime errors and improve developer experience.
