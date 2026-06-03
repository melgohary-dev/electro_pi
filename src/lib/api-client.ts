import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export const fakeStoreClient = axios.create({
  baseURL: "https://fakestoreapi.com",
});
