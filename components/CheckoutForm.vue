<template>
    <div class=" bg-white dark:bg-gray-800 rounded-lg">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6 mt-2">User Information</h2>
        <form @submit.prevent="submitForm">
            <!-- First Name and Last Name in One Row -->
            <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="firstName" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">Full
                        Name</label>
                    <input v-model="user1.firstName" type="text" id="firstName"
                        class="mt-1 p-2 w-full border rounded-lg text-sm focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                </div>
                <!-- Email -->
                <div class="mb-4">
                    <label for="email"
                        class="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
                    <input v-model="user1.email" type="email" id="email"
                        class="mt-1 p-2 w-full border rounded-lg text-sm focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                </div>

            </div>


            <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Phone -->
                <div class="mb-4">
                    <label for="phone" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">Phone
                        Number</label>
                    <input v-model="user1.phone" type="tel" id="phone"
                        class="mt-1 p-2 w-full border rounded-lg text-sm focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                </div>
                <!-- Location -->
                <div class="mb-4">
                    <label for="location"
                        class="block text-sm font-semibold text-gray-700 dark:text-gray-300">Location</label>
                    <input v-model="user1.location" type="text" id="location"
                        class="mt-1 p-2 w-full border rounded-lg text-sm focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                </div>
            </div>

        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const { user, clear } = useUserSession();
const user1 = ref({
    firstName: user.value.name,
    lastName: '',
    email: user.value.email,
    phone: '',
    location: '',
});

const submitForm = () => {
    alert(`User Information:\nName: ${user1.value.firstName} ${user1.value.lastName}\nEmail: ${user1.value.email}\nPhone: ${user1.value.phone}\nLocation: ${user1.value.location}`);
};
</script>