"use server";

import { z } from "zod";
import { chatbotService } from "@/services/lostx/chatbot.service";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

const chatMessageSchema = z.object({
  message: z.string().trim().min(3).max(1000),
});

export async function sendChatMessageAction(message: string) {
  const parsed = chatMessageSchema.safeParse({ message });

  if (!parsed.success) {
    return {
      success: false as const,
      message: parsed.error.issues[0]?.message ?? "Invalid message",
    };
  }

  try {
    const response = await chatbotService.chat(parsed.data.message);

    return {
      success: true as const,
      message: response.message,
      data: response.data,
    };
  } catch (error: unknown) {
    return {
      success: false as const,
      message: getApiErrorMessage(error, "Failed to get a chatbot response"),
    };
  }
}
