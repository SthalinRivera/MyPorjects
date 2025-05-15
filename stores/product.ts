import type { Product } from "~/interfaces/product";
import type { Project } from "~/interfaces/project";

export const useProductStore = defineStore("products", () => {
    const favorites = ref<Project[]>([]);

    // Agregar producto a favoritos
    const addToFavorites = (product: Project) => {
        const existingProduct = favorites.value.find((v) => v.id === product.id);
        if (existingProduct) {
            // Si ya está en favoritos, solo incrementamos la cantidad
            existingProduct.quantity += 1;
        } else {
            // Si no está en favoritos, lo agregamos con una cantidad inicial de 1
            favorites.value.push({ ...product, quantity: 1 });
        }
    };

    // Actualizar cantidad de producto
    const updateProductQuantity = (id: number, quantity: number) => {
        const product = favorites.value.find((v) => v.id === id);
        if (product) {
            product.quantity = quantity;
        }
    };

    // Eliminar producto de favoritos
    const deleteFavorites = (id: number) => {
        favorites.value = favorites.value.filter((v) => v.id !== id);
    };



    // Obtener el total de items (productos) en favoritos
    const totalItemsFavorite = computed(() =>
        favorites.value.reduce((sum, product) => sum + product.quantity, 0)
    );

    return {
        addToFavorites,
        deleteFavorites,
        updateProductQuantity,
        favorites,
        totalItemsFavorite
    };
}, {
    persist: {
        storage: persistedState.localStorage,
    }
});
