import axios from "axios";

export interface PaginatedResponse<T> {
  data: T;
  page: number;
  pageSize: number;
  totalItems: number;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY as string,
  },
});
