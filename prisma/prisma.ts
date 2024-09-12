import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

let prisma = new PrismaClient()

export default prisma;