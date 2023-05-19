<template>
  <div>
    <h3>Список пользователей</h3>
    <post-item
      v-for="post in posts"
      :post="post"
      v-bind:key="post.id"
    ></post-item>
  </div>
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
});
</script>

<style scoped></style>
