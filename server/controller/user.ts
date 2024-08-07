import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
import { User } from "~/interfaces/user";

const prisma = new PrismaClient();

export const allUser = async () => {
    return await prisma.favorites.findMany({
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
