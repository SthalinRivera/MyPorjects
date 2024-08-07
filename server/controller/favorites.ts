import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const allFavorites = async () => {
  return await prisma.favorites.findMany({
    orderBy: {
      id: "asc"
    }
  });
}

export const addLike = async (event: H3Event): Promise<string> => {
  try {
    const { projectId, userId } = await readBody(event);

    if (!projectId || !userId) {
      throw createError({
        statusCode: 400,
        message: "Project ID and User ID are required"
      });
    }

    // Convert IDs to numbers
    const projectIdNumber = parseInt(projectId, 10);
    const userIdNumber = parseInt(userId, 10);

    // Check if the user has already liked this project
    const existingLike = await prisma.favorites.findFirst({
      where: {
        projectId: projectIdNumber,
        userId: userIdNumber,
      },
    });

    if (existingLike) {
      throw createError({
        statusCode: 400,
        message: "User has already liked this project"
      });
    }

    // Add the like
    await prisma.favorites.create({
      data: {
        projectId: projectIdNumber,
        userId: userIdNumber,
        likes: 1 // Provide a value for the 'likes' field
      },
    });

    // Increment the like count in the project
    await prisma.project.update({
      where: { id: projectIdNumber },
      data: { likes: { increment: 1 } },
    });

    return "Like added successfully!";
  } catch (error:unknown) {
    throw createError({
      statusCode: 500,
      // message: error.message,
    });
  }
};
