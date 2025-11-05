import { axiosConfig } from "@/services/axios-config";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
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
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Estado
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Función de login
      login: async (credentials) => {
        set({ isLoading: true, error: null });

        try {
          const response = await axiosConfig.post<User>(
            "/api/auth/login",
            credentials
          );

          const user: User = response.data;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return { success: true };
        } catch (error) {
          const errorMessage = "Error al iniciar sesión";

          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
          });

          return { success: false, error: errorMessage };
        }
      },

      // Función de logout
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Limpiar errores
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
