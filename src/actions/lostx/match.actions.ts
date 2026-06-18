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
