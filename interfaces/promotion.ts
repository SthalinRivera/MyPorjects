//interfaces/promotion.ts
export interface Promotion {
    id?: number;
    title: string;
    description: string;
    discount: number;
    isPercentage: boolean;
    startDate: string;
    endDate: string;
}