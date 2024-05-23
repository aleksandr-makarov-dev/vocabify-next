import { z } from "zod";
import {
  questionFormSchema,
  setFormSchema,
  setImportFormSchema,
} from "../schemas";
import { TermFormSchema } from "@/features/terms/types";

export type Set = {
  id: string;
  title: string;
  description?: string | null;
  image?: string | null;
  url?: string;
  textLang: string;
  definitionLang: string;
};

export type SetWithTerms = {
  title: string;
  description: string;
  image?: string;
  textLang: string;
  definitionLang: string;
  terms: TermFormSchema[];
};

export type SetFormSchema = z.infer<typeof setFormSchema>;

export type CreateSetSchema = SetFormSchema;

export type SetImportFormSchema = z.infer<typeof setImportFormSchema>;

export type QuestionFormSchema = z.infer<typeof questionFormSchema>;
