import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history', // Use history mode for clean URLs
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'usertype',
            component: () => import('../views/UserTypeView.vue')
        },
        {
            path: '/Task',
            name: 'Task',
            component: () => import('../views/BugView.vue')
        },
        {
            path: '/login',
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
            component: () => import('../views/TestTaskView.vue')
        }
    ]
})

export default router;
