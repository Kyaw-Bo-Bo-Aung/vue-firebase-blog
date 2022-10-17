<script setup>
import { RouterLink } from 'vue-router'

</script>

<template>
    <nav>
        <h1 class="nav-header">Vue Blog</h1>
        <div>
            <RouterLink class="nav-link" to="/">Home</RouterLink> | 
            <RouterLink class="nav-link" to="/create">Create</RouterLink>
        </div>
    </nav>
</template>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding: 20px;
        box-shadow: 0 0 3px 0px rgba(0, 0, 0, 0.2);
    }
    .nav-link {
        margin: 0 10px;
        padding: 10px;
        border-radius: 5px;
    }
    .nav-link:hover {
        color: #fff;
        background-color: #34495E;
    }
    .router-link-active {
        color: #34495E;
        background-color: #41B883;
    }
    .nav-header {
        color: #41B883;
        font-size: 2rem;
    }

</style>