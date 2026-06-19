import { httpClient } from "@/lib/axios/httpClient";
import { FoundItem, FoundItemDetail } from "@/types/lostx.types";

export const foundItemService = {
  list: (params?: Record<string, unknown>) =>
    httpClient.get<FoundItem[]>("/found-items", { params }),

  listMine: (params?: Record<string, unknown>) =>
    httpClient.get<FoundItem[]>("/found-items/mine", { params }),

  getById: (id: string) =>
    httpClient.get<FoundItemDetail>(`/found-items/${id}`),

  create: (data: FormData) =>
    httpClient.post<FoundItem>("/found-items", data),

  createFromLostTip: (lostItemId: string, data: FormData) =>
    httpClient.post<FoundItem>(`/found-items/from-lost-tip/${lostItemId}`, data),

  update: (id: string, data: FormData) =>
    httpClient.patch<FoundItemDetail>(`/found-items/${id}`, data),

  delete: (id: string) =>
    httpClient.delete<{ id: string }>(`/found-items/${id}`),

  markReturned: (id: string) =>
    httpClient.patch<FoundItemDetail>(`/found-items/${id}/return`, {}),
};
