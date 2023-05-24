<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="Поиск..."></my-input>
    <div class="app__buttons">
      <my-button type="button" @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      v-if="!isPostsLoading"
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
    />
    <div v-else>Загрузка...</div>
    <div class="page__wrapper">
      <div
        class="page"
        :class="{ 'current-page': page === pageNumber }"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        @click="setPage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>
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
      page: 1,
      limit: 10,
      totalPages: 0,
      searchQuery: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
        { value: "id", name: "По идентификатору" },
      ],
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
    setPage(newPage: number) {
      this.page = newPage;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
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
  watch: {
    page() {
      this.fetchPosts();
    },
    //   selectedSort(newValue) {
    //     this.posts.sort((post1: Post, post2: Post) => {
    //       const key = newValue as keyof Post;
    //       const value1 = post1[key];
    //       const value2 = post2[key];
    //       if (typeof value1 === "number" && typeof value2 === "number") {
    //         return value1 - value2;
    //       }
    //       return String(value1).localeCompare(String(value2));
    //     });
    //   },
  },
  computed: {
    sortedPosts(): Post[] {
      return [...this.posts].sort((post1: Post, post2: Post) => {
        const key = this.selectedSort as keyof Post;
        const value1 = post1[key];
        const value2 = post2[key];
        if (typeof value1 === "number" && typeof value2 === "number") {
          return value1 - value2;
        }
        return String(value1).localeCompare(String(value2));
      });
    },
    sortedAndSearchedPosts(): Post[] {
      return this.sortedPosts.filter((post: Post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
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

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}
</style>
