export interface Project{
    id: number;
    title: string;
    description: string;
    image_url: string;
    project_url: string;
    code_url: string;
    categoryId: number;
    created:string;
    likes: number;
    userId: number;
}