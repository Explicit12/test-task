<script setup>
  import { defineProps } from "vue";

  defineProps({
    post: {
      required: true,
      default: { title: "Title", body: "Some interesting text here..." },
    },
  });
</script>

<template>
  <article
    class="w-full rounded-lg border-2 border-gray-600 py-6 px-4 transition-shadow hover:cursor-pointer hover:shadow-md"
  >
    <h2 class="font-sans text-lg font-bold text-gray-900">
      {{ post.title }}
    </h2>
    <p class="font-sans text-base font-normal text-gray-900">
      {{ post.body }}
    </p>
  </article>
</template>
