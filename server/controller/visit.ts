import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// Definir un tipo para las estadísticas de visitas
interface VisitStats {
    daily: Record<string, number>;
    weekly: Record<string, number>;
    monthly: Record<string, number>;
    yearly: Record<string, number>;
}

export const getVisitStats = async (event: H3Event): Promise<VisitStats> => {
    try {
        // Recuperar todas las visitas desde la base de datos
        const visits = await prisma.visit.findMany({
            select: {
                createdAt: true, // Solo seleccionamos la fecha de creación
            },
        });

        // Inicializar el objeto de estadísticas
        const stats: VisitStats = {
            daily: {},
            weekly: {},
            monthly: {},
            yearly: {},
        };

        // Recorrer todas las visitas y agruparlas por día, semana, mes y año
        for (const visit of visits) {
            const date = new Date(visit.createdAt);
            const day = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
            const week = `${date.getFullYear()}-W${Math.ceil((date.getDate() + 6 - date.getDay()) / 7)}`; // Formato YYYY-WXX
            const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Formato YYYY-MM
            const year = date.getFullYear(); // Formato YYYY

            // Incrementar las estadísticas
            stats.daily[day] = (stats.daily[day] || 0) + 1;
            stats.weekly[week] = (stats.weekly[week] || 0) + 1;
            stats.monthly[month] = (stats.monthly[month] || 0) + 1;
            stats.yearly[year] = (stats.yearly[year] || 0) + 1;
        }

        // Devolver las estadísticas
        return stats;
    } catch (error) {
        console.error('Error getting visit stats:', error);
        throw createError({
            statusCode: 500,
            message: 'Error getting visit stats',
        });
    }
};
export const getVisits = async (event: H3Event) => {
    try {
        // Recuperamos todas las visitas
        const visits = await prisma.visit.findMany({
            select: {
                id: true,
                path: true,
                ip: true,
                userAgent: true,
                createdAt: true,
                userId: true,
            },
        });

        return visits;
    } catch (error) {
        console.error("Error fetching visits:", error);
        throw createError({
            statusCode: 500,
            message: "Error fetching visits",
            data: error,
        });
    }
};
export const addVisit = async (event: H3Event) => {
    try {
        const body = await readBody(event);

        const ip =
            event.node.req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
            event.node.req.socket.remoteAddress ||
            'IP no disponible';

        const userAgent = event.node.req.headers['user-agent'] || 'N/A';
        const path = body.path;
        const userId = body.userId || null;

        if (!path) {
            throw new Error("Falta el path de la visita");
        }

        const newVisit = await prisma.visit.create({
            data: {
                path,
                ip,
                userAgent,
                userId,
            },
        });

        return newVisit;
    } catch (error) {
        console.error("Error adding visit:", error);
        throw createError({
            statusCode: 500,
            message: "Error adding visit",
            data: error,
        });
    }
};
