import { PrismaClient } from "@prisma/client";
import { H3Event } from "h3";

const prisma = new PrismaClient();

// Obtener todas las promociones activas
export const allActivePromotions = async () => {
    const now = new Date();

    const promotions = await prisma.promotion.findMany({
        include: {
            product: {
                include: {
                    category: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // Agregar campo isActive a cada promoción
    return promotions.map(promotion => ({
        ...promotion,
        isActive: promotion.startDate <= now && promotion.endDate >= now
    }));
};


// 1. Obtener todos los productos con promociones activas
export const allActivePromotions2 = async (event: H3Event) => {
    const now = new Date();

    try {
        // Usar findMany en lugar de findUnique
        const products = await prisma.product.findMany({
            where: {
                isPublished: true, // Asegurándote de que solo se traigan productos publicados
                promotions: {
                    some: {
                        startDate: { lte: now },  // Promociones que han comenzado o están activas
                        endDate: { gte: now }     // Promociones que aún no han finalizado
                    }
                }
            },
            include: {
                category: true,  // Incluir la categoría del producto
                promotions: {
                    where: {
                        startDate: { lte: now },  // Promociones activas
                        endDate: { gte: now }
                    },
                    orderBy: {
                        discount: 'desc'  // Ordenar las promociones por descuento en orden descendente
                    }
                }
            }
        });

        // Mapea los productos para agregarles el precio con descuento
        return products.map(product => {
            const price = parseFloat(product.price.toString());
            const currentPromotion = product.promotions[0]; // Suponemos que hay al menos una promoción
            const currentPrice = currentPromotion
                ? calculateDiscountedPrice(price, currentPromotion)
                : price;

            return {
                ...product,
                price,
                currentPrice,
                originalPrice: price,
                hasPromotion: !!currentPromotion,
                currentPromotion: currentPromotion || null
            };
        });
    } catch (error) {
        console.error("Error al obtener promociones activas:", error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Error al obtener promociones activas'
        });
    }
};

// Función para calcular el precio con descuento
function calculateDiscountedPrice(price: number, promotion: any) {
    const discount = parseFloat(promotion.discount.toString());
    return promotion.isPercentage
        ? price * (1 - discount / 100)
        : Math.max(0, price - discount);
}

// Obtener promoción por ID
export const promotionById = async (event: H3Event) => {
    const { id } = getRouterParams(event);
    return await prisma.promotion.findUnique({
        where: { id: Number(id) },
        include: {
            product: true
        }
    });
};

// Crear nueva promoción
export const addPromotion = async (event: H3Event) => {
    const body = await readBody(event);

    // Validación básica
    if (!body.productId || !body.discount || !body.endDate) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing required fields"
        });
    }

    return await prisma.promotion.create({
        data: {
            productId: Number(body.productId),
            title: body.title,
            description: body.description,
            discount: Number(body.discount),
            isPercentage: body.isPercentage !== false, // default true
            startDate: new Date(body.startDate || new Date()),
            endDate: new Date(body.endDate)
        }
    });
};

// Actualizar promoción
export const updatePromotion = async (event: H3Event) => {
    const { id } = getRouterParams(event);
    const body = await readBody(event);

    return await prisma.promotion.update({
        where: { id: Number(id) },
        data: {
            title: body.title,
            description: body.description,
            discount: Number(body.discount),
            isPercentage: body.isPercentage,
            startDate: body.startDate ? new Date(body.startDate) : undefined,
            endDate: body.endDate ? new Date(body.endDate) : undefined
        }
    });
};

// Eliminar promoción
export const deletePromotion = async (event: H3Event) => {
    const { id } = getRouterParams(event);

    await prisma.promotion.delete({
        where: { id: Number(id) }
    });

    return { success: true };
};

// Obtener promociones por producto
export const promotionsByProductId = async (event: H3Event) => {
    const { id } = getRouterParams(event);
    const now = new Date();

    return await prisma.promotion.findMany({
        where: {
            productId: Number(id),
            startDate: { lte: now },
            endDate: { gte: now }
        },
        orderBy: {
            discount: 'desc'
        }
    });
};