import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue')
    },
    {
        path: '/approval/create',
        name: 'approvalCreate',
        component: () => import('@/views/approval/create/index.vue')
    },
    {
        path: '/approval/list',
        name: 'approvalList',
        component: () => import('@/views/approval/list/index.vue')
    },
    {
        path: '/approval/detail/:applicationId',
        name: 'approvalDetail',
        component: () => import('@/views/approval/detail/index.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router
