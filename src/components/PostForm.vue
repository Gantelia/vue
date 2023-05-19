<template>
  <form class="form" @submit.prevent="createPost">
    <h4>Создание поста</h4>
    <input
      v-model="post.title"
      class="input"
      type="text"
      placeholder="Название"
    />
    <input
      v-model="post.body"
      class="input"
      type="text"
      placeholder="Описание"
    />
    <my-button>Создать</my-button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyButton from "@/components/UI/MyButton.vue";

export default defineComponent({
  components: { MyButton },
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

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>
