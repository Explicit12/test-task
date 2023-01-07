<script setup>
  import { RouterLink, useRoute } from "vue-router";

  const route = useRoute();
</script>

<template>
  <header class="bg-green-600">
    <nav class="my-0 mx-auto max-w-screen-2xl py-6 px-4">
      <ul class="flex gap-6">
        <li
          :class="{ underline: route.name === 'home' }"
          class="font-sans text-2xl font-medium text-white hover:cursor-pointer hover:underline"
        >
          <RouterLink :to="{ name: 'home', params: { page: 1 } }">
            Home
          </RouterLink>
        </li>
        <li
          :class="{ underline: route.name === 'map' }"
          class="font-sans text-2xl font-medium text-white hover:cursor-pointer hover:underline"
        >
          <RouterLink :to="{ name: 'map' }">Map</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
