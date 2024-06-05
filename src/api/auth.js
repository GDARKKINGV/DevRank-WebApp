import { axiosUsers } from "./axios";

const API_URL = "/api/users/auth";

export const registerRequest = (user) =>
  axiosUsers.post(`${API_URL}/register`, user);

export const loginRequest = (user) => axiosUsers.post(`${API_URL}/login`, user);

export const logoutRequest = () => axiosUsers.post(`${API_URL}/logout`);

export const verifyRequest = () => axiosUsers.get(`${API_URL}/verify`);
