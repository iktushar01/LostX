import { httpClient } from "@/lib/axios/httpClient";
import {
  AiVerificationAnswer,
  AiVerificationQuestion,
  Claim,
  ClaimListFilters,
  ClaimMessage,
} from "@/types/lostx.types";

export const claimService = {
  generateVerificationQuestions: (data: { foundItemId: string; lostItemId: string }) =>
    httpClient.post<{ questions: AiVerificationQuestion[] }>(
      "/claims/verification-questions",
      data,
    ),

  generateVerificationQuestionsPreview: (data: {
    foundItemId: string;
    title: string;
    description: string;
    privateDescription: string;
  }) =>
    httpClient.post<{ questions: AiVerificationQuestion[] }>(
      "/claims/verification-questions/preview",
      data,
    ),

  create: (data: {
    foundItemId: string;
    lostItemId: string;
    answer?: string;
    aiQuestions?: AiVerificationQuestion[];
    aiAnswers?: AiVerificationAnswer[];
  }) => httpClient.post<Claim>("/claims", data),

  createQuick: (data: Record<string, unknown>) =>
    httpClient.post<Claim>("/claims/quick", data),

  confirmReceived: (id: string) =>
    httpClient.patch<Claim>(`/claims/${id}/confirm-received`, {}),

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

  listMessages: (claimId: string) => httpClient.get<ClaimMessage[]>(`/claims/${claimId}/messages`),

  sendMessage: (claimId: string, content: string) =>
    httpClient.post<ClaimMessage>(`/claims/${claimId}/messages`, { content }),
};
