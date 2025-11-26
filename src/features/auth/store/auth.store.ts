import { create } from "zustand";
import type { User } from "@/features/users/types/user.types";
import type { Therapist } from "@/features/therapists/types/therapist.types";
import type { Admin } from "@/features/admins/types/admin.types";

export interface AuthState {
  user: User | null;
  admin: Admin | null;
  therapist: Therapist | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (
    accessToken: string,
    user: User,
    therapist?: Therapist,
    admin?: Admin
  ) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  setTherapist: (therapist?: Therapist) => void;
  setAdmin: (admin?: Admin) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  admin: null,
  therapist: null,
  accessToken: null,
  isAuthenticated: false,
  login: (
    accessToken: string,
    user: User,
    therapist?: Therapist,
    admin?: Admin
  ) => set({ accessToken, user, isAuthenticated: true, therapist, admin }),
  logout: () =>
    set({
      accessToken: null,
      user: null,
      therapist: null,
      admin: null,
      isAuthenticated: false,
    }),
  setAccessToken: (accessToken: string) => set({ accessToken }),
  setUser: (user: User) => set({ user }),
  setTherapist: (therapist?: Therapist) => set({ therapist }),
  setAdmin: (admin?: Admin) => set({ admin }),
}));
