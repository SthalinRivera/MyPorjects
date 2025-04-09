import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
import { User } from "~/interfaces/user";
import { Address } from "~/interfaces/address";

const prisma = new PrismaClient();

export const allUser = async () => {
    return await prisma.user.findMany({
        orderBy: {
            id: "asc"
        }
    });
}

export const addUser = async (event: H3Event): Promise<{ userId?: number; error?: string }> => {
    try {
        const request = await readBody<User>(event);
        const user = await prisma.user.create({
            data: {
                ...request,
            },
            include: {
                role: true,
            }
        })
        return { userId: user.id }; // Devuelve el ID del usuario recién creado
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: `Error: ${error.message}` };
        }
        return { error: "An unexpected error occurred" };
    }
};

export const userById = async (event: H3Event) => {
    const request = getRouterParams(event);

    if (!request.id) {
        throw createError({
            statusCode: 400,
            name: "User invalid",
            message: "User ID is required",
        });
    }

    const user = await prisma.user.findFirst({
        where: {
            id: +request.id,
        },
        include: {
            addresses: true, // 🔥 Esto incluirá la dirección asociada al usuario
        },
    });
    console.log(user);


    if (!user) {
        throw createError({
            statusCode: 404,
            name: "User not found",
            message: "No User found with the given ID",
        });
    }

    return user;
};


export const updateUserPhone = async (event: H3Event) => {
    try {
        const id = event.context.params?.id;
        const body = await readBody<{ phoneNumber: string, address: Address }>(event);

        if (!id || !body?.phoneNumber || !body?.address) {
            return { error: "ID de usuario, número de teléfono y dirección son requeridos." };
        }
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { phoneNumber: body.phoneNumber },
        });



        // Crear o actualizar la dirección
        // Buscar si el usuario ya tiene una dirección registrada
        const existingAddress = await prisma.address.findFirst({
            where: { userId: Number(id) }
        });

        if (existingAddress) {
            // Si existe, actualizarla
            await prisma.address.update({
                where: { id: existingAddress.id },  // Usa el `id` único de la dirección
                data: {
                    street: body.address.street,
                    city: body.address.city,
                    country: body.address.country,
                    postalCode: body.address.postalCode,

                }
            });
        } else {
            // Si no existe, crear una nueva
            await prisma.address.create({
                data: {
                    userId: Number(id),
                    street: body.address.street,
                    city: body.address.city,
                    country: body.address.country,
                    postalCode: body.address.postalCode,

                }
            });
        }
        return { userId: user.id, message: "Número actualizado correctamente." };
    } catch (error: unknown) {
        return { error: "Error interno del servidor." };
    }
};


