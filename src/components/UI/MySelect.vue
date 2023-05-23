<template>
  <select v-model="selectedValue" @change="changeOption">
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
  methods: {
    changeOption(evt: Event) {
      const element = evt.target as HTMLSelectElement;
      this.$emit("update:modelValue", element.value);
    },
  },
  emits: ["update:modelValue"],
});
</script>

<style scoped></style>
