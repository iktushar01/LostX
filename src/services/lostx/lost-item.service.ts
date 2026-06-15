import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { LostItem } from "@/types/lostx.types";

export const lostItemService = {
  list: (params?: Record<string, unknown>) =>
    httpClient.get<LostItem[]>("/lost-items", { params }),

  getById: (id: string) =>
    httpClient.get<LostItem>(`/lost-items/${id}`),

  create: (data: Record<string, unknown>) =>
    httpClient.post<LostItem>("/lost-items", data),

  delete: (id: string) =>
    httpClient.delete<{ id: string }>(`/lost-items/${id}`),
};

export type LostItemListResponse = ApiResponse<LostItem[]>;
