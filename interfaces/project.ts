export interface Project {
    id: number;
    title: string;
    description: string;
    image_url: string;
    project_url: string;
    code_url?: string;
    video_url?: string;
    tags: string[];
    technologies: string[];
    categoryId: number;
    userId: number;
    startDate?: Date;
    endDate?: Date;
    quantity: number;
    Category?: {
        id: number;
        name: string;
        description: string;
        image_url: string;
    }
}