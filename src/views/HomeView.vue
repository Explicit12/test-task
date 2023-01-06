<script setup>
  import { onBeforeMount, ref } from "vue";
  import { getPosts, getPostsComments } from "@/api/jsonplaceholder.js";
  import { useRoute } from "vue-router";

  import PostsList from "@/components/PostsList.vue";
  import ThePagination from "@/components/ThePagination.vue";

  const posts = ref([]);
  const route = useRoute();

  async function getPostsData() {
    const resPosts = await getPosts();
    const postWithComments = Promise.all(
      resPosts.map(async (post) => {
        const postComments = await getPostsComments(post.id);
        post.comments = postComments;

        return post;
      }),
    );

    return postWithComments;
  }

  onBeforeMount(() => getPostsData().then((p) => (posts.value = p)));
</script>

<template>
  <main class="my-0 mx-auto max-w-screen-2xl py-12 px-4">
    <h1
      class="line max-w-xl font-sans text-5xl font-bold leading-snug text-gray-900"
    >
      The most popular posts from JSONplaceholder!
    </h1>
    <p class="pt-6 font-sans text-base font-normal text-gray-900">
      Click on the post to see graph of commentators names
    </p>
    <PostsList
      :posts="posts"
      :from="0 || Number(route.params.page) * 10 - 10"
      :to="Number(route.params.page) * 10"
    />
    <ThePagination :pages="posts.length / 10" />
  </main>
</template>
