import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "../auth/[...nextauth]/options";
import { setFormSchema } from "@/features/sets/schemas";
import { db } from "@/lib/db";
import { Paged } from "@/types";
import { Set } from "@/features/sets/types";
import { Problem } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return Problem(401, "Unauthorized", "No session found");
  }

  const body = await req.json();

  const set = setFormSchema.parse(body);

  const createdSet = await db.set.create({
    data: {
      title: set.title,
      description: set.description,
      textLang: set.textLang,
      definitionLang: set.definitionLang,
      image: set.image,
      userId: session.user.id,
    },
  });

  await db.term.createMany({
    data: set.terms.map((t) => ({ ...t, setId: createdSet.id })),
  });

  return NextResponse.json(
    { id: createdSet.id },
    {
      status: 201,
    }
  );
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return Problem(401, "Unauthorized", "Session not found");
  }

  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get("page") as string) || 1;
  const search = searchParams.get("search") as string | undefined;

  const userId = session.user.id;

  const take = 10;

  const sets = await db.set.findMany({
    where: {
      userId: userId,
      ...(search && { title: { contains: search, mode: "insensitive" } }),
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * take,
    take: take,
  });

  const count = await db.set.count({
    where: {
      userId: userId,
      ...(search && { title: { contains: search, mode: "insensitive" } }),
    },
  });

  const result: Paged<Set> = {
    page: page,
    items: sets,
    hasNext: count > page * take,
    hasPrevious: page > 1,
  };

  return NextResponse.json(result, { status: 200 });
}
