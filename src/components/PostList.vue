<template>
    <div class="post-list-wrapper">
        <div>
            <Post @delete="deleteOnePost" v-for="post in post_list" :key="post.id" :post="post" />
        </div>
    </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { onMounted, onUpdated, watch } from '@vue/runtime-core';
import Post from './Post.vue';

const emit = defineEmits(['tags', 'deletePost']);
const props = defineProps(['posts']);
let post_list = ref(props.posts);

const deleteOnePost = id => {
    post_list.value = post_list.value.filter(p => p.id != id);
    emit('deletePost');
}

onMounted(() => {
    emit('tags', post_list.value.map(p => p.tags).flat().filter((tag, id, arr) => {
            return (arr.lenght != 1) ? arr.indexOf(tag) == id : true;
        })
    )
})

onUpdated(() => {
    emit('tags', post_list.value.map(p => p.tags).flat().filter((tag, id, arr) => {
            return (arr.lenght != 1) ? arr.indexOf(tag) == id : true;
        })
    )
})
</script>

<style>
    .post-list-wrapper {
        max-width: 800px;
        margin: auto;
    }
</style>