
export interface User {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    roleId: number;
    role: String;
    created: Date;
    password?: string | null; // Opcional y permite valores nulos si no es requerido
}