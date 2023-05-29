import { Post } from "@/types/posts";
import { PostGetters, PostState } from "@/types/state/posts";
import axios from "axios";
import { ActionContext } from "vuex";

export const postModule = {
  state: () => ({
    posts: [] as Post[],
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
  }),
  getters: {
    sortedPosts(state: PostState): Post[] {
      return [...state.posts].sort((post1: Post, post2: Post) => {
        const key = state.selectedSort as keyof Post;
        const value1 = post1[key];
        const value2 = post2[key];
        if (typeof value1 === "number" && typeof value2 === "number") {
          return value1 - value2;
        }
        return String(value1).localeCompare(String(value2));
      });
    },
    sortedAndSearchedPosts(state: PostState, getters: PostGetters): Post[] {
      return getters
        .sortedPosts(state)
        .filter((post: Post) =>
          post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
    },
  },
  mutations: {
    setPosts(state: PostState, posts: Post[]) {
      state.posts = posts;
    },
    setLoading(state: PostState, bool: boolean) {
      state.isPostsLoading = bool;
    },
    setSelectedSort(state: PostState, sort: string) {
      state.selectedSort = sort;
    },
    setPage(state: PostState, page: number) {
      state.page = page;
    },
    setTotalPages(state: PostState, totalPages: number) {
      state.totalPages = totalPages;
    },
    setSearchQuery(state: PostState, searchQuery: string) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({ state, commit }: ActionContext<PostState, any>) {
      try {
        commit("setLoading", true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", response.data);
      } catch (e) {
        alert(`Ошибка! ${e}`);
      } finally {
        commit("setLoading", false);
      }
    },
    async loadMorePosts({ state, commit }: ActionContext<PostState, any>) {
      try {
        commit("setPage", (state.page += 1));
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", [...state.posts, ...response.data]);
      } catch (e) {
        alert(`Ошибка! ${e}`);
      }
    },
  },
  namespace: "post",
};

export const sortedAndSearchedPosts = (
  state: PostState,
  getters: PostGetters
): Post[] => {
  return getters
    .sortedPosts(state)
    .filter((post: Post) =>
      post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
};

export const sortedPosts = (state: PostState): Post[] => {
  return [...state.posts].sort((post1: Post, post2: Post) => {
    const key = state.selectedSort as keyof Post;
    const value1 = post1[key];
    const value2 = post2[key];
    if (typeof value1 === "number" && typeof value2 === "number") {
      return value1 - value2;
    }
    return String(value1).localeCompare(String(value2));
  });
};
