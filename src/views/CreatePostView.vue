<template>
    <div class="post-list-wrapper">
        <h2>Create Post</h2>
        <div>
            <form action="">
                <div class="form-group">
                    <label class="form-label" for="title">Title</label>
                    <input v-model="title" class="form-input" type="text" id="title">
                </div>
                <div class="form-group">
                    <label class="form-label" for="body">Body</label>
                    <textarea v-model="body" class="form-input" name="body" id="body" rows="10"></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label" for="tags">Tags (press ENTER to add)</label>
                    <input v-model="tag" class="form-input" type="text" id="tags" @keypress.enter.prevent="pushTags">
                    <div v-if="tags.length > 0" class="post-tag-wrapper">
                        <span @click="removeTag(tag)" v-for="tag in tags" :key="tag">{{ tag }}</span>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-submit p-relative" @click.prevent="createPost">
                        Create
                        <Spinner v-if="isLoading" class="btn-spinner loading" />
                    </button>
                    <button class="btn btn-back" @click.prevent="redirectBack">Back</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { addDoc, collection } from "@firebase/firestore";
import { ref } from "@vue/reactivity";
import { useRouteAction } from "../composables/routeAction";
import { db } from "../firebase/config";
import Spinner from "../components/Spinner.vue";

    const isLoading = ref(false);
    const title = ref('');
    const body = ref('');
    const tags = ref([]);
    const tag = ref('');
    const { redirectBack, redirectHome } = useRouteAction();
    
    const pushTags = () => {
        tags.value.includes(tag.value) || tags.value.push(tag.value);
        tag.value = '';
    }
    const removeTag = tag => {
        tags.value = tags.value.filter(t => t != tag);
    }
    const createPost = async () => {
        isLoading.value = true;
        const colRef = collection(db, 'posts');
        const res = await addDoc(colRef, {
            title: title.value,
            body: body.value,
            tags: tags.value
        });
        isLoading.value = false;
        redirectHome();
    }

</script>

<style>
    .form-group {
        margin-bottom: 15px;
    }
    .form-label {
        display: block;
        font-size: 1.3rem;
        color: #555;
        margin-bottom: 5px;
    }
    .form-input {
        font-size: 1.2rem;
        padding: 5px 8px;
        width: 100%;
    }
    .form-group .btn {
        margin-right: 10px;
    }
    #tags {
        margin-bottom: 15px;
    }
    .btn-spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        border-radius: 3px;
    }
    .btn-submit .loading {
        background: rgba(65, 184, 131, 1);
    }
</style>