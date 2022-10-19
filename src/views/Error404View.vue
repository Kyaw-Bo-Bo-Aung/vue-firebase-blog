<template>
    <div class="error-pic-handler">
        <a href='https://storyset.com/web' target="_blank">
            <img src="./../assets/images/404 Error with a cute animal.gif" alt="" />
        </a>
        <RouterLink :to="{ name: 'home' }" class="btn btn-submit">Back to home</RouterLink>
    </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
<style>
.error-pic-handler {
    text-align: center;
    margin-bottom: 30px;
}
.error-pic-handler img {
    max-width: 300px;
    max-height: 300px;
    display: block;
    margin: 0 auto 40px;
}
</style>