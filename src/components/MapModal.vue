<script setup>
  import { watch, ref, computed, onBeforeMount } from "vue";

  import TheInput from "@/components/TheInput.vue";

  const props = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
    latlng: {
      required: true,
      type: Object,
    },
  });

  defineEmits(["prompt"]);

  const name = ref("");
  const latInput = ref(String(props.latlng.lat));
  const lngInput = ref(String(props.latlng.lng));

  const promptData = computed(() => {
    return {
      name: name.value,
      latlng: { lat: latInput.value, lng: lngInput.value },
    };
  });

  const isEmptyField = computed(
    () => latInput.value === "" || lngInput.value === "",
  );

  watch(
    () => props.open,
    (newVal) => {
      console.log(newVal);
      if (newVal) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "scroll";
    },
  );

  onBeforeMount(() => {
    if (props.open) document.body.style.overflow = "hidden";
  });
</script>

<template>
  <div
    @click="$emit('prompt', false)"
    v-if="open"
    class="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-900 bg-opacity-25 backdrop-blur-sm"
  >
    <form @click.stop @submit.prevent class="rounded-md bg-white">
      <div class="flex items-center justify-between gap-6 p-6">
        <h3 class="text-md font-sans font-medium text-gray-900">Point data</h3>
        <div class="flex gap-4">
          <button
            @click="$emit('prompt', false)"
            class="rounded-sm border-2 border-gray-600 py-2 px-4 font-sans text-sm font-normal text-gray-900 transition-shadow hover:shadow-md disabled:opacity-25"
          >
            Close
          </button>
          <button
            :disabled="isEmptyField"
            @click="$emit('prompt', promptData)"
            class="rounded-sm border-2 border-gray-600 py-2 px-4 font-sans text-sm font-normal text-gray-900 transition-shadow hover:shadow-md disabled:opacity-25"
          >
            Confirm
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-6 p-6 lg:flex-row">
        <TheInput v-model="name" placeholder="Any name" label="Point name" />
        <TheInput v-model="latInput" placeholder="0" label="Latitude" />
        <TheInput v-model="lngInput" placeholder="0" label="Longitude" />
      </div>
    </form>
  </div>
</template>
