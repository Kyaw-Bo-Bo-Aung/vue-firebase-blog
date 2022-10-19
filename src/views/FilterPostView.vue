<script setup>
import { collection, getDocs } from "@firebase/firestore";
import { computed, ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import PostList from "../components/PostList.vue";
import Spinner from "../components/Spinner.vue";
import { useRoute } from "vue-router";
import TagList from "../components/TagList.vue";
import { watch } from "@vue/runtime-core";
import FilterPostList from "../components/FilterPostList.vue";

  const isLoading = ref(false);
  const posts = ref([]);
  const tags = ref([]);
  const route = useRoute();

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

  const filterPosts = computed(() => {
    return posts.value.filter(post => post.tags.includes(route.query.tag))
  })

  const refreshPostList = (postList) => {
    posts.value = postList;
  }

  const computeTag = (tag_list) => {
    tags.value = tag_list;
  }

  
</script>

<template>
  <div class="layout-handler">
    <div>
      <h2 class="page-header">Tag - {{ route.query.tag }}</h2>
      <Spinner v-if="isLoading" />
      <main>
          <FilterPostList @deletePost="refreshPostList" @tags="computeTag" v-if="!isLoading" :posts="posts" :filterPosts="filterPosts"  />
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