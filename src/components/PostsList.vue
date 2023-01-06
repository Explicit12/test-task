<script setup>
  import { computed } from "vue";

  import PostItem from "@/components/PostItem.vue";

  const props = defineProps({
    from: {
      type: Number,
      required: true,
      default: 0,
    },
    to: {
      type: Number,
      required: true,
      default: 10,
    },
    posts: {
      type: Array,
      required: true,
      default: new Array(),
    },
  });

  const slicedPostsList = computed(() =>
    [...props.posts].slice(props.from, props.to),
  );
</script>

<template>
  <ul class="flex flex-col gap-6 py-12">
    <li v-for="post in slicedPostsList" :key="post.id">
      <PostItem :post="post" />
    </li>
  </ul>
</template>
