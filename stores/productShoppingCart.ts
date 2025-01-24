import type { Product } from "~/interfaces/product";

export const useProductShoppingCartStore = defineStore("productsShoppingCart", () => {
    const productShoppingCart = ref<Product[]>([]);

    const addProductShoppingCart = (product: Product) => {
        const existingProduct = productShoppingCart.value.find((v) => v.id === product.id);
        if (existingProduct) {
            // Incrementa la cantidad si ya existe
            existingProduct.quantity += 1;
        } else {
            // Inicializa el producto con una cantidad predeterminada
            productShoppingCart.value.push({
                ...product,
                quantity: 1, // Asegura que la cantidad siempre se inicializa aquí
            });
        }
    };

    const updateProductQuantity = (id: number, quantity: number) => {
        const product = productShoppingCart.value.find((v) => v.id === id);
        if (product) {
            product.quantity = quantity;
        }
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
            .toFixed(2) // Asegura que el resultado sea un string con dos decimales
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
