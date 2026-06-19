import { z } from "zod";
import { ITEM_CATEGORIES } from "@/types/lostx.types";

const SENSITIVE_CATEGORIES = ["WALLET", "PHONE", "ID_CARD"] as const;

export const defaultVisibilityForCategory = (category: string) => {
  const sensitive = SENSITIVE_CATEGORIES.includes(category as (typeof SENSITIVE_CATEGORIES)[number]);
  return {
    showImagePublic: !sensitive,
    showDescriptionPublic: !sensitive,
    showLocationPublic: false,
  };
};

export const createLostItemSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(120),
  description: z.string().min(5, "Public summary must be at least 5 characters").max(500),
  privateDescription: z
    .string()
    .min(10, "Private details must be at least 10 characters")
    .max(5000),
  category: z.enum(ITEM_CATEGORIES),
  location: z.string().min(2, "Location is required").max(200),
  dateLost: z.string().min(1, "Date is required"),
  showImagePublic: z.boolean().optional(),
  showDescriptionPublic: z.boolean().optional(),
  showLocationPublic: z.boolean().optional(),
});

export const createFoundItemSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(120),
  description: z.string().min(5, "Public summary must be at least 5 characters").max(500),
  privateDescription: z
    .string()
    .min(10, "Private details must be at least 10 characters")
    .max(5000),
  category: z.enum(ITEM_CATEGORIES),
  location: z.string().min(2, "Location is required").max(200),
  dateFound: z.string().min(1, "Date is required"),
  showImagePublic: z.boolean().optional(),
  showDescriptionPublic: z.boolean().optional(),
  showLocationPublic: z.boolean().optional(),
  linkedLostItemId: z.string().min(1).optional(),
});

export const finderTipSchema = z.object({
  note: z.string().max(500).optional(),
  location: z.string().min(2, "Location is required").max(200),
  dateFound: z.string().min(1, "Date is required"),
});

const aiQuestionSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(5),
});

const aiAnswerSchema = z.object({
  id: z.string().min(1),
  answer: z.string().min(1).max(2000),
});

export const createClaimSchema = z
  .object({
    foundItemId: z.string().min(1),
    lostItemId: z.string().min(1, "Select a lost item report"),
    answer: z.string().optional(),
    aiQuestions: z.array(aiQuestionSchema).optional(),
    aiAnswers: z.array(aiAnswerSchema).optional(),
  })
  .refine(
    (data) =>
      (data.aiQuestions?.length && data.aiAnswers?.length) || data.answer?.trim(),
    { message: "Answer all verification questions" },
  );

export const quickClaimSchema = z.object({
  foundItemId: z.string().min(1),
  title: z.string().min(2, "Title must be at least 2 characters").max(120),
  description: z.string().min(5, "Public summary must be at least 5 characters").max(500),
  privateDescription: z
    .string()
    .min(10, "Private details must be at least 10 characters")
    .max(5000),
  category: z.enum(ITEM_CATEGORIES),
  location: z.string().min(2, "Location is required").max(200),
  building: z.string().max(120).optional(),
  floor: z.string().max(20).optional(),
  room: z.string().max(20).optional(),
  dateLost: z.string().min(1, "Date is required"),
  showImagePublic: z.boolean().optional(),
  showDescriptionPublic: z.boolean().optional(),
  showLocationPublic: z.boolean().optional(),
  aiQuestions: z.array(aiQuestionSchema).min(1),
  aiAnswers: z.array(aiAnswerSchema).min(1),
});

export type CreateLostItemInput = z.infer<typeof createLostItemSchema>;
export type CreateFoundItemInput = z.infer<typeof createFoundItemSchema>;
export type CreateClaimInput = z.infer<typeof createClaimSchema>;
export type QuickClaimInput = z.infer<typeof quickClaimSchema>;
