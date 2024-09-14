import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { duration, id } = await req.json();

  let result;
  try {
    result = await prisma.booking.update({
      where: { id },
      data: { duration },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
