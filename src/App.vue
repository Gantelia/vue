<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <div class="app__buttons">
      <my-button type="button" @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list v-if="!isPostsLoading" :posts="posts" @remove="removePost" />
    <div v-else>Загрузка...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import type { Post } from "@/types/posts";
import axios from "axios";

export default defineComponent({
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [] as Post[],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
    };
  },
  methods: {
    createPost(post: Post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post: Post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );

        this.posts = response.data;
      } catch (e) {
        alert(`Ошибка! ${e}`);
      } finally {
        this.isPostsLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.app__buttons {
  display: flex;
  justify-content: space-between;
}
</style>
