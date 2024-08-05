
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
export const projectById = async (event: H3Event) => {

  const request = getRouterParams(event);
  if (!request.id) {
    throw createError({
      statusCode: 400,
      name: "Project invalido",
      //  message: error.message  
    });
  }
  const user = prisma.project.findFirst({
    where: {
      id: +request.id,
    }
  })
  return !user ? "Project not found" : user;
};

export const addProject = async (event: H3Event): Promise<string> => {
  try {
    const request = await readBody<Project>(event);
    await prisma.project.create({
      data: {
        ...request,
      },
    });
    return "Project  added!";
  } catch (error) {
    throw createError({
      statusCode: 500,
      name: "Error creating project",
       message: error.message  
    });
  }
};

export const actuliazar = async (event: H3Event): Promise<string> => {
  try {
    const requestBody = await readBody(event);
    const request = await readBody(event);

    if (!request.id) {
      throw createError({
        statusCode: 400,
        name: "video invalido",
        //  message: error.message  
      });
    }
    await prisma.project.update({
      where: {
        id: +request.id,
      },
      data:{
      title: requestBody.description,
      description: requestBody.url,
    },
  });
  return "Video actualizado!";
} catch (error) {
  throw createError({
    statusCode: 500,
    name: "Error al actulizar video",
    //  message: error.message  
  });
}
};

export const eliminar = async (event: H3Event) => {
  try {
    const requestBody = await readBody(event);
    const request = await readBody(event);

    if (!request.id) {
      throw createError({
        statusCode: 400,
        name: "video invalido",
        //  message: error.message  
      });
    }
    await prisma.project.delete({
      where: {
        id: +request.id,
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
