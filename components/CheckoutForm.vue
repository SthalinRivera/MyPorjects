<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">User Information</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="firstName" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Full Name
                    </label>
                    <input v-model="user1.name" type="text" id="firstName"
                        class="mt-1 p-2 w-full border rounded-lg text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                </div>
                <div>
                    <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Email
                    </label>
                    <input v-model="user1.email" type="email" id="email"
                        class="mt-1 p-2 w-full border rounded-lg text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                </div>
            </div>

            <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="phone" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Phone Number
                    </label>
                    <input v-model="user1.phoneNumber" type="tel" id="phone"
                        class="mt-1 p-2 w-full border rounded-lg text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                </div>
            </div>

            <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="street" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Street
                    </label>
                    <input v-model="user1.address.street" type="text" id="street"
                        class="mt-1 p-2 w-full border rounded-lg text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                </div>
                <div>
                    <label for="city" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        City
                    </label>
                    <input v-model="user1.address.city" type="text" id="city"
                        class="mt-1 p-2 w-full border rounded-lg text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                </div>
            </div>

            <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="country" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Country
                    </label>
                    <input v-model="user1.address.country" type="text" id="country"
                        class="mt-1 p-2 w-full border rounded-lg text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                </div>
                <div>
                    <label for="postalCode" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Postal Code
                    </label>
                    <input v-model="user1.address.postalCode" type="text" id="postalCode"
                        class="mt-1 p-2 w-full border rounded-lg text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                </div>
            </div>

            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Save</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const { user } = useUserSession();

const user1 = ref({
    name: '',
    email: '',
    phoneNumber: '',
    address: {
        street: '',
        city: '',
        country: '',
        postalCode: '',
    }
});

const iduser = user.value.usuarioId;

// 🚀 **Cargar datos del usuario al montar el componente**
const fetchUserData = async () => {
    try {
        const response = await fetch(`/api/v1/userById/${iduser}`);
        if (!response.ok) throw new Error("Error al obtener datos del usuario");

        const data = await response.json();
        if (data) {
            user1.value = {
                name: data.name || '',
                email: data.email || '',
                phoneNumber: data.phoneNumber || '',
                // Accede a la primera dirección dentro del array "addresses"
                address: {
                    street: data.addresses?.[0]?.street || '',  // Accede al primer elemento del array
                    city: data.addresses?.[0]?.city || '',
                    country: data.addresses?.[0]?.country || '',
                    postalCode: data.addresses?.[0]?.postalCode || '',
                }
            };
        }
        console.log("📥 Usuario cargado:", user1.value);
    } catch (error) {
        console.error("❌ Error al obtener usuario:", error);
    }
};


// 🔥 **Ejecutar la función cuando el componente se monte**
onMounted(fetchUserData);

// ✅ **Actualizar el usuario**
const submitForm = async () => {
    try {
        const requestData = {
            phoneNumber: user1.value.phoneNumber,
            address: user1.value.address
        };

        console.log("📤 Enviando datos:", requestData);

        const response = await fetch(`/api/v1/updateUserPhone/${iduser}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        });

        if (response.ok) {
            alert("Datos actualizados correctamente");
        } else {
            throw new Error("Error al actualizar usuario");
        }
    } catch (error) {
        console.error("❌ Error al actualizar:", error);
        alert("Hubo un problema al actualizar el usuario.");
    }
};
</script>
