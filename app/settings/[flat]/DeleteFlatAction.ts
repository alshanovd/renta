"use server";

import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";

export async function deleteFlatAction(id: number) {
  await prisma.flat.delete({ where: { id } });
  redirect(`/settings`);
}
