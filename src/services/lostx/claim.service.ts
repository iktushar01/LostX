import { httpClient } from "@/lib/axios/httpClient";
import { Claim, ClaimListFilters } from "@/types/lostx.types";

export const claimService = {
  create: (data: { foundItemId: string; lostItemId: string; answer: string }) =>
    httpClient.post<Claim>("/claims", data),

  listMine: () => httpClient.get<Claim[]>("/claims/mine"),

  listAll: (filters?: ClaimListFilters) => {
    const params = new URLSearchParams();
    if (filters?.search) params.set("search", filters.search);
    if (filters?.status) params.set("status", filters.status);
    const query = params.toString();
    return httpClient.get<Claim[]>(`/claims${query ? `?${query}` : ""}`);
  },

  getById: (id: string) => httpClient.get<Claim>(`/claims/${id}`),

  updateStatus: (id: string, status: "APPROVED" | "REJECTED") =>
    httpClient.patch<Claim>(`/claims/${id}/status`, { status }),
};
