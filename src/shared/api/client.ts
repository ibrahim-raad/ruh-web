import axios, { type AxiosRequestHeaders } from "axios";

const baseURL =
  (import.meta.env?.VITE_API_URL as string | undefined) ??
  "http://localhost:3000";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // TODO: replace with real auth token source
  const token = undefined as string | undefined;
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    return Promise.reject(error);
  }
);
