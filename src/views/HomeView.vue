<script setup>
import { collection, getDocs } from "@firebase/firestore";
import { computed, ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import PostList from "../components/PostList.vue";
import Spinner from "../components/Spinner.vue";
import { useRouter } from "vue-router";
import TagList from "../components/TagList.vue";

  const isLoading = ref(false);
  const post_status = ref('');
  const posts = ref([]);
  const tags = ref([]);
  const router = useRouter();
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

  const computeTag = (tag_list) => {
    tags.value = tag_list;
  }
</script>

<template>
  <div class="layout-handler">
    <div>
      <h2 class="page-header">All Post</h2>
      <Spinner v-if="isLoading" />
      <main>
          <PostList @tags="computeTag" v-if="!isLoading" :posts="posts"  />
      </main>
    </div>
    <aside>
      <h2 class="side-header">Tags</h2>
      <div v-if="tags && tags.length > 0">
        <TagList :tags="tags" />
      </div>
    </aside>
  </div>
</template>

<style>
main {
  max-width: 800px;
  margin: auto;
}
.page-header {
  margin-bottom: 20px;
  font-size: 2rem;
  display: block;
  max-width: 800px;
  margin: auto;
}
.layout-handler {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 15px;
}
</style>
