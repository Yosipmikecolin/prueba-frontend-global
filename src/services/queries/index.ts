import { useQuery } from "@tanstack/react-query";
import { getPrograms, getUsers } from "../requests";

export const useGetPrograms = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["programs", page, limit],
    queryFn: () => getPrograms(page, limit),
    placeholderData: (previousData) => previousData,
  });
};

export const useGetUsers = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["students", page, limit],
    queryFn: () => getUsers(page, limit),
    placeholderData: (previousData) => previousData,
  });
};
