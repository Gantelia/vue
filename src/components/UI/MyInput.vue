<template>
  <input :value="modelValue" @input="handleInput" class="input" type="text" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "my-input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    handleInput(evt: Event) {
      const element = evt.target as HTMLInputElement;
      this.$emit("update:model-value", element.value);
    },
  },
  emits: ["update:model-value"],
});
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>
