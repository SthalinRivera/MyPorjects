<script setup lang="ts">
const { user, clear } = useUserSession();
const router = useRouter();
const toast = useToast();

const menuItems = computed(() => {
  const items = [
    // Grupo 1: Información de usuario
    [
      {
        label: user.value?.email || 'USUARIO',
        slot: 'account',
        disabled: true
      }
    ],
    // Grupo 2: Navegación
    [
      ...(user.value?.permiso === 'ADMINISTRADOR'
        ? [
          {
            label: 'Dashboard',
            icon: 'i-heroicons-chart-bar',
            click: () => navigateTo('/dashboard')
          },
          {
            label: 'Usuarios',
            icon: 'i-heroicons-users',
            click: () => navigateTo('/dashboard/users')
          }
        ]
        : []),
      {
        label: 'Mi perfil',
        icon: 'i-heroicons-user-circle',
        click: () => navigateTo('/profile')
      }
    ],
    // Grupo 3: Acciones
    [
      {
        label: 'Cerrar sesión',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        click: handleLogout
      }
    ]
  ];

  return items;
});
console.log("Verificamos que trae e urlSS", user);

const handleLogout = async () => {
  try {
    await clear();
    await navigateTo('/');
    toast.success('Sesión cerrada correctamente');
  } catch (error) {
    toast.error('Error al cerrar sesión');
  }
};
const handleLogin = async () => {
  try {
    await navigateTo('/login');
    toast.success('Redirigido a login correctamente');
  } catch (error) {
    toast.error('Error al ir a login');
  }
};

</script>

<template>
  <div class="flex items-center gap-3">
    <!-- Solo muestra botones de registro -->
    <template v-if="!user">
      <button @click="handleLogin()"
        class="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>

      </button>
    </template>

    <!-- Menú desplegable para usuario logueado -->
    <UDropdown v-else :items="menuItems" :ui="{
      width: 'w-64',
      item: {
        base: 'flex items-center gap-2',
        disabled: 'cursor-text select-text',
        active: 'text-primary-600 dark:text-primary-500 bg-primary-50 dark:bg-primary-400/10',
        inactive: 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
      },
      popper: {
        placement: 'bottom-end',
        offsetDistance: 8
      }
    }">
      <!-- Avatar con badge de admin -->
      <div class="relative">
        <UAvatar :src="user?.urlFoto || '/default-avatar.jpg'" :alt="user?.name || 'Avatar'" size="md"
          class="ring-2 ring-primary-500 dark:ring-primary-400 hover:ring-primary-600 transition-all" />
        <span v-if="user?.permiso === 'ADMINISTRADOR'"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full border-2 border-white dark:border-gray-900">
          Admin
        </span>
      </div>

      <!-- Sección de cuenta -->
      <template #account="{ item }">
        <div class="text-left">
          <p class="text-xs text-gray-500 dark:text-gray-400">Conectado como</p>
          <p class="truncate font-medium text-gray-900 dark:text-white">
            {{ user?.name || 'Usuario' }}
          </p>
          <p class="truncate text-xs text-gray-500 dark:text-gray-400">
            {{ user?.email }}
          </p>
        </div>
      </template>

      <!-- Ítems personalizados -->
      <template #item="{ item }">
        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <span class="truncate">{{ item.label }}</span>
      </template>
    </UDropdown>
  </div>
</template>

<style scoped>
/* Transiciones mejoradas */
:deep(.dropdown-item:not(.disabled)) {
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
}

:deep(.dropdown-item:not(.disabled):hover) {
  @apply bg-gray-100 dark:bg-gray-800;
  transform: translateX(4px);
}

/* Mejor espaciado para el dropdown */
:deep(.dropdown-items) {
  @apply py-1;
}
</style>