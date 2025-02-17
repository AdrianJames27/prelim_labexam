import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AddProject from '../views/AddProject.vue';
import EditProject from '../views/EditProject.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter(to, from) {
        const user = JSON.parse(localStorage.getItem('user'));

        if (to.name === 'home' && user) {
          return '/dashboard'
        }
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/project/add',
      name: 'add-project',
      component: AddProject,
      meta: { requiresAuth: true }
    },
    {
      path: '/project/edit/:id',
      name: 'edit-project',
      component: EditProject,
      meta: { requiresAuth: true },
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (to.meta.requiresAuth && !user) {
    next('/login')
  } else {
    next()
  }
})

export default router
