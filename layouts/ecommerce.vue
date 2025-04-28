<template>
    <div class="">
        <!-- Navbar sticky -->
        <Navbar class="sticky top-0 z-50 shadow-sm " />

        <!-- Main content with proper spacing and max-width constraints -->
        <main class="">

            <div class=" ">
                <slot />
            </div>

        </main>


        <!-- Footer with proper spacing -->
        <Footer class="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700" />
    </div>
</template>

<script setup lang="ts">
// Optional: Add any needed imports or logic
</script>

<style scoped></style>