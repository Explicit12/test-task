<script setup>
  import { RouterLink } from "vue-router";
</script>

<template>
  <main
    class="my-0 mx-auto flex h-screen max-w-screen-2xl flex-col items-center justify-center py-12 px-4"
  >
    <h1
      class="max-w-xl pb-6 text-center font-sans text-3xl font-bold leading-snug text-gray-900 lg:text-5xl"
    >
      Ooops! This page doesn't exist! ¯\_(ツ)_/¯
    </h1>

    <RouterLink
      :to="{ name: 'home', params: { page: 1 } }"
      class="rounded-md bg-green-600 py-4 px-6 text-center font-sans text-lg font-bold text-white"
    >
      Go to main page
    </RouterLink>
  </main>
</template>
