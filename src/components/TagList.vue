<template>
  <div>
    <div class="post-tag-wrapper">
        <span @click="filterByTag(tag)" class="tag" v-for="tag in tags" :key="tag">{{tag}}</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps(['tags']);
const router = useRouter();

const filterByTag = (tag) => {
    router.push({ name: 'filter-post', query: { tag: tag } })
}
</script>

<style>
.tag {
  display: inline-block;
  margin-bottom: 15px;
}
.side-header {
  margin-bottom: 20px;
  font-size: 1.5rem;
}
</style>