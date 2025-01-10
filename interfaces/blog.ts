export interface Blog {
    id: number; // Identificador único, autoincrementado
    title: string; // Título del blog
    content: string; // Contenido del blog
    image_url: string;
    createdAt: Date; // Fecha y hora de creación
    updatedAt: Date; // Fecha y hora de última actualización
    userId: number; // ID del usuario que creó el blog
}