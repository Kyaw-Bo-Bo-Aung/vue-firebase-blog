<script setup>
import { collection, getDocs } from "@firebase/firestore";
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import PostList from "../components/PostList.vue";

  const posts = ref([]);
  const getPosts = async () => {
    const colRef = collection(db, 'posts');
    const response = await getDocs(colRef);
    response.docs.map(doc => {
      posts.value.push({...doc.data() , id: doc.id})
    })
  }
  getPosts();
</script>

<template>
  <main>
    <div>
      <PostList :posts="posts"  />
    </div>
  </main>
</template>
