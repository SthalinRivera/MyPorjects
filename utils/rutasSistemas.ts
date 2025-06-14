interface Rutas {
    name: string;
    path: string;
    permiso?: string;
}
export default () => {
    const rutas: Rutas[] = [
        { name: 'Inicio', path: '/' },
        { name: 'Proyectos', path: '/product' },
        { name: 'Servicios', path: '/services' },
        { name: 'Herramientas', path: '/tools' },

    ]
    return rutas;
}