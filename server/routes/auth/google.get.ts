// ~/server/api/auth/google.post.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default oauth.googleEventHandler({
  // Función que se ejecuta cuando la autenticación con Google es exitosa
  async onSuccess(event, { user: googleUser, tokens }) {
    // 1. Buscar usuario en la base de datos por su email
    let dbUser = await prisma.user.findUnique({
      where: { email: googleUser.email },
      include: { role: true } // Incluir información del rol asociado
    })

    // 2. Crear nuevo usuario si no existe en la base de datos
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email: googleUser.email,
          name: googleUser.name,
          roleId: 2, // ID para rol de usuario normal (no administrador)
          password: null // No se usa contraseña en autenticación por Google
        },
        include: { role: true }
      })
      console.log('Nuevo usuario creado:', dbUser)
    } else {
      console.log('Usuario existente encontrado:', dbUser)
    }

    // 3. Establecer sesión del usuario en el sistema
    await setUserSession(event, {
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role.name,
        phoneNumber: dbUser.phoneNumber,
        createdAt: dbUser.createdAt
      },
      loggedIn: true
    })
    console.log('Sesión iniciada para usuario:', dbUser.email)

    // 4. Redirigir según el rol del usuario
    const redirectPath = dbUser.role.name === 'ADMINISTRADOR' ? '/dashboard' : '/'
    console.log('Redirigiendo a:', redirectPath)
    return sendRedirect(event, redirectPath)
  },

  // Función que se ejecuta si hay un error en la autenticación
  onError(event, error) {
    console.error("Google Auth Error:", error)
    return sendRedirect(event, "/login?error=google_auth_failed")
  }
})