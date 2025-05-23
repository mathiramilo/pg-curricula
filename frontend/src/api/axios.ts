import axios from "axios";

import { ENV } from "@/config";

export interface PaginatedResponse<T> {
  data: T;
  page: number;
  pageSize: number;
  totalItems: number;
}

export const api = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": ENV.API_KEY,
  },
});
