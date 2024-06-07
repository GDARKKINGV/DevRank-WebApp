import axios from "axios";

export const axiosUsers = axios.create({
  baseURL: "http://localhost:3001",
});

export const axiosChallenges = axios.create({
  baseURL: "http://localhost:3002",
});

export const axiosOffers = axios.create({
  baseURL: "http://localhost:3003",
});

axiosUsers.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
