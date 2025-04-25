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

declare module 'h3' {
    interface H3EventContext {
        user?: UserSession['user']
    }
}

interface UserSession {
    user?: {
        id: number
        name: string
        email: string
        permiso: string
        urlFoto: string
        usuarioId: number
    }
    loggedIn: boolean
}

export { }