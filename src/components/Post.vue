<template>
    <div class="post-wrapper">
        <div class="post-header">
            <h3 class="post-title">{{ post.title }}</h3>
            <div class="post-action">
                <span class="post-edit-btn btn btn-edit">
                    <RouterLink class="btn btn-edit" :to="{ name: 'edit-post', params: post }">Edit</RouterLink>
                </span>
                <span class="post-delete-btn btn btn-delete" @click="deletePost(post.id)">delete</span>
            </div>
        </div>
        <div class="post-body">{{ post.body }}</div>
        <div class="post-tag-wrapper">
            <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
        </div>
    </div>
</template>

<script setup>
import { deleteDoc, doc } from '@firebase/firestore';
import { db } from '../firebase/config';

const props = defineProps(['post']);
const emit = defineEmits(['delete']);
const deletePost = async (id) => {
    const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef);
    emit('delete', id);
}
</script>

<style>
    .post-wrapper {
        padding: 10px 20px 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        margin: 15px auto;
    }
    .post-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .post-action span {
        margin-left: 10px;
    }
    .post-title {
        font-size: 1.8rem;
    }
    .post-body {
        margin: 20px 0 30px;
    }
    .post-tag-wrapper {
        margin-left: 13px;
    }
    .post-tag-wrapper span {
        margin-right: 20px;
        background-color: #34495E;
        color: #fff;
        padding: 5px 10px;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
        position: relative;
    }
    .post-tag-wrapper span::before {
    content: "";
    position: absolute;
    top:0;
    left: -13px;
    width: 0;
    height: 0;
    border-color: transparent #34495E transparent transparent;
    border-style: solid;
    border-width: 13px 13px 15px 0;        
    }
    .post-tag-wrapper span::after {
    content: "";
    position: absolute;
    top: 12px;
    left: -2px;
    float: left;
    width: 5px;
    height: 5px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #fff;
    -webkit-box-shadow: -1px -1px 2px rgba(0,0,0,0.4);
    box-shadow: -1px -1px 2px rgba(0,0,0,0.4);
    }
</style>