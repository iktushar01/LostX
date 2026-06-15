import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { LostItem, LostItemForClaim } from "@/types/lostx.types";

export const lostItemService = {
  list: (params?: Record<string, unknown>) =>
    httpClient.get<LostItem[]>("/lost-items", { params }),

  listMine: (params?: Record<string, unknown>) =>
    httpClient.get<LostItem[]>("/lost-items/mine", { params }),

  listMineForClaim: () =>
    httpClient.get<LostItemForClaim[]>("/lost-items/mine/for-claim"),

  getById: (id: string) =>
    httpClient.get<LostItem>(`/lost-items/${id}`),

  create: (data: FormData) =>
    httpClient.post<LostItem>("/lost-items", data),

  delete: (id: string) =>
    httpClient.delete<{ id: string }>(`/lost-items/${id}`),
};

export type LostItemListResponse = ApiResponse<LostItem[]>;
