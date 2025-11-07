import { useMutation } from "@tanstack/react-query";
import { addProgramToUser } from "../requests";
import toast from "react-hot-toast";

export const useAddProgramToUser = () => {
  return useMutation({
    mutationKey: ["user", "updated"],
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
