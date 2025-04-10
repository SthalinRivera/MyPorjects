
import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";

import { Category } from "~/interfaces/category";
const prisma = new PrismaClient();
const { client } = postgresClient();

export const allCategory = async () => {
  return await prisma.category.findMany({
    orderBy: { id: "asc" },
    include: {
      _count: {
        select: { products: true }
      }
    }
  })
}
export const categoryById = async (event: H3Event) => {
  const request = getRouterParams(event);  // Extrae los parámetros del evento
  const id = Number(request.id); // Asegúrate de que categoryId sea un número

  try {
    const category = await prisma.category.findUnique({
      where: { id: id },
      select: {
        name: true  // Solo seleccionamos el nombre
      }
    });

    if (!category) {
      throw createError({
        statusCode: 404,
        name: "Category Not Found",
        message: `No category found with ID ${id}`
      });
    }

    // Devolvemos el nombre como parte de un objeto
    return { name: category.name };
  } catch (error) {
    throw createError({
      statusCode: 500,
      name: "Error Fetching Category",
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};


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


export const productByCategoryIdCount = async (event: H3Event) => {
  const request = getRouterParams(event);  // Extrae los parámetros del evento

  const categoryId = Number(request.id); // Asegúrate de que categoryId sea un número

  if (isNaN(categoryId)) {
    throw createError({
      statusCode: 400,
      name: "Invalid Category ID",
      message: "El ID de categoría debe ser un número válido.",
    });
  }

  try {
    // Realiza la consulta para obtener los productos y contar la cantidad por categoría
    const categoryWithProducts = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        products: true, // Incluye todos los productos en la categoría
      },
    });

    if (!categoryWithProducts) {
      throw createError({
        statusCode: 404,
        name: "Category Not Found",
        message: "No se encontró la categoría.",
      });
    }

    // Obtén el número de productos
    const productCount = categoryWithProducts.products.length;

    // Retorna los productos y el conteo
    return {
      category: categoryWithProducts,
      productCount,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      name: "Error Fetching Products",

    });
  }
};
