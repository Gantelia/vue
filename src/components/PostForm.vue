<template>
  <form class="form">
    <h4>Создание поста</h4>
    <my-input v-focus v-model="post.title" placeholder="Название" />
    <my-input v-model="post.body" placeholder="Описание" />
    <my-button
      class="button"
      style="margin-top: 15px"
      @click.prevent="createPost"
      type="submit"
      >Создать</my-button
    >
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      post: {
        id: -1,
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        id: -1,
        title: "",
        body: "",
      };
    },
  },
  emits: ["create"],
});
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
</style>
