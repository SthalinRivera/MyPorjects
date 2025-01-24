<script setup lang="ts">
const { user, clear } = useUserSession();


const router = useRouter();

const items = [
  [
    {
      label: "ben@example.com",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
    },
  ],

  [
    {
      label: "Salir",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => {
        clear();
        router.push("/");
      },
    },
  ],
];

</script>

<template>
  <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }">
    <UAvatar
      :src="user?.urlFoto ? user.urlFoto : 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'" />

    <template #account="{ item }">
      <div class="text-left">
        <p>Logado como</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ user?.email }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>
  </UDropdown>
</template>
