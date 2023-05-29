import { Post } from "@/types/posts";

export interface PostGetters {
  sortedPosts(state: PostState): Post[];
  sortedAndSearchedPosts(state: PostState, getters: PostGetters): Post[];
}

export interface PostState {
  posts: Post[];
  isPostsLoading: boolean;
  selectedSort: string;
  page: number;
  limit: number;
  totalPages: number;
  searchQuery: string;
  sortOptions: { value: string; name: string }[];
}
