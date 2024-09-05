import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title } = await req.json();

  await prisma.flat.create({
    data: { title },
  });

  return NextResponse.json({ message: "Created Todo" }, { status: 200 });
}