import { Post } from "@/types/posts";
import { Ref, computed, ref } from "vue";

export default function useSortedAndSearchedPosts(sortedPosts: Ref<Post[]>) {
  const searchQuery = ref("");

  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter((post: Post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  return {
    searchQuery,
    sortedAndSearchedPosts,
  };
}
