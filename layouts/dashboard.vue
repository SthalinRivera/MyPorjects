<template>
    <div>
        <div class="min-h-screen flex" :class="{ 'sidebar-open': isMobileSidebarOpen }">
            <!-- Sidebar -->
            <Sidebar @sidebar-toggle="handleSidebarToggle" />

            <!-- Main content -->
            <div class="flex-1 p-6 bg-white dark:bg-gray-900 dark:text-white transition-all duration-300">
                <Navbar />
                <NuxtPage />
                <Footer />
            </div>
        </div>

    </div>

</template>

<script setup>
import { ref } from 'vue';

const isExpanded = ref(true);
const isMobileSidebarOpen = ref(false);

const handleSidebarToggle = (expanded) => {
    isExpanded.value = expanded;
};
</script>

<style></style>