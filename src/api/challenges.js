import { axiosChallenges } from "./axios";

const API_URL = "/api/challenges";

export const getChallengesRequest = () => axiosChallenges.get(API_URL);
export const getChallengeByIdRequest = (id) =>
  axiosChallenges.get(`${API_URL}/${id}`);
