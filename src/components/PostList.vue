<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <post-item
      v-for="post in posts"
      :post="post"
      v-bind:key="post.id"
      @remove="$emit('remove', post)"
    ></post-item>
  </div>
  <h2 v-else style="color: red">Список постов пуст</h2>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import type { Post } from "@/types/posts";
import PostItem from "@/components/PostItem.vue";

export default defineComponent({
  components: { PostItem },
  props: {
    posts: {
      type: Array as PropType<Post[]>,
      required: true,
    },
  },
  emits: ["remove"],
});
</script>

<style scoped></style>
