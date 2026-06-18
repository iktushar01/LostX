import { httpClient } from "@/lib/axios/httpClient";
import { ChatbotResponse } from "@/types/lostx.types";

export const chatbotService = {
  chat: (message: string) =>
    httpClient.post<ChatbotResponse>("/chatbot/chat", { message }, { timeout: 120000 }),
};
