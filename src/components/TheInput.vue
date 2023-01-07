<script setup>
  defineProps({
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "input",
      required: true,
    },
    labelSrOnly: {
      type: Boolean,
      default: false,
    },
  });

  defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col">
    <label
      :class="{ 'sr-only': labelSrOnly }"
      class="pb-2 font-sans text-sm font-normal text-gray-900"
      :for="label"
    >
      {{ label }}
    </label>
    <input
      :id="label"
      class="rounded-md border-2 border-gray-600 bg-gray-200 py-4 px-6 font-sans text-base font-normal text-gray-900 placeholder:text-gray-600 focus:border-gray-900"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
    />
  </div>
</template>
