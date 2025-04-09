
import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";

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
    if (!request.name) {
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

export const updateCategory = async (event: H3Event): Promise<string> => {
  try {
    const request = await readBody<Category>(event);
    console.log(request); // Debugging line to check the content
    if (!request.id) {
      throw createError({
        statusCode: 400,
        name: "Invalid request",
        message: "Category ID are required",
      });
    }

    await prisma.category.update({
      where: {
        id: +request.id,
      },
      data: {
        name: request.name,
      },
    });

    return "Category updated!";
  } catch (error) {
    console.error("Error updating category:", error);
    throw createError({
      statusCode: 500,
      name: "Error updating category",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteCategory = async (event: H3Event) => {
  try {

    const request = getRouterParams(event);  // Extracts parameters from the event object
    const categoryId = Number(request.id); // Ensure categoryId is a number

    if (isNaN(categoryId)) {
      throw createError({
        statusCode: 400,
        name: "Invalid Category ID",
        message: "El ID de categoría debe ser un número válido.",
      });
    }
    await prisma.category.delete({
      where: {
        id: categoryId,
      },

    });

    return "Video eliminado"
  } catch (error) {
    throw createError({
      statusCode: 500,
      name: "Error al eliminar",
      //  message: error.message 
    });
  }
};