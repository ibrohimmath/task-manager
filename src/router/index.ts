import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/overview'
    },
    {
      path: "/overview",
      name: "overview",
      component: () => import("@/views/Overview.vue"),
    },
    {
      path: "/task",
      name: "task",
      component: () => import("@/views/Task.vue"),
    },
    {
      path: "/mentors",
      name: "mentors",
      component: () => import("@/views/Mentors.vue"),
    },
    {
      path: "/message",
      name: "message",
      component: () => import("@/views/Message.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/Settings.vue"),
    },
  ],
});

// router.beforeEach((to, from) => {

// });

export default router
