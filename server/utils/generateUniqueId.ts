// utils/generateUniqueId.ts
export function generateUniqueId(): string {
    return 'xxxxxx'.replace(/[x]/g, () => 
        (Math.random() * 16 | 0).toString(16)
    );
}
