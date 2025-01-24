import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";

import { Order } from "~/interfaces/order";

const prisma = new PrismaClient();


export const addOrder = async (event: H3Event): Promise<string> => {
  try {
    const request = await readBody<Order>(event);

    const createdOrder = await prisma.order.create({
      data: {
        userId: request.userId,
        total: request.total,
        status: request.status,
        couponId: request.couponId,
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