import { ProblemDetails } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clearText(text: string): string {
  return text.replace(/\s*\([^)]*\)/g, "");
}

export function Problem(status: number, title: string, detail: string) {
  const problem: ProblemDetails = {
    title: title,
    status: status,
    detail: detail,
  };

  return NextResponse.json(problem, { status: status });
}
