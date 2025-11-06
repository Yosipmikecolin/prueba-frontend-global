import { axiosConfig } from "../axios-config";

export const getPrograms = async () => {
  return (await axiosConfig.get<ProgramResponse>("/program")).data;
};
