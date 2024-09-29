import prisma from "@/prisma/prisma";
import { cache } from "react";

export const GetFlat = cache(
  async (id: number) => await prisma.flat.findFirst({ where: { id } })
);
