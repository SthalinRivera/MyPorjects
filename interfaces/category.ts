export interface Category {
    id: number;
    name: string;
    slug?: string;
    imageUrl?: string;
    bannerUrl?: string;
    description?: string;
    _count?: {
        products?: number
    }
}
