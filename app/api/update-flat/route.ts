import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { id, title, landlord, paymentAmount, paymentDay } = await req.json();

  let result;
  try {
    result = await prisma.flat.update({
      where: { id },
      data: {
        title,
        landlord,
        paymentAmount,
        paymentDay,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
