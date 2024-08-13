import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
import { Project } from "~/interfaces/project";

const prisma = new PrismaClient();

export const allProjets = async () => {
  return await prisma.project.findMany({
    orderBy: {
      id: "asc"
    },
    include: {
      Category: true,
  },
  });
}

export const projectById = async (event: H3Event) => {
  const request = getRouterParams(event);
  if (!request.id) {
    throw createError({
      statusCode: 400,
      name: "Project invalid",
      message: "Project ID is required",
    });
  }

  const project = await prisma.project.findFirst({
    where: {
      id: +request.id,
    }
  });

  return project || createError({
    statusCode: 404,
    name: "Project not found",
    message: "No project found with the given ID",
  });
};

export const addProject = async (event: H3Event): Promise<string> => {
  try {
      const request = await readBody<Project>(event);

      // Convertir categoryId a número
      if (!request.title || !request.description || !request.project_url || !request.image_url || !request.userId || isNaN(Number(request.categoryId))) {
          throw new Error("Missing required fields or invalid categoryId");
      }

      await prisma.project.create({
          data: {
              title: request.title,
              description: request.description,
              image_url: request.image_url,
              project_url: request.project_url,
              code_url: request.code_url || null,
              userId: request.userId,
              categoryId: Number(request.categoryId),
              likes: 0,
          },
      });

      return "Project added!";
  } catch (error) {
      console.error("Error adding project:", error);
      throw createError({
          statusCode: 500,
          name: "Error creating project",
          message: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

export const actuliazar = async (event: H3Event): Promise<string> => {
  try {
    const request = await readBody<Project>(event);

    if (!request.id || !request.categoryId) {
      throw createError({
        statusCode: 400,
        name: "Invalid request",
        message: "Project ID and Category ID are required",
      });
    }

    await prisma.project.update({
      where: {
        id: +request.id,
      },
      data: {
        title: request.title,
        description: request.description,
        project_url: request.project_url,
        code_url: request.code_url || null,
        image_url: request.image_url,
        categoryId: request.categoryId,
      },
    });

    return "Project updated!";
  } catch (error) {
    console.error("Error updating project:", error);
    throw createError({
      statusCode: 500,
      name: "Error updating project",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const eliminar = async (event: H3Event) => {
  try {
    const request = await readBody<{ id: number }>(event);

    if (!request.id) {
      throw createError({
        statusCode: 400,
        name: "Invalid request",
        message: "Project ID is required",
      });
    }

    await prisma.project.delete({
      where: {
        id: +request.id,
      },
    });

    return "Project deleted!";
  } catch (error) {
    console.error("Error deleting project:", error);
    throw createError({
      statusCode: 500,
      name: "Error deleting project",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
