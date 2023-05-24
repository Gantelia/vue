<template>
  <select v-model="selectedValue">
    <option disabled value="">Выберите из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "my-select",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array as PropType<{ value: string; name: string }[]>,
      default: () => [],
    },
  },
  computed: {
    selectedValue: {
      get() {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  emits: ["update:modelValue"],
});
</script>

<style scoped></style>
