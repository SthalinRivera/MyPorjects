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

// export const productById = async (event: H3Event) => {
//   const request = getRouterParams(event);
//   if (!request.id) {
//     throw createError({
//       statusCode: 400,
//       name: "Product invalid",
//       message: "Product ID is required",
//     });
//   }

//   const product = await prisma.product.findFirst({
//     where: {
//       id: +request.id,
//     },
//     include: {
//       category: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });

//   if (!product) {
//     throw createError({
//       statusCode: 404,
//       name: "Product not found",
//       message: "No product found with the given ID",
//     });
//   }

//   return product;
// };
// export const productById = async (event: H3Event) => {
//   const request = getRouterParams(event);
//   if (!request.id) {
//     throw createError({
//       statusCode: 400,
//       name: "Product invalid",
//       message: "Product ID is required",
//     });
//   }

//   const now = new Date();
//   const product = await prisma.product.findUnique({
//     where: { id: +request.id },
//     include: {
//       category: { select: { name: true } },
//       promotions: {
//         where: {
//           startDate: { lte: now },
//           endDate: { gte: now }
//         },
//         orderBy: { discount: 'desc' },
//         take: 1
//       }
//     },
//   });

//   if (!product) {
//     throw createError({
//       statusCode: 404,
//       name: "Product not found",
//       message: "No product found with the given ID",
//     });
//   }

//   // Calcular precio con descuento
//   const currentPrice = product.promotions.length > 0
//     ? calculateDiscountedPrice(product.price, product.promotions[0])
//     : product.price;

//   return {
//     ...product,
//     currentPrice,
//     originalPrice: product.price,
//     hasPromotion: product.promotions.length > 0
//   };
// };
export const productById = async (event: H3Event) => {
  const { id } = getRouterParams(event);
  const now = new Date();

  // 1. Obtener el producto con promociones activas
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      category: true,
      promotions: {
        where: {
          startDate: { lte: now },
          endDate: { gte: now }
        },
        orderBy: { discount: 'desc' }
      }
    }
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Producto no encontrado"
    });
  }

  // 2. Convertir precios a números (evitar strings como "23")
  const price = parseFloat(product.price.toString()); // Asegura que sea número
  const hasPromotion = product.promotions.length > 0;
  const currentPromotion = hasPromotion ? product.promotions[0] : null;

  // 3. Calcular precio con descuento (manejo seguro de tipos)
  const currentPrice = currentPromotion
    ? calculateDiscountedPrice(price, currentPromotion)
    : price;

  // 4. Retornar datos consistentes (todos los precios como números)
  return {
    ...product,
    price: price,          // Número (ej: 23)
    currentPrice,          // Número (ej: 11.5 si hay 50% de descuento)
    originalPrice: price,  // Número (igual que price, pero útil para el frontend)
    hasPromotion,
    currentPromotion: currentPromotion
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
