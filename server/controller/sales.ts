import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const salesReport = async (event: H3Event) => {
  try {
    // Ventas por producto
    const salesByProduct = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        price: true,
        quantity: true,
      },
      _count: true,
    });

    // Ventas totales
    const totalSales = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
    });

    // Ventas por estado del pedido
    const salesByStatus = await prisma.order.groupBy({
      by: ['status'],
      _sum: {
        total: true,
      },
      _count: true,
    });

    // Ventas por fuente (WEB o WHATSAPP)
    const salesBySource = await prisma.order.groupBy({
      by: ['source'],
      _sum: {
        total: true,
      },
      _count: true,
    });

    return {
      totalRevenue: totalSales._sum.total,
      salesByProduct,
      salesByStatus,
      salesBySource,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error generating sales report',
      data: error,
    });
  }
};
