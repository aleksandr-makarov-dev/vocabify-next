import { z } from "zod";

export const termFormSchema = z.object({
  text: z.string().min(1),
  definition: z.string().optional(),
  image: z.string().optional(),
  textTtsUrl: z.string().optional(),
  definitionTtsUrl: z.string().nullish(),
});

export const termsListFormSchema = z.object({
  terms: z.array(termFormSchema).min(1),
});
