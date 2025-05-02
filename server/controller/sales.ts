import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const salesReport = async (event: H3Event) => {
  try {
    const query = getQuery(event)
    const { startDate, endDate, source, status } = query

    const whereClause: any = {}

    // Filtros
    if (startDate && endDate) {
      whereClause.createdAt = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string)
      }
    }

    if (source) {
      whereClause.source = source
    }

    if (status) {
      whereClause.status = status
    }

    // Ventas por producto con nombre del producto
    const salesByProduct = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        price: true,
        quantity: true,
      },
      _count: true,
      where: {
        order: whereClause
      },
      orderBy: {
        _sum: {
          price: 'desc'
        }
      }
    })

    // Agregar nombres de productos
    const productsWithNames = await Promise.all(
      salesByProduct.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: { name: true }
        })
        return {
          ...item,
          productName: product?.name || 'Producto eliminado'
        }
      })
    )

    // Ventas totales y métricas adicionales
    const [totalSales, totalOrders, totalCustomers, salesByDay] = await Promise.all([
      prisma.order.aggregate({
        _sum: { total: true },
        where: whereClause
      }),
      prisma.order.count({ where: whereClause }),
      prisma.order.groupBy({
        by: ['userId'],
        where: whereClause,
        _count: true
      }),
      prisma.order.groupBy({
        by: ['createdAt'],
        where: whereClause,
        _sum: { total: true },
        orderBy: { createdAt: 'asc' }
      })
    ])

    // Ventas por estado del pedido
    const salesByStatus = await prisma.order.groupBy({
      by: ['status'],
      _sum: { total: true },
      _count: true,
      where: whereClause
    })

    // Ventas por fuente
    const salesBySource = await prisma.order.groupBy({
      by: ['source'],
      _sum: { total: true },
      _count: true,
      where: whereClause
    })



    return {
      totalRevenue: totalSales._sum.total || 0,
      totalSales: totalOrders,
      totalCustomers: totalCustomers.length,
      averageOrderValue: totalSales._sum.total ?
        Number(totalSales._sum.total) / totalOrders : 0,
      salesByProduct: productsWithNames,
      salesByStatus,
      salesBySource,
      salesByDay: salesByDay.map(day => ({
        date: day.createdAt.toISOString().split('T')[0],
        total: day._sum.total
      })),
      topProduct: productsWithNames[0]?.productName || 'N/A'
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error generating sales report',
      data: error,
    })
  }
}