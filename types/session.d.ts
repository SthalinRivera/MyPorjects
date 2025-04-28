declare module '#auth-utils' {
    interface User {
        id: number
        name: string
        email: string
        permiso: string
        urlFoto: string
        usuarioId: number

    }

}

// Modificar el tipo UserSession para incluir 'loggedIn'
interface UserSession {
    user?: {
        id: number
        name: string
        email: string
        permiso: string
        urlFoto: string
        usuarioId: number

    }
    loggedIn: boolean; // Aquí está el problema: 'loggedIn' no es reconocido

}

declare module 'h3' {
    interface H3EventContext {
        user?: UserSession['user'];  // Hace referencia al tipo 'user' de UserSession
    }
}

export { }

