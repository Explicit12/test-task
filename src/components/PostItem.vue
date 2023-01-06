<script setup>
  defineProps({
    post: {
      required: true,
      default: {
        title: "Title",
        body: "Some interesting text here...",
        comments: [],
      },
    },
  });
</script>

<template>
  <article
    class="w-full rounded-lg border-2 border-gray-600 py-6 px-4 transition-shadow hover:cursor-pointer hover:shadow-md"
  >
    <h2 class="font-sans text-lg font-bold text-gray-900 line-clamp-1">
      {{ post.title }}
    </h2>
    <p class="font-sans text-base font-normal text-gray-900 line-clamp-2">
      {{ post.body }}
    </p>

    <i class="font-sans text-sm font-normal text-gray-900">
      {{ post.comments.length }} comments
    </i>
  </article>
</template>
