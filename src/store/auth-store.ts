import { axiosConfig } from "@/services/axios-config";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  programs: { id: string; name: string }[];
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (
    credentials: LoginCredentials
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  clearError: () => void;
  fetchUser: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      //? Estado
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      //? Función de login
      login: async (credentials) => {
        set({ isLoading: true, error: null });

        try {
          const { data } = await axiosConfig.post<{
            user: User;
            token: string;
          }>("/auth/login", credentials);
          localStorage.setItem("access_token", data.token);
          const user: User = data.user;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return { success: true };
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.message || "Error al iniciar sesión";

          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
          });

          return { success: false, error: errorMessage };
        }
      },

      //? Función de logout
      logout: async () => {
        set({ isLoading: true, error: null });

        try {
          await axiosConfig.post<User>("/auth/logout");
          set({
            user: null,
            isAuthenticated: false,
            error: null,
          });
          window.location.href = "/";
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.message || "Error al cerrar sesión";
          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
          });
          return { success: false, error: errorMessage };
        }
      },

      fetchUser: async () => {
        set({ isLoading: true });
        try {
          const { data } = await axiosConfig.get<User>("/auth/me");

          set({
            user: data,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      //? Limpiar errores
      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
