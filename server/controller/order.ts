import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
import { Order } from "~/interfaces/order";
const prisma = new PrismaClient();

export const getAllOrders = async (event: H3Event) => {
  try {
    // Obtiene todas las órdenes de la base de datos
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true, // Obtiene los detalles del producto.
          },
        },
      },
    });
    console.log(orders);  // Verifica si se obtienen todas las órdenes correctamente
    if (!orders || orders.length === 0) {
      throw createError({
        statusCode: 404,
        message: "No orders found",
      });
    }

    return { orders }; // Devuelve todas las órdenes.
  } catch (error) {
    throw createError({
      statusCode: 500,
      name: "Error Fetching Orders",
      message: error.message,
    });
  }
};


export const addWhatsAppOrder = async (event: H3Event): Promise<string> => {
  try {
    const request = await readBody<Order>(event);

    const createdOrder = await prisma.order.create({
      data: {
        userId: request.userId || 3, // admin por defecto
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
    const request = getRouterParams(event);  // Extracts parameters from the event object

    const id = Number(request.id); // Ensure categoryId is a number

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Order ID is required",
      });
    }

    // Busca la orden en la base de datos
    const order = await prisma.order.findUnique({
      where: { id: id },
      include: {
        orderItems: {
          include: {
            product: true, // Obtiene los detalles del producto.
          },
        },
      },
    });
    console.log(order);  // Verifica si se obtiene la orden correctamente
    if (!order) {
      throw createError({
        statusCode: 404,
        message: "Order not found",
      });
    }

    return { order }; // Devuelve los detalles de la orden.
  } catch (error) {
    throw createError({
      statusCode: 500,
      name: "Error Fetching Projects",
      message: error.message,
    });
  }
};

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