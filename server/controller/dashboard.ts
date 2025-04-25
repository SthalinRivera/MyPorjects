import { H3Event } from 'h3';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const dashboardReport = async (event: H3Event) => {
    try {
        // Total de usuarios
        const totalUsers = await prisma.user.count();

        // Total de productos
        const totalProducts = await prisma.product.count();

        // Ventas totales ($ acumulado)
        const totalSales = await prisma.order.aggregate({
            _sum: {
                total: true,
            },
        });

        // Actividad reciente: últimos 3 eventos (registro, orden, reseña)
        const recentUsers = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
                name: true,
                createdAt: true,
            },
        });

        const recentOrders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
                id: true,
                total: true,
                createdAt: true,
            },
        });

        const recentReviews = await prisma.review.findMany({
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
                rating: true,
                product: { select: { name: true } },
                createdAt: true,
            },
        });

        // Simulación de % cambios (esto lo puedes calcular con datos históricos si lo deseas)
        const mockGrowth = {
            users: 5.2,
            products: -2.1,
            sales: 12.7,
        };

        return {
            stats: {
                totalUsers,
                totalProducts,
                totalRevenue: totalSales._sum.total || 0,
                growth: mockGrowth,
            },
            recentActivity: {
                users: recentUsers,
                orders: recentOrders,
                reviews: recentReviews,
            },
        };
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Error generating dashboard report',
            data: error,
        });
    }
};
