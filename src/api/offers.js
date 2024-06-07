import { axiosOffers } from "./axios.js/";

const API_URL = "/api/offers";

export const getOffersRequest = (page, limit, searchTerm) =>
  axiosOffers.get(
    `${API_URL}?page=${page}&limit=${limit}&searchTerm=${searchTerm}`
  );

export const getOfferRequest = (id) => axiosOffers.get(`${API_URL}/${id}`);
