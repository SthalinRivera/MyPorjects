declare module '#auth-utils'{
    interface User{
        id: number;
        name: string;
        email:string;
        permiso:string;
        urlFoto: string;
        usuarioId : number;
    }
}

export {};