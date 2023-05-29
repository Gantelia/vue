import { Post } from "@/types/posts";
import { Ref, computed, ref } from "vue";

export default function useSortedPosts(posts: Ref<Post[]>) {
  const selectedSort = ref("");

  const sortedPosts = computed(() => {
    return [...posts.value].sort((post1: Post, post2: Post) => {
      const key = selectedSort.value as keyof Post;
      const value1 = post1[key];
      const value2 = post2[key];
      if (typeof value1 === "number" && typeof value2 === "number") {
        return value1 - value2;
      }
      return String(value1).localeCompare(String(value2));
    });
  });

  return {
    selectedSort,
    sortedPosts,
  };
}
