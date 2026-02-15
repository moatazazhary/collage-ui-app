// import Course from './pages/Course.vue'

export default [
    {path:'/course/:id',component:()=> import('./pages/Course.vue'),meta:{requireAuth:true}}
]