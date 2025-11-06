import { useQuery } from "@tanstack/react-query";
import { getPrograms } from "../requests";

export const useGetPrograms = () => {
  return useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
  });
};
