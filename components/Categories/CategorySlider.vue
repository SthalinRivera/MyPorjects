<template>
    <div class="">
        <h2 v-if="title"
            class="text-slate-900 dark:text-white font-bold text-2xl mb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-20 after:bg-pink-500 dark:after:bg-pink-600 after:rounded-full pb-2">
            {{ title }}
        </h2>
        <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 my-4">
            Explora nuestros productos por categoría
        </p>

        <!-- Slider container -->
        <div class="relative group">
            <!-- Navigation buttons - Desktop -->
            <button v-if="showNavigation" @click="handleScrollLeft"
                class="hidden md:block absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 focus:outline-none"
                aria-label="Previous categories">
                <i class="ri-arrow-left-s-line text-2xl text-gray-700 dark:text-gray-300"></i>
            </button>

            <!-- Categories -->
            <div ref="slider"
                class="flex space-x-4 md:space-x-6 overflow-x-auto py-2 scrollbar-hide cursor-grab active:cursor-grabbing"
                :style="{ scrollBehavior: 'smooth' }" @mousedown="startDrag" @mousemove="onDrag" @mouseup="endDrag"
                @mouseleave="endDrag" @touchstart="startDrag" @touchmove="onDrag" @touchend="endDrag">
                <div v-for="category in categories" :key="category.id"
                    class="flex-shrink-0 w-40 sm:w-48 md:w-56 group/card flex flex-col items-center pb-4"
                    @click="emit('categoryClick', category)">
                    <!-- Imagen circular con cursor pointer -->
                    <div
                        class="h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden mt-6 mb-1 relative group-hover/card:scale-105 transition-all duration-300 cursor-pointer">
                        <!-- Imagen de fondo o icono -->
                        <div class="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-700" :style="category.imageUrl ? {
                            'background-image': `url('${category.imageUrl}')`,
                            'background-size': imageFit,
                            'background-position': 'center'
                        } : ''">
                            <!-- Icono de respaldo si no hay imagen -->
                            <i v-if="!category.imageUrl"
                                :class="`${defaultIcon} text-4xl md:text-5xl text-gray-600 dark:text-gray-400 transition-all duration-300 group-hover/card:text-white`"></i>
                        </div>

                        <!-- Overlay hover circular -->
                        <div
                            class="absolute inset-0 bg-black bg-opacity-0 group-hover/card:bg-opacity-40 transition-all duration-300 flex items-center justify-center rounded-full cursor-pointer">
                            <i v-if="showLinkIcon"
                                class="ri-external-link-line text-white text-3xl opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform group-hover/card:scale-125"></i>
                        </div>
                    </div>

                    <!-- Texto centrado -->
                    <div class="p-2 text-center w-full">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">{{ category.name }}</h3>
                        <slot name="description" :category="category">
                            <p v-if="category.description"
                                class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mx-auto max-w-[90%]">
                                {{ category.description }}
                            </p>
                        </slot>
                    </div>
                </div>
            </div>

            <!-- Navigation buttons - Desktop CORREGIDO (ahora usa handleScrollRight) -->
            <button v-if="showNavigation" @click="handleScrollRight"
                class="hidden md:block absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 focus:outline-none"
                aria-label="Next categories">
                <i class="ri-arrow-right-s-line text-2xl text-gray-700 dark:text-gray-300"></i>
            </button>

            <!-- Mobile navigation dots -->
            <div v-if="showPagination" class="md:hidden flex justify-center space-x-2 mt-4">
                <button v-for="(_, index) in categories" :key="`dot-${index}`" @click="scrollTo(index)"
                    class="w-2 h-2 rounded-full transition-all"
                    :class="activeIndex === index ? 'bg-gray-800 dark:bg-gray-200 w-4' : 'bg-gray-300 dark:bg-gray-600'"
                    aria-label="Go to category"></button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Category } from '~/interfaces/category'

interface Props {
    categories: Category[]
    title?: string
    defaultIcon?: string
    showNavigation?: boolean
    showPagination?: boolean
    showLinkIcon?: boolean
    imageFit?: 'cover' | 'contain'
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Shop By Category',
    defaultIcon: 'ri-price-tag-3-line',
    showNavigation: true,
    showPagination: true,
    showLinkIcon: true,
    imageFit: 'cover'
})

const emit = defineEmits<{
    (e: 'categoryClick', category: Category): void
}>()

const slider = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeftPosition = ref(0)
const activeIndex = ref(0)

const scrollTo = (index: number) => {
    if (slider.value) {
        const element = slider.value.children[index] as HTMLElement
        slider.value.scrollTo({
            left: element.offsetLeft - slider.value.offsetLeft,
            behavior: 'smooth'
        })
        activeIndex.value = index
    }
}

const updateActiveIndex = () => {
    if (slider.value && props.categories.length > 0) {
        const scrollPosition = slider.value.scrollLeft
        const items = Array.from(slider.value.children) as HTMLElement[]

        items.forEach((item, index) => {
            const itemLeft = item.offsetLeft - slider.value!.offsetLeft
            const itemWidth = item.offsetWidth

            if (scrollPosition >= itemLeft - itemWidth / 2 &&
                scrollPosition < itemLeft + itemWidth / 2) {
                activeIndex.value = index
            }
        })
    }
}

const handleScrollLeft = () => {
    if (slider.value) {
        slider.value.scrollBy({ left: -300, behavior: 'smooth' })
        // Actualizar índice activo después de un breve retraso
        setTimeout(updateActiveIndex, 300)
    }
}

const handleScrollRight = () => {
    if (slider.value) {
        slider.value.scrollBy({ left: 300, behavior: 'smooth' })
        // Actualizar índice activo después de un breve retraso
        setTimeout(updateActiveIndex, 300)
    }
}

// Drag functionality
const startDrag = (e: MouseEvent | TouchEvent) => {
    if (!slider.value) return

    isDragging.value = true
    startX.value = 'touches' in e ? e.touches[0].pageX - slider.value.offsetLeft : e.pageX - slider.value.offsetLeft
    scrollLeftPosition.value = slider.value.scrollLeft
    slider.value.style.cursor = 'grabbing'
}

const onDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.value || !slider.value) return
    e.preventDefault()

    const x = 'touches' in e ? e.touches[0].pageX - slider.value.offsetLeft : e.pageX - slider.value.offsetLeft
    const walk = (x - startX.value) * 2
    slider.value.scrollLeft = scrollLeftPosition.value - walk
}

const endDrag = () => {
    isDragging.value = false
    if (slider.value) {
        slider.value.style.cursor = 'grab'
        updateActiveIndex()
    }
}
</script>

<style scoped>
/* Hide scrollbar but allow scrolling */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* Line clamp for description */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>