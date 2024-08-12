export interface Project{
    id: number;
    title: string;
    description: string;
    image_url: string;
    project_url: string;
    code_url: string;
    created:string;
    likes: number;
    categoryId: number;
    userId: number; 
}