import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { LostItem, LostItemDetail, LostItemForClaim } from "@/types/lostx.types";

export const lostItemService = {
  list: (params?: Record<string, unknown>) =>
    httpClient.get<LostItem[]>("/lost-items", { params }),

  listMine: (params?: Record<string, unknown>) =>
    httpClient.get<LostItem[]>("/lost-items/mine", { params }),

  listMineForClaim: () =>
    httpClient.get<LostItemForClaim[]>("/lost-items/mine/for-claim"),

  getById: (id: string) =>
    httpClient.get<LostItemDetail>(`/lost-items/${id}`),

  create: (data: FormData) =>
    httpClient.post<LostItem>("/lost-items", data),

  update: (id: string, data: FormData) =>
    httpClient.patch<LostItemDetail>(`/lost-items/${id}`, data),

  delete: (id: string) =>
    httpClient.delete<{ id: string }>(`/lost-items/${id}`),
};

export type LostItemListResponse = ApiResponse<LostItem[]>;
