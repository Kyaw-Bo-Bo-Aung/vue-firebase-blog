<template>
    <div class="post-list-wrapper">
        <h2 class="page-header">Edit Post</h2>
        <Spinner v-if="isLoading" />
        <div v-if="!isLoading">
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
                    <div v-if="tags && tags.length > 0" class="post-tag-wrapper">
                        <span @click="removeTag(tag)" v-for="tag in tags" :key="tag">{{ tag }}</span>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-submit p-relative" @click.prevent="updatePost">
                        Update
                        <Spinner v-if="isSubmiting" class="btn-spinner loading" />
                    </button>
                    <button class="btn btn-back" @click.prevent="redirectBack">Back</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { db } from "../firebase/config";
import { useRouteAction } from "@/composables/routeAction.js";
import Spinner from "../components/Spinner.vue";

    const router = useRouter();
    const isLoading = ref(false);
    const isSubmiting = ref(false);
    const props = defineProps(['id']);
    const postHandler = ref(null);
    const title = ref('');
    const body = ref('');
    const tags = ref([]);
    const tag = ref('');
    const { redirectBack, redirectHome, redirectErrorPage } = useRouteAction();

    const getPost = async () => {
        isLoading.value = true;
        const docRef = doc(db, "posts", props.id);
        const result = await getDoc(docRef);
        postHandler.value =  {...result.data()};
        if(!result.data()) {
            redirectErrorPage();
        }
        title.value = postHandler.value.title;
        body.value = postHandler.value.body;
        tags.value = postHandler.value.tags;
        isLoading.value = false;
    }
    getPost();
    const pushTags = () => {
        tags.value.includes(tag.value) || tags.value.push(tag.value);
        tag.value = '';
    }
    const removeTag = tag => {
        tags.value = tags.value.filter(t => t != tag);
    }
    const updatePost = async () => {
        isSubmiting.value = true;
        const updatedPost = await setDoc(doc(db, 'posts', props.id), {
            title: title.value,
            body: body.value,
            tags: tags.value
        });
        isSubmiting.value = false;
        redirectHome();
    }
</script>