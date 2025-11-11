import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addProgramToUser,
  createProgram,
  createUser,
  deleteProgram,
  deleteUser,
  updatedProgram,
  updatedUser,
} from "../requests";
import toast from "react-hot-toast";

// ? Crear un estudiante
export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["student", "create"],
    mutationFn: (payload: CreateStuden) => createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Estudiante creado ✅");
    },
  });
};

// ? Actualizar un estudiante
export const useUpdatedStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["student", "updated"],
    mutationFn: (payload: {
      userId: string;
      data: { fullName: string; email: string; programIds: string[] };
    }) => updatedUser(payload.userId, payload.data),
    onSuccess: () => {
      toast.success("Estudiante actualizado ✅");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

// ? Eliminar un estudiante
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["student", "delete"],
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      toast.success("Estudiante eliminado ✅");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

// ? Agregar un nuevo programa al estudiante
export const useAddProgramToStudent = () => {
  return useMutation({
    mutationKey: ["student", "add"],
    mutationFn: (payload: { userId: string; programId: string }) =>
      addProgramToUser(payload.userId, payload.programId),
    onSuccess: () => {
      toast.success("Programa asignado ✅");
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });
};

// ? Crear un programa
export const useCreateProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["program", "create"],
    mutationFn: (payload: CreateProgram) => createProgram(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      toast.success("Programa creado ✅");
    },
  });
};

// ? Actualizar un programa
export const useUpdatedProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["program", "updated"],
    mutationFn: (payload: { userId: string; data: CreateProgram }) =>
      updatedProgram(payload.userId, payload.data),
    onSuccess: () => {
      toast.success("Programa actualizado ✅");
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });
};

// ? Eliminar un estudiante
export const useDeleteProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["program", "delete"],
    mutationFn: (userId: string) => deleteProgram(userId),
    onSuccess: () => {
      toast.success("Programa eliminado ✅");
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });
};
