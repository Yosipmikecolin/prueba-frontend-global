import { axiosConfig } from "../axios-config";

export const getPrograms = async (page: number, limit: number) => {
  return (
    await axiosConfig.get<ProgramResponse>("/program", {
      params: { page, limit },
    })
  ).data;
};
