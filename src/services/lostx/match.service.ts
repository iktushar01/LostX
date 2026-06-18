import { httpClient } from "@/lib/axios/httpClient";
import { BrowseMatchSuggestions, ScoredMatch } from "@/types/lostx.types";

export const matchService = {
  getBrowseSuggestions: () =>
    httpClient.get<BrowseMatchSuggestions>("/matches/browse"),

  getForLostItem: (id: string) =>
    httpClient.get<ScoredMatch[]>(`/matches/for-lost/${id}`),

  getForFoundItem: (id: string) =>
    httpClient.get<ScoredMatch[]>(`/matches/for-found/${id}`),
};
