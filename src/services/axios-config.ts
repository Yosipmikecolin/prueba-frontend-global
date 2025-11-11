import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:4000",
  withCredentials: true,
});
