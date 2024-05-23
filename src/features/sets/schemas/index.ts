import { termFormSchema } from "@/features/terms/schemas";
import { z } from "zod";

export const setFormSchema = z.object({
  title: z.string().min(5),
  description: z.string().optional(),
  image: z.string().optional(),
  textLang: z.string().length(2),
  definitionLang: z.string().length(2),
  terms: z.array(termFormSchema).min(2, "Must import at least 2 items"),
});

export const MAX_FILE_SIZE = 2097152;
export const ACCEPTED_TYPES = ["text/html"];

export const setImportFormSchema = z.object({
  file: z
    .instanceof(File)
    .refine((f) => f.size <= MAX_FILE_SIZE, "Max file size is 2 mb")
    .refine(
      (f) => ACCEPTED_TYPES.includes(f.type),
      "Only .html type is allowed"
    ),
});

export const questionFormSchema = z.object({
  answer: z.string().min(1, "Choose one option"),
});
