
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
        select: { projects: true }
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

    // Validación básica
    if (!request.name || !request.imageUrl) {
      throw new Error("Nombre e imagen son campos requeridos");
    }

    // Validar URLs
    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    if (!isValidUrl(request.imageUrl)) {
      throw new Error("La URL de la imagen no es válida");
    }

    // Generar slug automáticamente
    const generateSlug = (name: string) => {
      return name
        .toLowerCase()
        .replace(/\s+/g, '-')       // Reemplaza espacios con guiones
        .replace(/[^\w\-]+/g, '')  // Elimina caracteres no alfanuméricos
        .replace(/\-\-+/g, '-')     // Reemplaza múltiples guiones con uno solo
        .replace(/^-+/, '')         // Elimina guiones al inicio
        .replace(/-+$/, '');        // Elimina guiones al final
    };

    const slug = generateSlug(request.name);

    // Verificar si el slug ya existe
    const existingCategory = await prisma.category.findUnique({
      where: { slug }
    });

    if (existingCategory) {
      throw new Error("Ya existe una categoría con ese nombre/slug");
    }

    // Crear la categoría
    await prisma.category.create({
      data: {
        name: request.name,
        slug,
        imageUrl: request.imageUrl,
        description: request.description || null,
      },
    });

    return "Categoría creada exitosamente!";
  } catch (error) {
    console.error("Error adding category:", error);

    // Manejar errores específicos de Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw createError({
          statusCode: 409,
          message: "El slug de categoría ya existe",
        });
      }
    }

    throw createError({
      statusCode: error.statusCode || 500,
      name: "CATEGORY_CREATION_ERROR",
      message: error instanceof Error ? error.message : "Error desconocido al crear categoría",
    });
  }
};

export const updateCategory = async (event: H3Event): Promise<string> => {
  try {
    const request = await readBody<Category>(event);

    if (!request.id || !request.name || !request.imageUrl) {
      throw createError({
        statusCode: 400,
        name: "INVALID_REQUEST",
        message: "ID, nombre e imagen son campos requeridos",
      });
    }

    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    if (!isValidUrl(request.imageUrl)) {
      throw createError({
        statusCode: 400,
        name: "INVALID_IMAGE_URL",
        message: "La URL de la imagen no es válida",
      });
    }


    const generateSlug = (name: string) => {
      return name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    };

    const newSlug = generateSlug(request.name);

    const existingCategory = await prisma.category.findFirst({
      where: {
        slug: newSlug,
        NOT: { id: +request.id }, // Asegura que no se compare con la misma categoría
      },
    });

    if (existingCategory) {
      throw createError({
        statusCode: 409,
        name: "SLUG_CONFLICT",
        message: "Ya existe otra categoría con ese nombre/slug",
      });
    }

    await prisma.category.update({
      where: { id: +request.id },
      data: {
        name: request.name,
        slug: newSlug,
        imageUrl: request.imageUrl,
        bannerUrl: request.bannerUrl || null,
        description: request.description || null,
      },
    });

    return "Categoría actualizada exitosamente!";
  } catch (error) {
    console.error("Error updating category:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw createError({
          statusCode: 409,
          message: "El slug de categoría ya existe",
        });
      }
    }

    throw createError({
      statusCode: error.statusCode || 500,
      name: "CATEGORY_UPDATE_ERROR",
      message: error instanceof Error ? error.message : "Error desconocido al actualizar la categoría",
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
export const personalizedCategory = async (event: H3Event) => {
  try {
    // Buscamos la categoría con slug 'personalizados'
    const personalizedCategory = await prisma.category.findFirst({
      where: {
        slug: 'personalizados'
      },
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
        description: true
        // Puedes incluir otros campos que necesites
      }
    });

    if (!personalizedCategory) {
      throw createError({
        statusCode: 404,
        name: "PersonalizedCategoryNotConfigured",
        message: "No se encontró la categoría de productos personalizados. Por favor configura una categoría con slug 'personalizados' en el administrador."
      });
    }

    return personalizedCategory;
  } catch (error) {
    throw createError({
      statusCode: 500,
      name: "PersonalizedCategoryError",
      message: error instanceof Error ? error.message : 'Error al obtener la categoría de personalizados'
    });
  }
};