import { db } from "@/lib/db";
import { Problem } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const setId = req.nextUrl.searchParams.get("setId");

  if (!setId) {
    return Problem(400, "Bad request", "setId is required parameter");
  }

  const foundTerms = await db.term.findMany({
    where: {
      setId: setId,
    },
  });

  return NextResponse.json(foundTerms, { status: 200 });
}
