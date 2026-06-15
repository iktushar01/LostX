import { httpClient } from "@/lib/axios/httpClient";
import { Claim } from "@/types/lostx.types";

export const claimService = {
  create: (data: { foundItemId: string; message: string }) =>
    httpClient.post<Claim>("/claims", data),

  listMine: () => httpClient.get<Claim[]>("/claims/mine"),

  listAll: () => httpClient.get<Claim[]>("/claims"),

  updateStatus: (id: string, status: "APPROVED" | "REJECTED") =>
    httpClient.patch<Claim>(`/claims/${id}/status`, { status }),
};
