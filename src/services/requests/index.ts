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

export const createProgramToUser = async (payload: {
  fullName: string;
  email: string;
  programIds: string[];
}) => {
  return (await axiosConfig.post("/user", payload)).data;
};

export const addProgramToUser = async (userId: string, programId: string) => {
  return (await axiosConfig.post(`/user/${userId}/programs/${programId}`)).data;
};

export const updatedUser = async (
  userId: string,
  payload: { fullName: string; email: string; programIds: string[] }
) => {
  return (await axiosConfig.put(`/user/${userId}`, payload)).data;
};

export const deleteUser = async (userId: string) => {
  return (await axiosConfig.delete(`/user/${userId}`)).data;
};
