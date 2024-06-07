import { axiosUsers } from "./axios.js";

const API_URL = "/api/ranking";

export const getGlobalRankingRequest = (page, limit, searchTerm) =>
  axiosUsers.get(
    `${API_URL}?page=${page}&limit=${limit}&searchTerm=${searchTerm}`
  );
