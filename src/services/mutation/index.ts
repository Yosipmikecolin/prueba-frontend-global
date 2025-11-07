import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProgramToUser, deleteUser, updatedUser } from "../requests";
import toast from "react-hot-toast";

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

    onError: (error: any) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["student", "delete"],
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      toast.success("Estudiante eliminado ✅");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });
};
