import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { date, flatId, movedInAt, company, duration } = await req.json();

  let result;
  try {
    result = await prisma.booking.create({
      data: { flatId, movedInAt, company, duration },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
