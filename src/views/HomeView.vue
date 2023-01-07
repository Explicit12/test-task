<script setup>
  import { onBeforeMount, ref, computed, watch, onBeforeUnmount } from "vue";
  import { getPosts, getPostsComments } from "@/api/jsonplaceholder.js";
  import { useRoute, useRouter } from "vue-router";

  import PostsList from "@/components/PostsList.vue";
  import ThePagination from "@/components/ThePagination.vue";
  import NamesLengthGraph from "@/components/NamesLengthGraph.vue";
  import TheInput from "@/components/TheInput.vue";
  import TheLoader from "@/components/TheLoader.vue";

  const posts = ref([]);
  const route = useRoute();
  const router = useRouter();
  const filterText = ref("");
  const pickedPost = ref(null);
  const currentViewportWidth = ref(window.innerWidth);

  const filteredPosts = computed(() => {
    return posts.value.filter((post) =>
      post.title.startsWith(filterText.value.toLocaleLowerCase()),
    );
  });

  const pickedPostEmails = computed(() => {
    return pickedPost.value?.comments.map((comment) => comment.email);
  });

  const isLgAndSmaller = computed(() => {
    return currentViewportWidth.value <= 1024;
  });

  const pageFrom = computed(() => {
    return Number(route.params.page) * 10 - 10;
  });

  const pageTo = computed(() => {
    return Number(route.params.page) * 10;
  });

  function getViewportWidth() {
    currentViewportWidth.value = window.innerWidth;
  }

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

  watch(filteredPosts, () => {
    router.replace({ name: route.name, params: { page: 1 } });
  });

  onBeforeMount(() => {
    getPostsData().then((p) => {
      posts.value = p;
      pickedPost.value = filteredPosts.value[0];
    });

    window.addEventListener("resize", getViewportWidth);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", getViewportWidth);
  });
</script>

<template>
  <main
    class="my-0 mx-auto min-h-screen max-w-screen-2xl py-12 px-4 max-lg:overflow-x-hidden"
  >
    <section>
      <h1
        class="line mb-6 max-w-xl font-sans text-3xl font-bold leading-snug text-gray-900 lg:text-5xl"
      >
        The most popular posts from JSONplaceholder!
      </h1>
      <form class="max-w-sm">
        <TheInput
          v-model="filterText"
          placeholder="Search by title..."
          label="Search by title"
          labelSrOnly
        />
      </form>
      <p class="pt-6 font-sans text-base font-normal text-gray-900">
        Click on the post to see graph of commentators emails
      </p>
    </section>

    <section class="lg:flex lg:gap-4">
      <div v-if="filteredPosts.length">
        <PostsList
          :posts="filteredPosts"
          :from="pageFrom"
          :to="pageTo"
          @pick-post="(post) => (pickedPost = post)"
        />
        <ThePagination :pages="Math.round(filteredPosts.length / 10)" />
      </div>

      <TheLoader v-else-if="!posts.length" class="mt-6 h-[368px] w-full" />

      <template v-if="filteredPosts.length">
        <div v-if="isLgAndSmaller" class="w-full max-lg:overflow-x-scroll">
          <div class="relative max-lg:w-[678px] max-lg:py-6 lg:w-full">
            <NamesLengthGraph
              :key="pickedPostEmails"
              :emails="pickedPostEmails"
            />
          </div>
        </div>

        <div v-else class="relative w-full max-w-[60%] shrink max-lg:py-6">
          <NamesLengthGraph
            class="lg:sticky lg:top-6"
            :key="pickedPostEmails"
            :emails="pickedPostEmails"
          />
        </div>
      </template>
    </section>
  </main>
</template>
