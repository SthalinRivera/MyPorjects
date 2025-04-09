import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
import { User } from "~/interfaces/user";
import { Address } from "~/interfaces/address";

const prisma = new PrismaClient();

export const allUser = async () => {
    return await prisma.user.findMany({
        orderBy: {
            id: "asc"
        },
        include: {
            role: true,
        },
    });
}

export const addUser = async (event: H3Event): Promise<{ userId?: number; error?: string }> => {
    try {
        const body = await readBody<Partial<User>>(event);

        // Validación simple de campos requeridos
        if (!body.name || !body.email || !body.roleId) {
            return { error: 'Faltan campos obligatorios: name, email o roleId' };
        }

        // Crear el usuario solo con los campos necesarios
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
                phoneNumber: body.phoneNumber,
                roleId: body.roleId,
            },
            include: {
                role: true, // solo para devolver info del rol si la necesitas
            },
        });

        return { userId: user.id };

    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: `Error: ${error.message}` };
        }
        return { error: 'Error inesperado al crear usuario' };
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


export const deleteUser = async (event: H3Event) => {
    try {

        const request = getRouterParams(event);  // Extracts parameters from the event object
        const userId = Number(request.id); // Ensure categoryId is a number
        console.log("llega o no el id ", userById);


        if (isNaN(userId)) {
            throw createError({
                statusCode: 400,
                name: "Invalid Category ID",
                message: "El ID de categoría debe ser un número válido.",
            });
        }
        await prisma.user.delete({
            where: {
                id: userId,
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



export const updateUser = async (event: H3Event): Promise<string> => {
    try {
        const request = await readBody<User>(event);

        if (!request.id) {
            throw createError({
                statusCode: 400,
                name: "Invalid request",
                message: "Project ID and user ID are required",
            });
        }

        await prisma.user.update({
            where: {
                id: +request.id,
            },
            data: {
                name: request.name,
                email: request.email,
                phoneNumber: request.phoneNumber,
                roleId: request.roleId,
                password: request.password
            },
        });

        return "user updated!";
    } catch (error) {
        console.error("Error updating user:", error);
        throw createError({
            statusCode: 500,
            name: "Error updating user",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};