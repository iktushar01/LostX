"use server";

import { revalidatePath } from "next/cache";
import { foundItemService } from "@/services/lostx/found-item.service";
import { createFoundItemSchema } from "@/zod/lostx.validation";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

export async function createFoundItemAction(formData: FormData) {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    imageUrl: formData.get("imageUrl") || "",
    location: formData.get("location"),
    dateFound: formData.get("dateFound"),
  };

  const parsed = createFoundItemSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Validation failed",
    };
  }

  try {
    const payload = {
      ...parsed.data,
      imageUrl: parsed.data.imageUrl || null,
    };

    const response = await foundItemService.create(payload);

    revalidatePath("/dashboard/found");
    revalidatePath("/browse");

    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error: unknown) {
    return { success: false, message: getApiErrorMessage(error, "Failed to create found item") };
  }
}

export async function getFoundItemsAction(params?: Record<string, unknown>) {
  try {
    const response = await foundItemService.list(params);
    return { success: true, data: response.data, meta: response.meta };
  } catch {
    return { success: false, data: [], meta: undefined };
  }
}

export async function getFoundItemByIdAction(id: string) {
  try {
    const response = await foundItemService.getById(id);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
}

export async function deleteFoundItemAction(id: string) {
  try {
    const response = await foundItemService.delete(id);
    revalidatePath("/dashboard/found");
    revalidatePath("/browse");
    return { success: true, message: response.message };
  } catch (error: unknown) {
    return { success: false, message: getApiErrorMessage(error, "Failed to delete found item") };
  }
}
