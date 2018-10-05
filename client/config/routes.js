import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    props: true,
    component: Todo
  },
  {
    path: '/login',
    component: Login
  }
]
