import { axiosUsers } from "./axios";

const API_URL = "/api/users/profile";

export const updateProfileRequest = (data) =>
  axiosUsers.patch(`${API_URL}/update`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getUserProfileRequest = (userId) =>
  axiosUsers.get(`${API_URL}/${userId}`);
