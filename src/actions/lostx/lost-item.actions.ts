"use server";

import { revalidatePath } from "next/cache";
import { lostItemService } from "@/services/lostx/lost-item.service";
import { createLostItemSchema } from "@/zod/lostx.validation";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

export async function createLostItemAction(formData: FormData) {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    location: formData.get("location"),
    dateLost: formData.get("dateLost"),
    verificationQuestion: formData.get("verificationQuestion"),
    verificationAnswer: formData.get("verificationAnswer"),
  };

  const parsed = createLostItemSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Validation failed",
    };
  }

  try {
    const payload = new FormData();
    payload.append("title", parsed.data.title);
    payload.append("description", parsed.data.description);
    payload.append("category", parsed.data.category);
    payload.append("location", parsed.data.location);
    payload.append("dateLost", parsed.data.dateLost);
    payload.append("verificationQuestion", parsed.data.verificationQuestion);
    payload.append("verificationAnswer", parsed.data.verificationAnswer);

    const image = formData.get("image");
    if (image instanceof File && image.size > 0) {
      payload.append("image", image);
    }

    const response = await lostItemService.create(payload);

    revalidatePath("/dashboard/lost");
    revalidatePath("/dashboard");
    revalidatePath("/browse");

    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error: unknown) {
    return { success: false, message: getApiErrorMessage(error, "Failed to create lost item") };
  }
}

export async function getLostItemsAction(params?: Record<string, unknown>) {
  try {
    const response = await lostItemService.list(params);
    return { success: true, data: response.data, meta: response.meta };
  } catch {
    return { success: false, data: [], meta: undefined };
  }
}

export async function getMyLostItemsAction(limit?: number) {
  try {
    const response = await lostItemService.listMine({ limit: limit ?? 50 });
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: [] };
  }
}

export async function getMyLostItemsForClaimAction() {
  try {
    const response = await lostItemService.listMineForClaim();
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: [] };
  }
}

export async function getLostItemByIdAction(id: string) {
  try {
    const response = await lostItemService.getById(id);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
}

export async function deleteLostItemAction(id: string) {
  try {
    const response = await lostItemService.delete(id);
    revalidatePath("/dashboard/lost");
    revalidatePath("/dashboard");
    revalidatePath("/browse");
    return { success: true, message: response.message };
  } catch (error: unknown) {
    return { success: false, message: getApiErrorMessage(error, "Failed to delete lost item") };
  }
}
