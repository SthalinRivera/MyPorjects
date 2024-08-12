
import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
import { Project } from "~/interfaces/project";
const prisma = new PrismaClient();
const { client } = postgresClient();

export const allCategory = async () => {
  return await prisma.category.findMany({
    orderBy: {
      id: "asc"
    }
  })
}

