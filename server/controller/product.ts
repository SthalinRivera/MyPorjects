import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
import { Product } from "~/interfaces/product";

const prisma = new PrismaClient();

export const allProduct = async () => {
  return await prisma.product.findMany({
    orderBy: {
      id: "asc"
    },
    include: {
      category: true,
    },
  });
}

export const productById = async (event: H3Event) => {
  const request = getRouterParams(event);
  if (!request.id) {
    throw createError({
      statusCode: 400,
      name: "Project invalid",
      message: "Project ID is required",
    });
  }

  const project = await prisma.product.findFirst({
    where: {
      id: +request.id,
    },

  });

  return project || createError({
    statusCode: 404,
    name: "Project not found",
    message: "No project found with the given ID",
  });
};

export const addProduct = async (event: H3Event): Promise<string> => {
  try {
    const request = await readBody<Product>(event);

    await prisma.product.create({
      data: {
        name: request.name,
        description: request.description,
        price: request.price,
        stock: request.stock,
        imageUrl: request.imageUrl,
        categoryId: request.categoryId,
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
export const productByCategoryId = async (event: H3Event) => {
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
    const products = await prisma.product.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        category: true,
      },
      orderBy: {
        id: "asc",
      },

    });

    return products;
  } catch (error) {
    throw createError({
      statusCode: 500,
      name: "Error Fetching Projects",
      message: error.message,
    });
  }
};


export const updateProduct = async (event: H3Event): Promise<string> => {
  try {
    const request = await readBody<Product>(event);

    if (!request.id || !request.categoryId) {
      throw createError({
        statusCode: 400,
        name: "Invalid request",
        message: "Project ID and Category ID are required",
      });
    }

    await prisma.product.update({
      where: {
        id: +request.id,
      },
      data: {
        name: request.name,
        description: request.description,
        price: request.price,
        stock: request.stock,
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

export const deleteProduct = async (event: H3Event) => {
  try {
    const request = getRouterParams(event);
    const productId = Number(request.id);

    if (isNaN(productId)) {
      throw createError({
        statusCode: 400,
        name: "Invalid Product ID",
        message: "El ID del producto debe ser un número válido.",
      });
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return { success: true, message: "Producto eliminado correctamente" };
  } catch (error: any) {
    console.error("Error al eliminar producto:", error);

    // ⚠️ Verificar si el error es una restricción de clave foránea
    if (error.code === "P2003") { // Código de error de Prisma para claves foráneas
      throw createError({
        statusCode: 400,
        name: "Foreign Key Constraint",
        message: "No se puede eliminar este producto porque está relacionado con otras entidades.",
      });
    }

    throw createError({
      statusCode: 500,
      name: "Error al eliminar",
      message: error.message,
    });
  }
};
