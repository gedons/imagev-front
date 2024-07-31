import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Index.vue';
import ImageDetail from '../views/ImageDetail.vue';
import ImageEdit from '../views/ImageDetail.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/image/:id', component: ImageDetail },
  { path: '/edit/:id', component: ImageEdit },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
