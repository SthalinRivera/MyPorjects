import { PrismaClient, Prisma } from '@prisma/client';
import { H3Event, readBody, getRouterParams, createError } from 'h3';
const prisma = new PrismaClient();

export const allReviews = async () => {
    return await prisma.review.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            project: {
                select: {
                    id: true,
                    title: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};
export const addReviews = async (event: H3Event) => {
    try {
        const body = await readBody(event);

        if (!body.rating || body.projectId === undefined || body.userId === undefined) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Faltan campos obligatorios: rating, projectId, userId'
            });
        }

        const rating = Number(body.rating);
        const projectId = Number(body.projectId);
        const userId = Number(body.userId);

        if (isNaN(rating) || rating < 1 || rating > 5) {
            throw createError({
                statusCode: 400,
                statusMessage: 'El rating debe ser un número entre 1 y 5'
            });
        }

        const existingReview = await prisma.review.findFirst({
            where: {
                userId,
                projectId
            }
        });

        if (existingReview) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Ya has reseñado este proyecto '
            });
        }

        const review = await prisma.review.create({
            data: {
                rating,
                comment: body.comment || null,
                project: { connect: { id: projectId } },
                user: { connect: { id: userId } }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        await updateProjectAverageRating(projectId);

        return {
            success: true,
            review
        };

    } catch (error) {
        console.error('Error al agregar reseña:', error);
        throw error;
    }
};
export const getReviewByProductId = async (event: H3Event) => {
    try {
        const request = getRouterParams(event);
        const projectId = Number(request.id);

        if (isNaN(projectId)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'ID de proyecto inválido'
            });
        }

        const reviews = await prisma.review.findMany({
            where: { projectId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        const averageRating = reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
            : 0;

        return {
            success: true,
            reviews,
            averageRating: parseFloat(averageRating.toFixed(1)),
            totalReviews: reviews.length
        };

    } catch (error) {
        console.error('Error al obtener reseñas:', error);
        throw error;
    }
};
async function updateProjectAverageRating(projectId: number) {
    const reviews = await prisma.review.findMany({
        where: { projectId }
    });

    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    // Si deseas guardar el promedio en el proyecto, descomenta esto:
    // await prisma.project.update({
    //     where: { id: projectId },
    //     data: { averageRating }
    // });
}
export const updateReviews = async (event: H3Event) => {
    try {
        const request = getRouterParams(event);
        const reviewId = Number(request.id);
        const body = await readBody(event);

        if (!body.rating) {
            throw createError({
                statusCode: 400,
                statusMessage: 'El campo rating es obligatorio'
            });
        }

        const rating = Number(body.rating);

        if (isNaN(rating) || rating < 1 || rating > 5) {
            throw createError({
                statusCode: 400,
                statusMessage: 'El rating debe ser un número entre 1 y 5'
            });
        }

        const updatedReview = await prisma.review.update({
            where: { id: reviewId },
            data: {
                rating,
                comment: body.comment || null
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                project: {
                    select: {
                        id: true
                    }
                }
            }
        });

        if (updatedReview.project?.id) {
            await updateProjectAverageRating(updatedReview.project.id);
        }

        return {
            success: true,
            message: 'Reseña actualizada correctamente',
            review: updatedReview
        };

    } catch (error) {
        console.error('Error al actualizar la reseña:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                throw createError({
                    statusCode: 404,
                    statusMessage: 'Reseña no encontrada'
                });
            }
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Error al actualizar la reseña'
        });
    }
};

export const deleteReviews = async (event: H3Event) => {
    try {
        const request = getRouterParams(event);
        const reviewId = Number(request.id);

        if (isNaN(reviewId)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'ID de reseña inválido'
            });
        }

        const existing = await prisma.review.findUnique({
            where: { id: reviewId }
        });

        if (!existing) {
            throw createError({
                statusCode: 404,
                statusMessage: 'La reseña no existe'
            });
        }

        await prisma.review.delete({
            where: { id: reviewId }
        });

        return {
            success: true,
            message: 'Reseña eliminada correctamente'
        };

    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error al eliminar la reseña'
        });
    }
};
