<template>
  <div class="post">
    <div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <div class="post__buttons">
      <my-button @click="$emit('remove', post)" type="button"
        >Удалить</my-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import type { Post } from "@/types/posts";

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  emits: ["remove"],
});
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
