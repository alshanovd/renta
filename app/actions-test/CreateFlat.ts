"use server";

import prisma from "@/prisma/prisma";
import { Flat } from "@prisma/client";
import { revalidateTag } from "next/cache";

export async function createFlat(prevState: Flat, formData: FormData) {
  const data = {
    title: formData.get("title"),
    paymentDay: 14,
    paymentAmount: 10000,
  } as Flat;
  const response = await prisma.flat.create({ data });
  revalidateTag(".flatsss");
  return response;
}
