<script setup>
  import { useRoute, useRouter } from "vue-router";

  defineProps({
    pages: {
      type: Number,
      required: true,
      default: 1,
    },
  });

  const route = useRoute();
  const router = useRouter();
</script>

<template>
  <div class="flex items-center justify-center gap-4">
    <button
      @click="
        router.replace({
          name: route.name,
          params: { page: Number(route.params.page) - 1 },
        })
      "
      :disabled="Number(route.params.page) <= 1"
      class="rounded-sm border-2 border-gray-600 py-4 px-6 font-sans text-base font-normal text-gray-900 transition-shadow hover:shadow-md disabled:opacity-25"
    >
      Prev
    </button>
    <button
      @click="
        router.replace({
          name: route.name,
          params: { page: Number(route.params.page) + 1 },
        })
      "
      :disabled="Number(route.params.page) >= pages"
      class="rounded-sm border-2 border-gray-600 py-4 px-6 font-sans text-base font-normal text-gray-900 transition-shadow hover:shadow-md disabled:opacity-25"
    >
      Next
    </button>
  </div>
</template>
