interface Rutas {
    name: string;
    path: string;
    permiso?: string;
}
export default () => {
    const rutas: Rutas[] = [
        { name: "Inicio", path: "/" },
        { name: "Accesorios", path: "/product" },

        { name: "Dashboard", path: "/dashboard/", permiso: 'ADMINISTRADOR' },
    ]
    return rutas;
}