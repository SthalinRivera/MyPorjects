<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        <!-- Sidebar - Fijo en desktop, overlay en mobile -->
        <Sidebar @sidebar-toggle="handleSidebarToggle"
            :class="{ 'md:translate-x-0': true, 'translate-x-0': isMobileSidebarOpen }" />

        <!-- Main content area -->
        <div class="flex-1 flex flex-col min-w-0">
            <!-- Navbar sticky -->
            <Navbar class="sticky top-0 z-30" @toggle-sidebar="isMobileSidebarOpen = !isMobileSidebarOpen" />

            <!-- Content area with scroll -->
            <main class="flex-1 overflow-y-auto pt-2 md:pt-2 transition-all duration-300 "
                :class="{ 'ml-0': !isExpanded && !isMobile, '': !isExpanded && !isMobile, '': isExpanded && !isMobile }">
                <NuxtPage />
            </main>

            <!-- Footer -->
            <Footer class="mt-auto" />
        </div>

        <!-- Mobile overlay -->
        <div v-if="isMobileSidebarOpen" @click="isMobileSidebarOpen = false"
            class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"></div>
    </div>
</template>

<script setup>
const isExpanded = ref(true);
const isMobileSidebarOpen = ref(false);

const handleSidebarToggle = (expanded) => {
    isExpanded.value = expanded;
};
</script>

<style scoped>
/* Smooth transitions */
.sidebar-enter-active,
.sidebar-leave-active {
    transition: transform 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
    transform: translateX(-100%);
}

/* Ensure full height */


/* iOS viewport fix */
@supports (-webkit-touch-callout: none) {
    .min-h-screen {
        min-height: -webkit-fill-available;
    }
}
</style>