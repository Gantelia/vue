<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <transition-group name="post-list">
      <post-item
        v-for="post in posts"
        :post="post"
        v-bind:key="post.id"
        @remove="$emit('remove', post)"
      ></post-item
    ></transition-group>
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

<style scoped>
.post-list {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move {
  transition: transform 0.8s ease;
}
</style>
