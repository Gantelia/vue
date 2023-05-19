<template>
  <div class="app">
    <form class="form">
      <h4>Создание поста</h4>
      <input
        v-bind:value="title"
        @input="inputTitle"
        class="input"
        type="text"
        placeholder="Название"
      />
      <input
        v-bind:value="body"
        @input="inputBody"
        class="input"
        type="text"
        placeholder="Описание"
      />
      <button class="button" @click.prevent="createPost">Создать</button>
    </form>
    <div class="post" v-for="post in posts" v-bind:key="post.id">
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "Javascript",
          body: "Описание поста",
        },
        {
          id: 2,
          title: "Javascript 2",
          body: "Описание поста 2",
        },
        {
          id: 3,
          title: "Javascript 3",
          body: "Описание поста 3",
        },
        {
          id: 4,
          title: "Javascript 4",
          body: "Описание поста 4",
        },
      ],
      title: "",
      body: "",
    };
  },
  methods: {
    createPost() {
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body,
      };
      this.posts.push(newPost);
      this.title = "";
      this.body = "";
    },
    inputTitle(evt: Event) {
      const element = evt.target as HTMLInputElement;
      this.title = element.value;
    },
    inputBody(evt: Event) {
      const element = evt.target as HTMLInputElement;
      this.body = element.value;
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

.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}

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

.button {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>
