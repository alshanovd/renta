"use server";

import prisma from "@/prisma/prisma";
import { Flat } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFlatAction(prevState: Flat, formData: FormData) {
  const data = {
    id: Number(formData.get("id")) ? Number(formData.get("id")) : undefined,
    title: formData.get("title"),
    paymentDay: Number(formData.get("paymentDay")),
    paymentAmount: Number(formData.get("paymentAmount")),
  } as Flat;
  const response = data.id
    ? await prisma.flat.update({ where: { id: data.id }, data })
    : await prisma.flat.create({ data });
  // if (data.id) {
  //   revalidatePath(`/settings/${response.id}`);
  // } else {
  //   redirect(`/settings/${response.id}`);
  // }
  redirect(`/settings`);
}
