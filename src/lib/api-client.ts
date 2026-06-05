import axios from "axios";

/**
 * Axios instance for our own API routes.
 * Used for authentication (login, register, logout, me).
 */
export const apiClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

/**
 * Axios instance for the external Fake Store API.
 * Used for fetching products and categories.
 */
export const fakeStoreClient = axios.create({
  baseURL: "https://fakestoreapi.com",
});
