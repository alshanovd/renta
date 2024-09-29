import prisma from "@/prisma/prisma";
import { cache } from "react";

export const GetFlats = cache(async () => await prisma.flat.findMany());
