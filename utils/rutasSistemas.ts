interface Rutas{
    name: string;
    path: string;
    permiso?: string;
}
export default()=>{
    const rutas: Rutas[]=[
        { name:"Home", path:"/" },
        { name:"project", path:"/project" },
        { name:"Agregar project", path:"/project/addProject", permiso:'ADMINISTRADOR' },
        { name:"Favoritos", path:"/project/favoritos" },   
        { name:"Clientes", path:"/clientes" },   
    ]
    return rutas;
}