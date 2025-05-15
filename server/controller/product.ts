import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
import { Project } from "~/interfaces/project";


const prisma = new PrismaClient();

export const allProject = async () => {
  return await prisma.project.findMany({
    orderBy: {
      id: "asc"
    },
    include: {
      Category: true,
    }
  });
}


export const paginatedProducts = async (event: H3Event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 12;
  const skip = (page - 1) * limit;

  const [products, totalItems] = await Promise.all([
    prisma.project.findMany({ skip, take: limit /* ... */ }),
    prisma.project.count()
  ]);

  // Estructura de respuesta CORRECTA
  return {
    data: products,
    meta: {  // Asegúrate de incluir este objeto meta
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      itemsPerPage: limit
    }
  };
}


export const productById = async (event: H3Event) => {
  const { id } = getRouterParams(event);
  const now = new Date();

  // 1. Obtener el producto con promociones activas
  const product = await prisma.project.findUnique({
    where: { id: Number(id) },
    include: {
      Category: true,

    }
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Producto no encontrado"
    });
  }


  // 4. Retornar datos consistentes (todos los precios como números)
  return {
    ...product
  };
};

// Función auxiliar para calcular descuentos
function calculateDiscountedPrice(price: number, promotion: any) {
  // Asegurar que el descuento sea número (evitar strings como "50")
  const discount = parseFloat(promotion.discount.toString());

  if (promotion.isPercentage) {
    return price * (1 - discount / 100); // Descuento porcentual (ej: 50% → 23 * 0.5 = 11.5)
  } else {
    return Math.max(0, price - discount); // Descuento fijo (ej: 10€ de descuento)
  }
}



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
    const products = await prisma.project.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        Category: true,
      },
      orderBy: {
        id: "asc",
      },

    });

    return products;
  } catch (error: any) {
    console.error("Error al obtener productos por categoría:", error);
    throw createError({
      statusCode: 500,
      name: "Error Fetching Category Products",
      message: error.message,
    });
  }
};
export const addProject = async (event: H3Event): Promise<string> => {
  try {
    const body = await readBody<Project>(event);

    const slug = body.title.toLowerCase().replace(/\s+/g, '-');

    await prisma.project.create({
      data: {
        title: body.title,
        slug,
        description: body.description,
        image_url: body.image_url,
        project_url: body.project_url,
        code_url: body.code_url,
        video_url: body.video_url,
        tags: body.tags,
        technologies: body.technologies,
        categoryId: body.categoryId,
        userId: body.userId,
        startDate: body.startDate,
        endDate: body.endDate,
      },
    });

    return "Proyecto creado con éxito.";
  } catch (error) {
    console.error("Error al crear proyecto:", error);
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : "Error desconocido"
    });
  }
};

export const updateProject = async (event: H3Event): Promise<string> => {
  try {
    const body = await readBody<Project>(event);
    const { id } = getRouterParams(event); // Asegúrate de pasar `id` en la URL
    const projectId = Number(id);

    if (isNaN(projectId)) {
      throw createError({
        statusCode: 400,
        name: "Invalid Project ID",
        message: "El ID del proyecto debe ser un número válido.",
      });
    }

    const slug = body.title.toLowerCase().replace(/\s+/g, '-');

    await prisma.project.update({
      where: { id: projectId },
      data: {
        title: body.title,
        slug,
        description: body.description,
        image_url: body.image_url,
        project_url: body.project_url,
        code_url: body.code_url,
        video_url: body.video_url,
        tags: body.tags,
        technologies: body.technologies,
        categoryId: body.categoryId,
        userId: body.userId,
        startDate: body.startDate,
        endDate: body.endDate,
      },
    });

    return "Proyecto actualizado con éxito.";
  } catch (error: any) {
    console.error("Error al actualizar proyecto:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      name: error.name || "Error actualizando proyecto",
      message: error.message || "Error desconocido",
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
