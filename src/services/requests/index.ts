import { axiosConfig } from "../axios-config";

// ? Obtener estudiantes
export const getUsers = async (page: number, limit: number) => {
  return (
    await axiosConfig.get<UserResponse>("/user", {
      params: { page, limit },
    })
  ).data;
};

// ? Crear estudiante
export const createUser = async (payload: CreateStuden) => {
  return (await axiosConfig.post("/user", payload)).data;
};

// ? Agregar programa a estudiante
export const addProgramToUser = async (userId: string, programId: string) => {
  return (await axiosConfig.post(`/user/${userId}/programs/${programId}`)).data;
};

// ? Actualizar estudiante
export const updatedUser = async (
  userId: string,
  payload: { fullName: string; email: string; programIds: string[] }
) => {
  return (await axiosConfig.put(`/user/${userId}`, payload)).data;
};

// ? Eliminar estudiante
export const deleteUser = async (userId: string) => {
  return (await axiosConfig.delete(`/user/${userId}`)).data;
};

// ? Obtener programas
export const getPrograms = async (page: number, limit: number) => {
  return (
    await axiosConfig.get<ProgramResponse>("/program", {
      params: { page, limit },
    })
  ).data;
};

// ? Crear programa
export const createProgram = async (payload: CreateProgram) => {
  return (await axiosConfig.post("/program", payload)).data;
};

// ? Actualizar programa
export const updatedProgram = async (
  userId: string,
  payload: CreateProgram
) => {
  return (await axiosConfig.put(`/program/${userId}`, payload)).data;
};

// ? Eliminar programa
export const deleteProgram = async (userId: string) => {
  return (await axiosConfig.delete(`/program/${userId}`)).data;
};
