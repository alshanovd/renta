import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { flatId } = await req.json();

  try {
    const result = await prisma.flat.delete({ where: { id: flatId } });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
