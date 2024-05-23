import { z } from "zod";
import { termFormSchema, termsListFormSchema } from "../schemas";

export type Term = {
  id: string;
  text: string;
  definition: string;
  image?: string;
  textTtsUrl?: string;
  definitionTtsUrl?: string;
  setId: string;
};

export type TermFormSchema = z.infer<typeof termFormSchema>;

export type TermsListFormSchema = z.infer<typeof termsListFormSchema>;

export type TermQuestion = {
  term: Term;
  options: { value: string; isCorrect: boolean }[];
};
