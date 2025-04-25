import type { Product } from "~/interfaces/product";

export const useProductShoppingCartStore = defineStore("productsShoppingCart", () => {
    const productShoppingCart = ref<Product[]>([]);

    const addProductShoppingCart = (product: Product) => {
        const existingProduct = productShoppingCart.value.find((v) => v.id === product.id);

        if (existingProduct) {
            // Verificar que no exceda el stock disponible
            if (existingProduct.quantity + product.quantity <= product.stock) {
                existingProduct.quantity += product.quantity;
                return true;
            }
            return false;
        } else {
            // Verificar que la cantidad no exceda el stock
            if (product.quantity <= product.stock) {
                productShoppingCart.value.push({
                    ...product,
                    quantity: product.quantity
                });
                return true;
            }
            return false;
        }
    };

    const updateProductQuantity = (id: number, newQuantity: number) => {
        const index = productShoppingCart.value.findIndex((v) => v.id === id);
        if (index !== -1) {
            const product = productShoppingCart.value[index];
            // Validar que la nueva cantidad no exceda el stock
            if (newQuantity > 0 && newQuantity <= product.stock) {
                productShoppingCart.value[index] = {
                    ...product,
                    quantity: newQuantity
                };
                return true;
            }
        }
        return false;
    };

    const clearShoppingCart = () => {
        productShoppingCart.value = [];
    };

    const deleteProductShoppingCart = (id: number) => {
        productShoppingCart.value = productShoppingCart.value.filter((v) => v.id !== id);
    };

    // Getters
    const totalItems = computed(() =>
        productShoppingCart.value.reduce((sum, product) => sum + product.quantity, 0)
    );

    const totalPrice = computed(() =>
        productShoppingCart.value
            .reduce((sum, product) => sum + Number(product.price) * product.quantity, 0)
            .toFixed(2)
    );

    return {
        addProductShoppingCart,
        updateProductQuantity,
        deleteProductShoppingCart,
        clearShoppingCart,
        productShoppingCart,
        totalItems,
        totalPrice,
    };
}, {
    persist: {
        storage: persistedState.localStorage,
    }
});