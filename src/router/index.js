import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import EditPostView from '../views/EditPostView.vue'
import Error404View from '../views/Error404View.vue'
import FilterPostView from '../views/FilterPostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create-post',
      component: CreatePostView
    },
    {
      path: '/edit/:id',
      name: 'edit-post',
      component: EditPostView,
      props: true
    },
    {
      path: '/post',
      name: 'filter-post',
      component: FilterPostView
    },
    {
      path: '/not-found',
      name: '404-not-found',
      component: Error404View
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404-not-found',
      component: Error404View
    },
  ]
})

export default router
