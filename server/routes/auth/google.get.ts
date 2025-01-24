import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default oauth.googleEventHandler({
  async onSuccess(event, { user, tokens }) {
    //comprueba si tienes un usuario
    let usuario = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
      include: {
        role: true,
      },
    })
    //si no hay usuario crear nuevo

    if (!usuario) {
      const PERMISO_USUARIO = 2;
      usuario = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          roleId: PERMISO_USUARIO,
          password: null,  // Indica explícitamente que no estás proporcionando una contraseña
        },
        include: {
          role: true,
        }
      })

    }

    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        urlFoto: user.picture,
        name: String(user.name).trim(),
        permiso: usuario.role.name,
        usuarioId: usuario?.id,
      },
    });
    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.log("Error Google Auth", error);
    return sendRedirect(event, "/");
  },
});



