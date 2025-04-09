import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
import { Role } from "~/interfaces/role";
const prisma = new PrismaClient();
const { client } = postgresClient();

export const allRole = async () => {
    return await prisma.role.findMany({
        orderBy: {
            id: "asc"
        }
    })
}

export const addRole = async (event: H3Event): Promise<string> => {
    try {
        const request = await readBody<Role>(event);

        // Convertir categoryId a número
        if (!request.name) {
            throw new Error("Missing required fields or invalid categoryId");
        }

        await prisma.role.create({
            data: {
                name: request.name,
            },
        });

        return "Category added!";
    } catch (error) {
        console.error("Error adding category:", error);
        throw createError({
            statusCode: 500,
            name: "Error creating category",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};