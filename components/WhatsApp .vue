<template>
    <div>
        <!-- Botón flotante -->
        <div class="fixed bottom-20 right-6 z-50">
            <button @click="toggleChat"
                class="block w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                aria-label="Abrir chat de WhatsApp">
                <!-- Icono de WhatsApp de RemixIcon con efecto de flotación -->
                <i
                    class="ri-whatsapp-line text-2xl md:text-3xl text-white group-hover:scale-110 transition-transform duration-300"></i>

                <!-- Punto de notificación (opcional) -->
                <span
                    class="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full animate-pulse"></span>
            </button>
        </div>

        <!-- Modal de chat -->
        <div v-if="showChat"
            class="fixed bottom-36 right-6 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300"
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