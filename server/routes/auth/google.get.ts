import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default oauth.googleEventHandler({
  async onSuccess(event, { user: googleUser, tokens }) {


    // 1. Buscar o crear usuario
    let dbUser = await prisma.user.findUnique({
      where: { email: googleUser.email },
      include: { role: true }
    })

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email: googleUser.email,
          name: googleUser.name,
          roleId: 2, // Rol de usuario normal
          password: null,
          avatarUrl: googleUser.picture || '', // Usar foto de Google
        },
        include: { role: true }
      })
    }

    // 2. Mapear a tu tipo User personalizado
    const sessionUser = {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      permiso: dbUser.role.name, // Asumiendo que 'permiso' equivale al nombre del rol
      phoneNumber: dbUser.phoneNumber,
      urlFoto: dbUser.avatarUrl || '',  // Si es null, asigna una cadena vacía
      usuarioId: dbUser.id

    }

    // 3. Establecer sesión persistente
    await setUserSession(event, {
      user: sessionUser,
      loggedIn: true,
      session: {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        maxAge: 30 * 24 * 60 * 60
      }
    })

    // 4. Redirigir según permiso
    const redirectPath = sessionUser.permiso === 'ADMINISTRADOR' ? '/dashboard' : '/profile'
    return sendRedirect(event, redirectPath)
  },

  onError(event, error) {
    console.error("Google Auth Error:", error)
    return sendRedirect(event, "/login?error=google_auth_failed")
  }
}) 