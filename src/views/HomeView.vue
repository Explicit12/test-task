<script setup>
  import { onBeforeMount, ref, computed, watch } from "vue";
  import { getPosts, getPostsComments } from "@/api/jsonplaceholder.js";
  import { useRoute, useRouter } from "vue-router";

  import PostsList from "@/components/PostsList.vue";
  import ThePagination from "@/components/ThePagination.vue";
  import NamesLengthGraph from "@/components/NamesLengthGraph.vue";

  const posts = ref([]);
  const route = useRoute();
  const router = useRouter();
  const filterText = ref("");
  const pickedPost = ref(null);

  const filteredPosts = computed(() => {
    return posts.value.filter((post) =>
      post.title.startsWith(filterText.value),
    );
  });

  const pickedPostEmails = computed(() => {
    return pickedPost.value?.comments.map((comment) => comment.email);
  });

  watch(filteredPosts, () => {
    router.replace({ name: route.name, params: { page: 1 } });
  });

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

  onBeforeMount(() => {
    getPostsData().then((p) => {
      posts.value = p;
      pickedPost.value = filteredPosts.value[0];
    });
  });
</script>

<template>
  <main class="my-0 mx-auto max-w-screen-2xl py-12 px-4">
    <section>
      <h1
        class="line mb-6 max-w-xl font-sans text-5xl font-bold leading-snug text-gray-900"
      >
        The most popular posts from JSONplaceholder!
      </h1>
      <form>
        <input
          class="rounded-md border-2 border-gray-600 bg-gray-200 py-4 px-6 font-sans text-base font-normal text-gray-900 placeholder:text-gray-600 focus:border-gray-900"
          type="text"
          v-model="filterText"
          placeholder="Search by title..."
        />
      </form>
      <p class="pt-6 font-sans text-base font-normal text-gray-900">
        Click on the post to see graph of commentators emails
      </p>
    </section>

    <section class="lg:flex lg:last:gap-6">
      <div class="lg:basis-3/5">
        <PostsList
          :posts="filteredPosts"
          :from="0 || Number(route.params.page) * 10 - 10"
          :to="Number(route.params.page) * 10"
          @pick-post="(post) => (pickedPost = post)"
        />
        <ThePagination :pages="Math.round(filteredPosts.length / 10)" />
      </div>

      <div class="relative w-full max-lg:py-6">
        <NamesLengthGraph
          :key="pickedPostEmails"
          class="lg:sticky lg:top-6"
          :emails="pickedPostEmails"
        />
      </div>
    </section>
  </main>
</template>
