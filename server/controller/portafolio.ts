
import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
import { Project } from "~/interfaces/project";
const prisma = new PrismaClient();
const { client } = postgresClient();

export const allProjets = async () => {
  return await prisma.project.findMany({
    orderBy: {
      id: "asc"
    }
  })
}

export const projectsByCategoryId = async (event: H3Event) => {
  const request = getRouterParams(event);  // Extracts parameters from the event object
  
  const categoryId = Number(request.id); // Ensure categoryId is a number

  if (isNaN(categoryId)) {
    throw createError({
      statusCode: 400,
      name: "Invalid Category ID",
      message: "El ID de categoría debe ser un número válido.",
    });
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        categoryId: categoryId,
      },
      orderBy: {
        id: "asc",
      },
    });

    return projects;
  } catch (error) {
    throw createError({
      statusCode: 500,
      name: "Error Fetching Projects",
      // message: error.message,
    });
  }
};