
import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
import { Project } from "~/interfaces/project";
import { Category } from "~/interfaces/category";
const prisma = new PrismaClient();
const { client } = postgresClient();

export const allCategory = async () => {
  return await prisma.category.findMany({
    orderBy: {
      id: "asc"
    }
  })
}

export const addCategory = async (event: H3Event): Promise<string> => {
  try {
      const request = await readBody<Category>(event);

      // Convertir categoryId a número
      if (!request.name ) {
          throw new Error("Missing required fields or invalid categoryId");
      }

      await prisma.category.create({
          data: {
              name: request.name,
          },
      });

      return "Category added!";
  } catch (error) {
      console.error("Error adding category:", error);
      throw createError({
          statusCode: 500,
          name: "Error creating category",
          message: error instanceof Error ? error.message : "Unknown error",
      });
  }
};