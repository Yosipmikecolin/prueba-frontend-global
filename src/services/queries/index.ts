import { useQuery } from "@tanstack/react-query";
import { getPrograms } from "../requests";

export const useGetPrograms = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["programs", page, limit],
    queryFn: () => getPrograms(page, limit),
    placeholderData: (previousData) => previousData,
  });
};
