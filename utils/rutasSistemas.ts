interface Rutas {
    name: string;
    path: string;
    permiso?: string;
}
export default () => {
    const rutas: Rutas[] = [
        { name: "Home", path: "/" },
        { name: "product", path: "/product" },
        { name: "Add Product", path: "/product/addProduct", permiso: 'ADMINISTRADOR' },
        { name: "category", path: "/category", permiso: 'ADMINISTRADOR' },
        { name: "Agregar category", path: "/category/addCategory", permiso: 'ADMINISTRADOR' },
    ]
    return rutas;
}