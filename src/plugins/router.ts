// Enums
import { EAppPages } from '@/enums/plugins/EAppPages';

// Vue
import { createWebHistory, createRouter } from 'vue-router';

// Store
import { useUsersStore } from '@/store/users';

const adminsPages: EAppPages[] = [
    EAppPages.USERS
];

const routes = [
    // Home page
    {
        path: '/',
        name: EAppPages.HOME,
        component: () => import('@/pages/home/HomePage.vue')
    },

    // Login page
    {
        path: '/login',
        name: EAppPages.LOGIN,
        component: () => import('@/pages/login/LoginPage.vue')
    },

    // Readers page
    {
        path: '/readers',
        name: EAppPages.USERS,
        component: () => import('@/pages/readers/ReadersPage.vue')
    },

    // Requests page
    {
        path: '/requests',
        name: EAppPages.REQUESTS,
        component: () => import('@/pages/requests/RequestsPage.vue')
    },  
    
    // Occupied books page
    {
        path: '/occupied-books',
        name: EAppPages.OCCUPIED_BOOKS,
        component: () => import('@/pages/occupied-books/OccupiedBooksPage.vue')
    },  
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Редирект неавторизованных пользователей на страницу авторизации
router.beforeEach((to) => {
    const $usersStore = useUsersStore();

    if (to.name !== EAppPages.LOGIN && !$usersStore.target) {
        router.push({ name: EAppPages.LOGIN });
        return;
    }

    if (
        $usersStore.isReader &&
        adminsPages.includes(to.name as EAppPages)
    ) {
        router.push({ name: EAppPages.HOME });
    }
});


export default router;