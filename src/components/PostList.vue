<template>
    <div class="post-list-wrapper">
        <div>
            <Post @delete="deleteOnePost" v-for="post in post_list" :key="post.id" :post="post" />
        </div>
    </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import Post from './Post.vue';
const props = defineProps(['posts']);
const post_list = ref(props.posts);
const deleteOnePost = id => {
    post_list.value = post_list.value.filter(p => p.id != id);
}
</script>

<style>
    .post-list-wrapper {
        max-width: 800px;
        margin: auto;
    }
</style>