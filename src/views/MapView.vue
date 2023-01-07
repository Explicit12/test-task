<script setup>
  import TheMap from "@/components/TheMap.vue";
</script>

<template>
  <main class="my-0 mx-auto max-w-screen-2xl py-12 px-4">
    <h1
      class="line max-w-xl font-sans text-3xl font-bold leading-snug text-gray-900 lg:text-5xl"
    >
      The map of Ukraine!
    </h1>
    <p class="pt-6 font-sans text-base font-normal text-gray-900">
      Click on map to make a point
    </p>

    <TheMap />
  </main>
</template>
