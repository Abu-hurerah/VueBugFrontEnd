import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history', // Use history mode for clean URLs
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/usertype',
      name: 'usertype',
      component: () => import('../views/UserTypeSelectionView.vue')
    },
    {
      path: '/Task',
      name: 'Task',
      component: () => import('../views/BugListingView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/Project',
      name: 'Project',
      component: () => import('../views/ProjectListingView.vue'),
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem('userToken');

  if (requiresAuth && !token) {
    localStorage.setItem('redirectMessage', 'You need to login before accessing this page.');
    if (to.name !== 'login') { // Prevent infinite redirect loop
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
