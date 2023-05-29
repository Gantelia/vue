<template>
  <div>
    <h1>Страница Store и Composition API</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск..."></my-input>
    <div class="app__buttons">
      <my-button type="button">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible"> </my-dialog>
    <post-list v-if="!isPostsLoading" :posts="sortedAndSearchedPosts" />
    <div v-else>Загрузка...</div>
    <div class="observer"></div>
  </div>
</template>

<script lang="ts">
import { usePosts } from "@/hooks/usePosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import { defineComponent, ref } from "vue";
import PostList from "@/components/PostList.vue";

export default defineComponent({
  components: {
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
        { value: "id", name: "По идентификатору" },
      ],
    };
  },
  setup(props) {
    const { posts, isPostsLoading, totalPages } = usePosts(10);

    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(posts);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);

    return {
      isPostsLoading,
      totalPages,
      searchQuery,
      sortedAndSearchedPosts,
      selectedSort,
      sortedPosts,
    };
  },
});
</script>

<style>
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
