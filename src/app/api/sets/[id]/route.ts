import { db } from "@/lib/db";
import { Problem } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const foundSet = await db.set.findFirst({
    where: {
      id: context.params.id,
    },
  });

  if (!foundSet) {
    return Problem(
      404,
      "Not found",
      `Couldn't find set '${context.params.id}'`
    );
  }

  return NextResponse.json(foundSet, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const foundSet = await db.set.findFirst({
    where: {
      id: context.params.id,
    },
  });

  if (!foundSet) {
    return Problem(404, "Not found", `set ${context.params.id} not found`);
  }

  await db.set.delete({
    where: {
      id: foundSet.id,
    },
  });

  await db.term.deleteMany({
    where: {
      setId: foundSet.id,
    },
  });

  return NextResponse.json(
    {},
    {
      status: 201,
    }
  );
}
