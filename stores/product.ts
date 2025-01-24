import type { Product } from "~/interfaces/product";

export const useProductStore = defineStore("products", () => {
    const favorites = ref<Product[]>([]);
    const addToFavorites = (product: Product) => {
        const FilteredFavorites = favorites.value.some((v) => v.id === product.id);
        if (!FilteredFavorites) {
            favorites.value.push(product);
        }
    }
    const deleteFavorites = (id: number) => {
        const FilteredFavorites = favorites.value.filter((v) => v.id !== id);
        favorites.value = FilteredFavorites;
    }
    return { addToFavorites, deleteFavorites, favorites }
}
    ,
    {
        persist: {
            storage: persistedState.localStorage,
        }
    })