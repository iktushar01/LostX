"use server";

import { revalidatePath } from "next/cache";
import { foundItemService } from "@/services/lostx/found-item.service";
import { createFoundItemSchema } from "@/zod/lostx.validation";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

export async function createFoundItemAction(formData: FormData) {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    privateDescription: formData.get("privateDescription"),
    category: formData.get("category"),
    location: formData.get("location"),
    dateFound: formData.get("dateFound"),
    showImagePublic: formData.get("showImagePublic") === "true",
    showDescriptionPublic: formData.get("showDescriptionPublic") === "true",
    showLocationPublic: formData.get("showLocationPublic") === "true",
  };

  const parsed = createFoundItemSchema.safeParse(raw);

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
    payload.append("privateDescription", parsed.data.privateDescription);
    payload.append("category", parsed.data.category);
    payload.append("location", parsed.data.location);
    payload.append("dateFound", parsed.data.dateFound);
    payload.append("showImagePublic", String(parsed.data.showImagePublic ?? true));
    payload.append("showDescriptionPublic", String(parsed.data.showDescriptionPublic ?? true));
    payload.append("showLocationPublic", String(parsed.data.showLocationPublic ?? false));

    const image = formData.get("image");
    if (image instanceof File && image.size > 0) {
      payload.append("image", image);
    }

    const response = await foundItemService.create(payload);

    revalidatePath("/dashboard/found");
    revalidatePath("/dashboard");
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

export async function getMyFoundItemsAction(limit?: number) {
  try {
    const response = await foundItemService.listMine({ limit: limit ?? 50 });
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: [] };
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
    revalidatePath("/dashboard");
    revalidatePath("/browse");
    return { success: true, message: response.message };
  } catch (error: unknown) {
    return { success: false, message: getApiErrorMessage(error, "Failed to delete found item") };
  }
}

export async function markFoundItemReturnedAction(id: string) {
  try {
    const response = await foundItemService.markReturned(id);
    revalidatePath(`/dashboard/found/${id}`);
    revalidatePath("/dashboard/found");
    revalidatePath("/dashboard");
    revalidatePath("/browse");
    revalidatePath("/claims");
    return { success: true, message: response.message, data: response.data };
  } catch (error: unknown) {
    return {
      success: false,
      message: getApiErrorMessage(error, "Failed to mark item as returned"),
    };
  }
}

export async function updateFoundItemAction(id: string, formData: FormData) {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
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
    const payload = new FormData();
    Object.entries(parsed.data).forEach(([key, value]) => payload.append(key, String(value ?? "")));

    const image = formData.get("image");
    if (image instanceof File && image.size > 0) {
      payload.append("image", image);
    }

    const response = await foundItemService.update(id, payload);
    revalidatePath(`/dashboard/found/${id}`);
    revalidatePath("/dashboard/found");
    revalidatePath("/dashboard");
    revalidatePath("/browse");
    return { success: true, message: response.message, data: response.data };
  } catch (error: unknown) {
    return { success: false, message: getApiErrorMessage(error, "Failed to update found item") };
  }
}
