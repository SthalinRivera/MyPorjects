<template>
    <div>
        <!-- Botón flotante -->
        <div class="fixed bottom-6 right-6 z-50">
            <button @click="toggleChat"
                class="block w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:bg-[#128C7E] transition-all duration-300 flex items-center justify-center relative"
                aria-label="Abrir chat">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="500px" height="500px"
                    viewBox="0 0 5000 5000" preserveAspectRatio="xMidYMid meet">
                    <g id="layer101" fill="#000000" stroke="none">
                    </g>
                    <g id="layer102" fill="#02e677" stroke="none">
                        <path
                            d="M2256 4879 c-279 -18 -569 -100 -827 -234 -244 -128 -246 -128 -287 -117 -20 5 -89 24 -152 42 -173 48 -337 90 -410 105 -36 8 -91 23 -122 34 -32 12 -69 21 -82 21 -14 0 -36 4 -50 10 -22 8 -28 6 -42 -15 -14 -22 -14 -30 5 -102 11 -43 23 -89 27 -103 10 -42 50 -185 109 -393 77 -269 77 -272 -10 -417 -144 -243 -251 -510 -301 -750 -50 -242 -54 -633 -9 -875 24 -132 109 -433 152 -539 110 -271 277 -519 503 -747 197 -198 419 -358 664 -479 233 -115 402 -170 681 -221 149 -27 470 -37 624 -20 181 21 494 93 595 136 17 7 67 28 111 47 175 72 379 197 550 335 540 435 861 1063 904 1768 32 521 -93 1003 -369 1416 -263 393 -578 676 -965 864 -419 204 -772 267 -1299 234z" />
                    </g>
                    <g id="layer103" fill="#f6fefa" stroke="none">
                        <path
                            d="M3175 3834 c-11 -2 -46 -11 -78 -20 -31 -8 -82 -19 -112 -24 -30 -5 -69 -16 -87 -24 -18 -8 -55 -20 -83 -27 -27 -6 -59 -17 -70 -24 -11 -6 -38 -18 -60 -25 -22 -7 -60 -23 -85 -36 -25 -13 -52 -24 -62 -24 -9 0 -24 -7 -33 -16 -9 -9 -31 -22 -48 -28 -27 -10 -93 -44 -147 -77 -8 -5 -31 -18 -51 -28 -19 -11 -41 -27 -48 -35 -8 -9 -20 -16 -27 -16 -8 0 -22 -8 -32 -17 -10 -10 -45 -36 -78 -58 -95 -63 -167 -127 -364 -325 -219 -218 -323 -339 -411 -475 -14 -22 -34 -53 -45 -69 -54 -80 -154 -269 -154 -290 0 -8 -7 -19 -15 -26 -8 -7 -18 -28 -21 -49 -4 -20 -18 -65 -32 -101 -22 -59 -25 -79 -25 -220 -1 -150 1 -158 32 -250 18 -52 39 -102 47 -111 8 -8 14 -19 14 -24 0 -16 91 -145 134 -190 37 -39 64 -58 146 -102 36 -19 242 -18 279 2 38 19 74 63 100 122 13 26 33 71 46 98 13 28 35 75 49 105 14 30 26 61 26 68 0 7 9 30 20 50 51 96 74 167 78 250 3 83 3 84 -35 140 -21 31 -46 64 -55 74 -10 10 -18 21 -18 26 0 4 -20 29 -45 55 -95 99 -90 165 25 332 107 154 248 306 389 420 40 33 84 70 98 83 13 12 28 22 32 22 4 0 16 9 25 19 10 11 32 25 49 32 18 7 39 18 47 25 21 17 140 80 170 89 14 4 31 12 38 18 8 6 43 21 79 34 61 21 66 21 91 6 30 -18 158 -149 224 -229 64 -76 98 -97 162 -96 40 0 68 8 111 31 32 17 63 31 70 31 7 0 18 7 25 15 7 9 32 20 56 26 24 6 49 17 55 25 6 8 30 19 53 25 22 6 52 19 66 29 14 10 39 21 57 24 18 4 42 15 55 25 13 10 37 21 53 25 17 4 42 19 58 34 24 23 27 33 27 92 0 45 -8 89 -25 138 -14 39 -25 78 -25 86 0 24 -83 118 -161 182 -135 111 -286 172 -443 179 -50 2 -100 2 -111 -1z" />
                    </g>
                </svg>
            </button>
        </div>

        <!-- Modal de chat -->
        <div v-if="showChat"
            class="fixed bottom-20 right-6 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300"
            style="height: 500px; max-height: calc(100vh - 120px);">
            <!-- Encabezado -->
            <div class="bg-[#25D366] text-white p-3 rounded-t-lg flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
                        </svg>
                    </div>
                    <h3 class="font-bold text-sm">Asistente Virtual</h3>
                </div>
                <div class="flex items-center space-x-2">

                    <button @click="toggleChat" class="text-white/80 hover:text-white transition"
                        aria-label="Cerrar chat">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Área de mensajes -->
            <div ref="messagesContainer" class="flex-1 p-3 overflow-y-auto space-y-2">
                <!-- Mensaje inicial -->
                <div v-if="messages.length === 0" class="text-center text-gray-500 dark:text-gray-400 py-6">
                    <div
                        class="w-12 h-12 mx-auto bg-[#25D366]/10 dark:bg-[#25D366]/20 rounded-full flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#25D366]" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
                        </svg>
                    </div>
                    <p class="text-sm font-medium">¡Hola! Soy tu asistente IA</p>
                    <p class="text-xs mt-1">¿En qué puedo ayudarte hoy?</p>
                </div>

                <!-- Mensajes del chat -->
                <div v-for="(message, index) in messages" :key="index"
                    :class="['flex', message.sender === 'user' ? 'justify-end' : 'justify-start']">
                    <div :class="['rounded-lg px-3 py-2 max-w-[80%] text-sm',
                        message.sender === 'user'
                            ? 'bg-[#25D366] text-white rounded-tr-none'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none']">
                        <p class="whitespace-pre-wrap">{{ message.text }}</p>
                        <p class="text-xs mt-1 opacity-70 text-right"
                            :class="message.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'">
                            {{ formatTime(message.timestamp) }}
                        </p>
                    </div>
                </div>

                <!-- Indicador de carga -->
                <div v-if="loading" class="flex justify-start">
                    <div
                        class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-3 py-2 max-w-[80%] rounded-tl-none">
                        <div class="flex space-x-1.5">
                            <div class="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
                            <div class="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                                style="animation-delay: 0.2s"></div>
                            <div class="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                                style="animation-delay: 0.4s"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Área de entrada -->
            <div class="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-b-lg">
                <form @submit.prevent="sendMessage" class="flex space-x-2">
                    <input v-model="newMessage" type="text" placeholder="Escribe tu mensaje..."
                        class="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent bg-white dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400">
                    <button type="submit"
                        class="bg-[#25D366] text-white rounded-lg px-3 py-2 hover:bg-[#128C7E] transition flex items-center justify-center"
                        :disabled="!newMessage.trim()" :class="{ 'opacity-50 cursor-not-allowed': !newMessage.trim() }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </form>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    Asistente IA · Respuestas instantáneas
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

const showChat = ref(false)
const messages = ref<Array<{ text: string, sender: 'user' | 'bot', timestamp: Date }>>([])
const newMessage = ref('')
const loading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const toggleChat = () => {
    showChat.value = !showChat.value
}

const sendMessage = async () => {
    if (!newMessage.value.trim()) return

    // Agregar mensaje del usuario
    const userMessage = {
        text: newMessage.value,
        sender: 'user' as const,
        timestamp: new Date()
    }
    messages.value.push(userMessage)

    const messageToSend = newMessage.value
    newMessage.value = ''
    loading.value = true

    await nextTick()
    scrollToBottom()

    try {
        // Llamada a la API del servidor
        const response = await $fetch('/api/chat', {
            method: 'POST',
            body: {
                message: messageToSend,
                history: messages.value.map(msg => ({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.text
                }))
            }
        })

        // Agregar respuesta del bot
        messages.value.push({
            text: response.content,
            sender: 'bot' as const,
            timestamp: new Date()
        })
    } catch (error) {
        console.error('Error al llamar al asistente:', error)
        messages.value.push({
            text: 'Lo siento, hubo un error al procesar tu solicitud.',
            sender: 'bot' as const,
            timestamp: new Date()
        })
    } finally {
        loading.value = false
        await nextTick()
        scrollToBottom()
    }
}

const scrollToBottom = () => {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.animate-bounce {
    animation: bounce 1s infinite;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-5px);
    }
}

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>