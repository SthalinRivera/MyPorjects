interface Rutas {
    name: string;
    path: string;
    permiso?: string;
}
export default () => {
    const rutas: Rutas[] = [
        { name: "Home", path: "/" },
        { name: "product", path: "/product" },

        { name: "Dashboard", path: "/dashboard/", permiso: 'ADMINISTRADOR' },
    ]
    return rutas;
}