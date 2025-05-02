import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
import { Order } from "~/interfaces/order";
const prisma = new PrismaClient();

// Tipos para los filtros
interface OrderFilters {
  userId?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
// Obtener todas las órdenes con filtros
export const getAllOrders = async (event: H3Event) => {
  try {
    const query = getQuery(event);

    const filters: OrderFilters = {
      userId: query.userId && query.userId !== 'ALL' ? Number(query.userId) : undefined,
      status: query.status && query.status !== 'ALL' ? String(query.status) : undefined,
      startDate: query.startDate ? String(query.startDate) : undefined,
      endDate: query.endDate ? String(query.endDate) : undefined,
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 10
    };

    const where: any = {};

    if (filters.userId) {
      where.userId = filters.userId;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.startDate && filters.endDate) {
      where.createdAt = {
        gte: new Date(filters.startDate),
        lte: new Date(filters.endDate)
      };
    } else if (filters.startDate) {
      where.createdAt = {
        gte: new Date(filters.startDate)
      };
    } else if (filters.endDate) {
      where.createdAt = {
        lte: new Date(filters.endDate)
      };
    }

    const skip = (filters.page - 1) * filters.limit;
    const take = filters.limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phoneNumber: true,
              avatarUrl: true
            }
          },
          orderItems: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  imageUrl: true
                }
              }
            }
          },
          coupon: {
            select: {
              id: true,
              code: true,
              discount: true,
              isPercentage: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.order.count({ where })
    ]);

    return {
      orders: orders.map(order => ({
        ...order,
        clientName: order.user?.name || order.clientName,
        clientEmail: order.user?.email,
        clientPhone: order.user?.phoneNumber || order.clientPhone
      })),
      total
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error fetching orders',
      data: error
    });
  }
};

// Obtener estadísticas de órdenes
export const getOrderStats = async (event: H3Event) => {
  try {
    const [
      totalOrders,
      pendingOrders,
      processedOrders,
      shippedOrders,
      deliveredOrders,
      canceledOrders
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.count({ where: { status: 'PROCESSED' } }),
      prisma.order.count({ where: { status: 'SHIPPED' } }),
      prisma.order.count({ where: { status: 'DELIVERED' } }),
      prisma.order.count({ where: { status: 'CANCELED' } })
    ]);

    return {
      totalOrders,
      pendingOrders,
      processedOrders,
      shippedOrders,
      deliveredOrders,
      canceledOrders
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error fetching order statistics',
      data: error
    });
  }
};



export const addWhatsAppOrder = async (event: H3Event): Promise<string> => {
  try {
    const request = await readBody<Order>(event);

    const createdOrder = await prisma.order.create({
      data: {
        userId: request.userId || 2, // admin por defecto
        clientName: request.clientName || null,
        clientPhone: request.clientPhone || null,
        total: request.total,
        status: 'PENDING',
        source: "WHATSAPP",
        updatedAt: new Date(), // Proporciona un valor manual para `updatedAt`
        orderItems: {
          create: request.orderItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return {
      success: true,
      orderId: createdOrder.id
    };

  } catch (error) {
    console.error("Error adding order:", error);
    throw createError({
      statusCode: 500,
      name: "Error creating order",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};


export const addOrder = async (event: H3Event): Promise<string> => {
  try {
    const request = await readBody<Order>(event);

    const createdOrder = await prisma.order.create({
      data: {
        userId: request.userId,
        total: request.total,
        status: request.status,
        couponId: request.couponId,
        updatedAt: new Date(), // Proporciona un valor manual para `updatedAt`
        orderItems: {
          create: request.orderItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return { orderId: createdOrder.id }; // Devuelve el ID de la orden creada
  } catch (error) {
    console.error("Error adding order:", error);
    throw createError({
      statusCode: 500,
      name: "Error creating order",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getOrderById = async (event: H3Event) => {
  try {
    const { id } = getRouterParams(event)
    if (!id || isNaN(Number(id))) {
      throw createError({
        statusCode: 400,
        message: "ID de orden inválido"
      })
    }

    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true
          }
        },
        coupon: true
      }
    })

    if (!order) {
      throw createError({
        statusCode: 404,
        message: "Orden no encontrada"
      })
    }

    // Asegúrate de devolver un objeto con estructura clara
    return {
      success: true,
      data: {
        ...order,
        // Transforma fechas a string si es necesario
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt?.toISOString() || null
      }
    }
  } catch (error) {
    console.error("Error en getOrderById:", error)
    throw createError({
      statusCode: 500,
      message: "Error al obtener la orden"
    })
  }
}
export const getOrdersByUser = async (event: H3Event) => {
  try {
    // Obtiene el ID del usuario desde los parámetros de la URL
    const request = getRouterParams(event);  // Extracts parameters from the event object

    const id = Number(request.id); // Ensure categoryId is a number

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "User ID is required",
      });
    }

    // Busca las órdenes del usuario en la base de datos
    const orders = await prisma.order.findMany({
      where: { userId: id },
      include: {
        orderItems: {
          include: {
            product: true, // Obtiene detalles de los productos relacionados
          },
        },
      },
    });

    console.log("User Orders:", orders); // Depuración para verificar los datos

    if (!orders || orders.length === 0) {
      throw createError({
        statusCode: 404,
        message: "No orders found for the specified user",
      });
    }

    return { orders };
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};




export const updateOrderStatus = async (event: H3Event) => {
  try {
    const prisma = new PrismaClient();
    const { id } = getRouterParams(event);
    const { status } = await readBody(event);

    // Validar el estado
    const validStatuses = ['PENDING', 'PROCESSED', 'SHIPPED', 'DELIVERED', 'CANCELED'];
    if (!validStatuses.includes(status)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid order status'
      });
    }

    // Actualizar el pedido
    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                price: true
              }
            }
          }
        }
      }
    });

    return {
      success: true,
      order: updatedOrder
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error updating order status',
      data: error
    });
  }
};