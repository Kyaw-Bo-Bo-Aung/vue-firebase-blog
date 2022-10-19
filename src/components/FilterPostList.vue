<template>
    <div class="post-list-wrapper">
        <div>
            <Post @delete="deleteOnePost" v-for="post in filter_post_list" :key="post.id" :post="post" />
        </div>
    </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { onMounted, onUpdated, watch } from '@vue/runtime-core';
import Post from './Post.vue';

const emit = defineEmits(['tags', 'deletePost']);
const props = defineProps(['posts', 'filterPosts']);
let post_list = ref(props.posts);
let filter_post_list = ref(props.filterPosts);

const deleteOnePost = id => {
    filter_post_list.value = filter_post_list.value.filter(p => p.id != id);
    post_list.value = post_list.value.filter(p => p.id != id); // for tags

    emit('deletePost', post_list.value);
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

watch(() => props.filterPosts, (current, old) => {
    filter_post_list.value = current;
    console.log(filter_post_list.value);
    console.log("old =>");
    console.log(old);
    console.log("current => " + current);
    console.log(current);
})

</script>