import { axiosConfig } from "../axios-config";

export const getPrograms = async (page: number, limit: number) => {
  return (
    await axiosConfig.get<ProgramResponse>("/program", {
      params: { page, limit },
    })
  ).data;
};

export const getUsers = async (page: number, limit: number) => {
  return (
    await axiosConfig.get<UserResponse>("/user", {
      params: { page, limit },
    })
  ).data;
};

export const addProgramToUser = async (userId: string, programId: string) => {
  return (await axiosConfig.post(`/user/${userId}/programs/${programId}`)).data;
};
