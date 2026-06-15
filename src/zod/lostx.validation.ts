import { z } from "zod";
import { ITEM_CATEGORIES } from "@/types/lostx.types";

export const createLostItemSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(120),
  description: z.string().min(5, "Description must be at least 5 characters").max(2000),
  category: z.enum(ITEM_CATEGORIES),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  location: z.string().min(2, "Location is required").max(200),
  dateLost: z.string().min(1, "Date is required"),
});

export const createFoundItemSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(120),
  description: z.string().min(5, "Description must be at least 5 characters").max(2000),
  category: z.enum(ITEM_CATEGORIES),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  location: z.string().min(2, "Location is required").max(200),
  dateFound: z.string().min(1, "Date is required"),
});

export const createClaimSchema = z.object({
  foundItemId: z.string().uuid(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type CreateLostItemInput = z.infer<typeof createLostItemSchema>;
export type CreateFoundItemInput = z.infer<typeof createFoundItemSchema>;
export type CreateClaimInput = z.infer<typeof createClaimSchema>;
