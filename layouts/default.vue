<template>
    <div class="min-h-screen flex flex-col transition-colors duration-300 ">
        <!-- Navbar sticky -->
        <Navbar class="sticky top-0 z-50 shadow-sm " />

        <!-- Main content with proper spacing and max-width constraints -->
        <main class="flex-1">
            <UContainer class="p-2">
                <div class="mx-auto max-w-7xl">
                    <slot />
                </div>
            </UContainer>
        </main>

        <!-- Floating cart button (positioned fixed) -->
        <FloatingCartButton class="fixed bottom-6 right-6 z-40" />

        <!-- Footer with proper spacing -->
        <Footer class="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700" />
    </div>
</template>

<script setup lang="ts">
// Optional: Add any needed imports or logic
</script>

<style scoped>
/* Smooth scrolling for the entire page */
html {
    scroll-behavior: smooth;
}

/* Better scrollbar styling (optional) */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
}

::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
}

/* iOS viewport fix */
@supports (-webkit-touch-callout: none) {
    .min-h-screen {
        min-height: -webkit-fill-available;
    }
}
</style>