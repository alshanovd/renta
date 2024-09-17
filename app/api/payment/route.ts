import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return await createPayment(req);
}

export async function DELETE(req: Request) {
  return await deletePayment(req);
}

async function createPayment(req: Request) {
  try {
    const { amount, flatId } = await req.json();
    const payment = await prisma.landlordPayments.create({
      data: { amount, paidAt: new Date(), flatId },
    });
    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

async function deletePayment(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.landlordPayments.delete({
      where: { id },
    });
    return NextResponse.json(204);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
