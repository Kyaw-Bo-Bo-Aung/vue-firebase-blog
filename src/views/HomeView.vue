<script setup>
import { collection, getDocs } from "@firebase/firestore";
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import PostList from "../components/PostList.vue";
import Spinner from "../components/Spinner.vue";

  const isLoading = ref(false);
  const posts = ref([]);
  const getPosts = async () => {
    isLoading.value = true;
    const colRef = collection(db, 'posts');
    const response = await getDocs(colRef);
    response.docs.map(doc => {
      posts.value.push({...doc.data() , id: doc.id})
    })
    isLoading.value = false;
  }
  getPosts();
</script>

<template>
  <main>
    <div>
      <h2 class="page-header">All Post</h2>
        <Spinner v-if="isLoading" />
        <PostList v-if="!isLoading" :posts="posts"  />
    </div>
  </main>
</template>

<style>
main {
  max-width: 800px;
  margin: auto;
}
.page-header {
  margin-bottom: 20px;
  font-size: 2rem;
}
</style>
