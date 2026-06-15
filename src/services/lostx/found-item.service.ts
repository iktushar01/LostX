import { httpClient } from "@/lib/axios/httpClient";
import { FoundItem } from "@/types/lostx.types";

export const foundItemService = {
  list: (params?: Record<string, unknown>) =>
    httpClient.get<FoundItem[]>("/found-items", { params }),

  getById: (id: string) =>
    httpClient.get<FoundItem>(`/found-items/${id}`),

  create: (data: Record<string, unknown>) =>
    httpClient.post<FoundItem>("/found-items", data),

  delete: (id: string) =>
    httpClient.delete<{ id: string }>(`/found-items/${id}`),
};
