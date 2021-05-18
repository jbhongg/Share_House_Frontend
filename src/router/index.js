import Vue from "vue";
import VueRouter from "vue-router";
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Join from '@/views/Join.vue';
import MyPage from '@/views/MyPage.vue';
import Interest from '@/views/Interest.vue';
import Article from '@/views/Article.vue';
import Admin from '@/views/Admin.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    redirect: '/home/',
  },
  {
    path: '/home/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/join/',
    name: 'Join',
    component: Join,
  },
  {
    path: '/mypage/',
    name: 'MyPage',
    component: MyPage,
  },
  {
    path: '/interest/',
    name: 'Interest',
    component: Interest,
  },
  {
    path: '/article/',
    name: 'Article',
    component: Article,
  },
  {
    path: '/admin/',
    name: 'Admin',
    component: Admin,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
