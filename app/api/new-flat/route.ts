import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, paymentAmount, paymentDay } = await req.json();

  let result;
  try {
    result = await prisma.flat.create({
      data: { title, paymentAmount, paymentDay }
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
