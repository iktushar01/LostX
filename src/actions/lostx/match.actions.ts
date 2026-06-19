"use server";

import { matchService } from "@/services/lostx/match.service";

export async function getBrowseMatchSuggestionsAction() {
  try {
    const response = await matchService.getBrowseSuggestions();
    return { success: true, data: response.data };
  } catch {
    return {
      success: false,
      data: { byLostId: {}, byFoundId: {} },
    };
  }
}

export async function getDraftMatchesAction(params: {
  title: string;
  description: string;
  category: string;
  location: string;
  dateFound: string;
}) {
  try {
    const response = await matchService.getDraftMatches(params);
    return { success: true, data: response.data ?? [] };
  } catch {
    return { success: false, data: [] };
  }
}
